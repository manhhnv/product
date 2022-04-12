import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";

import { getProductHot } from "../../../action/productAction";
import Product from "../Product/Product";

function HotProducts({ infoGetHotProd, keyword, num, getProductHot }) {
  const { products } = infoGetHotProd;

  useEffect(() => {
     getProductHot(keyword, num);
  }, []);

  return (
    <div>

      <Row sx={1} sm={1} md={2} lg={3}>
        {products &&
          products.map((product) => (
            <Product product={product} key={product._id}/>
          ))}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  infoGetHotProd: state.productGetHot,
});

export default connect(mapStateToProps, { getProductHot })(HotProducts);
