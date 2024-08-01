import React, { useEffect, useReducer } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../banner/img1.webp';
import img2 from '../banner/img5.webp';
import img3 from '../banner/img3.jpg';
import img4 from '../banner/img4.jpg';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setcategories } from "../Reducers/Reducer";
import { Link } from "react-router-dom";
import Items from "./Items";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

// Custom arrow components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} right-2 z-10`}
            style={{ ...style, display: "block", background: 'black' }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} left-2 z-10`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
};

export default function Hero() {
    const dispatch = useDispatch();
    const query = useQuery();
    const category = query.get('category');
    const initialState = {
        cate: [],
        type: 'Loading'
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'Loading':
                return { ...state, type: 'Loading', cate: [] };
            case 'Ready':
                return { ...state, type: 'Ready', cate: action.payload };
            default:
                return state;
        }
    };

    const [categories, setcate] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchp = async () => {
            const fetallp = await fetch('https://shop-backend-rust.vercel.app/getcategories');
            const res = await fetallp.json();
            setcate({ type: 'Ready', payload: res });

            // dispatch(setcategories(res))
        }
        fetchp();
    }, []);

    var settings3 = {
        infinite: true,
        speed: 500,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    var settings2 = {
        speed: 500,
        // slidesToShow: 11,  // Start with 11 slides visible
        slidesToScroll: 10, // Scroll one slide at a time

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 10,  // Show 10 slides for screens 1024px and below
                    slidesToScroll: 10
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 8,   // Show 8 slides for screens 768px and below
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,   // Show 6 slides for screens 600px and below
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,   // Show 4 slides for screens 480px and below
                    slidesToScroll: 1
                }
            }
        ]
    };
    const allproducts = useSelector(e => e.customreducer.products)
    console.log(allproducts)
    return (
        <>

            <div className="flex gap-3 pt-20 relative  z-20 px-4 h-[100%] max-w-[96%]">
                {categories.cate.map(e => (
                    <div className="flex flex-col items-center" key={e.category}>
                        <Link to={`/products?category=${encodeURIComponent(e.category)}`} className="h-[90px] bg-gray-100 w-[90px] rounded-full flex flex-col items-center">
                            <img src={categories.type === 'Ready' && e.image} alt={e.categories} className="min-h-[100%] w-[100%] p-4 hover:p-3 cursor-pointer bg-gray-100 rounded-full object-contain" />
                            <span>{e.category}</span>

                        </Link>
                    </div>
                ))}
            </div>

            <Slider {...settings} className="py-30 m-auto mt-10 max-w-[95%] max-h-[300px] overflow-hidden">
                <div className="h-[300px] w-[100%]">
                    <img src={img1} alt="" className="object-cover w-full h-[100%]" />
                </div>
                <div className="h-[300px] w-[100%]">
                    <img src={img2} alt="" className="object-cover w-full h-[100%]" />
                </div>
                <div className="h-[300px] w-[100%]">
                    <img src={img3} alt="" className="object-cover w-full h-[100%]" />
                </div>
                <div className="h-[300px] w-[100%]">
                    <img src={img4} alt="" className="object-cover w-full h-[100%]" />
                </div>
            </Slider>

            {/* ..................................... */}
            {/* HOrizontal  */}
            <div className="my-10">
                <Slider {...settings3} className="!my-2 flex !gap-2 flex-row !max-w-[98%] p-2 !justify-center !items-center" >

                    {
                        allproducts.map(e =>
                            <div className="!w-[320px] !h-[160px] !flex border rounded-md bg-white cursor-pointer   !mx-2">
                                <div className="min-w-[50%] max-w-[50%] h-[100%] flex justify-center object-cover bg-gray-300 p-2"><img className=" h-[100%] object-contain" src={e.image[0]} alt="" /></div>
                                <div className="flex flex-col ml-2">

                                    <span className=" my-1 font-semibold text-lg">{Object.values(e.title).length <= 15 ? e.title.slice(0, 1).toUpperCase().concat(e.title.slice(1)) : `${e.title.slice(0, 15)}...`}</span>
                                    <span className=" my-1 font-semibold text-gray-400 ">{e.category}</span>
                                    {/* <span className="my-1">{Object.values(e.description).length <= 22 ? e.description : `${e.description.slice(0, 22)}...`}</span> */}
                                    <div className="flex gap-4 my-2">
                                        <span className="font-semibold text-red-600">{e.newprice}$</span>
                                        <span className="font-semibold text-gray-300 italic line-through">{e.oldprice}$</span>

                                    </div>
                                    <Link > <button className='!m-auto  border-none outline-none mt-2 p-1 font-semibold text-white rounded-2xl bg-red-600 w-[110px] sm:w-[140px] '>Add to Cart</button>
                                    </Link>                                </div>
                            </div>
                        )
                    }

                </Slider>
            </div>
            <div >
                <Slider {...settings3} className="!my-2 flex !gap-2 flex-row !max-w-[98%] p-2 !justify-center !items-center" >

                    {
                        allproducts.filter(item => item.category == 'Earphones').map(e =>
                            <div className="!w-[320px] !h-[160px] !flex border rounded-md bg-white cursor-pointer   !mx-2">
                                <div className="min-w-[50%] max-w-[50%] h-[100%] flex justify-center object-cover bg-gray-300 p-2"><img className=" h-[100%] object-contain" src={e.image[0]} alt="" /></div>
                                <div className="flex flex-col ml-2">

                                    <span className=" my-1 font-semibold text-lg">{Object.values(e.title).length <= 15 ? e.title.slice(0, 1).toUpperCase().concat(e.title.slice(1)) : `${e.title.slice(0, 15)}...`}</span>
                                    <span className=" my-1 font-semibold text-gray-400 ">{e.category}</span>
                                    {/* <span className="my-1">{Object.values(e.description).length <= 22 ? e.description : `${e.description.slice(0, 22)}...`}</span> */}
                                    <div className="flex gap-4 my-2">
                                        <span className="font-semibold text-red-600">{e.newprice}$</span>
                                        <span className="font-semibold text-gray-300 italic line-through">{e.oldprice}$</span>

                                    </div>
                                    <Link > <button className='!m-auto  border-none outline-none mt-2 p-1 font-semibold text-white rounded-2xl bg-red-600 w-[110px] sm:w-[140px] '>Add to Cart</button>
                                    </Link>                                </div>
                            </div>
                        )
                    }

                </Slider>
            </div>



            {/* verticle */}

            <div className="mt-10" >
                <Slider {...settings3} className="!my-2 flex !gap-2 !max-w-[98%] p-2 !justify-center !items-center" >

                    {
                        allproducts.filter(item => item.category == 'Mobile').map(e =>
                            // e.category == 'Mobiles' &&
                            <Items title={e.title} image={e.image} description={e.description} oldprice={e.oldprice} newprice={e.newprice} _id={e._id} />
                        )
                    }

                </Slider>
            </div >
            {/* ........................ */}
            <div className="mt-10" >
                <Slider {...settings3} className="!my-2 flex !gap-2 !max-w-[98%] p-2 !justify-center !items-center" >

                    {
                        allproducts.filter(item => item.category == 'Earphones').map(e =>
                            // e.category == 'Mobiles' &&
                            <Items title={e.title} image={e.image} description={e.description} oldprice={e.oldprice} newprice={e.newprice} _id={e._id} />
                        )
                    }

                </Slider>
            </div >
        </>
    );
}
