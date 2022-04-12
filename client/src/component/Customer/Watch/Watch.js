import React from 'react';
import { Container } from 'react-bootstrap';
import HotProducts from '../HotProduct/HotProducts';

function Watch () {
    return (
        <Container>
            <h1>This is a watch customer page</h1>
            <HotProducts keyword={'watch'}/>
        </Container>
    );
}

export default Watch;
