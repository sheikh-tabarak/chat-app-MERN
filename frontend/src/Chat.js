import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import authContext from "./CONTEXT/AuthContext";
import "./COMPONENTS/easychat.css";

function Chat({ socket, selectedUsername, selectedUserId, status }) {
  const ctx = useContext(authContext);

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [ERROR, setError] = useState(null);
  const [isLoading, setIsLoading] = useState();

  const sendMessage = async (e) => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        to: selectedUserId,
        from: ctx.userId,
        authorName: ctx.username,
      };

      socket.current.emit("send-msg", messageData);

      setMessageList((list) => {
        return [...list, messageData];
      });

      setCurrentMessage("");

      // SAVE THE MESSAGE TO MONGODB

      let responseData;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/chats/send`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: ctx.token,
            },

            body: JSON.stringify({
              messageData: messageData,
            }),
          }
        );

        responseData = await response.json();

        if (response.status !== 201) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const getChat = async () => {
    let responseData;
    try {
      setIsLoading(true);
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/chats?author=${ctx.userId}&to=${selectedUserId}`,
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

      setMessageList(responseData.chat);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    socket.current.on("recieve-msg", (data) => {
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      selectedUserId === arrivalMessage.author &&
      setMessageList((list) => {
        return [...list, arrivalMessage];
      });
  }, [arrivalMessage, selectedUserId]);

  useEffect(() => {
    getChat();
  }, []);

  return (
    <>
      {/* rounded-lg overflow-hidden shadow */}

      <div className="abc">
        {isLoading === true && <h3>LOADING....</h3>}
        {ERROR ? (
          <h2> {ERROR} </h2>
        ) : (
          <div class="row maincon">
            {/* <!-- Users box--> */}
            <div class="col-4 maincon">
              <div class="bg-white people">
                <div class="bg-gray px-4 py-2 bg-light">
                  <p class="h5 mb-0 py-1">Chats</p>
                </div>

                <div class="messages-box">
                  <div class="list-group rounded-0">
                    {/* <a class="list-group-item list-group-item-action active text-white rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">25 Dec</small>
                  </div>
                  <p class="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a> */}
                    {/* 
            <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">14 Dec</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur. incididunt ut labore.</p>
                </div>
              </div>
            </a> */}

                    {/* <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">9 Nov</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a> */}

                    {/* <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">18 Oct</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a> */}

                    {/* <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">17 Oct</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a> */}

                    {/* <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">2 Sep</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </a> */}

                    {/* <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">
              <div class="media"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
                <div class="media-body ml-4">
                  <div class="d-flex align-items-center justify-content-between mb-1">
                    <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">30 Aug</small>
                  </div>
                  <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                </div>
              </div>
            </a> */}

                    <a
                      href="#"
                      class="list-group-item list-group-item-action list-group-item-light rounded-0"
                    >
                      <div class="media">
                        <img
                          src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
                          alt="user"
                          width="50"
                          class="rounded-circle"
                        />
                        <div class="media-body ml-4">
                          <div class="d-flex align-items-center justify-content-between mb-3">
                            <h6 class="mb-0">{selectedUsername}</h6>
                            <small class="small font-weight-bold">21 Aug</small>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Chat Box--> */}
            {/* <div class="bg-gray px-4 py-2 bg-light">
          <p class="h5 mb-0 py-1">User</p>
        </div> */}

            <div class="col-8 maincon">
              <div class="chat-box bg-white">
                {/* <!-- Sender Message--> */}
                <div class="bg-gray px-4 py-2 bg-light sticky-top">
                  <p class="h5 mb-0 py-1">{selectedUsername}</p>
                </div>
                {/* <div class="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
          <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-muted">Test which is a new approach all solutions</p>
            </div>
            <p class="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div> */}

                {/* <!-- Reciever Message--> */}
                {/* <div class="media w-50 ml-auto mb-3">
          <div class="media-body">
            <div class="bg-primary rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-white">Test which is a new approach to have all solutions</p>
            </div>
            <p class="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div> */}

                {/* <!-- Sender Message--> */}
                {/* <div class="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
          <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-muted">Test, which is a new approach to have</p>
            </div>
            <p class="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div> */}

                {/* <!-- Reciever Message--> */}
                {/* <div class="media w-50 ml-auto mb-3">
          <div class="media-body">
            <div class="bg-primary rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-white">Apollo University, Delhi, India Test</p>
            </div>
            <p class="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div> */}

                {/* <!-- Sender Message--> */}
                {/* <div class="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle"/>
          <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-muted">Test, which is a new approach</p>
            </div>
            <p class="small text-muted">12:00 PM | Aug 13</p>
          </div>
        </div> */}

                {/* <!-- Reciever Message--> */}
                {/* <div class="media w-50 ml-auto mb-3">
                  <div class="media-body">
                    <div class="bg-primary rounded py-2 px-3 mb-2">
                      <p class="text-small mb-0 text-white">
                        Apollo University, Delhi, India Test
                      </p>
                    </div>
                    <p class="small text-muted">{item.time} | Aug 13</p>
                  </div>
                </div> */}

<ScrollToBottom
                className="scroll"
                initialScrollBehavior="smooth"
                scrollViewClassName="scrollbar"
              >
                {messageList.map((item) => (
                  <div
                    id="message"
                    className={
                      ctx.username === item.authorName ? "you" : "other"
                    }
                    key={Math.random() * Math.random() * Math.random()}
                  >
                    <div className="message-content">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3> {item.message} </h3>
                        <h5 style={{ alignSelf: "flex-end", margin: "5px" }}>
                          {" "}
                          {item.time}{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollToBottom>



              </div>

              <form action="#" class="bg-light">
                <div class="input-group">
                  <input
                    type="text"
                    placeholder="Type a message"
                    aria-describedby="button-addon2"
                    class="form-control rounded-0 border-0 py-4 bg-light"
                  />
                  <div class="input-group-append">
                    <button
                      id="button-addon2"
                      type="submit"
                      class="btn btn-link"
                    >
                      {" "}
                      <i class="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Old Chat Setup Complete */}

      <div className="chat">
        {isLoading === true && <h3>LOADING....</h3>}
        {ERROR ? (
          <h2> {ERROR} </h2>
        ) : (
          <>
            <div className="chat-header">
              <h3> {selectedUsername} </h3>
            </div>
            <div className="chat-body">
              <ScrollToBottom
                className="scroll"
                initialScrollBehavior="smooth"
                scrollViewClassName="scrollbar"
              >
                {messageList.map((item) => (
                  <div
                    id="message"
                    className={
                      ctx.username === item.authorName ? "you" : "other"
                    }
                    key={Math.random() * Math.random() * Math.random()}
                  >
                    <div className="message-content">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3> {item.message} </h3>
                        <h5 style={{ alignSelf: "flex-end", margin: "5px" }}>
                          {" "}
                          {item.time}{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                placeholder="hey , this is message"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button type="submit" onClick={sendMessage}>
                {" "}
                &#9658;{" "}
              </button>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
