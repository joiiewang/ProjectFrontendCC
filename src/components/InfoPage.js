import React from "react";
import './css/InfoPage.css';

class InfoPage extends React.Component {
  
  constructor() {
    super() 

    this.componentDidMount = this.componentDidMount.bind(this)
  }

   componentDidMount () {
    let currentComponent = this;

    const username = sessionStorage.getItem('username')
    console.log("username" + username)
    const password = sessionStorage.getItem('password')
    
    // appears to be clearing session storage before this page loads 


    /*
    let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }


    const url = (`${server}/api/v2/users/${username}`)

    fetch(url, {
      method: 'get',
      headers: new Headers({
      	'Authorization': 'Basic '+btoa(username+":"+password),
	    'Content-Type': 'application/json'
      })
    })
    .then(function(response){
      if(!response.ok) {
	throw new Error("HTTP status "+response.status)
      }
      return response.json();
    }).catch(error => alert(error));
    */
    
    

  }
  
  render () {
    return (
      <div>
        <h1 className = "moveRight"> Info Page</h1>
      </div>
    )
  }
}
export default InfoPage;
