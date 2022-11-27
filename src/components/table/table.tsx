import React from 'react';
import './table.css';
import yellowHeart from '../../assets/icon_favourite_Active.png';
import sunny_small from '../../assets/icon_mostly_sunny_small.png';

const Table = () => {
    return (
        <div className='table-div'>
            <div className="table-content">
                <div className="city">Udupi, Karnataka</div>
                <div className="table-middle-content">
                    <div className="weather-img"><img src={sunny_small} alt="" /></div>
                    <div className="degree-temp city">31 <span>&#8451;</span></div>
                    <div className='type-of-weather city'>Mostly Sunny</div>
                </div>
                <div className="yellow-heart"><img src={yellowHeart} alt="" /></div>
            </div>

            {/* <div className="table-content">
            <div className="city">Udupi, Karnataka</div>
            <div className="table-middle-content">
            <div className="weather-img"><img src={sunny_small} alt="" /></div>
            <div className="degree-temp city">31 <span>&#8451;</span></div>
            <div className='type-of-weather city'>Mostly Sunny</div>
        </div>
            <div className="yellow-heart"><img src={yellowHeart} alt="" /></div>
        </div> */}



        </div>
    )
}

export default Table;
