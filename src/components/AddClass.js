import React from "react"

var classNames = [];

// Need to make a pop-up window and pass to backend
class AddClass extends React.Component {
    constructor () {
        super()
        this.state = {
            className : "",
        }

        this.handleChange = this.handleChange.bind(this)
    }

    addToArray (className) {
        classNames.push(this.state.className)
    } 

    // included all input types in case we need it
    handleChange (event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.set({[name] : checked}) :
        this.setState({[name] : value})
    }

    render () {
        return (
            <form>
                <input
                    type = "text"
                    value = {this.state.className}
                    name = "className"
                    placeholder = "Class Name"
                    onChange = {this.handleChange}
                />
                <br/>
                <button onClick = {this.addToArray}>Submit</button>
            </form>
        )
    }
}

export default AddClass