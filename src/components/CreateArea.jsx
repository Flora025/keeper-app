import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  // 1 create a state object that has the title and content properties
  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  // control the expansion of input area
  const [isExpanded, setExpanded] = useState(false);

  // 4 implement the function that receives changes of the input
  function handleChange(event) {
    const {name, value} = event.target;

    // add the new note object
    setNote(prevNote => {
        return {
            ...prevNote,
            [name] : value
        }
    })
  }

  // 6 implement onClick func
  function submitNote(event) {

    // pass the function addNote() from App
    props.onAdd(note);

    setNote({
        title: "",
        content: ""
      })

    // prevent refreshing the page
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  // 2 bind the value to the input
  // 3 apply the onChange attribute
  // 5 apply Add feature
  return (
    <div>
      <form className="create-note">
        {isExpanded && 
        <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        }
        
        <textarea 
            name="content" 
            onClick={expand}
            onChange={handleChange} 
            value={note.content} 
            placeholder="Take a note..." 
            rows={isExpanded ? 3 : 1} 
            />
        <Zoom in={isExpanded}>
        <Fab onClick={submitNote}>
            <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
