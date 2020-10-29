import React from 'react';
function Home() {
const calendarBody = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    top: "9.75vh",
    left: "0.25vw",
    right: "0.25vw",
    bottom: "35vh",
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
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const taskDiv = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    top: "65.5vh",
    bottom: "0.5vh",
    left: "0.25vw",
    right: "25vw",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const plantDiv = {
    position: "fixed",
    top: "65.5vh",
    bottom: "0.5vh",
    left: "75.25vw",
    right: "0.25vw",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  return (
    <div className="App">
      <div style={calendarBody}>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
        <div style={calendarDiv}></div>
      </div>
      <div style={taskDiv}></div>
      <div style={plantDiv}></div>
    </div>
  );
};
export default Home;
