import React, { useState } from 'react'

const EditAndAddCommon = () => {
    const [preview, setpreview] = useState([]);
    const [image, setimage] = useState([]);
    const [title, settitle] = useState('')
    const [category, setcategory] = useState('Mobile')
    const [oldprice, setoldprice] = useState(0)
    const [newprice, setnewprice] = useState(0)
    const [description, setdescription] = useState('')

    const handlechange = (e) => {
        // const files1 = Array.from(e.target.files);

        // console.log(image)
        // setimage((prevImages) => prevImages.concat(imageNames));
        const files = Array.from(e.target.files);
        const filesArray = files.map((file) => URL.createObjectURL(file));

        setpreview((prevImages) => prevImages.concat(filesArray));

        setimage(e.target.files)

    };


    const handlesubmit = async (e) => {
        e.preventDefault()

        const formdata = new FormData()
        formdata.append('title', title)

        formdata.append('category', category)
        formdata.append('description', description)
        formdata.append('newprice', newprice)
        formdata.append('oldprice', oldprice)
        for (let i = 0; i < image.length; i++) {
            formdata.append('image', image[i]);
        }
        for (let [key, value] of formdata.entries()) {
            console.log(`${key}: ${value}`);
        }

        const fetchdata = await fetch('http://localhost:1000/upload', {
            method: 'POST',
            body: formdata
        }).then((res) => res.json()).then((data) => alert(data.message))
    }
    return (
        <div className=''>
            {/* <input type="file" onChange={(e) => console.log(e.target.files
            )} /> */}
            <form className='flex flex-col  p-2 w-[100%]' onSubmit={handlesubmit}>
                <label htmlFor="Name " className='mt-4'>Product Name :</label>
                <input type="text" placeholder='Product Name' className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900' required onChange={(e) => settitle(e.target.value)} />
                <label htmlFor="Name" className='mt-4'>Category :</label>
                <select className='md:w-[60vw] p-2 outline-none border-[1.5px] rounded-md border-neutral-900 mt-1' onChange={(e) => setcategory(e.target.value)}>
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
                <label htmlFor="Name " className='mt-4'>Old Price :</label>
                <input type="number" placeholder='Old Price' className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900' required onChange={(e) => setoldprice(e.target.value)} />
                <label htmlFor="Name " className='mt-4'>New Price :</label>
                <input type="number" placeholder='New Price' className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900' required onChange={(e) => setnewprice(e.target.value)} />
                <label htmlFor="Name " className='mt-4'>Description :</label>
                <textarea rows={7} type="text" placeholder='Description...' className='md:w-[60vw] p-2 outline-none mt-1 border-[1.5px] rounded-md border-neutral-900' onChange={(e) => setdescription(e.target.value)} />
                <label htmlFor="Name " className='mt-4'>Uploads :</label>
                <div className="flex items-center justify-center w-full">
                    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-[1.5px] border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" multiple onChange={handlechange
                        } required />
                    </label>
                </div>
                <div className="flex flex-wrap mt-4">
                    {preview.map(e =>
                        <img src={e} alt="" className='h-[170px] w-[170px] border p-2 m-2' />

                    )}
                </div>

                <input type="Submit" name='Submit' className='bg-red-500 p-2 px-4 rounded-md font-semibold text-white cursor-pointer' />
            </form>

        </div >
    )
}

export default EditAndAddCommon



// import React, { useState } from 'react';
// // import AddProducts from '../frontend/src/Pages/AddProducts';

// const AddProducts = () => {
//     const [image, setImages] = useState([]);

//     const handleFileChange = (event) => {
//         setImages(event.target.files);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         for (let i = 0; i < image.length; i++) {
//             formData.append('image', image[i]);
//         }

//         try {
//             const response = await fetch('http://localhost:1000/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Response:', data);
//             } else {
//                 console.error('Error uploading images:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error uploading images:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Upload Multiple Images</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" multiple onChange={handleFileChange} />
//                 <button type="submit">Upload</button>
//             </form>
//         </div>
//     );
// };

// export default AddProducts;
