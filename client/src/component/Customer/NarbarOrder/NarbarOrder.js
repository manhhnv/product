import React, { useEffect, useState } from "react";
import { Badge, Button, Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./NarbarOrder.scss";
import { activeGlobal } from "../../../action/GlobalAction";

function NarbarOrder({ infoGlobalActive ,infocart, activeGlobal }) {
  const [active, setActive] = useState("");
  const [isDisBlock, setIsDisBlock] = useState(false);


  const { type } = infoGlobalActive;
  const {cartItems} = infocart;


  useEffect(() => {
    setActive(type);
  }, [type]);

  const handleClickLink = (type) => {
    activeGlobal(type);
    isDisBlock && setIsDisBlock(false);
  };

  const handleToggleDisplayBlock = () => {
    setIsDisBlock(!isDisBlock);
  };

  const handleMouseLeave = () => {
    setIsDisBlock(false);
  };

  return (
    <Nav className={"header-order"}>
      <Button
        variant="light"
        className={"header-btn-order"}
        onClick={() => handleToggleDisplayBlock()}
      >
        <i className="fa-solid fa-bars"></i>
      </Button>
      <div
        className={
          isDisBlock ? "header-order-wapper d-block" : "header-order-wapper"
        }
        onMouseLeave={() => handleMouseLeave()}
      >
        <Link
          to={"./historyOrder"}
          className={
            active === "historyOrder" ? `a-none me-3 active` : "a-none me-3"
          }
          onClick={() => handleClickLink("historyOrder")}
        >
          <Navbar.Text>Lich su mua hang</Navbar.Text>
        </Link>
        <Link
          to={"./order"}
          className={active === "order" ? `a-none me-3 active` : "a-none me-3"}
          onClick={() => handleClickLink("order")}
        >
          <Navbar.Text>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Gio hang</span>
            <Badge pill bg="danger">{ cartItems.length !==0 && cartItems.length}</Badge>
          </Navbar.Text>
        </Link>
      </div>
    </Nav>
  );
}

const mapStateToProps = (state) => ({
  infoGlobalActive: state.globalActive,
  infocart : state.cartReducer,
});

export default connect(mapStateToProps, { activeGlobal })(NarbarOrder);
