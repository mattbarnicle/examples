import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { YoutubeEmbed } from './YoutubeEmbed.jsx';

export function WatchModal (props) {
  return (
    <Modal
      { ...props }
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          I'm really showing my age with this joke...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YoutubeEmbed embedId="dQw4w9WgXcQ" timestamp={ 43 } mute />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.onHide }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
