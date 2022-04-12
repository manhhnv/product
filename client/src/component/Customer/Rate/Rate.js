import React from 'react';

import './Rating.scss';

function Rate ({rating}) {
    let rate;

    if(rating === 0 || rating < 1 ){
        rate = (
            <div>
                <i className="fa-solid fa-star-half-stroke yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating === 1 || rating < 1.5) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 2) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star-half-stroke yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 2.5) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 3) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star-half-stroke yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if( rating < 3.5) {
        rate = (
            <div> 
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 4) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star-half-stroke yellow"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 4.5) {
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow" ></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        )
    }else if(rating < 5){
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow" ></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star-half-stroke yellow"></i>
            </div>
        )
    }else if(rating === 5){
        rate = (
            <div>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow" ></i>
                <i className="fa-solid fa-star yellow"></i>
                <i className="fa-solid fa-star yellow"></i>
            </div>
        )
    };

    return (rate);
}

export default Rate;
