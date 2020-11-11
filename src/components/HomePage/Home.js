import React from "react";
import Plant from "./HomePlant.js";
import "../css/Home.css";

function Home() {
  return (
    <div className="App">
      <div className="calendarBody">
        <DailyDiv />
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

    const monthArr = new Array(4);

    for (let i = 0; i < monthArr.length; i++) {
      for (let j = 0; j < monthArr[0].length; j++) {
        monthArr[i].push(<th />);
      }
    }

    return <table>{monthArr}</table>;
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
