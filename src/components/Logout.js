import React from "react"


export default class Logout extends React.Component {

    handleClick = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.setItem('loggedIn', false);
      };

    render () {
        return (
            <div>
                <a href="/" onClick={() => this.handleClick()}>Log Out</a>
            </div>
        )
    }
    
}