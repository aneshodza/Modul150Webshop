import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import Loading from "../Other/Loading.js"
import Maps from '../Other/Maps.js';
import "../../Styles/RoomInfo.css"
import { Carousel, Button } from 'react-bootstrap';

export default function RoomInfo() {
    const [roomInfo, setRoomInfo] = useState();
    const [canton, setCanton] = useState();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const firebaseConfig = JSON.parse(sessionStorage.getItem('firebaseConfig'))
        getDocs(collection(getFirestore(initializeApp(firebaseConfig)), 'rooms'))
            .then(data => data.docs.map(doc => doc.data()))
            .then(data => data.find(room => room.name.toLowerCase() === decodeURIComponent(window.location.href.split('/')[window.location.href.split('/').length - 1].replace('-', ' ').toLowerCase())))
            .then(data => getAdditionalInfo(data))
    }, []);

    const getAdditionalInfo = (param) => {
        setRoomInfo(param)
        const firebaseConfig = JSON.parse(sessionStorage.getItem('firebaseConfig'));
        const storage = getStorage(initializeApp(firebaseConfig));
        const reference = ref(storage, (param.id).toString())
        const firestore = getFirestore(initializeApp(firebaseConfig));
        getDocs(collection(firestore, 'cantons'))
            .then(data => data.docs.map(doc => doc.data()))
            .then(data => data.find(canton => canton.name === param.place))
            .then(data => setCanton(data))
        listAll(reference)
            .then(res => {
                res.items.forEach(itemRef => {
                    getDownloadURL(itemRef)
                        .then(url => setImages(images => [...images, url]))
                })
            })
    }

    return (
        <div>
            {roomInfo === undefined || canton === undefined ? <Loading size={200} /> :
                <React.Fragment>
                    <div className="room-info-parent">
                        <div className="room-info">
                            <h1>{roomInfo.name}</h1>
                            <h2>in {roomInfo.city}</h2>
                            <Carousel>
                                {images.map(image => <Carousel.Item><img src={image} /></Carousel.Item>)}
                            </Carousel>
                            <p>{roomInfo.description}</p>
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}