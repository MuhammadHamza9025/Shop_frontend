import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decrement, setUsers } from '../Reducers/Reducer'

const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [data, setdata] = useState()
    const dispatch = useDispatch()

    const handlesignin = async () => {

        const info = { email, password };
        const fetlogin = await fetch('https://shop-backend-rust.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info),
            credentials: 'include'
        })
        const res = await fetlogin.json();
        setdata(res)
        alert(res.message);
        if (res.success) {
            navigate('/')
            // dispatch(setUsers(res.user));
            window.location.reload()


        }
    }





    return (

        <div className=' bg-gray-100 top-0 left-0 w-[100%] h-[100vh]  z-10 fixed'>

            <div className="text-center mt-10">
                <div className="flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="sm:text-4xl text-2xl tracking-tight">
                    Sign in into your account
                </h2>
                <span className="text-sm">or <Link to={'/register'} className="text-blue-500">
                    register a new account
                </Link>
                </span>
            </div>
            <div className="flex justify-center my-2 mx-4 md:mx-0">
                <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Email address</label>
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='email' required onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="w-full md:w-full px-3 mb-6">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Password</label>
                            <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required onChange={(e) => setpassword(e.target.value)} />
                        </div>
                        <div className="w-full flex items-center justify-between px-3 mb-3 ">
                            <label for="remember" className="flex items-center w-1/2">
                                <input type="checkbox" name="" id="" className="mr-1 bg-white shadow" />
                                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
                            </label>

                        </div>
                        <div className="w-full md:w-full px-3 mb-6 sm:mt-10">
                            <button className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500" onClick={handlesignin}>Sign in</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
