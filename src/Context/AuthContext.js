import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userdata, setUserdata] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password, username, address) {
        try {
            return createUserWithEmailAndPassword(auth, email, password)
                .then(async cred => {
                    await updateProfile(cred.user.auth.currentUser, { displayName: username })
                    await sendEmailVerification(cred.user)
                    await setDoc(doc(db, "addresses/", cred.user.uid), {
                        city: address.city,
                        country: address.country,
                        houseNumber: address.houseNumber,
                        street: address.street
                    })
                    await setDoc(doc(db, "reservations/", cred.user.uid), {
                        reservations: []
                    })
                    let userdata = { address: null, reservations: null }
                    userdata.address = await getDoc(doc(db, "addresses/", cred.user.uid))
                        .then(data => {
                            return data.data()
                        })
                    userdata.reservations = await getDoc(doc(db, "reservations/", cred.user.uid))
                        .then(data => {
                            return data.data()
                        })
                    return { user: cred.user, userdata: userdata }
                })
        } catch (error) {
            return console.log(error)
        }
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async cred => {
                let userdata = { address: null, reservations: null }
                userdata.address = await getDoc(doc(db, "addresses/", cred.user.uid))
                    .then(data => {
                        return data.data()
                    })
                userdata.reservations = await getDoc(doc(db, "reservations/", cred.user.uid))
                    .then(data => {
                        return data.data()
                    })
                return { user: cred.user, userdata: userdata }
            })
    }

    async function createReservation(reservation, uid) {
        console.log(reservation)
        if (reservation.processName === "") {
            reservation.processName = "Unnamed process"
        }
        if (reservation.processDescription === "") {
            reservation.processDescription = "No process description"
        }
        let tempPastBookings = await getDoc(doc(db, "reservations/", uid))
        .then(data => {
            return data.data()
        })
        tempPastBookings.reservations.push(reservation)
        await setDoc(doc(db, "reservations/", uid), tempPastBookings)
        tempPastBookings = await getDoc(doc(db, "reservations/", uid))
        .then(data => {
            return data.data()
        })
        return tempPastBookings
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        userdata,
        setUserdata,
        createReservation
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}