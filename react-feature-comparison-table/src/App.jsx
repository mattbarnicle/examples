import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import styles from './App.module.css';

import { FeatureComparisonTable }
  from './feature-comparison-table/FeatureComparisonTable.jsx';

function App() {
  return (
    <Container fluid className={ styles.mainContainer }>
      <main className={ styles.main }>
        <Container className={ styles.tableContainer }>
          <FeatureComparisonTable />
        </Container>
      </main>
    </Container>
  );
}

export default App;
