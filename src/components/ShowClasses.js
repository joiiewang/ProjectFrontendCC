import React from "react";
import { Link } from "react-router-dom";

class ShowClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      classes : []
    };

  }
  componentDidMount () {
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
      return response.json();
    }).then(data => this.setState({
      classes: data
    })).catch(error => alert(error));
  }

  mapClasses() {
    
    return (
      this.state.classes.map((course) => (
        <button>
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
    return (
      <div>
        <p>{this.mapClasses()}</p>
      </div>
    );
  }
}

export default ShowClasses;

/*
<a href= "/Course">
            {//need to pass className props here
            }
          {course.name}
          </a>
*/
