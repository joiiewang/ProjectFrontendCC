import React from 'react';
import { LinkList, SubmitForm } from './LinkList'
import ToDoList from './ToDoList'

function IndividualClass() {
  return (
    <div>
      <h1>Class Page Outline</h1>
      <LinkList/>
      <ToDoList/>
    </div>
  );
};
export default IndividualClass;