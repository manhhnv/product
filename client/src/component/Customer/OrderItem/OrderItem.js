import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import "./OrderItem.scss";
import {
  addProductToCart,
  minusProductFromCart,
} from "../../../action/cartAction";
import DeleteOrderModal from "../DeleteOrderModal/DeleteOrderModal";
import { URL } from "../../../contants/GlobalContains";

const OrderItem = ({
  product,
  onCheck,
  addProductToCart,
  minusProductFromCart,
}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleChangeCheck = () => {
    setIsCheck(!isCheck);
  };

  const handleToggleCheck = (id) => {
    onCheck && onCheck(id, !isCheck);
  };

  const hanndlminusItem = (id) => {
    if (product.quantity === 1) {
      setIsShow(true);
    } else {
      minusProductFromCart(id);
    }
  };

  const handleToggleDeleteItem = () => {
    setIsShow(!isShow);
  };
  return (
    <>
      {product && (
        <div className="order-item-wapper">
          <div>
            <input
              type={"checkbox"}
              checked={isCheck && "checked"}
              onChange={() => handleChangeCheck()}
              onClick={() => handleToggleCheck(product._id)}
            />
          </div>
          <div className="order-item-img">
            <img
              src={`${URL}/${product.image}`}
              alt="anh san phan"
            />
          </div>
          <div className="order-item-text">
            <h6>{product.name}</h6>
            <div className="order-text-child">
              <p>{product.price}</p>
              <p>
                <Button
                  className="mx-2"
                  onClick={() => hanndlminusItem(product._id)}
                >
                  -
                </Button>
                {product.quantity}
                <Button
                  className="mx-2"
                  onClick={() => addProductToCart(product)}
                >
                  +
                </Button>
              </p>
              <p className="item-text-red">
                {product.price * product.quantity}
              </p>
            </div>
          </div>
          <div>
            <Button onClick={() => handleToggleDeleteItem()} variant='light'>
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </div>
      )}
      <DeleteOrderModal
        isShow={isShow}
        product={product}
        onClose={handleToggleDeleteItem}
      />
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addProductToCart,
  minusProductFromCart,
})(OrderItem);
