import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import Message from '../Message/Message';
import {updateUser} from '../../action/userAction'; 

function EditProfileModal({infoUserUpdate,isShowEdit, user, onClose,updateUser}) {
  const [updateForm, setUpdateForm] = useState({});
  const [mesValidate, setmesValidate] = useState("");
  const [isShowMes, setIsShowMes] = useState(false);
  const passwordRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
      if(user.username) {
          setUpdateForm({
              username : user.username,
              email : user.email,
              password : '',
          });
      }
  }, [user]);

    const { messError } = infoUserUpdate;

    useEffect(() => {
      if (messError) {
        setIsShowMes(true);
        setmesValidate(messError);
      }
    }, [messError]);

  const handleChangeupdateForm = (e) => {
    setUpdateForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = () => {
    if (!updateForm.email || !updateForm.password || !updateForm.username) {
      setIsShowMes(true);
      setmesValidate("Cac truong khong bo trong");
      return;
    }

    if (
      !updateForm.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setIsShowMes(true);
      setmesValidate("Dia chi mail khong dung");
      return;
    }

    const form = {
      username: updateForm.username,
      email: updateForm.email,
      password: updateForm.password.trim(),
    };

    updateUser(form);
    handleCloseModal();
  };

  const handleClickInput = (e) => {
    setIsShowMes(false);
    e.target.focus();
    e.target.select();
  };

  const handleBlurInput = (e) => {
    if (!updateForm[e.target.name]) {
      setIsShowMes(true);
      setmesValidate("Cac truong khong bo trong");
      e.target.focus();
      return;
    }

    if (
      e.target.name === "email" &&
      !updateForm.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setIsShowMes(true);
      setmesValidate("Dia chi mail khong dung");
      e.target.focus();
      return;
    }
  };

  const handleKeyDownInput = (e) => {
    setIsShowMes(false);
    if (e.keyCode === 13) {
      if (e.target.name === "username") {
        emailRef.current.focus();
      } else if (e.target.name === "email") {
        passwordRef.current.focus();
      } else if (e.target.name === "password") {
        handleSubmitForm();
      }
    }
  };

  const handleCloseModal = () => {
      onClose && onClose();
  }
  return (
    <Modal show={isShowEdit} onHide={() => handleCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Chinh sua tai khoan cua ban !!!</Modal.Title>
      </Modal.Header>
      {
        isShowMes && <Message message={mesValidate}/>
      }
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="username">Username :</Form.Label>
            <Form.Control
              placeholder="Nhap ten dang nhap can sua"
              id="username"
              name="username"
              value={updateForm.username || ""}
              onChange={(e) => handleChangeupdateForm(e)}
              onBlur={(e) => handleBlurInput(e)}
              onKeyDown={(e) => handleKeyDownInput(e)}
              onClick={(e) => handleClickInput(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
                ref={emailRef}
              placeholder="Nhap email can sua"
              name="email"
              value={updateForm.email || ""}
              onChange={(e) => handleChangeupdateForm(e)}
              onBlur={(e) => handleBlurInput(e)}
              onKeyDown={(e) => handleKeyDownInput(e)}
              onClick={(e) => handleClickInput(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control
                ref={passwordRef}
              placeholder="Nhap mat khau can sua"
              type="password"
              name="password"
              value={updateForm.password || ""}
              onChange={(e) => handleChangeupdateForm(e)}
              onBlur={(e) => handleBlurInput(e)}
              onKeyDown={(e) => handleKeyDownInput(e)}
              onClick={(e) => handleClickInput(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleSubmitForm()}>Edit</Button>
          <Button variant="danger" onClick={()=> handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = state => ({
    infoUserUpdate : state.userUpdate,
})

export default connect(mapStateToProps,{updateUser})(EditProfileModal);
