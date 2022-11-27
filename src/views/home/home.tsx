import React from 'react';
import "./home.css";
import Header from '../../components/header/header';
import Tab from '../../components/tabs/tab';
// import Footer from '../../components/footer/footer';

const Home = () => {
  return (
    <div>
      <div className="background-container">
        <Header />
        <Tab />
      </div>

    </div>
  )
}

export default Home;
