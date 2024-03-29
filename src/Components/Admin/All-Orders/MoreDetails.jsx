import React, { useState, useEffect } from 'react'
import './MoreDetails.scss'
import { GiHouse } from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import { useLocation, Link,useNavigate } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { BsCheckAll, BsCheckLg } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";


const MoreDetails = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [user, setUser] = useState("")

    const getUser = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/admin/user/${location.state.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        result = await result.json()
        setUser(result)

    }

    useEffect(() => {
        getUser()
    }, [])

    const orderTime = new Date(location.state.orderedTime);
    const updateTime = new Date(location.state.updateTime);

    // Convert to Indian Standard Time (IST)
    const orderTimeIN = orderTime.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    const updateTimeIN = updateTime.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    const [showStatus, setShowStatus] = useState('')

    const [statusValue, setStatusValue] = useState('')

    const updateStatus = async () => {

        try {
            let result = await fetch(`${process.env.REACT_APP_API}/admin/order/${location.state.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    order_details: {
                        status: statusValue
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            result = await result.json()
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (location.state.status === 'pending') {
            setShowStatus(<span style={{ fontSize: "17px", fontWeight: "600", color: "#ecb116" }}>Pending <RiLoader2Fill style={{ fontSize: "25px" }} /></span>);
        }
        else if (location.state.status === 'confirmed') {
            setShowStatus(<span style={{ fontSize: "17px", fontWeight: "600", color: "#6a6b68" }}>Confirmed<BsCheckLg style={{ fontSize: "24px", marginTop: "-4px" }} /></span>);
        }
        else if (location.state.status === 'dispatched') {
            setShowStatus(<span style={{ fontSize: "17px", fontWeight: "600", color: "#914155" }}>Dispatched <PiTruckFill style={{ fontSize: "23px", marginTop: "-4px" }} /></span>);
        }
        else if (location.state.status === 'delevered') {
            setShowStatus(<span style={{ fontSize: "17px", fontWeight: "600", color: "green" }}>Delevered<BsCheckAll style={{ fontSize: "28px" }} /></span>);
        }
    }, []);

    const deleteOrder = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API}/order/${location.state.id}`, {
                method: "Delete",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate('/admin/allorder')

        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className='moreDetails'>
            <div className="container">
                <div className="orderDetails">
                    <h4>Order Details</h4>
                    <hr />
                    <div className='field'>
                        <span className='key'>Title :</span>
                        <span className='value'>{location.state.title}</span>
                    </div>
                    <div className='field'>
                        <span className='key'>Brand :</span>
                        <span className='value'>{location.state.brand}</span>
                    </div>
                    <div className='field'>
                        <span className='key'>Color :</span>
                        <span className='value'>{location.state.color}</span>
                    </div>
                    <div className='field'>
                        <span className='key'>Size :</span>
                        <span className='value'>{location.state.size}</span>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <div className='field'>
                            <span className='key'>Status :</span>
                            <span className='value'>{showStatus}</span>
                        </div>

                        <div className='d-flex'>
                            <div>
                                <select className='mx-2' value={statusValue} onChange={(e) => { setStatusValue(e.target.value) }}>
                                    <option selected>Update Status</option>
                                    <option >confirmed</option>
                                    <option >dispatched</option>
                                    <option >delevered</option>
                                </select>
                            </div>

                            <div>
                                <button className='btn btn-danger btn-sm' onClick={updateStatus}>Update</button>
                            </div>
                        </div>
                    </div>

                    <div className='field'>
                        <span className='key'>Ordered at :</span>
                        <span className='value'>{orderTimeIN}</span>
                    </div>

                    <div className='field'>
                        <span className='key'>{location.state.status === 'pending' ? "" : `${location.state.status} at :`}</span>
                        <span className='value'>{location.state.status === 'pending' ? "" : updateTimeIN}</span>
                    </div>

                    <hr />

                    <div className='field'>
                        <span className='key'>Rate : </span>
                        <span className='value'>₹ {location.state.price / location.state.quantity}.00</span>
                    </div>

                    <div className='field'>
                        <span className='key'>Quantity :</span>
                        <span className='value'>{location.state.quantity}</span>
                    </div>
                    <div className='field'>
                        <span className='key'>Sub Total : </span>
                        <span className='value'>₹ {location.state.price}.00</span>
                    </div>
                    <div className='field'>
                        <span className='key'>Delevery Charge : </span>
                        <span className='value'>₹ 150.00</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='field'>
                            <span className='key'>Grand Total : </span>
                            <span className='value'>₹ {location.state.price + 150}.00</span>
                        </div>
                        <span style={{ color: "green", fontWeight: "600", fontSize: "17px" }}>(Inclusive All Texes)</span>
                    </div>

                    <div className='mt-4'>
                        <Link to={`/preview/${location.state.productId}`} className='btn btn-dark btn-sm' ><MdRemoveRedEye style={{ fontSize: "20px", margin: "-2px 3px 0 0" }} />Preview</Link>
                        <button className='btn btn-danger btn-sm mx-2' onClick={deleteOrder}>Delete</button>
                    </div>

                </div>
                <div className="userDetails">
                    <h4>User Details</h4>

                    <div className='details'>
                        <div className='personal'>
                            <hr />
                            <p>Personal Details <RiUserFill style={{ marginTop: "-6px" }} /></p>

                            <div className='field'>
                                <span className='key'>Name :</span>
                                <span className='value'>{user.user_details ? user.user_details.name : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>Email :</span>
                                <span className='value'>{user.user_details ? user.user_details.email : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>Phone :</span>
                                <span className='value'>+91 {user.user_details ? user.user_details.phone : ''}</span>
                            </div>
                        </div>
                        <hr />

                        <div className='address'>
                            <p>Address <GiHouse style={{ marginTop: "-6px" }} /></p>

                            <div className='field'>
                                <span className='key'>Home No. / Gali No. :</span>
                                <span className='value'>{user.user_details ? user.user_details.hno : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>City :</span>
                                <span className='value'>{user.user_details ? user.user_details.city : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>District :</span>
                                <span className='value'>{user.user_details ? user.user_details.district : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>Pin Code :</span>
                                <span className='value'>{user.user_details ? user.user_details.pincode : ''}</span>
                            </div>
                            <div className='field'>
                                <span className='key'>State :</span>
                                <span className='value'>{user.user_details ? user.user_details.state : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default MoreDetails