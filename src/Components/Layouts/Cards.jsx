import React from 'react'
import './Cards.scss'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Cards = ({ title, brand, discount, maxPrice, image,id }) => {

  let realPrice = maxPrice - (maxPrice * (discount / 100))
  let realPriceInt = parseInt(realPrice, 10);

  return (
      <div className='webCard col'>
        <img src={'http://localhost:7000/uploads/' + image} alt='img' />
        <div className='content p-2'>
          <h6>{brand}</h6>
          <p style={{ marginTop: "-6px" }}>{title}</p>
          <div className='d-flex' style={{ marginTop: "-4px" }}>
            <h6 >₹ {realPriceInt}</h6>
            <p style={{ textDecoration: "line-through", margin: '0 6px 0', color: "gray", fontSize: "14px" }}>₹ {maxPrice}</p>
            <p style={{ margin: '0 5px 0', color: "green", fontSize: "14px", fontWeight: "600" }}>({discount}% OFF)</p>
          </div>
          <div className='d-flex justify-content-between mt-4'>
             <Link to={'/preview/'+ id }><button className='buy_button w-100'>Preview <AiOutlineEye /></button></Link>
          </div>
        </div>
      </div>
  )
}

export default Cards