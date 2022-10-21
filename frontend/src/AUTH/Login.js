import { useNavigate } from "react-router-dom";
import {useContext, useEffect , useState} from "react";
import useInput from "../CUSTOM-HOOKS/useInput";
import authContext from "../CONTEXT/AuthContext";
import LOGO from "../assets/img/chatapplogo.png";
import CHATTING from "../assets/img/chatting-2.gif";
import Loading from "../Loading";

function Login(props) {

    const ctx = useContext(authContext);

    useEffect(()=>{
         setIsLoading(true);

         setTimeout(()=>{
            setIsLoading(false)
         },300);

    },[]);

    const navigate = useNavigate();

    const[responseMsg , setResponseMsg] = useState(null);
    const[isLoading ,setIsLoading] = useState(false);

    const{value :  EMAIL , isValid : emailIsValid , valueChangeHandler: emailChangeHandler , clear : clearEmail} 
    = useInput(  value=>value.trim().length>10 && value.includes("@") , "");

    const{value :  PASSWORD, isValid : passwordIsValid , valueChangeHandler: passwordChangeHandler , clear : clearPassword} 
    = useInput(  value=> value.trim().length>=6  , "");

    const handleSubmit=async(e)=>{

        e.preventDefault();

        const loginData = {
            email : EMAIL ,
            password : PASSWORD
        };
           
        let responseData;
        try
        {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login` ,{
                method :"POST" ,
                headers : {
                    "Content-Type" :"application/json"
                } ,
    
                body : JSON.stringify(loginData)
        } );

         responseData = await response.json();

        if(response.status!==200)
        {
           throw new Error(responseData.message);
           
        } 
   
        const{email , userId , token , username} = responseData;

        ctx.setEmail(email)
        ctx.setUsername(username)
        ctx.setToken(token);
        ctx.setUserId(userId);

      localStorage.setItem("LoggedInUser" , JSON.stringify({
        username ,
        email ,
        userId ,
        token
      }));

        navigate("/"  , {replace:true}  );
        setResponseMsg(responseData.message);
    }

        catch(err)
        {
            setResponseMsg(err.message);
            setIsLoading(false);
        }
           
        clearEmail();
        clearPassword();
        setIsLoading(false);

    }

    return (
<>

<form onSubmit={handleSubmit}
// className="auth"
>

{ isLoading  ? 

<Loading/> :



<section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/> */}

          <img height={500} src={CHATTING} alt="" />
      </div>

      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        
        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
           <img src={LOGO} alt="" />
           </div>
           <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">

            <p class="h3 fw-normal mb-4">Login to your Account</p>
           </div>
          
           <div className={responseMsg==null?"invalid-feedback":"alert alert-danger d-flex align-items-center mt-0 mb-3"} role="alert">
  
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"></svg>
  <div>
  {responseMsg}
  </div>
</div>


           

        <div class="mt-10 form-outline mb-4">
        {/* <label class="sm form-label" for="form3Example3">Email address</label> */}
            <input  value={EMAIL} onChange={emailChangeHandler} type="email" id="useremail" class={emailIsValid ? "rounded form-control form-control-lg" : "rounded form-control form-control-lg is-invalid"}
              placeholder="Enter a valid email address" />
              <div style={{marginTop:-15}} id="useremail" class="invalid-feedback">
             Enter a Valid Email Address
              </div>
           </div>

           
           <div class="form-outline mb-3">
           {/* <label class="sm form-label" for="form3Example4">Password</label> */}
            <input value={PASSWORD} onChange={passwordChangeHandler}  type="password" id="userpassword" class={passwordIsValid ? " form-control form-control-lg" : "form-control form-control-lg is-invalid"}
              placeholder="Enter password" />
            <div style={{marginTop:-10}} id="userpassword" class="invalid-feedback">
             Password must be atleast 6 digit longer
              </div>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button class="btn-block btn btn-success btn-lg" >Login</button>
           

       {/* style={'padding-left: 2.5rem; padding-right: 2.5rem'} */}
              
              
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger">Register</a></p>
          </div>

          
          
            </div>

    </div>
  </div>

 
</section>
}
</form>









{/*Old Login Form Nav Bar*/}

        {/* <form onSubmit={handleSubmit} className="auth">

         { isLoading  ? 
<Loading/>
        //  <h2>LOADING....</h2> 
         
         : <> <h3> LOGIN INTO YOUR ACCOUNT </h3>
             <input className={emailIsValid ? "input" : "invalid"} type="text"  placeholder='EMAIL' value={EMAIL} onChange={emailChangeHandler}  />
         <input className={passwordIsValid ? "input" : "invalid"} type="password" placeholder='PASSWORD' value={PASSWORD} onChange={passwordChangeHandler}  />
         <button className='btn' > SUBMIT </button>  

         <h3>{responseMsg}</h3>  
         </> }
      
      </form> */}

      {/*Old Login Form Nav Bar*/}

      </>
    );
}

export default Login;