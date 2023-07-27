import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
  // create an array of notes
  const [notes, setNotes] = React.useState([]);

  // add new item to database
  const addNote = async (newNote) => {
    console.log(newNote);
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    const res = await axios.post('http://localhost:3000/api/item', newNote);
    console.log('addNote fin');
  };

  // delete item when click on delete
  const deleteNote = async (id) => {
    try {
      // delete from db
      const res = await axios.delete('http://localhost:3000/api/item/${id}');
      // update list
      setNotes((prevNotes) => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
