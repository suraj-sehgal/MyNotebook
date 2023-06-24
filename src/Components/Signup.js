import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credential,setCredential] = useState({name:"", email:"",password:"", cpassword:"" });
    let navigate = useNavigate();

    const host="http://localhost:5000";

    const handelSubmit =async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=credential;
            //API call
        if(password===cpassword){
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password})
    
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                // Save the auth token and redirect
                localStorage.setItem('token',json.authToken);
                localStorage.setItem('userName',json.userName);
                props.showAlert("Account has created","success")
                navigate("/",{replace:true});
            }
            else{
                props.showAlert("Invalid Credential","danger")
            }
        }
        else{
            props.showAlert("password do not match","danger")
        }
        
    }

    const onChange= (e)=>{
        setCredential({...credential,[e.target.name]: e.target.value});
    }
    return (
        <div>
            <h4 className='my-4'>Create a new account</h4>
            <form onSubmit={handelSubmit} className='container'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name*</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} required name='name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address*</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} required name="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} minLength={6} required  name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password*</label>
                    <input type="password" className="form-control" id="cpassword"  onChange={onChange} minLength={6} required name='cpassword'/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
