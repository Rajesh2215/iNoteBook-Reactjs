import React, { useContext,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(NoteContext);
  let navigate=useNavigate();
  const { notes, getNotes,editNote } = context;
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        navigate('/Login')

      }
        // eslint-disable-next-line
    }, [])
    
  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refClose= useRef()
  const [note, setNote] = useState({id:"", etitle:"",edescription:"",etag:""})

  const handleClick = (e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      props.showAlert("Deleted successfully","success")
  }
  const onChange =(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
      Launch demo modal
      </button>
      

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                aria-describedby="emailHelp"
                onChange={onChange}
                name="etitle"
                value={note.etitle}
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                onChange={onChange}
                name="edescription"
                value={note.edescription}
                minLength={5} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="tag"
                className="form-control"
                id="etag"
                onChange={onChange}
                name="etag"
                value={note.etag}
                minLength={5} required
              />
            </div>
            
            {/* <button type="submit" onClick={handleClick} className="btn btn-primary">
              Add Note
            </button> */}
          </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary"  onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="container row my-3">
        <h2>You Note</h2>
        <div className="container">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  );
};

export default Notes;
