import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Login.scss";
import { loginUser } from "../../action/userAction";
import Message from "../Message/Message";

function Login({infoLogin, loginUser }) {
  const [loginForm, setLoginForm] = useState({});
  const [mesValidate, setmesValidate] = useState("");
  const [isShowMes, setIsShowMes] = useState(false);
  const passwordInput = useRef();

  const {messError} = infoLogin;

  useEffect(() => {
      if(messError) {
          setIsShowMes(true);
          setmesValidate(messError);
      }
  }, [messError]);

  const handleChangeLoginForm = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = () => {
    if (!loginForm.email || !loginForm.password) {
        setIsShowMes(true);
      setmesValidate("Dia chi mail hoac mat khau khong bo trong");
      return;
    }

    const form = {
      email: loginForm.email,
      password: loginForm.password.trim(),
    };

    loginUser(form);
  };

  const handleClickInput = (e) => {
      setIsShowMes(false);
      e.target.focus();
  };

  const handleBlueInput = (e) => {
    if (!loginForm[e.target.name]) {
        setIsShowMes(true);
        setmesValidate("Dia chi mail hoac mat khau khong bo trong");
        e.target.focus();
      return;
    }
  };

  const handleKeyDownInput = (e) => {
      setIsShowMes(false);
        if(e.keyCode === 13)
        {
            if(e.target.name === 'email') {
                passwordInput.current.focus()
            }else if(e.target.name === 'password') {
                handleSubmitForm()
            }
        }
  };

  return (
    <div>
      <h1 className="title-login">Login in HiShop</h1>
      {mesValidate && isShowMes && <Message message={mesValidate} />}

      <Form>
        <Form.Group className="my-3">
          <Form.Label htmlFor="email">Mail : </Form.Label>
          <Form.Control
            placeholder="Nhap dịa chỉ mail"
            id="email"
            name='email'
            value={loginForm.email || ""}
            onChange={(e) => handleChangeLoginForm(e)}
            onClick= {e => handleClickInput(e)}
            onKeyDown = { e => handleKeyDownInput(e)}
            onBlur = {e => handleBlueInput(e)}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label htmlFor="password">Password : </Form.Label>
          <Form.Control
            ref = {passwordInput}
            type={"password"}
            placeholder="Nhap pass word"
            id="password"
            name='password'
            value={loginForm.password || ""}
            onChange={(e) => handleChangeLoginForm(e)}
            onClick= {e => handleClickInput(e)}
            onBlur = {e => handleBlueInput(e)}
            onKeyDown = {e => handleKeyDownInput(e)}
          />
        </Form.Group>
        <Button
          variant="success"
          className="btn-login w-100"
          onClick={() => handleSubmitForm()}
        >
          Login
        </Button>
      </Form>

      <div className="bottom-container">
        <span>Dang ky tai khoan tai day</span>
        <Link to="./register">
          <Button className="ms-3 btn-bottom" variant="secondary">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    infoLogin : state.userLogin,
});

export default connect(mapStateToProps, { loginUser })(Login);
