import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {connect} from 'react-redux';

import {getProductById} from '../../../action/productAction';
import { Card, Spinner } from 'react-bootstrap';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Rate from '../Rate/Rate';
import './DetailItem.scss';
import Review from '../Review/Review';
import { URL } from '../../../contants/GlobalContains';

function DetailItem  ({infoGetProductById,getProductById}) {
    const {detailParams} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProductById(detailParams);
    }, []);

    const { getProductByIdLoading, product} = infoGetProductById;

    useEffect(() => {
        getProductByIdLoading && setIsLoading(false);
       
    }, [getProductByIdLoading]);


    let body ;

    if(isLoading) {
        body = (
            <Spinner animation='border'/>
        );
    }else{
        body = (
            <div className='detail-wapper'>  
                <div className='detail-left'>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                {product.name}
                            </Card.Title>
                        </Card.Header>
                        <Card.Img src={`${URL}/${product.image}`} alt='anh cua san pham' className='detail-img'/>
                        <Card.Body>
                            <Card.Text>Gia : <strong>{product.price}d</strong></Card.Text>
                            {
                                product.price &&
                                <Rate rating={product.rating}/>
                            }
                        </Card.Body>
                        <Card.Footer>
                            <Card.Title>
                                {product.description}
                            </Card.Title>
                        </Card.Footer>
                    </Card>
                </div>
                <div className='detail-right'>
                    <ButtonGroup product={product}/>
                    <Review product={product} className='detail-right-bottom'/>
                </div>
                
            </div>
        )
    }

    
    return (
        <div>
            {body}
        </div>
    );
};

const mapStateToProps = state => ({
    infoGetProductById : state.productGetById,
});

export default connect(mapStateToProps, {getProductById})(DetailItem);
