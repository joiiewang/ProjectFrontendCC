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

        var fill = Math.floor(Math.random() * 10) * 10;
        const fillStyle = {
          height: fill + "%",
          bottom: "0%",
        };

        weekArr[j] = (
	  <DailyTask key={i*7+j} bg={backgroundColor} day={day} fillStyle={fillStyle}/>
        );
      }
      monthArr[i] = <tr key={i}>{weekArr}</tr>;
    }

    return (
      <table className="mainCalender">
        <tbody>{monthArr}</tbody>
      </table>
    );
  }
}


class DailyTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enlarge: false
    }
  }
  render() {
    var st;
    if (this.state.enlarge) {
      st = {
	transform
      };
    } else {
      st = this.props.bg
    }
    
    console.log(st);

    return (
      <td key={this.props.key} style={st} onClick={()=>this.setState({enlarge: !this.state.enlarge})}>
        {this.props.day}
	<div className="taskFill" style={this.props.fillStyle} />
      </td>
    );
  }
}

export default Home;
