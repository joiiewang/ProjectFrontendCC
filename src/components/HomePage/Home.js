import React from 'react';
import Plant from '../Plant.js'
import '../css/Home.css'

function Home() {
  return (
    <div className="App">
      <div className = "calendarBody">
        <div className = "calendarDiv">Monday</div>
        <div className = "calendarDiv">Tuesday</div>
        <div className = "calendarDiv">Wednesday</div>
        <div className = "calendarDiv">Thursday</div>
        <div className = "calendarDiv">Friday</div>
        <div className = "calendarDiv">Saturday</div>
        <div className = "calendarDiv">Sunday</div>
      </div>
      <div className = "taskDiv">Important Tasks here</div>
      <div className = "plantDiv"><Plant/></div>
    </div>
  );
};
export default Home;
