import React, { useState, useEffect } from 'react'
import Cards from '../Layouts/Cards'
import { AiOutlineSearch } from 'react-icons/ai'
import NoProductFound from '../Layouts/NoProductFound'
import LoadingProduct from '../Layouts/LoadingProduct'

const Men = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    let result = await fetch(`${process.env.REACT_APP_API}/allproduct`)
    result = await result.json()
    setProducts(result)
    setLoading(false)
  }

  useEffect(() => {
    getProduct()
  }, [])

  const forWomen = products.filter((item) => item.for === "men")


  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${process.env.REACT_APP_API}/searchproduct/${key}`, {
      })
      result = await result.json()
      if (result) {
        setProducts(result)
      }
    } else {
      getProduct()
    }
  }
  return (
    <div className='WebPages'>

      <div className='container'>
        <div className='heading_searchbar'>
          <h4>Men Wear</h4>
          <div className='searchInputDiv' >
            <AiOutlineSearch />
            <input onChange={searchHandle} className='searchbar' type='search' placeholder="Title, Brand, Category and More..." />
          </div>
        </div>

        {loading && <LoadingProduct />}


        {!loading && forWomen.length ?
          <div className='row justify-content-center'>
            {forWomen.map((item, index) =>
              <Cards
                key={index}
                title={item.title}
                brand={item.brand}
                discount={item.discountPer}
                maxPrice={item.maxPrice}
                image={item.image}
                id={item._id}
              />
            )}
          </div> : !loading && <NoProductFound />}

      </div>
    </div>
  )
}

export default Men