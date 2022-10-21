import React , {useEffect , useMemo, useState} from 'react';
import { BrowserRouter, redirect, Route, Routes } from 'react-router-dom';
import Login from './AUTH/Login';
import Signup from './AUTH/Signup';
import Home from './Home';
import authContext from './CONTEXT/AuthContext';
import Navbar from './COMPONENTS/Navbar';
import Footer from './COMPONENTS/footer';
import { io } from 'socket.io-client';
import Chat from './Chat';



function App(props) {

  const[EMAIL , setEmail] = useState();
  const[USERNAME , setUsername] = useState();
  const[TOKEN, setToken] = useState(null);
  const[USERID , setUserId] = useState();

  useEffect(()=>{
         
    const loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    if(loggedInUser)
    {
         setEmail(loggedInUser.email);
         setToken(loggedInUser.token);
         setUserId(loggedInUser.userId);
         setUsername(loggedInUser.username);
    }

  },[]);

   

  return (
    <authContext.Provider value={{username : USERNAME , email : EMAIL , token : TOKEN , userId : USERID , setUsername : setUsername ,
      setEmail :setEmail , setToken : setToken , setUserId : setUserId  }} >

    <BrowserRouter>
    <Navbar/>
    <Routes>
     { TOKEN ? <Route path='/' element={<Home/>} /> : <Route path='/' element={<Login/>} />  }
    {!TOKEN &&  <Route path='/login' element={<Login/>}/>  }
    {!TOKEN &&  <Route path='/signup' element={ <Signup/>} /> }


    </Routes>
    <Footer/>
    </BrowserRouter>
    </authContext.Provider>

  );
}

export default App;