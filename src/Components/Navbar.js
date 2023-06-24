import React from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        props.showAlert("You are Logged out","Success");
        navigate("/login",{replace:true});
    }
    const handleSignup=()=>{
        navigate("/signup",{replace:true});
    }
    const handleLogin=()=>{
        navigate("/login",{replace:true});
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
                        </li>
                        
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <i className="fa-sharp fa-solid fa-right-to-bracket mx-2" style={{color:"#ffffff",}} onClick={handleLogin}></i>                        
                        <i className="fa-solid fa-user-plus mx-2" style={{color:"#ffffff",}} onClick={handleSignup}></i>                    
                    </form>:
                    <div className='d-flex'>
                        <i class="fa-solid fa-user" style={{color:"#ffffff",}}></i>                        
                        <h6 className="text-light mx-2">Welcome,{localStorage.getItem('userName')}</h6>
                        <i className="fa-solid fa-arrow-right-from-bracket mx-2" style={{color:"#ffffff",}} onClick={handleLogout}></i>
                    </div>}

                </div>
            </div>
        </nav>
    )
}

export default Navbar
