import React from "react"


export default class Popup extends React.Component {

    constructor() {
        super() 
        this.state= {
            courseName : ""
        }
    }

    deleteClass () {
        let server = "http://localhost:8118";

      if (process.env.REACT_APP_REMOTE) {
        //set this in .env file: REACT_APP_REMOTE=1
        server = "https://project-backend-cc.herokuapp.com";
      }

      if (process.env.NODE_ENV !== "development") {
        server = "https://project-backend-cc.herokuapp.com";
      }

      console.log("server = " + server);
      const url = `${server}/api/v1/users/`;
    }
    
    render() {
        let dialog = (
            <div style = {dialogStyles}>
                Are you sure you want to delete {this.state.courseName}?
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