import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { setcarts } from '../Reducers/Reducer'
import Items from '../Components/Items'
const ProductDetails = () => {
    const [array, setarray] = useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const allitems = useSelector(e => e.customreducer.products)
    const user = useSelector(e => e.customreducer.users)
    const item = allitems.filter(e => e._id === id)
    const [indexofimage, setindex] = useState(0)
    const navigate = useNavigate()
    const category = item.map(e => e.category)
    const categoryfilter = allitems.filter(e => e.category == category)
    const handlecart = async (id) => {

        // console.log(id)
        if (user) {

            dispatch(setcarts(id))
            const fetchproduct = await fetch('https://shop-backend-rust.vercel.app/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
                credentials: 'include'
            }).then((res) => res.json()).then((data) => alert(data.message))
            window.location.reload()
        }
        else {
            alert('not logined')
            navigate('/login')
        }


    }
    return (
        <>
            <div className=' p-10 flex pt-20'>
                <div>
                    {
                        item?.map((e, index) => (
                            <div key={index} className='flex gap-4' >
                                <div className='flex flex-col gap-3 w-[70px] h-[70px]'>
                                    {
                                        e.image.map((imgSrc, imgIndex) => (
                                            <img key={imgIndex} src={imgSrc} alt={`image-${imgIndex}`} onMouseEnter={() => setindex(imgIndex)} onClick={() => setindex(imgIndex)} className='p-2  bg-gray-200 cursor-pointer w-[100%] h-[100%] object-contain ' />
                                        ))
                                    }
                                </div>
                                <div className='h-[350px] w-[400px]'>
                                    <img src={e.image[indexofimage]} alt={`main-image-${index}`} className='w-[100%] h-[100%] bg-gray-200 rounded-md object-center object-contain  p-2 cursor-pointer' />
                                </div>

                                <div className='py-6 px-3'>
                                    <h2 className='text-3xl mb-4 font-semibold'>{e.title}</h2>
                                    <span className='my-6 text-lg text-slate-400 font-semibold'>{e.category}</span>
                                    <div className='flex gap-10 my-6 items-center'>
                                        <span className='text-3xl text-red-600 font-semibold'>{e.newprice}.00$</span>
                                        <span className='italic line-through text-gray-500 text-3xl '>{e.oldprice}.00$</span>
                                    </div>
                                    <div className='flex gap-10 my-10'>
                                        <button className='border-[2.3px] p-2 px-8 text-red-600 font-semibold text-lg hover:text-white hover:bg-red-500 hover:border-red-500 rounded-md border-red-600'>Buy</button>
                                        <button className='border-[2.3px] p-2 px-8 font-semibold text-lg text-white bg-red-500 hover:bg-transparent hover:text-red-500 rounded-md border-red-600' onClick={() => handlecart(e)}>Add to Cart</button>
                                    </div>
                                    <div>
                                        <span className='' > <b>Description: </b>{e.description}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div>
                </div>


            </div>
            <div>
                <h2 className='mx-6 font-semibold text-3xl my-14'>Related Products</h2>
                <div className=' flex gap-6 px-2 flex-wrap justify-center '>
                    {
                        categoryfilter.filter(e => e._id !== id).slice(0, 6).map(e =>
                            <React.Fragment key={e._id}>
                                <Items title={e.title} image={e.image} key={e._id} category={e.category} newprice={e.newprice} _id={e._id} oldprice={e.oldprice} description={e.description}></Items>
                            </React.Fragment>
                        )

                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetails
