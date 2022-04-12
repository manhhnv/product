import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';

import './ButtonGroup.scss';
import {addProductToCart}  from '../../../action/cartAction';

function ButtonGroup ({product,addProductToCart}) {
    const [isShow, setIsShow] = useState(false);

    const handleAddProductToCart = () => {
        addProductToCart(product);
        setIsShow(true);
    }
    return (
        <>
           <Button className='add-cart' onClick={() => handleAddProductToCart()}>Them vao ro hang</Button>
           <div className='btn-wapper'>
               <Button>Mua tra gop lai xuat 0%</Button>
               <Button>Mua tra tra gop qua the</Button>
           </div>
           {
               isShow &&
            <Toast show={isShow} className='success-toast' delay={3000} autohide bg='success' onClose={() => setIsShow(false)}> 
                <Toast.Body >Them vao gio hang thanh cong</Toast.Body>
           </Toast>
           }
        </>
    );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps,{addProductToCart})(ButtonGroup);
