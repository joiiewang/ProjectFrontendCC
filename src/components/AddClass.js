import React from "react"
import Course from "./Course"


// Need to make a pop-up window and pass to backend
class AddClass extends React.Component {
    constructor () {
        super()
        this.state = {
            className : "",
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    // included all input types in case we need it
    handleChange (event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.set({[name] : checked}) :
        this.setState({[name] : value})
    }


    handleSubmit (event){
        this.setState({submitted: true})
        alert ('A class was created' + this.state.className)
    }

    rendeerSubmit() {
        return (
            <Course name = {this.state.className} ></Course>
        )
    }

    render () {
        return (
            <div>
            <form onSubmit = {this.handleSubmit}>
                <input
                    type = "text"
                    value = {this.state.className}
                    name = "className"
                    placeholder = "Class Name"
                    onChange = {this.handleChange}
                />
                <br/>
                <button>Submit</button>
            </form>
            {this.state.submitted && this.rendeerSubmit()}
            </div>
        )
    }
}

export default AddClass