import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { FireAuth } from "../Firebase/Firebase"
import { useState } from "react"

const auth = getAuth(FireAuth)
const SignUp = () => {
    const [user, setUser] = useState()
    const submitUser = () => {
        // console.log(data)
        createUserWithEmailAndPassword(auth,user.user,user.pass)
        .then(value => console.log(value))
    }
    console.log(user)
    return <>
    <h1>Sign Up</h1>
        <form>
            <input className="border border-black" type="email" name="user" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
            <input className="border border-black" type="password" name="pass" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
            <button onClick={submitUser} >sign up</button>
        </form>
    </>
}
export default SignUp