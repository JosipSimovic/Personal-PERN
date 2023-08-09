import React from "react";
import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal onCancel={props.onCancel} header="Error" show={!!props.error}>
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
