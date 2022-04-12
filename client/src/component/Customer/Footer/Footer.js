import React from "react";
import { Container } from "react-bootstrap";

import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container>
        <h1>This is my footer</h1>
        <div>
            <a href={'https://www.facebook.com/profile.php?id=100009483367777'} target='_blank'><i className="fa-brands fa-facebook"></i> <span>Nguyen Tuan Anh</span></a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
