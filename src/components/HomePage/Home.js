import React from 'react';
import Plant from '../Plant.js'

function Home() {
const calendarBody = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    top: "10.75vh",
    left: "1vw",
    right: "1vw",
    bottom: "35.5vh",
    boxShadow: "inset 0px 0px 0px 2px green"
  };
  const calendarDiv = {
    border: "0px solid green",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    height: "97.5%",
    marginTop: "0.4%",
    width: "calc(100%/7.275)",
    marginLeft: "0.475%",
    float: "left",
    textAlign: "center",
    fontSize: "100%",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const taskDiv = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    top: "65.5vh",
    bottom: "1.5vh",
    left: "1vw",
    right: "25vw",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const plantDiv = {
    position: "fixed",
    top: "65.5vh",
    bottom: "1.5vh",
    left: "75.75vw",
    right: "1vw",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  return (
    <div className="App">
      <div style={calendarBody}>
        <div style={calendarDiv}>Monday</div>
        <div style={calendarDiv}>Tuesday</div>
        <div style={calendarDiv}>Wednesday</div>
        <div style={calendarDiv}>Thursday</div>
        <div style={calendarDiv}>Friday</div>
        <div style={calendarDiv}>Saturday</div>
        <div style={calendarDiv}>Sunday</div>
      </div>
      <div style={taskDiv}>Important Tasks here</div>
      <div style={plantDiv}><Plant/></div>
    </div>
  );
};
export default Home;
