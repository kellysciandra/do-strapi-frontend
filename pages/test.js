
import { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditOrder from './[id]/edit_order';

const MyVerticallyCenteredModal = (props) => {
    return ( 
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <EditOrder/>
      </Modal>
    );
  }

const Test = () => {
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <Button onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

  export default Test;