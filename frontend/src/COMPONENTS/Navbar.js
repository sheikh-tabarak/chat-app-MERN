import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authContext from '../CONTEXT/AuthContext';
import LOGO from "../assets/img/chatapplogo.png";

function Navbar(props) {

    const ctx = useContext(authContext);
    const navigate = useNavigate();

    const handleLogout=()=>{
           localStorage.removeItem("LoggedInUser");
           ctx.setUsername(null);
           ctx.setEmail(null);
           ctx.setUserId(null);
           ctx.setToken(null);

           navigate("/");
    }

    return (

        <>
        <nav class=" shadow navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom">
  <a class="navbar-brand" href="/"><img height={80} src={LOGO} alt="" /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      { ctx.token &&   <NavLink to="/" end style={{marginRight:"50px"}}> <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></NavLink> }
        
      </li>
     
     
    </ul>
    { !ctx.token &&   <NavLink to="/login" > <button class="btn btn-outline-success my-2 my-sm-0 m-3" href="#">Login</button> </NavLink> }
    
    {  !ctx.token &&   <NavLink to="/signup"> <button class="btn btn-success my-2 my-sm-0" type="submit">SIGNUP</button> </NavLink> }   
    
      
  </div>
</nav>







{/*Old Header Nav Bar*/}

        {/* <div style={{display:"flex" , alignItems:"center" , justifyContent:"space-around"  , margin:"10px auto"}} className="navbar">
               
        <div className='navlinks'>
         { ctx.token &&   <NavLink to="/" end style={{marginRight:"50px"}}> HOME</NavLink> }
        </div>

        <div className='navlinks'>
         { !ctx.token &&   <NavLink to="/login" > LOGIN WITH US </NavLink> }
         {  !ctx.token &&   <NavLink to="/signup"> SIGNUP </NavLink> }
        </div>
     
       { ctx.token && <button className='btn-danger' onClick={handleLogout}>LOGOUT</button> }
        </div> */}


        {/*Old Header Nav Bar*/}
        
        </>
    );
}

export default Navbar;