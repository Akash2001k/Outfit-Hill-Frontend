import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../Auth/auth';
import './Order.scss'
import img from '../../../Assets/order_img.png'
import PopUp from '../../Layouts/PopUps/PopUp';


const Order = () => {

    const location = useLocation();
    const { user } = useAuth()

    const [color, setColor] = useState();
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("")

    const [showPopUp, setShowPopUp] = useState(false);

    const orderProduct = async (e) => {
        try {
            e.preventDefault()
            await fetch('http://localhost:7000/createorder', {
                method: 'POST',
                body: JSON.stringify({
                    order_details: {
                        title: location.state.title,
                        brand: location.state.brand,
                        color: color,
                        size: size,
                        quantity:qty,
                        price:location.state.realPriceInt*qty,
                    },
                    user_id:user._id,
                    product_id:location.state.product_id

                }),
                headers: {
                    'Content-Type': 'application/json',
                     Authorization:`Bearer ${localStorage.getItem('token')}`
                }

            })

            setShowPopUp(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='order'>
            <div className='container'>
                <div className='orderDetails'>

                    <h3>Order Product</h3>
                    <div className='mt-3'>
                        <span className='key'>Title</span><br />
                        <span className='value'>{location.state.title}</span>
                    </div>

                    <div className='mt-3'>
                        <span className='key'>Brand</span><br />
                        <span className='value'>{location.state.brand}</span>
                    </div>

                    <div className='mt-3'>
                        <span className='key'>Color</span><br />
                        <div className='d-flex'>
                            <div className='colors_div'>

                                <input type="radio" name="color" id="black" value="Black" onChange={e => setColor(e.target.value)} />
                                <label for="black"><span class="black"></span></label>

                                <input type="radio" name="color" id="light-black" value='Light Black' onChange={e => setColor(e.target.value)} />
                                <label for="light-black"><span class="light-black"></span></label>

                                <input type="radio" name="color" id="gray" value='Gray' onChange={e => setColor(e.target.value)} />
                                <label for="gray"><span class="gray"></span></label>

                                <input type="radio" name="color" id="maroon" value='maroon' onChange={e => setColor(e.target.value)} />
                                <label for="maroon"><span class="maroon"></span></label>

                                <input type="radio" name="color" id="navy-blue" value='Navy Blue' onChange={e => setColor(e.target.value)} />
                                <label for="navy-blue"><span class="navy-blue"></span></label>

                                <input type="radio" name="color" id="light-green" value='Light Green' onChange={e => setColor(e.target.value)} />
                                <label for="light-green"><span class="light-green"></span></label>
                            </div>
                            <span>or</span>
                            <div className='defaultColor'>
                                <input type="radio" name="color" value='Default' onChange={e => setColor(e.target.value)} />
                                <label for="default">Default</label>
                            </div>
                        </div>

                    </div>

                    <div className='mt-3'>
                        <span className='key'>Custom Size</span><br />
                        <select value={size} name='size' onChange={(e) => setSize(e.target.value)}>
                            <option selected >Select Size</option>
                            <option >Default</option>
                            <option>XM - Top Wear</option>
                            <option>M - Top Wear</option>
                            <option>L - Top Wear</option>
                            <option>XL - Top Wear</option>
                            <option>XXL - Top Waer</option>
                            <option>26 - bottom Wear</option>
                            <option>28 - bottom Wear</option>
                            <option>30 - bottom Wear</option>
                            <option>32 - bottom Wear</option>
                            <option>34 - bottom Wear</option>
                            <option>36 - bottom Wear</option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <span className='key'>Quantity</span><br />
                        <input type="number" name="quantity" value={qty} onChange={(e) => setQty(e.target.value)} min="1" max="10" />
                    </div>

                    <button className='btn btn-danger mt-4' style={{ width: "90px" }} onClick={orderProduct}>Order</button>

                </div>
                <div className='order_img'>
                    <img src={img} alt='img' />
                </div>
            </div>
            {showPopUp && <PopUp msg={"Product Ordered Sussessfully"} url={'/myorders'}/>}
        </div>
    )
}

export default Order