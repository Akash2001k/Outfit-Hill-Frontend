import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

  const [productData, setProductData] = useState({
    title: '',
    brand: '',
    disc: '',
    maxPrice: '',
    for: '',
    size: '',
    category: '',
    discountPer: ''
  });
  const navigate = useNavigate();

  const params = useParams();

    useEffect(() => {
        getProductDetails()
    }, [])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    console.log(name,value,type)
  };

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:7000/getproduct/${params.id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    result = await result.json();
    setProductData(result)
    
}


const updateProduct = async () => {
  console.log("Product Data:", productData);
  alert("Product Updated")
  navigate(`/preview/${params.id}`)

  let result = await fetch(`http://localhost:7000/admin/updateproduct/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title:productData.title,
        brand:productData.brand,
        category:productData.category,
        disc:productData.disc,
        size:productData.size,
        for:productData.for,
        maxPrice:productData.maxPrice,
        discountPer:productData.discountPer
      }),
      headers: {
        "Content-Type": "application/json",
         Authorization:`Bearer ${localStorage.getItem('token')}`
      }
  })
  result = await result.json()

}

  return (
    <div className='WebPages'>
      <div className='container'>
        <h4>Update Product</h4>
        <div className='row'>
          <div className='col my-1'>
            <span>Title</span><br />
            <input style={{ width: "100%" }} value={productData.title} name='title' onChange={handleInputChange}/>
          </div>
        </div>

        <div className='row'>
          <div className='col my-1'>
            <span>brand</span><br />
            <input style={{ width: "100%" }} value={productData.brand} name='brand' onChange={handleInputChange}/>
          </div>
          <div className='col my-1'>
            <span>Category</span><br />
            <input style={{ width: "100%" }} value={productData.category} name='category' onChange={handleInputChange}/>
          </div>

        </div>

        <div className='row'>
          <div className='col my-1'>
            <span>For</span><br />
            <input style={{ width: "100%" }} value={productData.for} name='for' onChange={handleInputChange}/>
          </div>
          <div className='col my-1'>
            <span>Size</span><br />
            <input style={{ width: "100%" }} value={productData.size} name='size' onChange={handleInputChange}/>
          </div>

        </div>

        <div className='row'>
          <div className='col my-1'>
            <span>Discount Percent</span><br />
            <input type='number' style={{ width: "100%" }} value={productData.discountPer} name='discountPer' onChange={handleInputChange}/>
          </div>
          <div className='col my-1'>
            <span>Max Price</span><br />
            <input type='number' style={{ width: "100%" }} value={productData.maxPrice} name='maxPrice' onChange={handleInputChange}/>
          </div>
        </div>
        <div>
          <span>About Product</span><br />
          <textarea style={{ width: "100%", height: "100px" }} value={productData.disc} name='disc' onChange={handleInputChange}/>
        </div>
        <button className='btn btn-danger mt-2' onClick={updateProduct}>Update</button>
      </div>
    </div>
  )
}

export default UpdateProduct