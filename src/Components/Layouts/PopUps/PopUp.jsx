import React from 'react'
import './PopUp.scss'
import { GoCheckCircleFill } from "react-icons/go";
import { Link } from 'react-router-dom';


const PopUp = ({msg,url}) => {
    return (
        <div>
            <div className="overlay">
                <div className="popup ">

                    <div className='content'>
                        <GoCheckCircleFill  />
                        <p style={{ margin: "0 10px", fontWeight: "600" }}>{msg}</p>
                    </div>

                    <Link className="close" to={url}>×</Link>

                </div>
            </div>
        </div>
    )
}

export default PopUp