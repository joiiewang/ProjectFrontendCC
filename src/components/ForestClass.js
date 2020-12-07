import * as SVGLoaders from 'svg-loaders-react';
import plant6 from "./plantimages/plant6.svg";
import "./css/HomePlant.css";
import React, { useRef } from 'react';




class ForestClass extends React.Component {
    constructor() {
      super();
      this.state = {
        trees: null,
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
        trees: Math.floor(data.points/12),
        loaded: true
      })).catch(error => alert(error));
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

        var i;
        var trees=[];
        for(i=0;i<this.state.trees;i++){
          trees.push(plant6);
        }

        return (

          <div >
            <h1 style = {{float:"right", fontSize:"20px", color:"#2E8B57"}}>You have {this.state.trees} tree(s)</h1>

            {trees.map((tree, index)=>{

              var randX = Math.random()*250+200;
              var randY = Math.random()*700+200;

              console.log(randX);
              console.log(randY);

              return(
                <img 
                key={index}
                src={tree} 
                style={{position: "fixed", 
                        maxWidth:"10%", 
                        maxHeight:"10%", 
                        margin: `${randX}px 0px 0px ${randY}px`}}
                />
              );
            })}
          </div>
        );
      }
    }

    export default ForestClass
