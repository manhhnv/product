import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';


function DetailProduct  () {

    const {product : {category}} = useSelector(state => state.productGetById)
    
    return (
        <Container className='my-3'>
            <Link to={`./../${category}`} ><Button variant='success' className='my-3'><i className="fa-solid fa-angle-left mx-1"></i> Quay lai </Button> </Link>
            <Outlet/>
              
        </Container>
    );
};

export default (DetailProduct);
