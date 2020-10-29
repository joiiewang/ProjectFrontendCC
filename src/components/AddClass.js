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
        event.preventDefault();
        this.setState({submitted: true})
        alert ('A class was created ' + this.state.className)
    }

    renderSubmit() {
        this.render (
            <Course name = {this.state.className}/>
        )
    }

    renderForm() {
        return (
        <form onSubmit = {this.handleSubmit.bind(this)}>
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
        )
    }

    render () {
        return (
            <div>
            {!this.state.submitted && this.renderForm()}  
            {this.state.submitted && <Course name = {this.state.className}/>}
            </div>
        )
    }
}

export default AddClass