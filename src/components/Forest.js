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



  return (
    
    <div style={background} >
      <ForestClass/>
      <Fireflies/>
    </div>
  );
}
export default Forest;
