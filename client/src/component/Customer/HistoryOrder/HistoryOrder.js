import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import './HistoryOrder.scss';
import HistoryOrderItem from '../HistoryOrderItem/HistoryOrderItem';

function HistoryOrder  ({infoOrderItems})  {

    const {isLoading, order} = infoOrderItems;
    return (
        <Container className='history-order'>
            {
                isLoading && <Spinner animation='border' className='history-oroder-spinner'/>
            }
            {
                order && order.orderItems.map(item => (
                    <HistoryOrderItem key={item._id} product={item}/>
                ))
            }
        </Container>
    );
};

const mapStateToProps = (state) => ({
    infoOrderItems: state.orderGetUser,
})

export default connect(mapStateToProps, {})(HistoryOrder);
