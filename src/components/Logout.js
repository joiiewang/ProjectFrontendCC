import React from "react"


export default class Logout extends React.Component {
   
    state = {
        userName: "", 
        password: "",
    }

    logOut = () => {
        sessionStorage.setItem('username', this.state.userName);
        sessionStorage.setItem('password', this.state.password);
    }
    

    render () {
        {this.logOut()}
        return (
            <div>
                <a href="/">Log Out</a>
            </div>
        )
    }
    
}