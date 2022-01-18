import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import Header from "./Header.js";
import { useAuth } from "../Context/AuthContext"
import { Redirect } from "react-router-dom"
import Loading from './Other/Loading';
import "../Styles/Account.css"

export default function Account() {

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
    const [redirect, setRedirect] = useState(<p></p>);


    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("user")) === null) {
            setRedirect(<Redirect to={{ pathname: 'login' }}></Redirect>)
        } else {
            setRedirect(<p></p>)
            setUserAccount({ user: JSON.parse(sessionStorage.getItem("user")), userdata: JSON.parse(sessionStorage.getItem("userdata")) })
        }
        console.log(JSON.parse(sessionStorage.getItem("user")))
        console.log(JSON.parse(sessionStorage.getItem("userdata")))
        console.log({ user: JSON.parse(sessionStorage.getItem("user")), userdata: JSON.parse(sessionStorage.getItem("userdata")) })
    }, [])

    return (
        <div className="account" style={{overflowY: 'hidden'}}>
            <Header active={4}/>
            {userAccount.user.email === '' ? <Loading size={200} /> :
                <div>
                    <div className="account-content">
                        <div className="account-data account-div">
                            <h2>Your account data</h2>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.user.displayName} disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.user.email} disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.userdata.address.country} disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.userdata.address.city} disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.userdata.address.street} disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>House number</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={userAccount.userdata.address.houseNumber} disabled />
                            </Form.Group>
                        </div>
                        <div className="account-reservations account-div">
                            <h2>Your reservations</h2>
                            { userAccount.userdata.reservations.reservations.length <= 0 ? <h4 className="account-no-reservations">You dont have any reservations</h4> :
                            <div>
                                { userAccount.userdata.reservations.reservations.map(reservation => {
                                    <p>reservation</p>
                                })}
                            </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {redirect}
        </div>
    )
}