import React from 'react'
import { NotesList, SubmitNoteForm } from './NotesList'
import { LinkList, SubmitLinkForm } from './LinkList'

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
                This is the course info. Testing Notes/Links Components, feel free to delete - Zac
                {this.props.name}
                <LinkList/>
                <NotesList/>
            </div>
        )
    }

}

export default Course