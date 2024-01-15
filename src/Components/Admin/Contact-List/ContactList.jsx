import React, { useEffect, useState } from 'react';
import './ContactList.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiMessageDetail } from "react-icons/bi";

const MessageCard = ({ name, email, phone, message, deleteContact, id }) => {
  return (
    <>
      <div className='Message_card'>
        <div className='user_details'>
          <div className='fields'>
            <span className='head'>Name : </span>
            <span className='mx-2'>{name}</span>
          </div>
          <div className='fields'>
            <span className='head'>Email : </span>
            <span className='mx-2'>{email}</span>
          </div>
          <div className='fields'>
            <span className='head'>Phone No. : </span>
            <span className='mx-2'>+91 {phone}</span>
          </div>
        </div>
        <div className='msg'>
          <span className='head' style={{ fontSize: "17px" }}>Message <BiMessageDetail style={{ fontSize: "22px" }} />: </span>
          <p className='mt-1'>{message}</p>
          <a onClick={() => deleteContact(id)}><AiFillCloseCircle /></a>
        </div>
      </div>
    </>
  );
};

const ContactList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      let result = await fetch('http://localhost:7000/admin/allcontact',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      result = await result.json();
      // console.log(result);
      setMessages(result);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const deleteContact = async (id) => {
    getMessages()
    let result = await fetch(`http://localhost:7000/admin/contact/${id}`, {
      method: "Delete",
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    result = await result.json()
    // console.log(result)
    console.log(id)
    if (result) {
      getMessages()
    }
  }

  return (
    <>
      <div className='contact_list'>
        <div className='container'>
          {
            messages.length ?
              <>
                {messages.map((item, index) => (
                  <MessageCard
                    key={index}
                    name={item.name}
                    email={item.email}
                    phone={item.phone}
                    message={item.message}
                    id={item._id}
                    deleteContact={deleteContact}
                  />
                ))}
              </>:<h2 style={{color:"gray",display:"flex",marginTop:"220px"}}>No Messages</h2>
          }
        </div>
      </div>
    </>
  );
};

export default ContactList;
