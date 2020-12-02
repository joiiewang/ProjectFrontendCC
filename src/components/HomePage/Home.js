import React, {useState} from "react";
import Plant from "./HomePlant.js";
import "../css/Home.css";

class Home extends React.Component {
  constructor() {
    super ();
    this.state = {
      toDos: [],
      weekTasks: [],
    }

    this.getWeekTasks = this.getWeekTasks.bind(this)
    this.NewLine = this.NewLine.bind(this)
  }

  componentDidMount () {
    let currentComponent = this;

    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }

    const url = (`${server}/api/v2/users/${username}/todos/`)

    fetch(url, {
      method: 'get',
      headers: new Headers({
      	'Authorization': 'Basic '+btoa(username+":"+password),
	    'Content-Type': 'application/json'
      })
    }).then(function(response){
      if(!response.ok) {
	throw new Error("HTTP status "+response.status)
      }
      return response.json();
    }).then(data => this.setState({
      toDos: data
    })).catch(error => alert(error));
  }

  getWeekTasks() {

    var weekArray = []
    this.state.toDos.map ((toDo) => {
      var dateArray = toDo.dueDate.split("-")
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1
      var currentDay = currentDate.getDate()

      var dateMonth = Number (dateArray[1])
      var dateDay = Number (dateArray[2])

      if (toDo.completed == false) {
        if (dateMonth == currentMonth) {
          if (dateDay == currentDay) {
            weekArray.push(toDo.text)
          }
        }
      }

    })
    this.state.weekTasks = weekArray
  }

  NewLine() {
    return (

    this.state.weekTasks.map((item) => (
      <div>
        {item}
      </div>
    ))
    )
  }

  render () {
    this.getWeekTasks();
    console.log("WeekTasks " + this.state.weekTasks)
    return (
      <div className="App">
        <div className="calendarBody">
          <CalGrid />
        </div>
        <div className="taskDiv">
          <br/>
          Today's Tasks: 
          <p> ---------------- </p>
          <this.NewLine/>
        </div>
        <div className="plantDiv">
          <Plant />
        </div>
      </div>
    );
  }
}


class CalGrid extends React.Component {
  constructor() {
    super()
    this.state = {
      detailToggle: 0,
      detailLoc: [0, 0],
      detailFill: 0,
      month: "",
      toDos: [],
      monthArray: [],
      tasksArray: [],
    }
    this.toggleDetail = this.toggleDetail.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mapTasks = this.mapTasks.bind(this)
    this.createCal = this.createCal.bind(this)
  }

  toggleDetail = (e, toggle, i, j, fill) => {
    this.setState({detailToggle: toggle});
    this.setState({detailLoc: [i, j]});
    this.setState({detailFill: fill});
  };

  // fetch that gets ToDos
  componentDidMount () {
    let currentComponent = this;

    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }


    const url = (`${server}/api/v2/users/${username}/todos/`)

    fetch(url, {
      method: 'get',
      headers: new Headers({
      	'Authorization': 'Basic '+btoa(username+":"+password),
	    'Content-Type': 'application/json'
      })
    }).then(function(response){
      if(!response.ok) {
	throw new Error("HTTP status "+response.status)
      }
      return response.json();
    }).then(data => this.setState({
      toDos: data
    })).catch(error => alert(error));
  }

  mapTasks() {
    var mapTaskArray = new Array (31)
    this.state.toDos.map ((toDo) => {
      var dateArray = toDo.dueDate.split("-")
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1
      
      if (toDo.completed == false) {
        var dateMonth = Number (dateArray[1])
        if (dateMonth == currentMonth) {
          var dayInt = Number (dateArray[2]) -1
            if (mapTaskArray [dayInt]) {
            mapTaskArray [dayInt] += "~!~" + toDo.text
          }
          else {
            mapTaskArray [dayInt] = toDo.text
          }
      }}}
    )
    this.state.tasksArray = mapTaskArray
  }

  NewLine(props) {
    let text = props.text
    const newText = text.split("\n").map(str => <p>{str}</p>);
    return newText
  }


   Detail() {

    let tasksArrayNumber = this.state.detailLoc[0]*7 -7 + this.state.detailLoc[1]
    let todayTasksString = "You have no tasks today"
    if (this.state.tasksArray[tasksArrayNumber] != null) {
      let todayTasks = this.state.tasksArray[tasksArrayNumber].split("~!~")
      todayTasksString = ""
      todayTasks.map ((task) => (
        todayTasksString += task + "\n"
      ))
    }  
    
  
    const fillStyle = {
      height: this.state.detailFill + "%",
      bottom: "0%",
    }
    
    const weekScale = 1/7;
    const displacement = [(this.state.detailLoc[0]-3)*93+10, (this.state.detailLoc[1]-3)*weekScale*700]
    const detailTransform = "scale(1)";
    const hiddenTransform = "scale("+weekScale+", 0.2) translate("+displacement[1]+"%,"+(displacement[0])+"%)";
    const detailStyle = {
      borderRadius: this.state.detailToggle ? "1vh" : "5vh",
      opacity: this.state.detailToggle,
      zIndex: this.state.detailToggle ? "100" : "-2",
      transform: this.state.detailToggle ? "scale(1)" : hiddenTransform,
    }
  
    return (
      <div className="detail" style={detailStyle}>
        <h1>
          Today's Tasks:
          </h1>
          <this.NewLine text = {todayTasksString}/>
        <div className="detailFill" style={fillStyle}>
        </div>
      </div>
    );
  }
 

  createCal () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

    const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const d = new Date();
    this.state.month = monthNames[d.getMonth()]
    


    var today = new Date();
    var offset = (today.getDate() % 7) - ((today.getDay() + 1) % 7); // used to determine where the 1st day of the month is
    var daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    
    var monthArr = new Array(6);  // Array used to store trs of days for rendering
    let fill = 0;
    
    for (let i = 0; i < monthArr.length; i++) {
      const weekArr = new Array(7);
      for (let j = 0; j < weekArr.length; j++) {
	if (i==0) {
	  weekArr[j] = (<th key={i*7+j} className="weekDayDiv"> {weekNames[j]} </th>);
	  continue;
	}
        var day = i * 7 + j + offset + 1 -7;
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
          backgroundColor = { background: "#d2e0c1" };
        }

          fill = this.state.tasksArray[day-1]
          if (fill != null) {
            fill = fill.split("~!~").length * 10
          }
	

        //fill = Math.floor(Math.random() * 10) * 10;
        const fillStyle = {
          height: fill + "%",
          bottom: "0%",
        };

        weekArr[j] = (
	  <td key={i*7+j} style={backgroundColor} 
		onClick={(e) => this.toggleDetail(e, 1, i, j, fill)} 
		onMouseEnter={(e) => this.toggleDetail(e, 0, i, j, fill)}>
            {day}
	    <div className="taskFill" style={fillStyle} />
          </td>
        );
      }
      monthArr[i] = <tr key={i}>{weekArr}</tr>;

      this.state.monthArray = monthArr
      
    }
  }



  render() {

    this.mapTasks()
    this.createCal()
    

    return (
      <div style={{height: "100%", width: "100%"}}>
	  <h className="monthHeader">{this.state.month}</h>
          <table className="mainCalender">
            
            <tbody>{this.state.monthArray}</tbody>
          </table>
          <div onClick={(e) => this.toggleDetail(e, 0, this.state.detailLoc[0], this.state.detailLoc[1], 0)}>
              {this.Detail()}
            </div>
        
      </div>
    );
  }
}


export default Home;

