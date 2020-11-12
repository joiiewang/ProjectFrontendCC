import React from "react"
import PopUp from "./Popup"


export default class Logout extends React.Component {
   
    state = {
        userName: null, 
        password: null,
    }

    logOut = () => {
        sessionStorage.setItem('username', this.state.userName);
        sessionStorage.setItem('password', this.state.password);
    }
    

    render () {
        return (
            <div>
                {this.logOut}
                <a href="/">Log Out</a>
            </div>
        )
    }
    
}