import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./register.scss";
import { registerUser } from "../../action/userAction";
import Message from "../Message/Message";

function Register({ infoRes, registerUser }) {
  const [registerForm, setRegisterForm] = useState({});
  const [mesValidate, setmesValidate] = useState("");
  const [isShowMes, setIsShowMes] = useState(false);
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const emailRef = useRef();

  const { messError } = infoRes;

  useEffect(() => {
    if (messError) {
      setIsShowMes(true);
      setmesValidate(messError);
    }
  }, [messError]);

  const handleChangeRegisterForm = (e) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = () => {
    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword ||
      !registerForm.username
    ) {
      setIsShowMes(true);
      setmesValidate("Cac truong khong bo trong");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setIsShowMes(true);
      setmesValidate("Xac nhan mat khau khong chinh xac");
      return;
    }

    if (
      !registerForm.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setIsShowMes(true);
      setmesValidate("Dia chi mail khong dung");
      return;
    }

    const form = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password.trim(),
    };

    registerUser(form);
  };

  const handleClickInput = (e) => {
    setIsShowMes(false);
    e.target.focus();
  };

  const handleBlueInput = (e) => {
    if (!registerForm[e.target.name]) {
      setIsShowMes(true);
      setmesValidate("Cac truong khong bo trong");
      e.target.focus();
      return;
    }

    if (
      e.target.name === "email" &&
      !registerForm.email.match(
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
        confirmPassRef.current.focus();
      } else if (e.target.name === "confirmPassword") {
        handleSubmitForm();
      }
    }
  };
  return (
    <div>
      <h1 className="title-register">Register HiShop</h1>
      {isShowMes && mesValidate && <Message message={mesValidate} />}

      <Form>
        <Form.Group className="my-3">
          <Form.Label htmlFor="username">Username : </Form.Label>
          <Form.Control
            placeholder="Nhap dịa chỉ ten"
            id="username"
            name="username"
            value={registerForm.username || ""}
            onChange={(e) => handleChangeRegisterForm(e)}
            onClick={(e) => handleClickInput(e)}
            onBlur={(e) => handleBlueInput(e)}
            onKeyDown={(e) => handleKeyDownInput(e)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label htmlFor="email">Mail : </Form.Label>
          <Form.Control
            ref={emailRef}
            placeholder="Nhap dịa chỉ mail"
            id="email"
            name="email"
            value={registerForm.email || ""}
            onChange={(e) => handleChangeRegisterForm(e)}
            onClick={(e) => handleClickInput(e)}
            onBlur={(e) => handleBlueInput(e)}
            onKeyDown={(e) => handleKeyDownInput(e)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label htmlFor="password">Password : </Form.Label>
          <Form.Control
            ref={passwordRef}
            type={"password"}
            placeholder="Nhap mat khau"
            id="password"
            name="password"
            value={registerForm.password || ""}
            onChange={(e) => handleChangeRegisterForm(e)}
            onClick={(e) => handleClickInput(e)}
            onBlur={(e) => handleBlueInput(e)}
            onKeyDown={(e) => handleKeyDownInput(e)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label htmlFor="confirmPassword">Confirm Password : </Form.Label>
          <Form.Control
            ref={confirmPassRef}
            type={"password"}
            placeholder="Nhap lai mat khau"
            id="confirmPassword"
            name="confirmPassword"
            value={registerForm.confirmPassword || ""}
            onChange={(e) => handleChangeRegisterForm(e)}
            onClick={(e) => handleClickInput(e)}
            onBlur={(e) => handleBlueInput(e)}
            onKeyDown={(e) => handleKeyDownInput(e)}
          />
        </Form.Group>
        <Button variant="success" className="btn-login w-100" onClick={() => handleSubmitForm()}>
          Register
        </Button>
      </Form>

      <div className="bottom-container">
        <span>Dang nhap tai khoan tai day</span>
        <Link to="./login">
          <Button className="ms-3 btn-bottom" variant="secondary">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  infoRes: state.userRegister,
});

export default connect(mapStateToProps, { registerUser })(Register);
