import React from 'react'
import { Link } from 'react-router-dom'

const Items = ({ _id, title, image, description, category, newprice, oldprice }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <React.Fragment key={_id}>
            <div className='border h-[370px] w-[327px]  my-2' onClick={scrollToTop}>
                <img src={image[0]} alt="" className=' cursor-pointer p-2 hover:transition-transform hover:p-0 bg-gray-100 h-[55%] w-[100%] object-contain border border-b' />
                <div className='bg-white flex flex-col p-4'>
                    <span className=' text-lg'>{title}</span>
                    <span className='my-3 text-lg'>{category}</span>
                    <div className='flex w-[50%] justify-between'>
                        <span className=' text-lg font-bold text-red-600'>{newprice}.00$</span>
                        <span className=' text-lg text-gray-400 line-through italic'>{oldprice}.00$</span>
                    </div>
                    <Link to={`/${category}/${_id}`}> <button className='m-auto mt-3  border-none outline-none p-1 font-semibold text-white rounded-2xl bg-red-600 w-[80%]'>Add to Cart</button>
                    </Link>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Items
