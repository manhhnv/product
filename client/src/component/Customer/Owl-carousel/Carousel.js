import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { connect } from "react-redux";

import { getTopProduct } from "../../../action/productAction";
import { URL } from "../../../contants/GlobalContains";
import './Carousel.scss';

function CarouselProduct({ infoGetTopProduct, getTopProduct }) {
  const [listProduct, setListProduct] = useState([]);

  const { products } = infoGetTopProduct;

  useEffect(() => {
    getTopProduct();
  }, []);

  useEffect(() => {
    if (products && products.length !== 0) {
      setListProduct(products);
    }
  }, [products]);

  return (
    <Carousel variant="dark">
      {listProduct &&
        listProduct.map((product) => (
          <Carousel.Item key={product._id}>
            <img
              src={`${URL}/${product.image}`}
              alt="image-product"
              className="d-block mx-auto slide-img"
            />
            <Carousel.Caption>
              <h5>{product.name}</h5>
              <p> Gia chi : {product.price}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=f5f5f5"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

const mapStateToProps = (state) => ({
  infoGetTopProduct: state.productGetTop,
});

export default connect(mapStateToProps, { getTopProduct })(CarouselProduct);
