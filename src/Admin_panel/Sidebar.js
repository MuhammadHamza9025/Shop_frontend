import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <>
            <div className=' md:min-w-[240px]   flex md:flex-col items-center bg-white justify-around md:justify-normal md:h-[100dvh] ' >
                <div className='  w-[170px] flex md:w-[79%]  bg-slate-100 items-center p-2 text-blue-600 my-12 cursor-pointer'>
                    <Link to={'addproducts'} className='flex justify-around' >
                        <span>Add Products</span></Link>
                </div>
                <div className=' w-[170px] md:w-[70%]  bg-slate-100 items-center p-2 text-blue-600 cursor-pointer'>
                    <Link to={'showproducts'} className='flex justify-around'>
                        <span>Product List</span></Link>
                </div>
                <div className=' w-[170px] my-10 md:w-[70%]  bg-slate-100 items-center p-2 text-blue-600 cursor-pointer'>
                    <Link to={'users '} className='flex justify-around'>    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOOmyZaeLf1DWtIXaPTuz4hCuWntSyrBowA&usqp=CAU' alt="" className='h-[30px] object-contain' />
                        <span>All Users</span></Link>
                </div>

            </div>
        </>
    )
}

export default Sidebar
