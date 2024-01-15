import React, { useState } from 'react'
import './PopUp.scss'
import { MdError } from "react-icons/md";

const PopUpError = ({msg,url}) => {


  return (
    <div>
            <div className='overplay'>
                <div className="popup" style={{background:"#ffdbdb"}}>

                    <div className='content'>
                        <MdError style={{color:"#e85454"}} />
                        <p style={{ margin: "0 10px", fontWeight: "600" }}>{msg}</p>
                    </div>

                    <a className="close_error" href={url}>×</a>

                </div>
            </div>
        </div>
  )
}

export default PopUpError