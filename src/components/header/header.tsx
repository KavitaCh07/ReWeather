import React from 'react'
import './header.css';
import logo from '../../assets/logo.png';
import searchImg from '../../assets/icon_search_white.png';
import burgerMenu from '../../assets/icon_menu_white.png';
import mobSearch from '../../assets/icon_search_white.png';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import back from '../../assets/back.png';
// import HomePart from '../homePart/homePart';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { AddPlace } from '../../redux/weatherSlice';

const Header = () => {

  const [sidebar, setSidebar] = useState(false); //for opening side hamburger bar page
  const [searchPage, setSearchPage] = useState(false); // for opening searchbar page
  const [searchInputData, setSearchInputData] = useState('');  //to take input data from search bar
  const [fetchedData, setFetchedData] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const defaultPlace = "Udupi";
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${searchInputData}  &format=json&u=f`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c9a70d85a1msh9fdedff4ba07dd2p137352jsnf5a31b7bf63f',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => setFetchedData(json))
      .catch(err => console.error('error:' + err));
  }, [searchInputData])

  useEffect(() => {
    dispatch(AddPlace(fetchedData));
    recentSearchHandler();
  }, [fetchedData]);


  const searchData = JSON.parse(localStorage.getItem("searchInputData") || "[]");
  console.log("searchInputData ", searchData);

  if (searchData === undefined) {
    localStorage.setItem("search", "[]");
  }




  const arr: any[] = [];
  const recentSearchHandler = () => {
    if (JSON.stringify(fetchedData) !== "[]") {
      searchData.map((user: any, fetchedData: any) => {
        console.log(
          "fetchedData",
          (user && user.location && user.location.woeid) === (fetchedData && fetchedData.location && fetchedData.location.woeid)
        );

        if (
          (user && user.location && user.location.woeid) === (fetchedData && fetchedData.location && fetchedData.location.woeid)
        ) {
          arr.push("exists");
        }
      });

      if (arr.includes("exists")) {
        //alert("already exists");
      } else {
        if (searchInputData !== "") {
          fetchedData && searchData.push(fetchedData);
          localStorage.setItem("searchInputData", JSON.stringify(searchData));
        }// else {
        //   alert("Enter Valid cities");
        // }
      }
    } else {
    }
  };
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputData}&appid=b9a7b22ff1d3c701a8eb51c9e36548af`;


  const onSubmit = (event: any) => {
    event.preventDefault();
    // console.log(searchInputData);
    setSearchInputData(event.target.searchInputData.value);
    localStorage.setItem("searchTerm", JSON.stringify(searchInputData)); //this line is inserting the searchInputData as searchTerm in local storage
  };


  useEffect(() => {
    const searchItem = JSON.parse(localStorage.getItem("searchTerm") || "[]");
    setSearchInputData(searchItem);
  }, []);

  return (
    <div>
      <div className="header">
        {/* <div className="header-div"> */}
        <div className="logo-img"><img src={logo} alt="" /></div>
        <div className="search-bar">
          <form action="" onSubmit={onSubmit}>
            <input type="text" className='search-input' name='searchInputData' placeholder='Search city' id="" />
            <div className="search-icon"><img src={searchImg} alt="" /></div>
          </form>
          {/* </div> */}
        </div>
      </div>

      <div className="header-mobile">
        <div className="burger-logo">
          <div className="burger-menu"><img src={burgerMenu} alt="" onClick={() => setSidebar(true)} /></div>
          <div className="mob-logo"><img src={logo} alt="" /></div>
        </div>
        <div className="mob-search">
          <img src={mobSearch} alt="" onClick={() => setSearchPage(true)} />
        </div>
      </div>

      {sidebar ? (
        <div className="side-bar-container">
          <NavLink to='/' className='burgerLinks' onClick={() => setSidebar(false)}>Home</NavLink>
          <NavLink to='/fav' className='burgerLinks' onClick={() => setSidebar(false)}>Favourite</NavLink>
          <NavLink to='/recentSearch' className='burgerLinks' onClick={() => setSidebar(false)}>Recent Search</NavLink>
        </div>
      ) : ("")}

      {searchPage ? (
        <div className="search-page">
          <div className="mob-search-field">
            <div className="mob-search-icon">
              <img src={back} alt="" onClick={() => navigate("/")} />
            </div>
            <div className="mob-search-input-field">
              <input type="search" placeholder='Search for City' />
            </div>
          </div>
        </div>
      ) : ("")
      }



    </div>
  )
}

export default Header;
