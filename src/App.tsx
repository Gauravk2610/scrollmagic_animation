import React from 'react';
import logo from './logo.svg';
import './App.css';
import video from './assets/Apple.mp4'
import { Controller } from 'react-scrollmagic';
import { VideoScrollAnimator } from './components/VideoScrollAnimator';

function App() {  

  return (
    <Controller>
      <VideoScrollAnimator src={video}  />
      {/* <h1>HI</h1> */}
    </Controller>
  );
}

export default App;
