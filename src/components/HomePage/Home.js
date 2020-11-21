import React, {useState} from "react";
import Plant from "./HomePlant.js";
import "../css/Home.css";

function Home() {
  return (
    <div className="App">
      <div className="calendarBody">
        <CalGrid />
      </div>
      <div className="taskDiv">Important Tasks here</div>
      <div className="plantDiv">
        <Plant />
      </div>
    </div>
  );
}

class CalGrid extends React.Component {
  state = {
    detailToggle: 0,
    detailLoc: [0, 0],
    detailFill: 0,
  };
  updateDetail = (e, toggle, i, j, fill) => {
    this.setState({detailToggle: toggle});
    this.setState({detailLoc: [i, j]});
    this.setState({detailFill: fill})
  };
  render() {
    const sampleTasks = ["sample task 1", "sample task 2", "sample taks 3"];

    var today = new Date();
    var offset = (today.getDate() % 7) - ((today.getDay() + 1) % 7);
    var daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    var monthArr = new Array(5);
    var fill = 0;

    for (let i = 0; i < monthArr.length; i++) {
      const weekArr = new Array(7);
      for (let j = 0; j < weekArr.length; j++) {
        var day = i * 7 + j - offset + 1;
        var backgroundColor = { background: "#eaffdb" };
        if (day < 1) {
          var daysInLastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          ).getDate();
          day = daysInLastMonth + day;
          backgroundColor = { background: "#d2e0c1" };
        } else if (day > daysInMonth) {
	  day = day % (daysInMonth + 1) + 1;
          backgroundColor = { background: "#ffffff" };
        }

        fill = Math.floor(Math.random() * 10) * 10;
        const fillStyle = {
          height: fill + "%",
          bottom: "0%",
        };

        weekArr[j] = (
	  <td key={i*7+j} style={backgroundColor} 
		onClick={(e) => this.updateDetail(e, 1, i, j, fill)} 
		onMouseEnter={(e) => this.updateDetail(e, 0, i, j, fill)}>
            {day}
	    <div className="taskFill" style={fillStyle} />
          </td>
        );
      }
      monthArr[i] = <tr key={i}>{weekArr}</tr>;
    }

    return (
      <div style={{height: "100%", width: "100%"}}>
        <table className="mainCalender">
          <tbody>{monthArr}</tbody>
        </table>
	<Detail fill={this.state.detailFill} detailToggle={this.state.detailToggle} detailLoc={this.state.detailLoc}> </Detail>
      </div>
    );
  }
}


function Detail(props) {
  const fillStyle = {
    height: props.fill + "%",
    bottom: "0%",
  }
  
  const weekScale = 1/7;
  const displacement = [(props.detailLoc[0]-2)*100, (props.detailLoc[1]-3)*weekScale*700]
  const detailTransform = "scale(1)";
  const hiddenTransform = "scale("+weekScale+", 0.2) translate("+displacement[1]+"%,"+displacement[0]+"%)";
  const detailStyle = {
    opacity: props.detailToggle,
    zIndex: props.detailToggle ? "10" : "-10",
    transform: props.detailToggle ? "scale(1)" : hiddenTransform,
    transition: "opacity .25s, transform .5s",
  }

  return (
    <div className="detail" style={detailStyle} onClick={() => props.detailToggle=0}>
      <div className="detailFill" style={fillStyle} />
    </div>
  );
}

export default Home;
