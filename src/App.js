
import { useState, useRef } from 'react';
import './App.css';
import { Auth } from "./Components/Auth"
import Cookies from 'universal-cookie/cjs/Cookies';
import { Chat } from './Components/Chat';
import { Stack, Input, Button } from '@chakra-ui/react';

const cookies = new Cookies();

function App() {

  const [isAuth, setAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <>
        <Auth setAuth={setAuth} />
      </>
    )
  }

  return (
    <> {room ? <Chat room={room}/> : 
    <Stack>
      <label>Enter Room Name:</label>
      <Input ref={roomInputRef} />
      <Button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</Button>
    </Stack>}
    </>
  )
};

export default App;
