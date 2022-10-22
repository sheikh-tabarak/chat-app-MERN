import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import { io } from "socket.io-client";
import authContext from "./CONTEXT/AuthContext";
import Loading from "./Loading";

function Home() {
  const navigate = useNavigate();

  const [showChat, setShowChat] = useState(false);
  const [ERROR, setError] = useState(null);
  const [USERS, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, SetIsLoading] = useState();

  const socket = useRef();
  const ctx = useContext(authContext);

  const getUsers = async () => {
    let responseData;
    try {
      SetIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users`,
        {
          headers: {
            Authorization: ctx.token,
          },
        }
      );

      responseData = await response.json();

      if (response.status !== 200) {
        throw new Error(responseData.message);
      }

      setUsers(responseData.users);
      SetIsLoading(false);
    } catch (err) {
      setError(err.message);
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SERVER_URL}`, {
      transports: ["websocket"],
    });
    socket.current.emit("add-user", ctx.userId);

    socket.current.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  const handleClick = (userId, username) => {
    setSelectedUserId(userId);
    setSelectedUsername(username);
    setShowChat((prev) => !prev);
  };

  return (
    <>
 
      {/* Old Code Written by @Huzaifa*/}

      <div className='totalContainer'> 
     {isLoading && <Loading/> }
<div>
     <div class="row justify-content-center align-items-center">
  <div className='p-5 m-2 border border-5  rounded border-success'>
  <center>
        <div style={{width:70}} class=" border border-5  rounded-circle border-success">
                    <img class="img-fluid rounded-circle" src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" name="aboutme"/>
                   </div>
                    <p  style={{marginBottom:-3}}><strong>{ctx.username}</strong></p>
                   
                    <span class="badge badge-pill badge-success">online</span>
                    </center>	
                    </div>
    </div>

    <div className='userContainer'>
       
      {ERROR && <h2> {ERROR} </h2>}
        {USERS.map((item)=> item.id!==ctx.userId &&  <div key={item.id} className="user" onClick={()=>handleClick( item.id,item.username )}> 


        <div class="profile-userpic">
					<img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" class="img-responsive" alt=""/>
				</div>

        <center>
        <div style={{width:70}} class=" border border-5  rounded-circle border-danger">
                    <img class="img-fluid rounded-circle" src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" name="aboutme"/>
                   </div>
                    <p  style={{marginBottom:-3}}><strong>{item.username}</strong></p>
                   
                    {  onlineUsers.some((user)=>user===item.id)? 
                    <span class="badge badge-pill badge-success">online</span>:
                    <span class="badge badge-pill badge-danger">offline</span>
                    }
                   
                    </center>			
       
         </div>   

)} 
    </div>
    </div>
  
  
  



    <div class="row"><div class="col">{showChat===true &&  <Chat socket={socket} selectedUserId={selectedUserId} selectedUsername ={selectedUsername} /> }</div></div>  
    </div>



    </>
  );
}

export default Home;
