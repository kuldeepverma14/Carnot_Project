import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { FireAuth } from "../Firebase/Firebase"
import { useState } from "react"
import logo1 from "../assets/Logo1.png"
import { Link, useNavigate } from "react-router-dom"

const auth = getAuth(FireAuth)
const SignUp = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const submitUser = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, user.user, user.pass)
            .then(value => {
                console.log(value)
                if (value?.user) {
                    navigate("/")
                }
            }).catch(error => {
                console.error("Error during sign up:", error)
            })

    }
    console.log(user)
    return (
        <div className="flex flex-col px-3 bg-blue-50 justify-center items-center h-screen">
            <div className=''>
                <img className='' width={350} src={logo1} alt="logo not found" />
            </div>
            <div className="shadow-lg rounded-lg bg-white mt-5 p-10">
                <h1 className="text-2xl  text-center font-bold">Sign Up</h1>
                <form>
                    <div className="mt-5">
                        <label htmlFor="user">Email:</label>
                        <div>
                            <input className="border border-blue-300 sm:w-96 bg-white p-2  rounded" type="email" name="user" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="pass">Password:</label>
                        <div>
                            <input className="sm:w-96 p-2 border rounded bg-white border-blue-300" type="password" name="pass" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} />
                        </div>
                    </div>
                    <div className='flex justify-center mt-5 '>
                        <button onClick={submitUser} className="px-4 w-full sm:w-96 py-2 mt-4 text-white bg-[#38C0E6] rounded ">
                            Sign Up
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                      <p>Already have an account? &nbsp; </p> <Link to="/" className="underline text-[#38C0E6]">Sign In</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp