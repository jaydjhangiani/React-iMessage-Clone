import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { selectChatId, selectChatName } from "./features/chatSlice";
import Message from "./Message";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import axios from './axios.js';
import Pusher from "pusher-js";

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  const pusher = new Pusher('92dcb7740b4564d4fd3d', {
    cluster: 'ap2'
  });

  const getConversation = (chatId) => {
    if(chatId){
      axios.get(`/get/conversation?id=${chatId}`).then((res) => {
        setMessages(res.data[0].conversation)
      })
    }
  }

  useEffect(() => {
    pusher.unsubscribe('messages')
    getConversation(chatId)
    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', function(data) {
      getConversation(chatId)
    });
    
    
    /*if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }*/
  }, [chatId]);

  /*const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };*/

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`/new/message?id=${chatId}`,{
      message: input,
      timestamp: Date.now(),
      user: user
    })
    setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ user,_id,message,timestamp }) => (
            <Message key={_id} id={_id} sender={user} message={message} timestamp={timestamp} />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
