import React from "react";
import { Card } from "react-bootstrap";
import Rate from "../Rate/Rate";

function Review({ product }) {
  const { numReviews, review } = product;
  return (
    <div className="my-3">
      <h3>{numReviews !== 0 && `So luong danh gia :  ${numReviews}`}</h3>
      {review &&
        review.map((r) => (
          <Card key={r._id}>
            <Card.Body>
              <Card.Title>
                <i className="fa-solid fa-user"></i> <strong>{r.name && r.name}</strong>
              </Card.Title>
              {
                  r.rating && <Rate rating={r.rating} />
              }
              <Card.Text>{r.comment && r.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default Review;
