import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { deleteProductFromCart } from "../../../action/cartAction";

function DeleteOrderModal({ product, isShow, onClose, deleteProductFromCart }) {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleDeleteItem = (id) => {
    deleteProductFromCart(id);
  };
  return (
    <Modal show={isShow} onHide={() => handleClose()}>
      <Modal.Header closeButton>Xoa san pham trong gio hang !!!</Modal.Header>
      <Modal.Body>
        Ban co muon xoa <strong>{product.name}</strong> trong gio hang ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleDeleteItem(product._id)}>
          Ok
        </Button>
        <Button variant="danger" onClick={() => handleClose()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteProductFromCart })(
  DeleteOrderModal
);
