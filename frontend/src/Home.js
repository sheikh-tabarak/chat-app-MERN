import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import { io } from 'socket.io-client';
import authContext from './CONTEXT/AuthContext';

function Home() {

    const navigate = useNavigate();

  const[showChat , setShowChat] = useState(false);
  const[ERROR ,setError] = useState(null);
  const[USERS , setUsers]=useState([]);
  const[selectedUsername , setSelectedUsername] = useState(null);
  const[selectedUserId , setSelectedUserId] = useState(null);

  const socket = useRef();
 const ctx = useContext(authContext);

  const getUsers=async()=>
  {
    let responseData;
    try
    {
       const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`);

       responseData = await response.json();

       if(response.status!==200)
       {
        throw new Error(responseData.message);
       }

       setUsers(responseData.users);
    }

    catch(err)
    {
       setError(err.message);
    }

  }


  useEffect(()=>{
    getUsers();
  },[]);

  useEffect(()=>{
                  
    socket.current = io(`${process.env.REACT_APP_SERVER_URL}`);

 },[]);

  const handleClick=(userId ,username)=>
  {
    setSelectedUserId(userId);
    setSelectedUsername(username);
    setShowChat(true);

  }
 
  return (
    <div >
      { showChat===false ?

       <>

      {ERROR && <h2> {ERROR} </h2>}
        {USERS.map((item)=> <div key={item.id} className="user" onClick={()=>handleClick( item.id,item.username )}> 
           <h3>{item.username}</h3> 
           <h4>{item.email}</h4> 
         </div> )}   

            </>
         :

         <Chat socket={socket} selectedUserId={selectedUserId} selectedUsername ={selectedUsername} /> }
      
    </div>
  );
}

export default Home;
