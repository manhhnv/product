import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { adminUpdateUser,adminDeleteUser } from "../../../action/userAction";
function UpdateModal({ isShow, isUpdate, updateUser, onClose, adminUpdateUser,adminDeleteUser }) {
  const handleActions = () => {
    if (isUpdate) {
      adminUpdateUser({...updateUser, isAdmin : true});
    }else{
        adminDeleteUser(updateUser);
    };
    handleClose();
  };

  const handleClose = () => {
    onClose && onClose();
  }
  return (
    <Modal show={isShow} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdate ? (
              <>
              Ban co muon cap quyen admin cho user <strong>{updateUser.username}</strong>
            </>
          ) : (
            <>
              Ban co muon xoa user <strong>{updateUser.username}</strong>
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={() => handleActions()}>Yes</Button>
        <Button variant="danger" onClick={() => handleClose()}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { adminUpdateUser,adminDeleteUser })(UpdateModal);
