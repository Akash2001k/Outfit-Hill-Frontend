import { useEffect, useState } from 'react'
import React from 'react'
import './MyOrders.scss'
import { PiNoteFill } from "react-icons/pi";
import { useAuth } from '../../Auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoader2Fill } from "react-icons/ri";
import { BsCheckAll,BsCheckLg  } from "react-icons/bs";
import { PiTruckFill } from "react-icons/pi";


const OrderCard = ({ title, brand, status, orderedTime, size, color, quantity, updateTime, price,product_id,id }) => {

    const apiDate = new Date(orderedTime);

    const navigate = useNavigate();

    // Convert to Indian Standard Time (IST)
    const istDateString = apiDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    const goToOrderDetails = () => {
        navigate("/completeorderdetails", {
            state:
            {
                title: title,
                brand: brand,
                status: status,
                orderedTime: orderedTime,
                size: size, color: color,
                quantity: quantity,
                updateTime: updateTime,
                price: price,
                product_id:product_id,
                id:id
            }
        })
    }

    const [showStatus, setShowStatus] = useState('')

    useEffect(() => {
        if (status === 'pending') {
          setShowStatus(<span style={{fontSize:"17px",fontWeight:"600",color:"#ecb116"}}>Pending <RiLoader2Fill style={{fontSize:"25px"}}/></span>);
        }
        else if(status === 'confirmed'){
           setShowStatus(<span style={{fontSize:"17px",fontWeight:"600",color:"#6a6b68"}}>Confirmed<BsCheckLg style={{fontSize:"24px",marginTop:"-4px"}}/></span>);
        }
        else if(status === 'dispatched'){
            setShowStatus(<span style={{fontSize:"17px",fontWeight:"600",color:"#914155"}}>Dispatched <PiTruckFill style={{fontSize:"23px",marginTop:"-4px"}}/></span>);
        }
        else if(status === 'delevered'){
            setShowStatus(<span style={{fontSize:"17px",fontWeight:"600",color:"green"}}>Delevered<BsCheckAll  style={{fontSize:"28px"}}/></span>);
        }
      },[]);

    return (
        <div className='order_cards'>
            <div style={{width:"30%"}} className='order_card_field'>
                <span className='head'>Title</span><br />
                <span className='field'>{title}</span>
            </div>
            <div style={{width:"20%"}} className='order_card_field'>
                <span className='head'>Brand</span><br />
                <span className='field'>{brand}</span>
            </div>
            <div style={{width:"20%"}} className='order_card_field'>
                <span className='head'>Ordered At</span><br />
                <span className='field'> {istDateString}</span>
            </div>

            <div style={{width:"15%"}} className='order_card_field'>
                <span className='head'>Status</span><br />
                {showStatus}
            </div>

            <div style={{width:"10%"}} className='order_card_field'>
                <span className='head'>View Details</span><br />
                <p onClick={goToOrderDetails}><PiNoteFill style={{ fontSize: "25px", margin: "0 25px" }} /></p>
            </div>
        </div>
    )
}

const MyOrders = () => {

    const [orders, setOrders] = useState([])

    const {user} = useAuth()
    
    const getOrderData = async () => {
        try {
            let result = await fetch(`http://localhost:7000/myorders/${user._id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                  }
            })
            result = await result.json();
            // console.log(localStorage.getItem('token'))
        

           setOrders(result)
        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <div className='myOrders'>
            <div className="container">


                {
                    orders.length ?
                        <>
                            <h4 style={{fontWeight: "400",textTransform: "uppercase",color: "#636363",margin:"6px 0 20px"}}>My Orders</h4>
                            {orders.map((item, index) => (
                                <OrderCard
                                    key={index}
                                    title={item.order_details.title}
                                    brand={item.order_details.brand}
                                    status={item.order_details.status}
                                    quantity={item.order_details.quantity}
                                    size={item.order_details.size}
                                    color={item.order_details.color}
                                    price={item.order_details.price}
                                    orderedTime={item.createdAt}
                                    updateTime={item.updatedAt}
                                    product_id={item.product_id}
                                    id={item._id}
                                />
                            ))}
                        </> : <h2 style={{ color: "gray", display: "flex", marginTop: "220px" }}>No Orders</h2>
                }
            </div>


        </div>
    )
}

export default MyOrders