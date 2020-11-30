import React from "react";
import { Link } from "react-router-dom";
import * as SVGLoaders from 'svg-loaders-react';
//import "./components/css/ShowClasses.css";

class ShowClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      classes : [],
      loaded: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);

  }
  async componentDidMount () {
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


    const url = (`${server}/api/v2/users/${username}/courses/`)

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
      else {
        currentComponent.setState({ 
          loaded: true
        });
      }

      return response.json();
    }).then(data => this.setState({
      classes: data
    })).catch(error => alert(error));
  }

  mapClasses() {
    
    return (
      this.state.classes.map((course) => (
        <button className = "classButton">
          {console.log(course)}
          <Link to = {{
            pathname: "/Course", 
            name: course.name,
            id: course.id
            }}>
              {course.name}</Link>
          </button>
      ))
    )
    
  }

  render() {
    if(!this.state.loaded){
      const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      return (
        <div style={style}>
          <SVGLoaders.Circles stroke="#6c319c" fill="#6c319c"/>
        </div>
      )
    }

    if (this.state.classes.length == 0) {
      return (
        <p>
          You do not have any classes yet! Add a class to see them here.
        </p>
      )
    }
    else {
      return (
        <div>
          <p>{this.mapClasses()}</p>
        </div>
      );
      }
  }
}

export default ShowClasses;


