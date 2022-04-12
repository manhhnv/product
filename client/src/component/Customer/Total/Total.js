import React, { useState } from "react";

import "./Total.scss";

function Total({ total, shippingPrice, sumPrice, tax,onPaymentMethod }) {
  const [isChoose, setIsChoose] = useState("tien mat");
  const handleChoose = (type) => {
    setIsChoose(type);
    onPaymentMethod && onPaymentMethod(type);
  }
  return (
    <div className="total-wapper">
      <div className="total-item">
        <span>Tam Tinh : </span>{" "}
        <div className="item-red">{total ? total : 0}d</div>
      </div>
      <div className="total-item">
        <span>Phi Ship : </span>{" "}
        <div className="item-red">{total ? shippingPrice : 0}d</div>
      </div>
      <div className="total-item">
        <span>Thue VAT : </span>{" "}
        <div className="item-red">{total ? tax : 0}%</div>
      </div>
      <div>
        <span>Chon phuong thuc thanh toan :</span>
        <div className="total-payload-method">
          <div className={isChoose === "tien mat" ? `success` : ""} onClick={() => handleChoose('tien mat')}>
            Thanh toan tien mat
          </div>
          <div className={isChoose === "the" ? `success` : ""} onClick={() => handleChoose('the')}>
            Thanh toan bang the
          </div>
        </div>
      </div>
      <hr />
      <div className="total-item">
        <span>Tong gia</span>
        <div className="item-red">
          {total ? `${sumPrice}d` : <>Hay chon san pham (da bao gom thue VAT)</>}
        </div>
      </div>
    </div>
  );
}

export default Total;
