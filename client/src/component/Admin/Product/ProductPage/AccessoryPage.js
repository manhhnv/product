import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { getAllProduct } from "../../../../action/productAction";
import Product from "./Product";

const AccessoryPage = ({ infoAllProduct, getAllProduct }) => {
  const [currentProducts, setCurrentProducts] = useState([]);

  const { products } = infoAllProduct;

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    if (products && products.length !== 0) {
      const _products = products.filter(
        (product) => product.category === "accessory"
      );
      setCurrentProducts(_products);
    }
  }, [products]);
  return (
    <Container>
        <h3>Quan ly phu kien :</h3>
      {currentProducts && currentProducts.length !== 0 ? (
        <Table bordered hover className="table-product">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Count in stock</th>
              <th>Number review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts &&
              currentProducts.map((product, index) => (
                <Product key={product._id} product={product} index={index} />
              ))}
          </tbody>
        </Table>
      ) : <h3>Chua co san pham nao o muc nay !!!</h3>}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  infoAllProduct: state.productRead,
});

export default connect(mapStateToProps, { getAllProduct })(AccessoryPage);
