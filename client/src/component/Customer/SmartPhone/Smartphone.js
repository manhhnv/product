import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import HotProducts from "../HotProduct/HotProducts";

function Smartphone() {
  return (
    <>
      <Container>
        <h1>This is smartphone customer page</h1>
        <HotProducts keyword={"smartphone"} />
      </Container>
      <Outlet />
    </>
  );
}

export default Smartphone;
