import React from 'react';
import './recentSearch.css';
import nothing from '../../assets/icon_nothing.png';
import back from '../../assets/back.png';
import yellowHeart from '../../assets/icon_favourite_Active.png';
import favMobSearch from '../../assets/searchMobile.png';
import RecentModal from '../recentModal/recentModal';
import { useNavigate } from "react-router-dom";
import { AddPlace } from '../../redux/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const RecentSearch = () => {
  const [searchInputData, setSearchInputData] = useState('');  //to take input data from search bar
  const [fetchedData, setFetchedData] = useState('');
  const [Searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const [recentModal, setRecentModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const weather = useSelector((state: any) => state.weather);

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

  const recentSearchs = JSON.parse(localStorage.getItem("searchInputData") || "[]");

  return (
    <div className="recentSearch-page">
      <div className="fav-mob-page">
        <div className="fav-div">
          <div className='fav-back'><img src={back} alt="" onClick={() => navigate("/")} /></div>
          <div className="fav-input"><span>Recent Search</span></div>
        </div>
        <div className="fav-search"><img src={favMobSearch} alt="" /></div>
      </div>

      <div>
        {JSON.stringify(recentSearchs) === "[]" ? (
          <div className='recent-search-part'>
            <div className="nothing-center-part">
              <img src={nothing} alt="" />
            </div>
            <div className="nothing-added">No Recent Search</div>
          </div>
        ) : (
          <div className='favourites-table'>

            <div className="favourites-top-bar">
              <div className="add">You recently searched for</div>
              <div className="remove" onClick={() => { setRecentModal(true); }}>Clear All</div>
              {recentModal && <RecentModal setModal={setRecentModal} />}
            </div>

            <div className='table-div'>
              {recentSearchs.map((searchData: any, i: any) => {
                let weatherImg = "";
                switch (searchData && searchData.current_observation && searchData.current_observation.condition.text) {
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
                  setSearch(searchData.location.city);
                  setSearched(true);
                };

                const favourites = JSON.parse(
                  localStorage.getItem("fav") || "[]"
                );

                let fav = false;
                for (let i = 0; i < favourites.length; i++) {
                  if (
                    (favourites[i] &&
                      favourites[i].location &&
                      favourites[i].location.woeid) ===
                    (searchData &&
                      searchData.location &&
                      searchData.location.woeid)
                  ) {
                    fav = true;
                  }
                }

                return (
                  <div className="table-content" key={i} onClick={() => { favHandler(); }}>
                    <div className="city">{searchData && searchData.location && searchData.location.city}, {searchData && searchData.location && searchData.location.country}</div>
                    <div className="table-middle-content">
                      <div className="weather-img"><img src={require(`../../assets/${weatherImg}`)} alt="" /></div>
                      <div className="degree-temp city">{searchData && searchData.current_observation && searchData.current_observation.condition && searchData.current_observation.condition.temperature} <span>&#8451;</span></div>
                      <div className='type-of-weather city'>{searchData && searchData.current_observation && searchData.current_observation.condition && searchData.current_observation.condition.text}</div>
                    </div>
                    <div className="yellow-heart"><img className='heart' src={fav ? require("../../assets/icon_favourite_Active.png") : require("../../assets/icon_favourite.png")} alt="" /></div>
                  </div>);
              })}
            </div>
          </div>
        )};
      </div>

    </div>
  )
}

export default RecentSearch
