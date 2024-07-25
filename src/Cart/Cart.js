import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
    const cart = useSelector(state => state.customreducer.cartitems);
    console.log(cart)

    const handledelete = async (id) => {

        const fetchproduct = await fetch('https://shop-backend-rust.vercel.app/deletecart', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
            credentials: 'include'
        }).then((res) => res.json()).then((data) => alert(data.message))
        window.location.reload()

    }


    const emptycart = async () => {
        const response = await fetch('https://shop-backend-rust.vercel.app/clear-cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
    }

    const handlepayment = async () => {



        if (cart.length > 0) {
            try {
                // Load Stripe
                const stripe = await loadStripe('pk_test_51Pchhy2Mtw5gAr2blwT3yHUjGosdFIUVnY22igmJDUxSJ1fvkzAg8ke4mvJ1QIsluM37UF1i3WKZxpkIHxBa43ow00TFqFGAZP');
                if (!stripe) {
                    throw new Error('Stripe.js failed to load');
                }

                // Make the request to your backend
                const response = await fetch('https://shop-backend-rust.vercel.app/stripe-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cart),
                });

                // Check for successful response
                if (!response.ok) {
                    throw new Error('Failed to create Stripe session');
                }
                else {
                    emptycart()
                }

                const data = await response.json();

                // Redirect to Stripe Checkout
                const result = await stripe.redirectToCheckout({
                    sessionId: data.id,

                });


                // Check for Stripe errors
                if (result.error) {
                    console.error('Stripe checkout error:', result.error.message);
                    alert(result.error.message);
                }
            } catch (error) {
                console.error('Error during payment:', error);
                alert('Payment failed. Please try again.');
            }
        }
        else {
            alert('Cart is empty')
        }
    };



    return (
        <>

            <div className="bg-gray-100 h-screen py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                            <th className="text-left font-semibold">Delete</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            cart.map((e) =>
                                                <React.Fragment key={e._id}>
                                                    <tr>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img className="h-16 w-16 mr-4" src={e.image[0]} alt="Product image" />
                                                                <span className="font-semibold">{e.title}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">${e.newprice}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                                                <span className="text-center w-8">1</span>
                                                                <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">${e.newprice}</td>
                                                        <td className='cursor-pointer' onClick={() => handledelete(e)}><DeleteForeverIcon ></DeleteForeverIcon></td>

                                                    </tr>


                                                </React.Fragment>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {
                            cart.length > 0 &&
                            <div className="md:w-1/4">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>



                                        < span > {cart.reduce((acc, item) => acc + item.newprice, 0)}$</span>

                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Taxes</span>
                                        <span>$1.99</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span>$0.00</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold"> {cart.reduce((acc, item) => Math.round(acc + item.newprice + 1.99), 0)}$</span>
                                    </div>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={handlepayment}>Checkout</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div >

        </>
    );
};

export default Cart;
