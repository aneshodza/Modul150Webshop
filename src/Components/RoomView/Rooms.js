import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomIcon from './RoomIcon';
import Loading from '../Other/Loading';
import Header from '../Header';

export default function Rooms() {

    const [rooms, setRooms] = useState([]);

    const firebaseConfig = JSON.parse(sessionStorage.getItem('firebaseConfig'));
    const db = getFirestore(initializeApp(firebaseConfig));


    useEffect(() => {
        getDocs(collection(db, 'rooms'))
            .then(snapshot => snapshot.docs.map(doc => doc.data()))
            .then(data => setRooms(data));
    }, []);

    return (
        <div>
            <Header active={3}/>
            { rooms.length === 0 ? <Loading /> : rooms.map(room =>
                
                <Link to={{
                        pathname: `/rooms/${room.name.toLowerCase()}`,
                    }} key={room.id} room={room} >
                        <RoomIcon room={room} />
                </Link>
            )}
        </div>
    )
}

