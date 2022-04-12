import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import './Layout.scss';

function Layout({infoLogin, infoAuth}) {
    const {paramId} = useParams();
    const navigator = useNavigate();


    useEffect(() => {
        if(!paramId || paramId !== 'register') navigator('./login');
        
    }, [paramId]);

    const {authLoading , user } = infoAuth;


    useEffect(() => {
        
        if(!authLoading && user.isAdmin) {
            navigator('../admin/users');
        }else if(!authLoading  && user.username && !user.isAdmin) {
            navigator('../customer');
        }
        
    }, [user]);


    let body;

    if(authLoading) {
        body = (
            <Spinner animation="border"  variant="danger" className='m-3 text-center'/>
        )
    }else{
        body = paramId === 'register' ?  <Register/> : <Login/> ;
    }

    
     return ( 
        <div className="layout-container">
            <div className="layout-left">
                 <h2>HiShop Xin Chào :)</h2>
                <span>Nơi mua sắm thả ga, Trả góp lãi xuất 0%.</span>
            </div>
           <div className="layout-right">
                {body}
           </div>
        </div>
     );
};

const mapStateToProps = (state) => ({
    infoLogin : state.userLogin,
    infoAuth : state.userAuth,
})

export default connect(mapStateToProps, { })(Layout);