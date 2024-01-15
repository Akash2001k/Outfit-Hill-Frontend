import React from 'react'
import './Cart.scss'

const Cart = () => {
  return (
    <div className='WebPages'>
        <div className="container pt-3">
          <div className="cart_row">
            <div className='cart_card'>
                <img width='80px' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUoVxMydkxjWT9nrq9XQIjY8LQE_r70hJIA&usqp=CAU' alt='img'/>
                <div>
                     <h4>Gucci</h4>
                     <p>Navy Blue T-shirt</p>

                     <div className='d-flex'>
                        <button className='btn btn-sm btn-danger'>Preview</button>
                        <button className='btn btn-sm btn-dark mx-2'>Remove</button>
                     </div>
                </div>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Cart