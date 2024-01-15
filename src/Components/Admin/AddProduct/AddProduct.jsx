import React, { useState } from 'react'
import './AddProduct.scss'
import { useNavigate } from 'react-router-dom';
import img from '../../../Assets/add.PNG'
import PopUp from '../../Layouts/PopUps/PopUp';

const AddProduct = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    disc: '',
    maxPrice: '',
    for: '',
    size: '',
    category: '',
    discountPer: '',
    image: null,
  });

  const [showPopUp, setShowPopUp] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? e.target.files[0] : value,
    });
    // console.log(name,value,type)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('disc', formData.disc);
    formDataToSend.append('maxPrice', formData.maxPrice);
    formDataToSend.append('for', formData.for);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('discountPer', formData.discountPer);
    formDataToSend.append('image', formData.image);

    // console.log(formData.title,formData.brand,formData.image)

    try {
      const response = await fetch('http://localhost:7000/admin/createproduct', {
        method: 'POST',
        body: formDataToSend,
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Product created successfully:', data);
        setShowPopUp(true)
        navigate("/")
      } else {
        alert("Failed to create product")
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (   
    <>
      <div className='add_product'>
        <div className="container">
          <div className='add_form'>
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className='row my-3'>
                <div className='col'>
                  <label>Title</label><br />
                  <input name='title' value={formData.title} onChange={handleInputChange} type='text' placeholder='Enter Title' />
                </div>
                <div className='col'>
                  <label>Brand</label><br />
                  <input name='brand' value={formData.brand} onChange={handleInputChange} type='text' placeholder='Enter Brand' />
                </div>
              </div>

              <div className='row my-3'>
                <div className='col'>
                  <label>Category</label><br />
                  <input onChange={handleInputChange} name='category' value={formData.category} type='text' placeholder='Enter Category' />
                </div>
                <div className='col'>
                  <label>Size</label><br />
                  <input onChange={handleInputChange} name='size' value={formData.size} type='text' placeholder='Enter Size' />
                </div>
                <div className='col'>
                  <label>Image</label><br />
                  <input onChange={handleInputChange} name='image' type='file' />
                </div>

              </div>

              <div className='row my-3'>
                <div className='col'>
                  <label>For</label><br />
                  <input onChange={handleInputChange} name='for' value={formData.for} type='text' placeholder='Enter For' />
                </div>
                <div className='col'>
                  <label>Max Price</label><br />
                  <input onChange={handleInputChange} name='maxPrice' value={formData.maxPrice} type='number' placeholder='Enter Maximum Price' />
                </div>
                <div className='col'>
                  <label>Discount Percent</label><br />
                  <input onChange={handleInputChange} name='discountPer' value={formData.discountPer} type='number' placeholder='Enter Discount Percent'/>
                </div>
              </div>
              <div>
                <label>Discription</label><br />
                <textarea onChange={handleInputChange} name='disc' value={formData.disc} type='text' placeholder='Enter About the Product...' />
              </div>

              <button className='btn btn-danger mt-4' type='submit'>Add Product</button>

            </form>

          </div>

          <div className='add_img'>
            <img src={img} />
          </div>
        </div>
        {showPopUp && <PopUp msg={"Product Added"} url={'/'}/>}
      </div>
    </>
  )
}

export default AddProduct