import React, { useState, useEffect } from 'react'
import './AllOrders.scss'
import { useNavigate } from 'react-router-dom';
import { PiNoteFill } from "react-icons/pi";
import Loader from '../../Layouts/Loader';

const AllOrders = () => {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getOrders = async () => {
    let result = await fetch(`${process.env.REACT_APP_API}/admin/allorders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    result = await result.json()
    setOrders(result)
  }

  useEffect(() => {
    getOrders()
  }, [])


  const moreDetails = (index) => {
    navigate("/admin/orderdetails/",
      {
        state:
        {
          id: orders[index]._id,
          title: orders[index].order_details.title,
          brand: orders[index].order_details.brand,
          status: orders[index].order_details.status,
          orderedTime: orders[index].createdAt,
          size: orders[index].order_details.size,
          color: orders[index].order_details.color,
          quantity: orders[index].order_details.quantity,
          updateTime: orders[index].updatedAt,
          price: orders[index].order_details.price,
          productId: orders[index].product_id,
          orderId: orders[index]._id,
          userId: orders[index].user_id
        }
      }
    )
  }

  return (

    <>
      {
        orders.length ?
          <>
            <div style={{ padding: "100px" }}>
              <div>
                <h4 style={{ fontWeight: "400", textTransform: "uppercase", color: "#636363", margin: "6px 0 20px" }}>Order List</h4>

                <table className="table table-striped " >
                  <thead class="table-dark" >
                    <tr>
                      <th scope="col">SR No</th>
                      <th scope="col">Title</th>
                      <th scope="col">Brand</th>
                      <th scope="col">Status</th>
                      <th scope="col">More Details</th>

                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.order_details.title}</td>
                        <td>{item.order_details.brand}</td>
                        <td>{item.order_details.status}</td>
                        <td onClick={() => moreDetails(index)}><PiNoteFill style={{ margin: "0 30px", fontSize: "23px", cursor: "pointer", color: "#3b75cb" }} /></td>
                      </tr>
                    ))}
                  </tbody>

                </table>


              </div>
            </div>
          </> : <Loader />
          }
    </>
  )
}

export default AllOrders