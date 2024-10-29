import React, { useMemo } from 'react';
import Table from 'react-bootstrap/Table';

import styles from './FeatureComparisonTable.module.css';

import { features, implementation, products, productFeatures } from './data.js';

const featuresOrder = [
  features.createEditTasks,
  features.prioritizeTasks,
  features.scheduleTasks,
  features.recurringTasks,
  features.createSubtasks,
  features.addNotesComments,
  features.tagCategorizeTasks,
  features.customNotifications,
  features.darkMode,
  features.cloudSyncBackup,
];

const productsOrder = [
  products.taskMaster,
  products.justTodoIt,
  products.zenList,
  products.todoZen,
];

function ProductCellContent ({ product, feature }) {
  const featureIsTruthy = useMemo(() => {
    return (
      productFeatures[product][feature] === implementation.yes
      ||
      productFeatures[product][feature] === implementation.premiumOnly
    );
  }, [ product, feature ]);

  return (
    <>
      <div className={
        featureIsTruthy ? styles.hasFeatureText : styles.doesNotHaveFeatureText
      }>
        { featureIsTruthy ? implementation.yes : implementation.no }
      </div>
      { productFeatures[product][feature] === implementation.premiumOnly && (
        <div className={ styles.featureText }>
          (Premium version)
        </div>
      )}
    </>
  );
}

function ProductCell ({ cellType, product, feature }) {
  const cellProps = { className: styles.featureCell };
  const cellContent = <ProductCellContent product={ product } feature={ feature } />;

  if (cellType === 'th') {
    return <th { ...cellProps }>{ cellContent }</th>;
  }
  else {
    return <td { ...cellProps }>{ cellContent }</td>;
  }
}

export function FeatureComparisonTable () {
  return (
    <div className={ styles.tableWrapper }>
      <Table className={ styles.table }>
        <thead className={ styles.tableHead }>
          <tr>
            <th></th>
            { productsOrder.map(product => (
              <th key={ product } className={ styles.productHeadingCell }>
                { product }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={ styles.tableBody }>
          { featuresOrder.map(feature => (
            <tr key={ feature }>
              <th className={ styles.featureLabelCell }>{ feature }</th>
              { productsOrder.map((product, index) => (
                <ProductCell
                  key={ product }
                  cellType={ index === 0 ? 'th' : 'td' }
                  product={ product }
                  feature={ feature }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
