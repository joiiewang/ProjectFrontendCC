import React from "react";
import './css/InfoPage.css';
import tree from './plantimages/plant5.svg'
import './css/text.css';

class InfoPage extends React.Component {
  
  constructor() {
    super() 

  }

  
  render () {

    //const style = {text-align: "left"};

    return (
      <div>
        <div className="background"></div>
        <div className="infoBody">
          
          <br></br>
        <h1> Welcome to Planner Planter!</h1>
        <br></br>
        <br></br>
        <h2>Purpose</h2>
        <br></br>
        <p>This web app is a student led project at the University of California Santa Barbara. The concept
          for this app originated from the observation that as students we have too many sources of information
           to track. This app is an attempt to assemble our most pertinant information in one location. 
        </p>
        <br></br>
        <br></br>
        <h2>Functionality</h2>
        <br></br>
        <p>You may track academic and personal information by adding general notes, links, and todo 
          items in the navigation bar above. To add and view course specific items please navigate to the 
          classes dropdown and create or select your desired course. On the home page you can view
           your todo items by days of the month as well as a tree that represents your progress.</p>
        <br></br>
        <br></br>
        <h2>Grow Your Forest</h2>
        <br></br>
        <p>As you check off items from your todo lists you will grow the tree located on your home page. 
          When your tree is fully grown it will appear in your forest and you will begin progress towards a new tree!</p>
        </div>
        <div className="treeBody">
        <img src={tree} className="infoTreeImg" alt="Happy Plant" />
        </div>
        
      </div>
    )
  }
}
export default InfoPage;
