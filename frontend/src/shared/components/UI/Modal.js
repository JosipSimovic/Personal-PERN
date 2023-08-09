import React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Modal = (props) => {
  return (
    <BootstrapModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootstrapModal.Header closeButton onHide={props.onCancel}>
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          {props.header}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button onClick={props.onCancel}>Close</Button>
        {props.extraButton}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
