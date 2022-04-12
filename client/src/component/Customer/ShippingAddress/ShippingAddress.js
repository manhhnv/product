import React from 'react';

import './ShippingAddress.scss';

function ShippingAddress ({form}) {

    return (
        <div className='shipping-address'>
            <div>Dia chi : {form.address}</div>
            <div>Tinh/thanh pho : {form.city}</div>
            <div>Quoc gia : {form.country}</div>
        </div>
    );
}

export default ShippingAddress;
