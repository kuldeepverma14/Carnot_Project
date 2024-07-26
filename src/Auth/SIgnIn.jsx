import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { FireAuth } from "../Firebase/Firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const googleAuthProvider = new GoogleAuthProvider()
const auth = getAuth(FireAuth)

const SignIn = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const submitUser = () => {
        signInWithEmailAndPassword(auth, user.user, user.pass)
            .then(value => {
                console.log(value)
                if (value?.user?.accessToken) {
                    localStorage.setItem('accessToken', value?.user?.accessToken);
                    navigate("/")
                }
            })
    }
    const GoogleSignUp = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then(value => {
                console.log(value)
                if (value?.user?.accessToken) {
                    localStorage.setItem('accessToken', value?.user?.accessToken);
                    navigate("/")
                }
            })
    }
    return (
        <>
            <h1>Sign In</h1>
            <div>
                <input className="border border-black" type="email" name="user" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                <input className="border border-black" type="password" name="pass" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                <button onClick={submitUser} >signin</button> <br />
                <button onClick={GoogleSignUp} >signin with google</button>
            </div>
        </>
    )
}
export default SignIn