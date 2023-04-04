import { useEffect, useState, } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore"
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, 'messages');

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room));
        onSnapshot(queryMessage, (snapshot) => {
            let message = [];
            snapshot.forEach((doc) => {
                message.push({ ...doc.data(), id: doc.id });
            })
            setMessages(setNewMessage);

        })
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

    return <div className="chat-app">
        <form onSubmit={handleSubmit} className="newMessageForm">
            <input className="newMessageInput"
                placeholder="Type your message here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage} />
            <button type="submit" className="submit-button">Send</button>
        </form>
    </div>
}