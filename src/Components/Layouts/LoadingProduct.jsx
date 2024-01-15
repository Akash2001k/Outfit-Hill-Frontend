import React from 'react'

const LoadingProduct = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh",flexDirection:"column" }}>
            <div class="spinner-border" style={{ width: "5rem", height: " 5rem", color: "#ca2726" }} role="status">
                <span class="sr-only" ></span>
            </div>
            
            <h3 style={{fontWeight:"100",letterSpacing:"2px",margin:"10px 0"}}>Loading...</h3>
        </div>
    )
}

export default LoadingProduct