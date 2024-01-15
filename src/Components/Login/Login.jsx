import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './Login.scss'
import img from '../../Assets/balloons.PNG';
import { useAuth } from '../Auth/auth';
import PopUp from '../Layouts/PopUps/PopUp';
import PopUpError from '../Layouts/PopUps/PopUpError';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpError, setShowPopUpError] = useState(false);

  const loginHandle = async (e) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        alert("Please fill all the field")
      }
      else {
        let result = await fetch("http://localhost:7000/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if(result.ok){
          result = await result.json()
          // alert("Login Successful")
          setShowPopUp(true)

          //Storing Token in Local Storage
          storeTokenInLS(result.token)
        }
        if(result.status==422){
          // alert("Invaild password or username")
          setShowPopUpError(true)
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='login' style={{ display: "flex", alignItems: "center" }}>
      <div className='container'>
        <div className='form'>

          <h3>Login Account</h3>

          <div className='mt-4'>
            <label>Email</label><br />
            <input type='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mt-4'>
            <label>Password</label><br />
            <input type='password' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className='my-4 btn btn-danger w-25' onClick={loginHandle}>Login</button><br />
          <Link to='/register'>Not a User</Link>
        </div>
        <div className='img'>
          <img src={img} />
        </div>
      </div>
      {/* <PopUp /> */}
      {showPopUp && <PopUp msg={"Logged In Sussessfully"} url={'/'}/>}
      {showPopUpError && <PopUpError msg={"Invalid Password or Email"} url={'/login'}/>}
    </div>
  )
}

export default Login