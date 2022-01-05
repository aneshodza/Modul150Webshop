import { useEffect, useState } from "react"
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import "../../Styles/RoomIcon.css"

export default function RoomIcon(props) {
    const [image, setImage] = useState('')

    useEffect(() => {
        const firebaseConfig = JSON.parse(sessionStorage.getItem('firebaseConfig'));
        const storage = getStorage(initializeApp(firebaseConfig));
        const reference = ref(storage, (props.room.id).toString())
        listAll(reference)
            .then(res => {
                getDownloadURL(res.items[0])
                    .then(url => {
                        setImage(url)
                    })
            })
    }, [])
    
    return (
        <div className="room-icon-div">
            <img src={image} className="room-icon-image"/>
            <h2 className="room-icon-footer">{props.room.name}</h2>
            <h3 className="room-icon-footer-subtitle">in {props.room.city}</h3>
        </div>
    )
}