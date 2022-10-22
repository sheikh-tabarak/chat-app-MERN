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
      <div className="totalContainer">
        {/* {isLoading && <Loading/> } */}
        <div className="userContainer">
          {/*   
 {ERROR && <h2> {ERROR} </h2>}
   {USERS.map((item)=> item.id!==ctx.userId &&  <div key={item.id} className="user" onClick={()=>handleClick( item.id,item.username )}>  */}

          {/* <img width={40} src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" class="rounded-circle" alt=""/> */}










          {/* <center>
            <div className="userContainer">
              <div>
              <div style={{width:70}} class=" border border-5  rounded-circle border-danger">
            <img 
                 
                  src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
                  name="aboutme"
                  class=" img-fluid rounded-circle"
                />
              </div>
              <h5>
                <strong>user </strong>
              </h5>
                
           
              <span class="badge badge-pill badge-success">online</span>
              <span class="badge badge-pill badge-danger">offline</span>


              </div>
            </div>
          </center> */}

{/* 

 <div className='totalContainer'> 
     
    <div className='userContainer'>
  		
        <center>
        <div style={{width:70}} class=" border border-5  rounded-circle border-danger">
                    <img class="img-fluid rounded-circle" src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" name="aboutme"/>
                   </div>
                    <h4  style={{marginBottom:-3}}><strong>user </strong></h4>
                   
                    {  onlineUsers.some((user)=>user===item.id)? 
                    <span class="badge badge-pill badge-success">online</span>:
                    <span class="badge badge-pill badge-danger">offline</span>
                    }
                   
                    </center>

         

         </div>
         </div> */}





















          {/* <h3>{item.username}</h3> 
      <h4>  {  onlineUsers.some((user)=>user===item.id)? "online" : " offline"} </h4>  */}
        </div>
        {/*     
     )}    */}
      </div>
      {/* {showChat===true &&  <Chat socket={socket} selectedUserId={selectedUserId} selectedUsername ={selectedUsername} />  } */}

      {/* Old Code Written by @Huzaifa*/}

      <div className='totalContainer'> 
     {isLoading && <Loading/> }
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
                    <h4  style={{marginBottom:-3}}><strong>{item.username}</strong></h4>
                   
                    {  onlineUsers.some((user)=>user===item.id)? 
                    <span class="badge badge-pill badge-success">online</span>:
                    <span class="badge badge-pill badge-danger">offline</span>
                    }
                   
                    </center>			
        {/* <center>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R" name="aboutme" width="140" height="140" border="0" class="img-circle"/>
                    <h3 class="media-heading">{item.username}</h3>
                    
                    {  onlineUsers.some((user)=>user===item.id)? <span class="label label-success">online</span> :<span class="label label-danger">offline</span>}
                       
                    </center> */}

           <h4>{item.username}</h4> 
            
                  <h4>  {  onlineUsers.some((user)=>user===item.id)? "online" : " offline"} </h4> 

         </div> )}   


    </div>
    {showChat===true &&  <Chat socket={socket} selectedUserId={selectedUserId} selectedUsername ={selectedUsername} />  }
    </div>
    </>
  );
}

export default Home;
