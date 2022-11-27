import React from 'react';
import { useState, useEffect } from 'react';
import './tab.css';
// import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Favourites from '../favourites/favourites';
import RecentSearch from '../recentSearch/recentSearch';
// import addFavs from '../../assets/icon_favourite.png';
// import sunny from '../../assets/icon_mostly_sunny.png';
import HomePart from '../homePart/homePart';

const Tab = () => {

    const [value, onChange] = useState("");
    const [time, onChangeTime] = useState("");

    const date = new Date();

    setInterval(function () {
        today();
    }, 1000);

    setInterval(function () {
        todayTime();
    }, 1000);


    const today = () => {
        onChange(
            `${date.toLocaleString("en-us", {
                weekday: "short",
            })} ${date.getDate()}, ${date.toLocaleString("en-us", {
                month: "short",
            })} ${date.getFullYear()} `
        );
    };

    const todayTime = () => {
        onChangeTime(
            ` ${date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                // second: "numeric",
                hour12: true,
            })}`
        );
    };


    return (
        <div className='tab-container'>
            <div className='tabs-div'>
                <div className="tabs">
                    <div><NavLink to='/'>HOME</NavLink></div>
                    <div><NavLink to='/fav'>FAVOURITE</NavLink></div>
                    <div><NavLink to='/recentSearch'>RECENT SEARCH</NavLink></div>
                </div>
                <div className="date-div">
                    <div>{value}&nbsp;&nbsp;{time}</div>
                </div>
            </div>

            {/* <div className="mid-part">
                <div className="city-name">Udupi, Karnataka</div>
                <div className="add-fav">
                    <img src={addFavs} alt="" /><span className='add-to-fav'>Add to favourite</span>
                </div>
            </div>

            <div className="middle-sun-part">
                <div className="sum-img"><img src={sunny} alt="" /></div>
                <div className="temperature">87</div>
                <div className="mostly-sunny">Mostly Sunny</div>
            </div> */}

            <Routes>
                <Route path="/" element={<HomePart />} />
                <Route path="/fav" element={<Favourites />} />
                <Route path="/recentSearch" element={<RecentSearch />} />
            </Routes>

        </div>
    )
}

export default Tab;
