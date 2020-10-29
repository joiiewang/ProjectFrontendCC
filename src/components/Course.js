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
                <h1>{this.props.name}</h1>
                <LinkList/>
                <NotesList/>
                <ToDoList/>
            </div>
        )
    }

}

export default Course