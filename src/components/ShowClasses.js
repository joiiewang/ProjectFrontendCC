import React from "react";

class ShowClasses extends React.Component {
  constructor() {
    super();
    this.state = {
      classes : []
    };

  }
  userName = "bob"
  url = ("https://project-backend-cc.herokuapp.com/api/v1/users/"+ this.userName +"/courses/")
  //url = ("http://localhost:8118/api/v1/users/"+ this.userName +"/courses/")

  componentDidMount () {
    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    fetch(this.url, {
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
          <a href= "/Course">
          {course.name}
          </a>
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
