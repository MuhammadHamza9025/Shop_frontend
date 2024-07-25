import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import EditProduct from './EditProduct';
const ShowProducts = () => {
    const [openedit, setopenedit] = useState(false)
    const [items, setitems] = useState({})
    const handleedit = (id) => {
        setitems(id)
        setopenedit(true)
    }
    const products = useSelector(state => state.customreducer.products)
    return (
        <div className='py-10 border flex flex-wrap gap-2 justify-center bg-slate-200 max-w-[90%] h-[100vh] overflow-scroll'>
            {
                products?.map((e) => {
                    return (
                        <>
                            <div className='h-[210px] w-[220px]  flex flex-col border p-2 rounded-md shadow-sm bg-white'>
                                <img src={e.image[0]} alt="" className='h-[50%] w-[100%] object-contain ' />

                                <span className=' font-semibold my-2 p-2'>{e.title}</span>

                                <div className='flex justify-between px-2 items-center '>
                                    <span className='text-red-500 font-bold'>{e.newprice}.00$</span>


                                    <div className=' bg-gray-500 bg-opacity-20 cursor-pointer hover:bg-opacity-50 p-2 rounded-full' onClick={() => handleedit(e)}><EditIcon /></div>

                                </div>

                            </div>
                        </>
                    )
                })
            }
            <div className={`absolute  ${openedit ? 'block' : 'hidden'} `}>

                <EditProduct setopenedit={setopenedit} items={items}></EditProduct>
            </div>


        </div>
    )
}

export default ShowProducts
