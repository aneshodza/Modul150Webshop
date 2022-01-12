import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { Redirect } from "react-router-dom"
import Loading from './Other/Loading';

export default function Account() {

    const [userAccount, setUserAccount] = useState()
    const [redirect, setRedirect] = useState(<p></p>);

    
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("user")) === null) {
            setRedirect(<Redirect to={{pathname: 'login'}}></Redirect>)
        } else {
            setRedirect(<p></p>)
        }
        console.log(JSON.parse(sessionStorage.getItem("user")))
        console.log(JSON.parse(sessionStorage.getItem("userdata")))
        setUserAccount({user: JSON.parse(sessionStorage.getItem("user")), userdata: JSON.parse(sessionStorage.getItem("userdata"))})
    }, [])

    return (
        <div className="account">
            { userAccount === undefined ? <Loading size={200} /> :
                <h1>You are currently logged in as {userAccount.user.displayName}</h1>

            }
            { redirect }
        </div>
    )
}