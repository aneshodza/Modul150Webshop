import React, { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import "../Styles/Login.css"
import { useAuth } from "../Context/AuthContext"
import { Redirect } from "react-router-dom"

var shadow; var form;

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [wrong, setWrong] = useState({isWrong: false, message: ""});
    const [redirect, setRedirect] = useState(<p></p>);
    const { login, setUserdata } = useAuth()

    form = React.createRef()
    shadow = React.createRef()

    useEffect(() => {
        setRedirect(<p></p>)
        shadow.current.style.height = form.current.clientHeight + 10 + "px"
    }, [])

    const loginHandler = () => {
        if (email === undefined || password === undefined) {
            setWrong({isWrong: true, message: "Please fill in all fields"})
        } else if (email.replace(/\s/g, '').length < 1 || password.replace(/\s/g, '').length < 1) {
            setWrong({isWrong: true, message: "Please fill in all fields"})
        } else {
            login(email, password)
                .then(async data => {
                    sessionStorage.removeItem('user')
                    sessionStorage.setItem('user', JSON.stringify(data.user))
                    sessionStorage.removeItem('userdata')
                    sessionStorage.setItem('userdata', JSON.stringify(data.userdata))
                    setRedirect(<Redirect to={{pathname: 'account'}}></Redirect>)
                })
                .catch((err) => {
                    let errorMessage = JSON.parse(JSON.stringify(err))
                    if (errorMessage.code === 'auth/wrong-password') {
                        setWrong({isWrong: true, message: "Wrong password"})
                    } else if (errorMessage.code === 'auth/user-not-found') {
                        setWrong({isWrong: true, message: "User not found"})
                    } else if (errorMessage.code === 'auth/invalid-email') {
                        setWrong({isWrong: true, message: "Invalid email"})
                    } else if (errorMessage.code === 'auth/argument-error') {
                        setWrong({isWrong: true, message: "Invalid email"})
                    } else if (errorMessage.code === 'auth/network-request-failed') {
                        setWrong({isWrong: true, message: "Network error"})
                    } else if (errorMessage.code === 'auth/too-many-requests') {
                        setWrong({isWrong: true, message: "Too many requests, try again later"})
                    } else {
                        setWrong({isWrong: true, message: "Something went wrong"})
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <div className="main-div login" ref={form}>
                <h1>Please log in to continue</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail" className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" autoFocus onChange={(event) => setEmail(event.target.value)} />
                        <Form.Text className="text-muted">
                            We would never share your email
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className={wrong.isWrong ? "form-field wrong" : "form-field"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={showPassword ? 'username' : 'password'} placeholder="Password" onChange={(event) => setPassword(event.target.value)} autoComplete="on"/>
                        <Form.Text className="text-muted">
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show password
                        </Form.Text>
                    </Form.Group>
                    <small className="login-error-message">{wrong.isWrong ? wrong.message  : ''}</small> <br/>
                    <Button className="signup-switch" variant="light" onClick={() => setRedirect(<Redirect to={{pathname: '/register'}}></Redirect>)}>
                        Register
                    </Button>
                    <Button className="login-button" variant="light" onClick={() => loginHandler()}>
                        Log in
                    </Button>
                </Form>
            </div>
            <span className="login-border" ref={shadow} />
            { redirect }
        </React.Fragment>
    )
}


window.addEventListener('resize', () => {
    try {
        shadow.current.style.height = form.current.clientHeight + 10 + "px"
    } catch (error) {
        
    }
})