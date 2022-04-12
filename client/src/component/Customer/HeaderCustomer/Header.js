import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import HeaderCustomer from "./header.module.css";
import "../../Admin/header.scss";
import EditProfileModal from "../../EditProfileModal/EditProfileMode";
import { logoutUser } from "../../../action/userAction";
import { activeGlobal } from "../../../action/GlobalAction";
import NarbarOrder from "../NarbarOrder/NarbarOrder";

function Header({ infoUserAuth, infoGlobalActive, logoutUser, activeGlobal }) {
  const [user, setUser] = useState({});
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [active, setActive] = useState("");

  const { user: _user } = infoUserAuth;

  const { type } = infoGlobalActive;

  useEffect(() => {
    setActive(type);
  }, [type]);

  useEffect(() => {
    if (_user && _user.username) {
      setUser(_user.username.toUpperCase());
    }
  }, [_user]);

  const handleToggleShowEdit = () => {
    setIsShowEdit(!isShowEdit);
  };

  const handleClickLink = (link) => {
    activeGlobal(link);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="./" className="a-none" onClick={() => handleClickLink("")}>
          <Navbar.Text as={"h3"} className="logo">
            HiShop
          </Navbar.Text>
        </Link>
        <Nav className="ms-3">
          <Link
            to={"./smartphone"}
            className={
              active === "smartphone" ? `a-none me-3 active` : "a-none me-3"
            }
            onClick={() => handleClickLink("smartphone")}
          >
            <Navbar.Text>Dien thoai <span className={HeaderCustomer.d_none}>thong minh</span></Navbar.Text>
          </Link>
          <Link
            to={"./laptop"}
            className={
              active === "laptop" ? `a-none me-3 active` : "a-none me-3"
            }
            onClick={() => handleClickLink("laptop")}
          >
            <Navbar.Text>Laptop</Navbar.Text>
          </Link>
          <Link
            to={"./watch"}
            className={
              active === "watch" ? `a-none me-3 active` : "a-none me-3"
            }
            onClick={() => handleClickLink("watch")}
          >
            <Navbar.Text>Dong ho</Navbar.Text>
          </Link>
          <Link
            to={"./accessory"}
            className={
              active === "accessory" ? `a-none me-3 active` : "a-none me-3"
            }
            onClick={() => handleClickLink("accessory")}
          >
            <Navbar.Text>Phu kien</Navbar.Text>
          </Link>
        </Nav>
        <Nav className="grow-1"></Nav>
        <NarbarOrder/>
        <Nav>
          <DropdownButton
            id="dropdown-basic-button"
            title={`${user}`}
            className="btn-dropdown"
          >
            <Dropdown.ItemText onClick={() => handleToggleShowEdit()}>
              Chinh sua tai khoan
            </Dropdown.ItemText>
            <Dropdown.ItemText onClick={() => logoutUser()}>
              Dang xuat
            </Dropdown.ItemText>
          </DropdownButton>
        </Nav>
      </Container>
      {isShowEdit && user && (
        <EditProfileModal
          isShowEdit={isShowEdit}
          user={user}
          onClose={handleToggleShowEdit}
        />
      )}
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  infoUserAuth: state.userAuth,
  infoGlobalActive: state.globalActive,
});

//logoutUser

export default connect(mapStateToProps, { logoutUser, activeGlobal })(Header);
