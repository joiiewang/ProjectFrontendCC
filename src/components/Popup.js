import React from "react"


export default class Popup extends React.Component {
    
    render() {
        let dialog = (
            <div style = {dialogStyles}>
                Are you sure you want to delete this class?
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

//{this.props.children}

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