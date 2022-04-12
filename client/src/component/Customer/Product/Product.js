import React from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import "./product.scss";
import { activeGlobal } from "../../../action/GlobalAction";
import Rate from "../Rate/Rate";

function Product({ product, activeGlobal }) {
  const local = useLocation();

  return (
    <Col>
      <Link
        to={local.pathname === '/customer' ?`./detail/${product._id}` : `./../detail/${product._id}`}
        onClick={() => activeGlobal(product.category)}
      >
        <Card>
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${product.image}`}
          />
          <Card.Body>
            <Card.Title>{product.name} </Card.Title>
            <Card.Text>
              Gia : <strong>{product.price} d</strong>
            </Card.Text>
            {product && <Rate rating={product.rating} />}
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { activeGlobal })(Product);
