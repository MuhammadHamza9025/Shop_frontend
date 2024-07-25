import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminProducts from './AdminProducts'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Users from '../Components/Users'
import AddProducts from './AddProducts'
import ShowProducts from './ShowProducts'


const Adminpanel = () => {

    return (
        <>
            <div className='flex flex-col md:flex-row pt-20 '>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path='users' element={<Users />}></Route>
                    <Route path='/' element={<Users />}></Route>
                    <Route path='addproducts' element={<AddProducts />}></Route>
                    <Route path='showproducts' element={<ShowProducts />}>

                    </Route>

                </Routes>
            </div>
        </>

    )
}

export default Adminpanel
