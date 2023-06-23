 import { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) =>{
    const host="http://localhost:5000";

    const [notes , setNotes] = useState([])


    // Get all Notes
    const getNotes =async ()=>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Yjk0YzAyN2U2MTMyOWI2NjllOWE3In0sImlhdCI6MTY4Njg2OTI5OH0.vHxHW5OshtM5pg3X5BayzM_m_-niBPyRQZexwEzI2wQ"
            }
        });
        const json =await response.json();
        console.log(json);
        setNotes(json)
    }

    // Add a note

    const addNote =async (title,description,tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Yjk0YzAyN2U2MTMyOWI2NjllOWE3In0sImlhdCI6MTY4Njg2OTI5OH0.vHxHW5OshtM5pg3X5BayzM_m_-niBPyRQZexwEzI2wQ"
            },
            body: JSON.stringify({title,description,tag})
        });
        
        console.log("Adding a new note");
        const note={
                "_id": "648cdac886b07beffb4fc79",
                "user": "648b94c027e61329b669e9a7",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2023-06-16T21:57:28.906Z",
                "__v": 0
              };
        setNotes(notes.concat(note));
    }
    // Delete a note
    const deleteNote = (id)=>{
        console.log("Deleting a note with id"+id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)

    }

    //Edit a note
    const editNote = async (id,title,description,tag)=>{
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Yjk0YzAyN2U2MTMyOWI2NjllOWE3In0sImlhdCI6MTY4Njg2OTI5OH0.vHxHW5OshtM5pg3X5BayzM_m_-niBPyRQZexwEzI2wQ"
            },
            body: JSON.stringify(title,description,tag)
        });

        for(let index=0;index<notes.length();index++){
            const element= notes[index];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>    
    )
}

export default NoteState