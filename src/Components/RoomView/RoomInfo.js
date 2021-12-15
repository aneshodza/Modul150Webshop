import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function RoomInfo() {
    const [roomInfo, setRoomInfo] = useState({name: 'Loading...', description: 'Loading...'});

    useEffect(() => {
        const firebaseConfig = JSON.parse(sessionStorage.getItem('firebaseConfig'))
        getDocs(collection(getFirestore(initializeApp(firebaseConfig)), 'rooms'))
            .then(data => data.docs.map(doc => doc.data()))
            .then(data => data.find(room => room.name.toLowerCase() === window.location.href.split('/')[window.location.href.split('/').length - 1]))
            .then(data => setRoomInfo(data));
    }, []);
    
    return (
        <div>
            <h1>{roomInfo.name}</h1>
            <h3>{roomInfo.description}</h3>
        </div>
    )
}