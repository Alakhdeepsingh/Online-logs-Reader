import logo from './logo.svg';
// import {useState,useEffect,useCallback} from 'react'
import './App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [socketUrl, setSocketUrl] = useState('ws://localhost:8080');
  const [messageHistory, setMessageHistory] = useState([]);
  const [res,setRes] = useState("");
const [msg,setMessage] = useState("hello");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      setRes(p=>p+lastMessage.data);
    }
  }, [lastMessage, setMessageHistory]);


  const handleClickSendMessage = ()=>sendMessage(msg);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed check if the server is open?',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <input onChange = {e=>setMessage(e.target.value)}></input>
      {/* <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button> */}
      <button
        onClick={()=>{handleClickSendMessage();console.log(msg);}}
        disabled={readyState !== ReadyState.OPEN}
      >
        send
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
      <ul>
        {/* <input value={res} disabled = "disabled"></input> */}
        {
          res.split("|^").map(mp=><h6>{mp}</h6>)
        }
        {/* {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
