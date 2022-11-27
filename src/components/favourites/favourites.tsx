import React from 'react';
import './favourites.css'
import nothing from '../../assets/icon_nothing.png';
import yellowHeart from '../../assets/icon_favourite_Active.png';
import sunny_small from '../../assets/icon_mostly_sunny_small.png';
import back from '../../assets/back.png';
import favMobSearch from '../../assets/searchMobile.png';
import Modal from '../favModal/modal';
import { useNavigate } from "react-router-dom";
import { AddPlace } from '../../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Favourites = () => {
  const [modal, setModal] = useState(false);
  const [searchInputData, setSearchInputData] = useState('');  //to take input data from search bar
  const [fetchedData, setFetchedData] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [Searched, setSearched] = useState(false);

  const weather = useSelector((state: any) => state.weather);
  const recentSearchs = JSON.parse(localStorage.getItem("searchInputData") || "[]");
  const favouriteData = JSON.parse(localStorage.getItem("fav") || "[]");

  // const state = useSelector((state: any) => state.weather.place) // for the data to get from header page

  // const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${searchInputData}&format=json&u=f`;

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'c9a70d85a1msh9fdedff4ba07dd2p137352jsnf5a31b7bf63f',
  //     'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  //   }
  // };

  // useEffect(() => {
  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(json => setFetchedData(json))
  //     .catch(err => console.error('error:' + err));
  // }, [searchInputData])

  // useEffect(() => {
  //   Searched && dispatch(AddPlace(fetchedData));
  // }, [fetchedData]);

  useEffect(() => {
    Searched && navigate("/");
  }, [weather]);


  // useEffect(() => {  // useEffect for the data to get from header page
  //   console.log(state);
  // }, [state]);

  const removeItem = (location: any) => {
    const favourites = JSON.parse(localStorage.getItem("fav") || "[]");
    console.log("woeid", favourites);
    let remId = -1;
    for (let i = 0; i < favourites.length; i++) {
      console.log("id", favourites[i].location.woeid, location.location.woeid);
      if (favourites[i].location.woeid === location.location.woeid) {
        remId = i;
      }
    }
    console.log("remId", remId);
    favourites.splice(remId, 1);
    console.log("new remId", favourites);
    localStorage.setItem("fav", JSON.stringify(favourites));
    window.location.reload();
  };


  return (
    <div className="fav-mobile-page">
      <div className="fav-mob-page">
        <div className="fav-div">
          <div className='fav-back'><img src={back} alt="" onClick={() => navigate("/")} /></div>
          <div className="fav-input"><span>Favourite</span></div>
        </div>
        <div className="fav-search"><img src={favMobSearch} alt="" /></div>
      </div>
      <div>
        {JSON.stringify(favouriteData) === "[]" ? (
          <div className='favourite-part'>
            <div className="nothing-center-part">
              <img src={nothing} alt="" />
            </div>
            <div className="nothing-added">No Favourites added</div>
          </div>) : (
          <div className='now'>
            <div className="favourites-top-bar">
              <div className="add">{favouriteData.length} City added as favourite</div>
              <div className="remove" onClick={() => { setModal(true); }}>Remove All</div>
              {modal && <Modal setModal={setModal} />}
            </div>
            <div className='favourites-table'>

              <div className='fav-table-inner'>
                <div className='table-div'>
                  {favouriteData.map((favPlace: any, i: any) => {
                    let weatherImg = "";
                    switch (favPlace && favPlace.current_observation && favPlace.current_observation.condition.text) {
                      case "Haze":
                        weatherImg = "icon_mostly_sunny_small.png";
                        break;
                      case "Mostly Sunny":
                        weatherImg = "icon_mostly_sunny_small.png";
                        break;
                      case "Sunny":
                        weatherImg = "icon_mostly_sunny_small.png";
                        break;
                      case "Clear":
                        weatherImg = "icon_mostly_sunny_small.png";
                        break;

                      case "Cloudy":
                        weatherImg = "icon_mostly_cloudy_small.png";
                        break;
                      case "Partly Cloudy":
                        weatherImg = "icon_partly_cloudy_small.png";
                        break;
                      case "Mostly Cloudy":
                        weatherImg = "icon_mostly_cloudy_small.png";
                        break;

                      case "Thunderstorms":
                        weatherImg = "icon_thunderstorm_small.png";
                        break;

                      case "Rainy":
                        weatherImg = "icon_rain_small.png";
                        break;
                      case "Sleet":
                        weatherImg = "icon_rain_small.png";
                        break;
                      case " Showers":
                        weatherImg = "icon_rain_small.png";
                        break;
                      default:
                        weatherImg = "icon_rain_small.png";
                        break;
                    }
                    const favHandler = () => {
                      setSearch(favPlace.location.city);
                      setSearched(true);
                    };
                    return (
                      <div className="table-content" key={i} onClick={() => { favHandler(); }}>
                        {/* <div className='mob-res'> */}
                        <div className="city">{favPlace.location.city}, {favPlace.location.country}</div>
                        <div className="table-middle-content">
                          <div className="weather-img"><img src={require(`../../assets/${weatherImg}`)} alt="" /></div>
                          <div className="degree-temp city">{favPlace.current_observation.condition.temperature} <span>&#8451;</span></div>
                          <div className='type-of-weather city'>{favPlace.current_observation.condition.text}</div>
                        </div>
                        {/* </div> */}
                        <div className="yellow-heart"><img src={yellowHeart} alt="" onClick={() => removeItem(favPlace)} /></div>
                      </div>);
                  })}
                </div>
              </div>
            </div>
          </div>
        )}



      </div>

    </div>
  )
}

export default Favourites;
