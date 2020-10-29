import React from 'react';
function Home() {
const calendarBody = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    height: "65vh",
    width: "97.5vw",
    margin: "auto",
    boxShadow: "inset 0px 0px 0px 2px green"
  };
  const calendarDiv = {
    border: "0px solid green",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    height: "97.5%",
    width: "calc(100%/7.5)",
    margin: "0.475%",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const taskDiv = {
    position: "fixed",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    top: "66.5vh",
    height: "32.5vh",
    width: "77.5vw",
    float: "left",
    boxShadow: "inset 0px 0px 0px 2px green"
  }
  const plantDiv = {
    position: "fixed",
    top: "66.5vh",
    left: "78.25vw",
    borderRadius: "1vh",
    backgroundColor: "#CBFEC0",
    height: "32.5vh",
    width: "20vw",
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
