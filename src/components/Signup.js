import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"",password:"",cpassword:""})
    let Navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNDg0NmNjZjlhMjIyYjY1NDBmMTBlIn0sImlhdCI6MTY0NTUxMTgzM30.L9pCCIOMVewIu5bVKW49F3z8GPHETqNhpU4Dz3SfLus",
            },
      body: JSON.stringify({ name,email,password})

          });
          const json=await response.json()
          console.log(json);
          if(json.success){
              //save the authtoken and redirect
              localStorage.setItem('token',json.authtoken)
                Navigate("/Login")
              props.showAlert("Account created Successfully","success")
          }else{
              props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  
  return (
    <div className='container'>
      <h2>Signup to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="text" className="form-label">Name</label>
    <input type="text" className="form-control" name='name'  id="name" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password'  id="password" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword'  id="cpassword" minLength={5} required onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup