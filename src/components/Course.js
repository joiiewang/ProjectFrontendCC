import React from 'react'

class Course extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            name: "",
            toDoList: [],
            notes: [],
            links: []
        }
    }
    render () {
        return (
            <div>
                This is the course info
            </div>
        )
    }

}

export default Course