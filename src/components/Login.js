import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let Navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNDg0NmNjZjlhMjIyYjY1NDBmMTBlIn0sImlhdCI6MTY0NTUxMTgzM30.L9pCCIOMVewIu5bVKW49F3z8GPHETqNhpU4Dz3SfLus",
            },
      body: JSON.stringify({ email:credentials.email,password:credentials.password })

          });
          const json=await response.json()
          console.log(json);
          if(json.success){
              //save the authtoken and redirect
              localStorage.setItem('token',json.authtoken)
              props.showAlert("Logged in Successfully","success")
                Navigate("/")
          }else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Login to continue to iNoteBook</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login