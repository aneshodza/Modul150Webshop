import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoomIcon from './RoomIcon';
import Loading from '../Other/Loading';
import Header from '../Header';
import "../../Styles/Rooms.css"
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { db } from '../../firebase';

export default function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [cantons, setCantons] = useState([]);
    const [mappedRooms, setMappedRooms] = useState([]);

    useEffect(() => {
        getDocs(collection(db, 'rooms'))
            .then(snapshot => snapshot.docs.map(doc => doc.data()))
            .then(data => setMappedRooms(data));

        getDocs(collection(db, 'cantons'))
            .then(snapshot => snapshot.docs.map(doc => doc.data()))
            .then(data => setCantons(data));
    }, []);

    const filterItems = (filter) => {
        console.log(rooms.length)
        console.log(filter.toLowerCase() === 'all' && rooms.length > 0)
        if (rooms.length === 0) {
            setRooms(mappedRooms)
            setMappedRooms(mappedRooms.filter(room => room.place.toLowerCase() === filter.toLowerCase()))
        } else if (filter.toLowerCase() === 'all' && rooms.length > 0) {
            setMappedRooms(rooms)
        } else {
            setMappedRooms(rooms.filter(room => room.place.toLowerCase() === filter.toLowerCase()))
        }
    }

    return (
        <div>
            <Header active={3} />
            { mappedRooms.length === 0 ? <Loading size={200} /> :
                <React.Fragment>
                    <div className="rooms-top">
                        <DropdownButton id="dropdown-basic-button" title="Filter">
                            <Dropdown.Item onClick={() => filterItems('all')}>All</Dropdown.Item>
                            {
                                cantons.map(canton => <Dropdown.Item onClick={() => filterItems(canton.name)}>{canton.name}</Dropdown.Item>)
                            }  
                        </DropdownButton>
                    </div>
                    <div className="room-list" style={{ gridTemplateRows: `${'25vw '.repeat(Math.ceil(mappedRooms.length / 3))}` }}>
                        { mappedRooms.map(room =>
                            <Link to={{
                                pathname: `/rooms/${room.name.toLowerCase().replace(/\s/g, '-')}`,
                            }} key={room.id} className="room-icon" >
                                <RoomIcon room={room} />
                            </Link>
                        )}
                    </div>
                    <div className="room-border" style={{ gridTemplateRows: `${'25vw '.repeat(Math.ceil(mappedRooms.length / 3))}` }}>
                            { mappedRooms.map(() => <span className="room-border-child" /> )}
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

