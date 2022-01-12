import React, { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import "../Styles/Login.css"
import { useAuth } from "../Context/AuthContext"
import { Redirect } from "react-router-dom"
import { auth } from "../firebase.js";

var shadow; var form;

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [userAccount, setUserAccount] = useState({
        email: undefined,
        password: undefined,
        username: undefined,
        address: {
            country: undefined,
            city: undefined,
            street: undefined,
            houseNumber: undefined
        }
    });
    const [wrong, setWrong] = useState({ isWrong: false, message: "" });
    const [redirect, setRedirect] = useState(<p></p>);
    const { signup } = useAuth()

    form = React.createRef()
    shadow = React.createRef()

    const fieldChangeHandler = (value, item) => {
        let tempUser = userAccount
        if (item === "email") {
            tempUser.email = value
        } else if (item === "password") {
            tempUser.password = value
        } else if (item === "username") {
            tempUser.username = value
        } else if (item === "country") {
            tempUser.address.country = value
        } else if (item === "city") {
            tempUser.address.city = value
        } else if (item === "street") {
            tempUser.address.street = value
        } else if (item === "houseNumber") {
            tempUser.address.houseNumber = value
        }
        setUserAccount(tempUser)
    }

    const registerHandler = () => {
        if (userAccount.email === undefined || userAccount.password === undefined || userAccount.username === undefined || userAccount.address.country === undefined || userAccount.address.city === undefined || userAccount.address.street === undefined || userAccount.address.houseNumber === undefined) {
            setWrong({ isWrong: true, message: "Please fill in all fields" })
            return
        } else if (userAccount.email.replace(/\s/g, '').length < 1 || userAccount.password.replace(/\s/g, '').length < 1 || userAccount.username.replace(/\s/g, '').length < 1 || userAccount.address.country.replace(/\s/g, '').length < 1 || userAccount.address.city.replace(/\s/g, '').length < 1 || userAccount.address.street.replace(/\s/g, '').length < 1 || userAccount.address.houseNumber.replace(/\s/g, '').length < 1) {
            setWrong({ isWrong: true, message: "Please fill in all fields" })
            return
        }
        signup(userAccount.email, userAccount.password, userAccount.username, userAccount.address)
            .then(async data => {

                sessionStorage.removeItem('user')
                sessionStorage.setItem('user', JSON.stringify(data.user))
                sessionStorage.removeItem('userdata')
                sessionStorage.setItem('userdata', JSON.stringify(data.userdata))
                setRedirect(<Redirect to={{ pathname: 'account' }}></Redirect>)
            })
            .catch((err) => {
                console.log(err)
                let errorMessage = JSON.parse(JSON.stringify(err))
                if (errorMessage.code === "auth/weak-password") {
                    setWrong({ isWrong: true, message: "Weak password" })
                } else if (errorMessage.code === "auth/email-already-in-use") {
                    setWrong({ isWrong: true, message: "Email already in use" })
                } else if (errorMessage.code === "auth/invalid-email") {
                    setWrong({ isWrong: true, message: "Invalid email" })
                } else if (errorMessage.code === 'auth/network-request-failed') {
                    setWrong({ isWrong: true, message: "Network error" })
                } else if (errorMessage.code === 'auth/too-many-requests') {
                    setWrong({ isWrong: true, message: "Too many requests, try again later" })
                } else {
                    setWrong({ isWrong: true, message: "Something went wrong" })
                }
            })
    }

    useEffect(() => {
        setRedirect(<p></p>)
        shadow.current.style.height = form.current.clientHeight + 10 + "px"
    }, [])

    return (
        <React.Fragment>
            <div className="main-div-parent">
                <div className="main-div register" ref={form}>
                    <h1>Please fill out to continue</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" autoFocus onChange={(event) => fieldChangeHandler(event.target.value, "email")} />
                            <Form.Text className="text-muted">
                                We would never share your email
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder="Username" onChange={(event) => fieldChangeHandler(event.target.value, "username")} />
                            <Form.Text className="text-muted">
                                Username must be unique
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={showPassword ? 'username' : 'password'} placeholder="Password" onChange={(event) => fieldChangeHandler(event.target.value, "password")} autoComplete="on" />
                            <Form.Text className="text-muted">
                                <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show password
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>Country of residence</Form.Label>
                            <Form.Control type="email" placeholder="Country" onChange={(event) => fieldChangeHandler(event.target.value, "country")} />
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>City of residence</Form.Label>
                            <Form.Control type="email" placeholder="City" onChange={(event) => fieldChangeHandler(event.target.value, "city")} />
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="email" placeholder="Street" onChange={(event) => fieldChangeHandler(event.target.value, "street")} />
                        </Form.Group>
                        <Form.Group className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                            <Form.Label>House number</Form.Label>
                            <Form.Control type="email" placeholder="House number" onChange={(event) => fieldChangeHandler(event.target.value, "houseNumber")} />
                        </Form.Group>
                        <small className="login-error-message">{wrong.isWrong ? wrong.message : ''}</small> <br />
                        <Button className="signup-switch" variant="light" onClick={() => setRedirect(<Redirect to={{ pathname: '/login' }}></Redirect>)}>
                            Log in
                        </Button>
                        <Button className="login-button" variant="light" onClick={() => registerHandler()}>
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
            <span className="login-border register" ref={shadow} />
            {redirect}
        </React.Fragment>
    )
}


window.addEventListener('resize', () => {
    try {
        shadow.current.style.height = form.current.clientHeight + 10 + "px"
    } catch (error) {

    }
})