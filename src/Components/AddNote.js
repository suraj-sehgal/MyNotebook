import React, {useContext, useState} from 'react'
import noteContext from "../Context/notes/noteContext"


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e)=>{
        // e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Added Successfully","Success")
    }

    const onChange= (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div>
      <div className="container">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title'  aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
