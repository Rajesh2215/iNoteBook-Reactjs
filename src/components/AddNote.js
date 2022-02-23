import React, { useContext , useState} from "react";
import NoteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Added successfully","success")
}
  const onChange =(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
  }

  return (
    <div>
        <div className="container my-3">
        <h2>Add a Note</h2>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
              value={note.title}
                type="title"
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
                onChange={onChange}
                name="title"
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <input
              value={note.description}
                type="description"
                className="form-control"
                id="description"
                onChange={onChange}
                name="description"
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
              value={note.tag}
                type="tag"
                className="form-control"
                id="tag"
                onChange={onChange}
                name="tag"
                minLength={5} required
              />
            </div>
            
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">
              Add Note
            </button>
          </form>
        
      </div>
    </div>
  )
}

export default AddNote