import React from "react";
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
        var backgroundColor = { background: "#CBFEC0" };
        if (day < 1) {
          var daysInLastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          ).getDate();
          day = daysInLastMonth + day;
          backgroundColor = { background: "#A6CF9D" };
        } else if (day > daysInMonth) {
	  day = day % (daysInMonth + 1) + 1;
          backgroundColor = { background: "#A6CF9D" };
        }

        var fill = Math.floor(Math.random() * 10) * 10;
        const fillStyle = {
          height: fill + "%",
          bottom: "0%",
        };

        weekArr[j] = (
          <td key={i * 7 + j} style={backgroundColor} onClick={console.log("halp")}>
            {day}
            <div className="taskFill" style={fillStyle} />
          </td>
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

class DailyDiv extends React.Component {
  render() {
    const sampleTasks = ["sample task 1", "sample task 2", "sample taks 3"];
    const tasks = [];
    for (const task of sampleTasks) {
      console.log(task);
      tasks.push(<DailyTask name={task} />);
    }

    return (
      <div className="calendarDiv">
        <div className="dailyTitle">{this.props.date}</div>
        <div>{tasks}</div>
      </div>
    );
  }
}

class DailyTask extends React.Component {
  render() {
    return <div className="task">{this.props.name}</div>;
  }
}

export default Home;
