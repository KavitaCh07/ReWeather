import React from 'react';
import './App.css';
import Home from './views/home/home';
import '../src/styles.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
