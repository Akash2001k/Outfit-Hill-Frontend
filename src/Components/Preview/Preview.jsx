import React, { useEffect, useState } from 'react'
import './Preview.scss'
import { MdOutlineStar, MdOutlineAdd, MdDelete } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LuPenSquare } from "react-icons/lu";
import { useAuth } from '../Auth/auth';

const Preview = () => {

    const { user } = useAuth()
    const isAdmin = user.role==='admin'

    const [productdata, setProductData] = useState("")

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:7000/getproduct/${params.id}`)
        result = await result.json();
        // console.log(result)
        setProductData(result)
    }
    let realPrice = productdata.maxPrice - (productdata.maxPrice * (productdata.discountPer / 100))
    let realPriceInt = parseInt(realPrice, 10);

    const deleteProduct = async () => {

        alert("Prdouct is Deleted")
        let result = await fetch(`http://localhost:7000/admin/deleteproduct/${params.id}`, {
            method: "Delete",
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
        })
        result = await result.json()
        navigate(`/`)
    }

    const goToOrder = () => {
        navigate("/order", { state: { realPriceInt: realPriceInt, title: productdata.title, brand: productdata.brand,product_id:productdata._id } })
    }


    return (
        <div className='WebPages'>
            <div className="container py-4">
                <div className='preview'>
                    <div className='img_div'>
                        <div>{productdata.discountPer}% OFF</div>
                        <img src={'http://localhost:7000/uploads/' + productdata.image} alt='img' />
                    </div>
                    <div className='content_div'>
                        <h3>{productdata.brand}</h3>
                        <p style={{ fontSize: "17px" }}>{productdata.title}</p>

                        <div className='starrating d-flex'>
                            <div className='d-flex'>
                                <MdOutlineStar style={{ fontSize: "22px", color: "#e8597b" }} />
                                <p style={{ fontWeight: "600", color: "gray" }}>4.5</p>
                            </div>

                            <p style={{ borderLeft: "2px solid gray", fontWeight: "600" }} className='mx-2 px-2'>345 Ratings</p>
                        </div>
                        <hr />
                        <div className='d-flex'>
                            <h5>₹ {realPriceInt}</h5>
                            <p style={{ textDecoration: "line-through", margin: '-1px 6px 0', color: "gray", fontSize: "18px" }}>₹ {productdata.maxPrice}</p>
                            <p style={{ margin: '0 5px 0', color: "green", fontSize: "17px", fontWeight: "600" }}> {productdata.discountPer}% OFF (inclusive of all taxes)</p>

                        </div>

                        <div>
                            <p style={{ fontSize: "17px", fontWeight: "600" }}>Category - {productdata.category}</p>
                            <p style={{ fontSize: "17px" }}>Size - {productdata.size}</p>
                        </div>

                        <div>
                            <p style={{ fontSize: "17px", textTransform: "uppercase" }}>For {productdata.for}</p>
                        </div>

                        <div>
                            <h4>Product Details <BiMessageDetail /></h4>
                            {productdata.disc}
                        </div>

                        <div className='d-flex mt-4 justify-content-between'>
                            <div className='d-flex'>
                                <button className='btn btn-danger btn-sm' onClick={goToOrder}>Buy <BsCartCheck style={{ fontSize: "19px" }} /></button>
                                <button className='btn btn-dark mx-2 btn-sm'>Add to Cart <MdOutlineAdd style={{ fontSize: "19px" }} /></button>
                            </div>

                            {
                                isAdmin ? <div className='d-flex '>
                                    <Link style={{ textDecoration: "none", color: "#404040", fontWeight: "600" }} to={'/admin/updateproduct/' + productdata._id}>Edit <LuPenSquare style={{ fontSize: "18px", margin: "-5px -2px 0 -2px" }} /></Link>
                                    <Link style={{ textDecoration: "none", color: "#404040", fontWeight: "600" }} className='mx-3' onClick={deleteProduct}>Delete <MdDelete style={{ fontSize: "20px", margin: "-5px -5px 0 -5px" }} /></Link>
                                </div> : ""
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview