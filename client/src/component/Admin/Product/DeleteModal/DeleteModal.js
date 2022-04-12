import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import {deleteProduct} from '../../../../action/productAction';

function Deletemodal  ({isShow, onClose, product,deleteProduct}) {

    const handleCloseModel = () => {
        onClose && onClose();
    };

    const handleDeleteProduct = () => {
        deleteProduct(product);
        handleCloseModel();
    }
    return (
        <Modal show={isShow} onHide={() => handleCloseModel()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Ban co muon xoa san pham <strong>{product.name}</strong> khong ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant='success' onClick={() => handleDeleteProduct()}>Ok</Button>
                <Button variant='danger' onClick={() => handleCloseModel()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps,{deleteProduct})(Deletemodal);
