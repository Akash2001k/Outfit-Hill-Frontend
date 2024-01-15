import React from 'react'
import img from '../../Assets/notProduct.png'

const NoProductFound = () => {
  return (
    <div style={{height:"67vh",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",border:""}}>
        <img width="250px" src={img}/> 
        <h2 style={{marginTop:"13px",fontWeight:"100",letterSpacing:"2px"}}>Product Not Available!</h2>
    </div>
  )
}

export default NoProductFound