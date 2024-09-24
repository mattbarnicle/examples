import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

import { UserContext } from '../providers/UserContext.js';
import { ProductsContext } from '../providers/ProductsContext.js';

export function BuyButton ({ videoModule }) {
  const { user, setUser } = useContext(UserContext);
  const products = useContext(ProductsContext);
  const [ isLoading, setIsLoading ] = useState(false);

  const handleClick = (e) => {
    const videoModuleProduct = products
      .filter(p => p.type === 'video module')
      .find(p => p.videoModule._id === videoModule._id);

    if (!user.products.find(up => up._id === videoModuleProduct._id)) {
      setIsLoading(true);

      setTimeout(() => {
        toast.success('Module purchased');

        setIsLoading(false);
        setUser({
          ...user,
          products: [
            ...user.products,
            videoModuleProduct,
          ],
        });
      }, 1000);
    }
  };

  return (
    <Button
      className="btn-video-module btn-buy-now"
      onClick={ handleClick }
      disabled={ isLoading }
    >
      { isLoading &&
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          {' '}
        </>
      }
      { isLoading ? 'Purchasing...' : 'Buy now!' }
    </Button>
  );
}
