import React from 'react'
import Adminpanel from '../Admin_panel/Adminpanel'
import { useState, useEffect } from 'react'

const Users = () => {
    const [allusers, setalluser] = useState([])
    const [options, setoptions] = useState('User')
    const [userdetail, setuserdetail] = useState(false)
    const [getid, setid] = useState()

    useEffect(() => {
        const getalluser = async () => {
            const response = await fetch('http://localhost:1000/getalluser', {

                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()

            setalluser(data)
        }
        getalluser()
    }, [Adminpanel])


    const handleupdate = async (id) => {

        setuserdetail(false)
        window.location.reload()
        const data = { id, options }

        const updateuser = await fetch('http://localhost:1000/updateuser', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then(() => alert('Updated'))
        console.log('hi')



    }
    return (
        <div>
            <div class=" overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            allusers.map(e =>
                                <>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {e.UserName}
                                        </th>
                                        <td class="px-6 py-4">
                                            {e.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {e.role}
                                        </td>
                                        <td class="px-6 py-4">
                                            <button className='border-2' onClick={() => { setid(e._id); setuserdetail(true) }}>Edit Role</button>
                                        </td>
                                    </tr>
                                </>

                            )}

                    </tbody>
                </table>


            </div>

            <div className={`absolute w-70vw h-full top-0  items-center justify-center ${userdetail ? 'flex ' : 'hidden'}`}>
                {
                    allusers.filter(e => e._id == getid)
                        .map((e) =>
                            <>
                                <div className=' relative bg-slate-200 p-4 gap-2 flex flex-col items-center justify-center'>
                                    <div className='absolute -top-2 -right-1'>
                                        <span className='bg-gray-700 rounded-full p-1 cursor-pointer' onClick={() => setuserdetail(false)}>❌</span>
                                    </div>
                                    <div className='flex justify-center m-2 font-semibold text-2xl'>
                                        <h2>Update Role</h2>
                                    </div>
                                    <h2>UserName :<b> {userdetail && e.UserName}</b> </h2>
                                    <h2 className='m-2'>Email : <b>{userdetail && e.email}</b></h2>

                                    <select name="role" id="" onChange={(e) => setoptions(e.target.value)} className=' m-2'>
                                        <option value='User' > User</option>
                                        <option value={'Admin'}>Admin</option>
                                    </select>

                                    <button className='bg-red-500 p-2 rounded-sm font-semibold text-white px-4' onClick={() => handleupdate(e._id)}>Update</button>
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}

export default Users
