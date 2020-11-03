import React from "react";
import Plant from "./HomePlant.js";
import "../css/Home.css";

function Home() {
  return (
    <div className="App">
      <div className="calendarBody">
        <DailyDiv date="Monday" />
        <DailyDiv date="Tuesday" />
        <DailyDiv date="Wednesday" />
        <DailyDiv date="Thursday" />
        <DailyDiv date="Friday" />
        <DailyDiv date="Saturday" />
        <DailyDiv date="Sunday" />
      </div>
      <div className="taskDiv">Important Tasks here</div>
      <div className="plantDiv">
        <Plant />
      </div>
    </div>
  );
}

class DailyDiv extends React.Component {
  render() {
    const tasks = ["sample task 1", "sample task 2", "sample taks 3"];
    for (const task in tasks) {
      tasks.push(<DailyTask name={task} />);
    }

    return (
      <div className="calendarDiv">
        <div className="dailyTitle">{this.props.date}</div>
        <div>{dailyTasks}</div>
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
