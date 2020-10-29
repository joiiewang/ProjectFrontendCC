import React from 'react'
import { NotesList, SubmitNoteForm } from './NotesList'
import { LinkList, SubmitLinkForm } from './LinkList'
import ToDoList from './ToDoList'

class Course extends React.Component {
    constructor () {
        super ()
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
                This is the course info. Testing Notes/Links Components, feel free to delete - Zac
                {this.props.name}
                <LinkList/>
                <NotesList/>
                <ToDoList/>
            </div>
        )
    }

}

export default Course