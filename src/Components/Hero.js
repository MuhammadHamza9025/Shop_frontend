import React, { useEffect, useReducer } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../banner/img1.webp';
import img2 from '../banner/img5.webp';
import img3 from '../banner/img3.jpg';
import img4 from '../banner/img4.jpg';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setcategories } from "../Reducers/Reducer";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

// Custom arrow components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} right-2 z-10`}
            style={{ ...style, display: "block" }}
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
            const fetallp = await fetch('http://localhost:1000/getcategories');
            const res = await fetallp.json();
            setcate({ type: 'Ready', payload: res });

            // dispatch(setcategories(res))
        }
        fetchp();
    }, []);

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
        slidesToShow: 11,
        slidesToScroll: 0,


        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 10,
                    slidesToScroll: 1,


                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Slider {...settings2} className="flex gap-3 pt-20 relative  z-20 px-4 h-[100%] max-w-[96%]">
                {categories.cate.map(e => (
                    <div className="flex flex-col items-center" key={e.category}>
                        <Link to={`/products?category=${encodeURIComponent(e.category)}`} className="h-[90px] bg-gray-100 w-[90px] rounded-full flex flex-col items-center">
                            <img src={categories.type === 'Ready' && e.image} alt={e.categories} className="min-h-[100%] w-[100%] p-4 hover:p-3 cursor-pointer bg-gray-100 rounded-full object-contain" />
                            <span>{e.category}</span>

                        </Link>
                    </div>
                ))}
            </Slider>

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
        </>
    );
}
