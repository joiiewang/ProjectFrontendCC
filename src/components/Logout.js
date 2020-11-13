import React from "react"


export default class Logout extends React.Component {
   


    logOut = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
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