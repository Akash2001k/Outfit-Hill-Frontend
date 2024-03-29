import React, { useState, useEffect } from 'react'
import './CompleteOrderDetails.scss'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { BsCheckAll, BsCheckLg } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";


const CompleteOrderDetails = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const apiDate = new Date(location.state.orderedTime);
    const updateTime = new Date(location.state.updateTime);

    // Convert to Indian Standard Time (IST)
    const orderedTimeIN = apiDate.toLocaleString('en-IN', {
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

    const deleteOrder = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API}/order/${location.state.id}`, {
                method: "Delete",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate('/myorders')

        } catch (error) {
            console.log(error)
        }
    } 

    const [showStatus, setShowStatus] = useState('')

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

    return (
        <div className='CompleteOrderDetails' >
            <div className='container'>
                <div className="fields">
                    <span className='key'>Title</span>
                    <span className='value1'>{location.state.title}</span>
                </div>
                <div className="fields">
                    <span className='key'>Brand</span>
                    <span className='value1'>{location.state.brand}</span>
                </div>
                <div className="fields">
                    <span className='key'>Color</span>
                    <span className='value1'>{location.state.color}</span>
                </div>
                <div className="fields">
                    <span className='key'>Size</span>
                    <span className='value1'>{location.state.size}</span>
                </div>
                <hr />
                <div className="fields">
                    <span className='key'>Status</span>
                    <span style={{ color: "#ebb113", fontSize: "20px", fontWeight: "600", marginTop: "-5px", textTransform: "capitalize" }}>{showStatus}</span>
                </div>
                <hr />
                <div className="fields">
                    <span className='key'>Ordered At</span>
                    <span className='key'>{orderedTimeIN}</span>
                </div>
                <div className="fields">
                    <span className='key' style={{ textTransform: "capitalize" }}>{location.state.status === 'pending' ? "" : `${location.state.status} At`}</span>
                    <span className='key'>{location.state.status === 'pending' ? "" : updateTimeIN}</span>
                </div>
                <div className="fields">
                    <span className='key'>Rate</span>
                    <span className='key'>₹ {location.state.price / location.state.quantity}.00</span>
                </div>
                <div className="fields">
                    <span className='key'>Quantity</span>
                    <span className='key'>{location.state.quantity}</span>
                </div>
                <div className='bill'>
                    <div className='bill_field'>
                        <span className='key'>Sub Total</span>
                        <span className='key'>₹ {location.state.price}.00</span>
                    </div>
                    <div className='bill_field'>
                        <span className='key'>Delivery Charge</span>
                        <span className='key'>₹ 150.00</span>
                    </div>
                    <div className='bill_field '>
                        <span className='key'>Grand Total</span>
                        <span className='key'>₹ {location.state.price + 150}.00</span>
                    </div>
                    <div className='d-flex justify-content-between mt-3'>
                        <div>

                            <Link className='btn btn-dark btn-sm' to={`/preview/${location.state.product_id}`}><MdRemoveRedEye style={{ fontSize: "20px", margin: "-2px 3px 0 0" }} />Preview</Link>

                            {
                                location.state.status === 'delevered' ? "" : <button className='btn btn-danger btn-sm mx-2' onClick={deleteOrder}>Cancel Order</button>
                            }
                        </div>
                        <p style={{ color: "green", fontWeight: "600" }}>(Inclusive All Texes)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteOrderDetails