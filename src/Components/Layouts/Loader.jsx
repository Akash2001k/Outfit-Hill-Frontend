import React from 'react'

const Loader = () => {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <div class="spinner-border" style={{width: "5rem",height:" 5rem",color:"#ca2726"}} role="status">
                <span class="sr-only" ></span>
            </div>
        </div>
    )
}

export default Loader