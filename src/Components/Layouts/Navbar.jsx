import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import brand from '../../Assets/company_logo.PNG'
import { BiSolidUser, BiLogInCircle } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { IoMdPersonAdd, IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/auth'
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {

    const auth = localStorage.getItem('token');
    const [isOn, setIsOn] = useState(false);

    const { user } = useAuth()
    const isAdmin = user.role === 'admin'

    const toggleSlider = () => {
        let slider = document.getElementById('slider')
        setIsOn(!isOn);
        { isOn ? slider.style.width = "330px" : slider.style.width = "0px" }
    }

    useEffect(() => {
        toggleSlider();
    }, []);


    return (
        <>
            <nav>
                <div className='nav_first'>
                    <img width="80px" src={brand} />
                    <ul className='nav_items_ls'>
                        <li><Link to='/'>Store</Link></li>
                        <li><Link to='/men'>Men</Link></li>
                        <li><Link to='/women'>Women</Link></li>
                        <li><Link to='/kids'>Kids</Link></li>
                        <li><Link to='/homeandliving'>Home & Living</Link></li>

                    </ul>
                </div>
                <div className='nav_second'>
                    <div className='d-flex'>

                        <div>
                            {
                                auth ? <Link to='/profile'><BiSolidUser /></Link> : <Link to='/login'><BiLogInCircle className='mx-2'/></Link>
                            }
                        </div>

                        <div>
                            {
                                auth ? <Link><IoMdNotifications /></Link> : ""
                            }
                        </div>
                        <div >
                            {
                                auth ? <Link to='/myorders'><BsFillCartCheckFill style={{ fontSize: "25px", marginTop: "-5px" }} /></Link> : <Link to='/register'><IoMdPersonAdd /></Link>
                            }
                        </div>
                        <MdOutlineMenu  onClick={toggleSlider} style={{ color: "#636363",fontSize:"33px",margin:"-5px 15px 0 25px" }} />
                    </div>
                </div>
            </nav>


            {/* ======================== Slider =================================== */}

            <div id="slider" className='MenuSlider'>
                <div className='slider'>
                    <div className='nav_items_sm'>
                        <ul>
                            <li><Link to='/'>Store</Link></li>
                            <li><Link to='/men'>Men</Link></li>
                            <li><Link to='/women'>Women</Link></li>
                            <li><Link to='/kids'>Kids</Link></li>
                            <li><Link to='/homeandliving'>Home & Living</Link></li>
                        </ul>

                        <hr />
                    </div>

                    <div>
                        <ul>
                            <li><Link to='/aboutus'>About Us</Link></li>
                            <li><Link to='/contactus'>Contact Us</Link></li>
                        </ul>

                        <hr />
                        <ul>
                            {isAdmin ? <li><Link to='admin/dashboard/'>Dashboard</Link></li> : ""}
                            {isAdmin ? <li><Link to='admin/allorder' >Order List</Link></li> : ""}
                            {isAdmin ? <li><Link to='/admin/contactlist'>Contact List</Link></li> : ""}
                            {isAdmin ? <li><Link to='/admin/addproduct'>Add Product</Link></li> : ""}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar