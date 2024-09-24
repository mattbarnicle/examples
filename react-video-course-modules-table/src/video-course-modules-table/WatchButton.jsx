import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { WatchModal } from './WatchModal.jsx';

export function WatchButton () {
  const [ modalShow, setModalShow ] = useState(false);

  return (
    <>
      <Button
        className="btn-video-module btn-purchased"
        onClick={ () => setModalShow(true) }
      >
        Watch
      </Button>
      <WatchModal
        show={ modalShow }
        onHide={ () => setModalShow(false) }
      />
    </>
  );
}
