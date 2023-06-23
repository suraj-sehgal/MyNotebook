import React, {useContext} from 'react'
import noteContext from "../Context/notes/noteContext"
import NoteItem from './NoteItem';
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
    <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note)=>{
          return <NoteItem note={note}></NoteItem>;
        })};
    </div>
  )
}

export default Notes
