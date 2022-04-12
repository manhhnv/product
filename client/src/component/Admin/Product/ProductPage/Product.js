import React, { memo, useState } from 'react';
import {Button} from 'react-bootstrap';


import productStyle from './product.module.css';
import Deletemodal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import { URL } from '../../../../contants/GlobalContains';

function Product  ({product, index}) {

    const [isShowEditModal, setisShowEditModal] = useState(false);
    const [isShowDeleteModal, setisShowDeleteModal] = useState(false);

    const handleToggleShowEditModal = () => {
        setisShowEditModal(!isShowEditModal);
    };

    const handleToggleShowDeleteModal = () => {
        setisShowDeleteModal(!isShowDeleteModal);
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <img src={`${URL}/${product.image}`} alt='anh san pham' className={productStyle.img_product} />
            </td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.countInStock}</td>
            <td>{product.numReviews}</td>
            <td className={productStyle.actions}>
                <Button variant='success' className='m-3' onClick={() => handleToggleShowEditModal()}>Edit</Button>
                <Button variant='danger' className='m-3' onClick={() => handleToggleShowDeleteModal()}>Delete</Button>
            </td>
            {
                isShowEditModal && <EditModal isShow={isShowEditModal} onClose={handleToggleShowEditModal} product={product}/>
            }
            {
                isShowDeleteModal && <Deletemodal isShow={isShowDeleteModal} onClose={handleToggleShowDeleteModal} product={product}/>
            }
        </tr>
    );
};


export default memo(Product);
