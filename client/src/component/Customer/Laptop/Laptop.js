import React from 'react';
import { Container } from 'react-bootstrap';
import HotProducts from '../HotProduct/HotProducts';

function Laptop () {
    return (
        <Container>
            <h1>This is Laptop customer page</h1>
            <HotProducts keyword={'laptop'}/>
        </Container>
    );
}

export default Laptop;
