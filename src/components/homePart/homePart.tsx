import React, { useEffect } from 'react';
import addFavs from '../../assets/icon_favourite.png';
import addFavsActive from '../../assets/icon_favourite_Active.png';
import Footer from '../footer/footer';
import { useState } from 'react';
import Switch from "react-switch";
import './homePart.css';
import { useSelector, useDispatch } from 'react-redux';
import { AddFovourites } from '../../redux/weatherSlice';

const HomePart = (props: any) => {
  const [fav, setFav] = useState(false);
  const [favActive, setFavActive] = useState(false);
  const [checked, setChecked] = useState(false);  //for time
  const dispatch = useDispatch()

  const handleChange = () => {  //to handle the change of time
    setChecked(!checked);
  };

  const state = useSelector((state: any) => state.weather.place) // for the data to get from header page

  useEffect(() => {  // useEffect for the data to get from header page
    console.log(state);
  }, [state])

  const previousData = JSON.parse(localStorage.getItem("fav") || "[]");

  useEffect(() => {
    for (let i = 0; i < previousData.length; i++) {
      if (
        (previousData[i] &&
          previousData[i].location &&
          previousData[i].location.woeid) ===
        (state && state.location && state.location.woeid)
      ) {
        setFav(true);
        break;
      } else {
        setFav(false);
      }
    }
  });

  const addFav = () => {
    const arr: any[] = [];
    previousData.map((user: any, i: number) => {
      if (user.location.woeid === state && state.location.woeid) {
        arr.push("exists");
      }
    });
    if (arr.includes("exists")) {
      alert("already exists");
    } else {
      if (state !== "" && state.message !== "Internal Server Error") {
        previousData.push(state);
        localStorage.setItem("fav", JSON.stringify(previousData));
        setFavActive(!favActive);
      } else {
        alert("Enter correct Data");
      }
    }
  };


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

  let weatherImg = "";
  switch (state && state.current_observation && state.current_observation.condition.text) {
    case "Haze":
      weatherImg = "icon_mostly_sunny.png";
      break;
    case "Mostly Sunny":
      weatherImg = "icon_mostly_sunny.png";
      break;
    case "Sunny":
      weatherImg = "icon_mostly_sunny.png";
      break;
    case "Clear":
      weatherImg = "icon_mostly_sunny.png";
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

  const removeFav = () => {
    dispatch(AddFovourites(state));
    setFavActive(!favActive);
  };

  return (
    <div className='home-part'>
      <div className="mid-part">
        <div className="mobile-date-div">
          <div className='mob-date'>{value}&nbsp;&nbsp;{time}</div>
        </div>
        <div className="city-name">{state && state.location && state.location.city}, {state && state.location && state.location.country}</div>
        {!fav ? (
          <div className="add-fav" onClick={() => { addFav(); }}>
            <img className='fav-img' src={addFavs} alt="" /><span className='add-to-fav'>Add to favourite</span>
          </div>) :
          (<div className="add-fav" onClick={() => removeItem(state)}>
            <img className='fav-img' src={addFavsActive} alt="" /><span className='add-to-fav-active'>Add to favourite</span>
          </div>)}
      </div>

      <div className="middle-sun-part">
        <div className="sum-img"><img src={require(`../../assets/${weatherImg}`)} className='weather-icon' alt="" /></div>
        <div className="temperature-div">
          <div className='temperature-degree'>
            {checked
              ? state && state.current_observation && state.current_observation.condition.temperature
              : (
                (state && state.current_observation && state.current_observation.condition.temperature - 32) * (5 / 9)
              ).toFixed(0)}{" "}
          </div>
          <div className="switch-temperature">
            <Switch
              borderRadius={4}
              onChange={handleChange}
              checked={checked}
              className="react-switch"
              offColor="#ffffff"
              onColor="#ffffff"
              uncheckedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 18,
                    color: "red",
                  }}
                >
                  {"\u00B0"}C
                </div>
              }
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 18,
                    paddingRight: 2,
                    color: "white",
                    zIndex: "2",
                  }}
                >
                  {"\u00B0"}F
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 18,
                    paddingRight: 2,
                    color: "white",
                  }}
                >
                  {"\u00B0"}C
                </div>
              }
              checkedHandleIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: "red",
                    fontSize: 18,
                  }}
                >
                  {"\u00B0"}F
                </div>
              }
            />
          </div>
        </div>
        <div className="mostly-sunny">{state && state.current_observation && state.current_observation.condition.text}</div>
      </div>

      <Footer />

    </div>
  )
}

export default HomePart;
