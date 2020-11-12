import React from "react"

export default class Popup extends React.Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className = "modal">
                <div className = "modal_content">
                    <span className = "close" onClick = {this.handleClick}>
                        <p>Are you sure you wish to log out</p>
                    </span>
                </div>

            </div>
        )
    }
}