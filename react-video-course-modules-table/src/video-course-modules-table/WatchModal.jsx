import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function WatchModal (props) {
  return (
    <Modal
      { ...props }
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        Placeholder for an actual video
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ props.onHide }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
