import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {

    const [credential,setCredential] = useState({email:"",password:""});
    let navigate = useNavigate();

    const host="http://localhost:5000";

    const handelSubmit =async (e)=>{
        e.preventDefault();
            //API call
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credential.email,password:credential.password})

        });
        const json = await response.json();
        console.log(json);
        if(json.success===true){
            // Save the auth token and redirect 
            localStorage.setItem("token",json.authToken);
            props.showAlert("You are Loggedin","Success");
            navigate("/",{replace:true});
        }
        else{
            props.showAlert("Invalid Credential","danger")
        }

        
    }
    

    const onChange= (e)=>{
        setCredential({...credential,[e.target.name]: e.target.value});
    }

    return (
        <div className='container'>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'onChange={onChange} value={credential.email} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credential.password} name='password'/>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
