import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const EditProduct = ({ setopenedit, items }) => {
    const [preview, setpreview] = useState(items.image ? items.image : []);
    const [image, setimage] = useState(items.image ? items.image : []);
    const [title, settitle] = useState(items.title);
    const [category, setcategory] = useState(items.category);
    const [oldprice, setoldprice] = useState(items.oldprice);
    const [newprice, setnewprice] = useState(items.newprice);
    const [description, setdescription] = useState(items.description);
    const [_id, setid] = useState(items._id);
    console.log(items)

    const handlechange = (e) => {
        const files = Array.from(e.target.files);
        const filesArray = files.map((file) => URL.createObjectURL(file));

        setpreview((prevImages) => prevImages.concat(filesArray));
        setimage((prevImages) => prevImages.concat(files));
        console.log((prevImages) => prevImages.concat(files))
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (image.length === 0) {
            alert("Please select at least one image.");
            return;
        }

        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('_id', _id)
        formdata.append('category', category);
        formdata.append('description', description);
        formdata.append('newprice', newprice);
        formdata.append('oldprice', oldprice);

        for (let i = 0; i < image.length; i++) {
            formdata.append('image', image[i]);
        }

        for (let [key, value] of formdata.entries()) {
            console.log(`${key}: ${value}`);
        }

        const fetchdata = await fetch('http://localhost:1000/updateItems', {
            method: 'POST',
            body: formdata,
        }).then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((error) => console.error('Error:', error));
    };

    const handleimagechange = (id) => {
        setpreview(preview.filter((e) => e !== id));
    };

    return (
        <div className='bg-white w-[70vw] px-4 flex flex-col h-[80vh] overflow-scroll'>
            <span className='flex text-3xl w-[100%] items-start justify-end border-2'>
                <span className='cursor-pointer' onClick={() => setopenedit(false)}>
                    <CloseIcon />
                </span>
            </span>

            <h1 className='text-center font-semibold text-2xl'>Edit Product</h1>

            <form className='flex flex-col p-2 w-[100%]' onSubmit={handlesubmit}>
                <label htmlFor="Name" className='mt-4'>Product Name :</label>
                <input
                    type="text"
                    placeholder='Product Name'
                    value={title}
                    className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900'
                    required
                    onChange={(e) => settitle(e.target.value)}
                />

                <label htmlFor="Category" className='mt-4'>Category :</label>
                <select
                    className='md:w-[60vw] p-2 outline-none border-[1.5px] rounded-md border-neutral-900 mt-1'
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                >
                    <option value='Mobiles'>Mobiles</option>
                    <option value='Airpods'>Airpods</option>
                    <option value='Camera'>Camera</option>
                    <option value='Earphones'>Earphones</option>
                    <option value='Printers'>Printers</option>
                    <option value='Processor'>Processor</option>
                    <option value='Refrigerators'>Refrigerators</option>
                    <option value='Televisions'>Televisions</option>
                    <option value='Trimmers'>Trimmers</option>
                    <option value='Watches'>Watches</option>
                    <option value='Speakers'>Speakers</option>
                </select>

                <label htmlFor="OldPrice" className='mt-4'>Old Price :</label>
                <input
                    type="number"
                    value={oldprice}
                    placeholder='Old Price'
                    className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900'
                    required
                    onChange={(e) => setoldprice(e.target.value)}
                />

                <label htmlFor="NewPrice" className='mt-4'>New Price :</label>
                <input
                    type="number"
                    value={newprice}
                    placeholder='New Price'
                    className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900'
                    required
                    onChange={(e) => setnewprice(e.target.value)}
                />

                <label htmlFor="Description" className='mt-4'>Description :</label>
                <textarea
                    rows={7}
                    value={description}
                    type="text"
                    placeholder='Description...'
                    className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900'
                    onChange={(e) => setdescription(e.target.value)}
                />

                <label htmlFor="Uploads" className='mt-4'>Uploads :</label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-[1.5px] border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input
                            id="dropzone-file"
                            name="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handlechange}
                        />
                    </label>
                </div>

                <div className="flex flex-wrap mt-4">
                    {preview.map((e, index) => (
                        <div key={index} className='border relative'>
                            <span className='flex justify-end absolute cursor-pointer w-[100%] h-[100%] items-end'>
                                <DeleteIcon onClick={() => handleimagechange(e)} />
                            </span>
                            <img src={e} alt="" className='top-0 h-[170px] w-[170px] border p-2 m-2 cursor-pointer' />
                        </div>
                    ))}
                </div>

                <input
                    type="submit"
                    name='Submit'
                    className='bg-red-500 p-2 px-4 rounded-md font-semibold text-white cursor-pointer'
                />
            </form>
        </div>
    );
}

export default EditProduct;
