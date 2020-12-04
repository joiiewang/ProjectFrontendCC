import React from "react";
import ForestClass from "./ForestClass";
import Fireflies from "./Fireflies";
import * as SVGLoaders from 'svg-loaders-react';
import ForestBackground from "./plantimages/ForestBackground.svg";

function Forest (){


  const background = {
    position: "fixed",
    top: "59px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    backgroundImage: "url("+ForestBackground+")",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const bodywrapper = {
    position:"absolute", 
    top:"0",
    left:"0",
    width:"100%", 
    height:"100%",
    zIndex:"5",
  }



  return (
    
    <div style={background} >
      <Fireflies/>
      <div style={bodywrapper}>
      <ForestClass/>
      </div>
    </div>
  );
}
export default Forest;
