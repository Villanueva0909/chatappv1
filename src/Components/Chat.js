import { useEffect, useState, } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore"
import { auth, db } from "../firebase-config";
import { Box, Input, Button, Stack, Text } from "@chakra-ui/react";


export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, 'messages');

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room));
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let message = [];
            snapshot.forEach((doc) => {
                message.push({ ...doc.data(), id: doc.id });
            })
            setMessages(message);

        });
        return () => unsubscribe();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });


        console.log(newMessage);
    }

    return <>
        <Box
            justifyContent={'center'}
            border={'1px'}
            p={'3%'}
            as={'form'}
            onSubmit={handleSubmit}>
            {messages.map((message) => <Stack><Box>
                <Text>{message.text}</Text>
            </Box></Stack>)}
            <Input className="newMessageInput"
                placeholder="Type your message here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage} />
            <Button type="submit" className="submit-button">Send</Button>
        </Box>
    </>
}