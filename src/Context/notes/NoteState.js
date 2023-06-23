 import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const notesInitial = [
        {
            "_id": "648cdac886b07befff7b4bfc",
            "user": "648b94c027e61329b669e9a7",
            "title": "My Title updated2",
            "description": "Please wake up early updated",
            "tag": "personal",
            "date": "2023-06-16T21:57:28.906Z",
            "__v": 0
          },
          {
            "_id": "649552e5d75ed0b08f49abe6",
            "user": "648b94c027e61329b669e9a7",
            "title": "Saturday",
            "description": "go to bar everynight",
            "tag": "personal",
            "date": "2023-06-23T08:08:05.776Z",
            "__v": 0
          },
          {
            "_id": "648cdac886b07befff7b4bfc",
            "user": "648b94c027e61329b669e9a7",
            "title": "My Title updated2",
            "description": "Please wake up early updated",
            "tag": "personal",
            "date": "2023-06-16T21:57:28.906Z",
            "__v": 0
          },
          {
            "_id": "649552e5d75ed0b08f49abe6",
            "user": "648b94c027e61329b669e9a7",
            "title": "Saturday",
            "description": "go to bar everynight",
            "tag": "personal",
            "date": "2023-06-23T08:08:05.776Z",
            "__v": 0
          },
          {
            "_id": "648cdac886b07befff7b4bfc",
            "user": "648b94c027e61329b669e9a7",
            "title": "My Title updated2",
            "description": "Please wake up early updated",
            "tag": "personal",
            "date": "2023-06-16T21:57:28.906Z",
            "__v": 0
          },
          {
            "_id": "649552e5d75ed0b08f49abe6",
            "user": "648b94c027e61329b669e9a7",
            "title": "Saturday",
            "description": "go to bar everynight",
            "tag": "personal",
            "date": "2023-06-23T08:08:05.776Z",
            "__v": 0
          },
          {
            "_id": "648cdac886b07befff7b4bfc",
            "user": "648b94c027e61329b669e9a7",
            "title": "My Title updated2",
            "description": "Please wake up early updated",
            "tag": "personal",
            "date": "2023-06-16T21:57:28.906Z",
            "__v": 0
          },
    ]
    const [notes , setNotes] = useState(notesInitial)
   
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>    
    )
}

export default NoteState