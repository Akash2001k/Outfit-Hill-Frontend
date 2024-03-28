import React, { useState } from 'react'
import './Contact.scss'
import { useAuth } from '../Auth/auth'
import PopUp from '../Layouts/PopUps/PopUp'
import img from '../../Assets/contact-add.PNG'

const Contact = () => {

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const { user } = useAuth();
  const [userData, setUserData] = useState(true)

  const [showPopUp, setShowPopUp] = useState(false);


  if (userData && user) {
    setContact({
      name: user.name,
      email: user.email,
      phone: user.phone,
      message: ""
    })

    setUserData(false)
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setContact({
      ...contact, [name]: value
    })
  }

  const addMessage = async (e) => {
    try {
      e.preventDefault()
      await fetch('http://localhost:7000/contact', {
        method: "POST",
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          message: contact.message
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setShowPopUp(true)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='contact'>
      <div className=' container'>
        <div className='contact_form'>
          <h3 className='mb-4'>Contact Us</h3>

          <div className='col my-1'>
            <span>Name</span><br />
            <input value={contact.name} name='name' onChange={handleInput} />
          </div>
          <div className='col my-1'>
            <span>Email</span><br />
            <input value={contact.email} name='email' onChange={handleInput} />
          </div>
          <div className='col my-1'>
            <span>Phone</span><br />
            <input value={contact.phone} name='phone' onChange={handleInput} />
          </div>

          <div className='col my-1'>
            <span>Message</span><br />
            <textarea name='message' value={contact.message} onChange={handleInput} />
          </div>

          <button className='btn btn-danger' onClick={addMessage}>Submit</button>
        </div>

        <div className='contact_img'>
           <img src={img}/>
        </div>
      </div>

      {showPopUp && <PopUp msg={"Message sent"} url={'/'} />}
    </div>
  )
}

export default Contact