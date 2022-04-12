import React, { useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditProfileModal from "../EditProfileModal/EditProfileMode";

import "./header.scss";
import {logoutUser} from '../../action/userAction';

function HeaderAdmin  ({infoUserAuth,logoutUser})  {
  const [admin, setAdmin] = useState({});
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [active, setActive] = useState('users');

  const { user } =infoUserAuth;

  useEffect(() => {
    if (user && user.username) {
      setAdmin(user.username.toUpperCase());
    }
  }, [user]);

  const handleToggleShowEdit = () => {
      setIsShowEdit(!isShowEdit);
  };

  const handleClickLink = (link) => {
    setActive(link);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="./" className="a-none">
          <Navbar.Text as={"h3"} className="logo">
            HiShop
          </Navbar.Text>
        </Link>
        <Nav className="ms-3">
          <Link to={"./users"} className={active === 'users' ? `a-none me-3 active` : "a-none me-3"} onClick={() => handleClickLink('users')}>
            <Navbar.Text>Quan ly nguoi dung</Navbar.Text>
          </Link>
          <Link to={"./products"} className={active === 'products' ? `a-none me-3 active` : "a-none me-3"} onClick={() => handleClickLink('products')}>
            <Navbar.Text>Quan ly san pham</Navbar.Text>
          </Link>
        </Nav>
        <Nav className="grow-1"></Nav>
        <Nav>
          <DropdownButton
            id="dropdown-basic-button"
            title={`${admin}`}
            className="btn-dropdown"
          >
            <Dropdown.ItemText onClick={() => handleToggleShowEdit()}>Chinh sua tai khoan</Dropdown.ItemText>
            <Dropdown.ItemText onClick={() => logoutUser()}>Dang xuat</Dropdown.ItemText>
          </DropdownButton>
        </Nav>
      </Container>
      {
        isShowEdit && admin && <EditProfileModal isShowEdit={isShowEdit} user={user} onClose={handleToggleShowEdit}/>
      }
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
    infoUserAuth : state.userAuth,
})

export default connect(mapStateToProps,{logoutUser})(HeaderAdmin);
