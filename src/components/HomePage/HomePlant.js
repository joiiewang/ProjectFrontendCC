import React from "react";
import "../css/HomePlant.css";
import * as SVGLoaders from 'svg-loaders-react';

// EXAMPLE IMAGES (.SVG to resize well)
import plant1 from "../plantimages/plant1.svg";
import plant2 from "../plantimages/plant2.svg";
import plant3 from "../plantimages/plant3.svg";
import plant4 from "../plantimages/plant4.svg";
import plant5 from "../plantimages/plant5.svg";
import plant6 from "../plantimages/plant6.svg";

class HomePlant extends React.Component {
  constructor() {
    super();

    // Need to set points = to result of backend database query
    this.state = {
      points: 0,
      loaded: false
    };
  }

  async componentDidMount () {
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

    let url = (`${server}/api/v2/users/${username}/forest/`)
    
    await fetch(url, {
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
      points: (data.points%12),
      loaded: true
    })).catch(error => alert(error));
  }



  // Number of images and point values can be changed!
  choosePlant = (pointTotal) => {
    if (pointTotal < 2) {
      return plant1;
    } else if (pointTotal < 4) {
      return plant2;
    } else if (pointTotal < 6) {
      return plant3;
    } else if (pointTotal < 8) {
      return plant4;
    } else if (pointTotal < 10) {
      return plant5;
    } else {
      return plant6;
    }
  };

  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    if(!this.state.loaded){
      return (
          <div style={style}>
            <SVGLoaders.Circles stroke="#6c319c" fill="#6c319c"/>
          </div>
      )
    }
    return (
      <div>
        <img src={this.choosePlant(this.state.points)} alt="Happy Plant" />
      </div>
    );
  }
}

export default HomePlant;
