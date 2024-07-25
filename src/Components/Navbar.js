import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { setUsers, clearcookie, setcartsitems } from '../Reducers/Reducer';


const Navbar = () => {
    const [active, setactive] = useState('Home')
    const [nav, setnav] = useState(false)
    const [data, setdata] = useState()

    const dispatch = useDispatch()
    const users = useSelector(state => state.customreducer.users)
    const cart = useSelector(state => state.customreducer.cartitems)



    const handlelogout = async () => {
        const fetlogin = await fetch('https://shop-backend-rust.vercel.app/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        dispatch(clearcookie())


    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://shop-backend-rust.vercel.app/user', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                dispatch(setUsers(data.user));
                dispatch(setcartsitems(data.user.cart))
                // console.log(data.user.cart._id)

            } catch (error) {
                console.error('Failed to fetch users:', error); // Debugging: Log fetch error
            }
        };

        fetchUsers();



    }, [dispatch]);


    return (
        <div className='flex justify-between items-center  z-50 shadow-md p-3 text-sm fixed w-[100%] bg-white'>
            <div className='ml-4  order-1 md:order-1'>
                <span className='border p-2 rounded-md border-2-purple-500 bg-purple-700 text-white font-semibold '>Hamza's</span>
                Blog
            </div>
            {/* ////////////////////// */}
            <div className='order-2 '>
                <div className='border-2 flex p-2 rounded-md active:border-gray-200 hover:border-gray-200'>
                    <input type="text" placeholder='Search..' className='border-none outline-none hidden md:flex bg-transparent' />
                    <SearchIcon></SearchIcon>
                </div>

            </div>
            {/*  */}

            <div className=' order-4 md:order-3 flex relative'>
                <div className='md:hidden' onClick={() => setnav(!nav)}>
                    <div className='w-[30px] rounded-md h-[3px] bg-black m-1'></div>
                    <div className='w-[30px] rounded-md h-[3px] bg-black m-1'></div>
                    <div className='w-[30px] rounded-md h-[3px] bg-black m-1'></div>

                </div>
                <ul className={`md:space-x-8  space-x-0 md:flex ${nav ? 'opened  ' : 'hidden'}  `}>
                    <Link to={'/'} className={`cursor-pointer ${active === 'Home' && 'text-green-600 font-bold'}`} onClick={() => { setactive('Home'); setnav(false) }}>Home</Link>
                    <Link to={'/about'} className={`cursor-pointer ${active === 'About' && 'text-green-600 font-bold'}`} onClick={() => { setactive('About'); setnav(false) }}>About</Link>
                    <Link to={'/projects'} className={`cursor-pointer ${active === 'Projects' && 'text-green-600 font-bold'}`} onClick={() => { setactive('Projects'); setnav(false) }}>Projects</Link>
                </ul>
            </div>
            {/*  */}
            <div className='mr-4 space-x-4 flex items-center md:order-4 order-3'>
                <Link to={'/cart'}>
                    <div
                        className='relative cursor-pointer'>
                        <LocalMallIcon />
                        <sup className='bg-red-500 p-2 h-[20px] text-white font-bold flex justify-center items-center w-[20px] rounded-full absolute -top-2 -right-3'>{cart.length}</sup>
                    </div></Link>
                {
                    users ?
                        <>

                            {/* <div >
                                <button className='border-purple-600 p-2 border rounded-md hover:bg-purple-500 hover:text-white hover font-semibold px-4' onClick={handlelogout}>logout</button>
                            </div> */}
                            <div className='relative group'>

                                <img
                                    src={users.Profile}
                                    alt=""
                                    className='h-[45px] w-[45px] rounded-full cursor-pointer'
                                />
                                <div className='absolute top-15 left-1/2 z-100 transform -translate-x-1/2 border px-4 p-2 bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    {
                                        users?.role === 'Admin' ?

                                            <Link to={'/admin-panel'}><p className='cursor-pointer'>{users.role}</p></Link>
                                            :
                                            <p className='cursor-pointer'>{users.role}</p>
                                    }
                                </div>
                            </div>
                            <button className='border-purple-600 p-2 border rounded-md hover:bg-purple-500 hover:text-white hover font-semibold px-4' onClick={handlelogout}>Logout</button>




                        </>
                        : <Link to='/login'>
                            <button className='border-purple-600 p-2 border rounded-md hover:bg-purple-500 hover:text-white hover font-semibold px-4'>Sign in</button>

                        </Link>
                }

            </div>

            {/*  */}

        </div>
    )
}

export default Navbar
