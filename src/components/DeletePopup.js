import React from "react";
import { Link } from "react-router-dom";


export default class Popup extends React.Component {

    constructor(props) {
        super(props) 
        this.state= {
            courseName : this.props.courseName,
            id : this.props.id,
        }
        this.deleteClass = this.deleteClass.bind(this)
    }

    deleteClass () {
        let server = "http://localhost:8118";
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password')

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }

      console.log("server = " + server);

      const url = `${server}/api/v2/users/${username}/courses/`;

      fetch(url + this.state.id, {
          method: 'DELETE',
          headers: new Headers({
            Authorization:
              "Basic " + btoa(username + ":" + password),
            "Content-Type": "application/json",
          }),
      })
      .then (res => res.text())
      .then (res => console.log(res))
      .catch (err => console.log(err))

      const timer = setTimeout(() => {
        window.location.href = '/ShowClasses'
      }, 1000);

    }



    
    render() {
        let dialog = (
            <div style = {dialogStyles}>
                Are you sure you want to delete {this.state.courseName}?
                <button style = {dialogCloseButtonStyles} onClick= {this.deleteClass}>
                Yes
                </button>
                <button style = {dialogCloseButtonStyles} onClick= {this.props.onClose}>No</button>
            </div>
        )
        if (! this.props.isOpen) {
            dialog = null
        }
        return (
            <div>
                {dialog}
            </div>
        )
    }
}
/*
<Link to = {{
                    pathname: "/ShowClasses",
                    }}>
                    Yes</Link>
*/


let dialogStyles = {
    width: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    bottom: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
}

let dialogCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontweight: 'bold',
    alignSelf: 'flex-end'
}