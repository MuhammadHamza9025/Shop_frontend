import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Items from '../Components/Items';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const AllProducts = () => {
    const [sortCriteria, setSortCriteria] = useState('Lowtohigh');
    const [categories, setcate] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const query = useQuery();
    const category = query.get('category') || 'All';
    const items = useSelector(e => e.customreducer.products);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchp = async () => {
            const fetallp = await fetch('http://localhost:1000/getcategories');
            const res = await fetallp.json();
            setcate(res);
        };
        fetchp();
    }, [AllProducts]);

    useEffect(() => {
        let filtered = category === 'All' ? [...items] : items.filter(e => e.category === category);

        if (sortCriteria === 'Lowtohigh') {
            filtered.sort((a, b) => a.newprice - b.newprice);
        } else if (sortCriteria === 'hightolow') {
            filtered.sort((a, b) => b.newprice - a.newprice);
        } else if (sortCriteria === 'name-asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortCriteria === 'name-desc') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredItems(filtered);
    }, [sortCriteria, category, items]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        navigate(`?category=${encodeURIComponent(selectedCategory)}`); // Update URL with selected category
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value); // Update sorting criteria
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='flex bg-slate-100 pt-16'>
            <div className='min-w-[240px] bg-white flex flex-col gap-4 p-4 fixed h-[100vh] overflow-scroll'>
                <span className='font-bold text-lg text-center text-gray-400'>Sorted By :</span>
                <div className='flex gap-2'>
                    <input type="radio" name='sort' value='Lowtohigh' onChange={handleSortChange} checked={sortCriteria === 'Lowtohigh'} />
                    <label htmlFor="" className='text-sm'>Price-Low to High</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" name='sort' value='hightolow' onChange={handleSortChange} checked={sortCriteria === 'hightolow'} />
                    <label htmlFor="" className='text-sm'>Price-High to Low</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" name='sort' value='name-asc' onChange={handleSortChange} checked={sortCriteria === 'name-asc'} />
                    <label htmlFor="" className='text-sm'>Name A-Z</label>
                </div>
                <div className='flex gap-2'>
                    <input type="radio" name='sort' value='name-desc' onChange={handleSortChange} checked={sortCriteria === 'name-desc'} />
                    <label htmlFor="" className='text-sm'>Name Z-A</label>
                </div>
                <hr />
                <span className='font-bold text-lg text-center text-gray-400'>Category</span>
                <div className='flex gap-2'>
                    <input type="radio" name='cate' value='All' onChange={handleCategoryChange} checked={category === 'All'} />
                    <label htmlFor="" className='text-xs'>All Products</label>
                </div>
                {categories.map(e => (
                    <div key={e.category} className='flex items-center gap-1'>
                        <input type="radio" name='cate' value={e.category} onChange={handleCategoryChange} checked={category === e.category} />
                        <label htmlFor="">{e.category}</label>
                    </div>
                ))}
            </div>

            <div className='ml-[240px]'>
                <div className='flex px-10 my-4  items-center'>
                    <span className='text-2xl'>Search Results: {filteredItems.length}</span>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    {filteredItems.map(e => (
                        <div key={e._id} onClick={scrollToTop}>
                            <Items
                                title={e.title}
                                image={e.image}
                                category={e.category}
                                newprice={e.newprice}
                                _id={e._id}
                                oldprice={e.oldprice}
                                description={e.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
