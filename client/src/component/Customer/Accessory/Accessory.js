import React from 'react';
import { Container } from 'react-bootstrap';
import HotProducts from '../HotProduct/HotProducts';

function Accessory () {
    return (
        <Container>
            <h1>This is accessory customer page</h1>
            <HotProducts keyword={'accessory'}/>
        </Container>
    );
}

export default Accessory;
