import React from "react"

class Username extends React.Component {
    constructor () {
        super ();
        this.state = {
            username : this.props.username
        }
    }
}

export default Username