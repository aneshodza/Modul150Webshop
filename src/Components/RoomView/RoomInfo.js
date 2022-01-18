import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, listAll } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import Loading from "../Other/Loading.js"
import Maps from '../Other/Maps.js';
import "../../Styles/RoomInfo.css"
import { Carousel, Form, Button } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import Header from "../Header.js"
import Calendar from 'react-calendar';
import { useAuth } from "../../Context/AuthContext"


export default function RoomInfo() {
    const [roomInfo, setRoomInfo] = useState();
    const [canton, setCanton] = useState();
    const [images, setImages] = useState([]);
    const [userAccount, setUserAccount] = useState({
        user: {
            email: '',
            displayName: '',
        },
        userdata: {
            address: {
                city: '',
                country: '',
                houseNumber: '',
                street: ''
            },
            reservations: []
        }
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [datePicked, setDatePicked] = useState(null)
    const [extraBedsheet, setExtraBedsheet] = useState(false)
    const [extraFood, setExtraFood] = useState(false)
    const [freeGarage, setFreeGarage] = useState(false)
    const [processName, setProcessName] = useState('')
    const [processDescription, setProcessDescription] = useState('')
    const [price, setPrice] = useState(0)
    const { createReservation } = useAuth()

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("user")) === null) {
            console.log('User is not logged in')
        } else {
            setUserAccount({ user: JSON.parse(sessionStorage.getItem("user")), userdata: JSON.parse(sessionStorage.getItem("userdata")) })
            setIsLoggedIn(true)
        }
        console.log(JSON.parse(sessionStorage.getItem("user")))
        console.log(JSON.parse(sessionStorage.getItem("userdata")))
        console.log({ user: JSON.parse(sessionStorage.getItem("user")), userdata: JSON.parse(sessionStorage.getItem("userdata")) })
        getDocs(collection(db, 'rooms'))
            .then(data => data.docs.map(doc => doc.data()))
            .then(data => data.find(room => room.name.toLowerCase().replace(' ', '-') === decodeURIComponent(window.location.href.split('/')[window.location.href.split('/').length - 1].toLowerCase())))
            .then(data => getAdditionalInfo(data))
    }, []);

    const getAdditionalInfo = (param) => {
        console.log(param)
        setRoomInfo(param)
        const reference = ref(storage, (param.id).toString())
        getDocs(collection(db, 'cantons'))
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

    const bookHandler = async () => {
        if (datePicked !== null) {
            let newPastBookings = await createReservation({
                date: datePicked,
                extraBedsheet: extraBedsheet,
                extraFood: extraFood,
                freeGarage: freeGarage,
                processName: processName,
                processDescription: processDescription,
                price: price,
                houseId: roomInfo.id,
                houseName: roomInfo.name,
            }, JSON.parse(sessionStorage.getItem("user")).uid)
            let tempUserAccount = userAccount
            console.log(newPastBookings)
            tempUserAccount.userdata.reservations = newPastBookings
            setUserAccount(tempUserAccount)
            sessionStorage.setItem("userdata", JSON.stringify(tempUserAccount.userdata))
        }
    }

    useEffect(() => {
        if (datePicked !== null) {
            setPrice((datePicked[1] - datePicked[0]) / (60 * 60 * 24) * (roomInfo.price + (extraBedsheet ? 10 : 0) + (extraFood ? 50 : 0) + (freeGarage ? 20 : 0)))
        }
    }, [datePicked, extraBedsheet, extraFood, freeGarage, processName, processDescription])

    return (
        <div>
            {roomInfo === undefined || canton === undefined ? <Loading size={200} /> :
                <React.Fragment>
                    <Header active={3} />
                    <div className="room-info-parent">
                        <div className="room-info">
                            <div className='room-info-text'>
                                <h1>{roomInfo.name}</h1>
                                <h2>in {roomInfo.city}, {roomInfo.place}</h2>
                                <p>{roomInfo.description}</p>
                            </div>
                            <Carousel>
                                {images.map(image => <Carousel.Item><img src={image} width={'660px'} height={'440px'} /></Carousel.Item>)}
                            </Carousel>
                        </div>
                        <div className='room-info-renting'>
                            <h2>Here you can rent this place</h2>
                            <div className='room-info-renting-content'>
                                <div>
                                    <h3>Renting</h3>
                                    <Calendar
                                        selectRange={true}
                                        onChange={(e) => { setDatePicked([Math.ceil(new Date(e[0]).getTime() / 1000), Math.ceil(new Date(e[1]).getTime() / 1000)]); console.log([Math.ceil(new Date(e[0]).getTime() / 1000), Math.ceil(new Date(e[1]).getTime() / 1000)]) }}
                                    />
                                </div>
                                <div className='room-info-renting-right'>
                                    <div className='room-info-renting-right-content'>
                                        <Form>
                                            <h3>Extras</h3>
                                            <Form.Group>
                                                <Form.Check type='checkbox' label="Extra Bedsheets - 10CHF per night" onChange={() => setExtraBedsheet(!extraBedsheet)} />
                                            </Form.Group>
                                            <br />
                                            <Form.Group>
                                                <Form.Check type='checkbox' label="Extra food - 50CHF per night" onChange={() => setExtraFood(!extraFood)} />
                                            </Form.Group>
                                            <br />
                                            <Form.Group>
                                                <Form.Check type='checkbox' label="Free garage - 20CHF per night" onChange={() => setFreeGarage(!freeGarage)} />
                                            </Form.Group>
                                        </Form>
                                        <Form>
                                            <h3>Labeling (only for you)</h3>
                                            <Form.Group>
                                                <Form.Label>Process name</Form.Label>
                                                <Form.Control type="email" placeholder='Process name' onChange={(e) => setProcessName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Process description</Form.Label>
                                                <Form.Control type="email" placeholder='Process description' onChange={(e) => setProcessDescription(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div>
                                        {datePicked === null ? <h2>Pick a date to calculate price</h2> :
                                            <h2>
                                                Your price: {price}.-
                                            </h2>
                                        }
                                        {isLoggedIn ? <Button onClick={() => bookHandler()} className='book-button'>Book</Button> : <Button disabled className='book-button'>Book</Button>}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Maps pos={roomInfo.coords} />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}