import React from 'react'
import './AboutUs.css'
import img from '../../../Assets/aboutimg.PNG'
import { FaUserTie } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const AboutUs = () => {
    return (
        <div className='aboutPage'>
            <div className="container">
                <div className="content">
                    <div className="text">
                        <h3>Outfit Hill</h3>
                        <p className='frstPara'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis eaque, id vitae nesciunt quaerat magni quae aperiam minus, recusandae ipsum nulla vel. Maxime vel architecto ipsam deleniti cum rerum atque hic ut animi dolorem quasi beatae dolor id, similique deserunt eligendi sunt voluptatem, nisi reprehenderit accusamus et nemo cumque autem!</p>
                        <p className='details'>Outfit Hill is Ecommerce App, Based on admin pannel it's frontend is built in React Js while it's APIs built in Node js Express Js connected with Mongodb Database</p>
                        <p className='details'>Admin can upload, edit or delete any product and can make admin to other user</p>
                        <p className='details'>Some pages of this app may not be responsive</p>
                        <p className='details'>When a user Login or Register for this app It should have to reload the app, Work is in the process to fix this problem</p>
                        <hr />
                        <div>
                            <span className='key'><FaUserTie /> Founder - </span>
                            <span className='val'>Akash Kaushik </span>
                        </div>
                        <div className='mt-2'>
                            <span className='key'><IoLocationSharp /> Address - </span>
                            <span className='val'>Ghaziabad, Uttar Pradesh, 201102</span>
                        </div>
                    </div>
                    <div className="img">
                        <img src={img} alt='img' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AboutUs