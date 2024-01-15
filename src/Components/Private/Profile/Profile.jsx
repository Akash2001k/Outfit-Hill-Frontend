import React,{useEffect} from 'react'
import './Profile.scss'
import { AiOutlineMail, AiOutlinePhone, AiFillEdit } from 'react-icons/ai';
import { TbHelp } from "react-icons/tb";
import india from '../../../Assets/indianFlag.webp'
import { useAuth } from '../../Auth/auth';
import girl from '../../../Assets/girl_profile.png'
import boy from '../../../Assets/boy_profile.PNG'
import Loader from '../../Layouts/Loader';

const Profile = () => {

  const { user } = useAuth()

  const logout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <>
      {
        user.name ? <>
          <div className='profile'>
            <div className='container'>
              <div className='Profile_div'>
                <div className='profile_pic'>

                  {
                    user.gender == 'male' ? <img src={boy} alt='boy' /> : <img src={girl} alt='girl' />
                  }

                  <h3 className='mt-2'>{user.name}</h3>
                  <div className='btn-div'>
                    <button className='btn btn-dark btn-sm'>Edit Profile <AiFillEdit /></button>
                    <button className='mx-2 btn btn-danger btn-sm'>Help <TbHelp /></button>
                  </div>
                </div>
                <div className="profile_content">
                  <h5>Profile</h5>
                  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
                    <div>
                      <span><AiOutlineMail style={{ fontSize: "20px", margin: "0 5px 0 0" }} />Email</span>
                      <p className='emailPhone'>{user.email}</p>
                    </div>

                    <div>
                      <span><AiOutlinePhone style={{ fontSize: "20px", margin: "0 5px 0 0" }} />Phone</span>
                      <p className='emailPhone'>+91 {user.phone}</p>
                    </div>
                    <div>
                      <button className='btn btn-sm btn-danger' onClick={logout}>Logout</button>
                    </div>

                  </div>
                  <hr />
                  <h5>Address</h5>
                  <div className='row justify-content-between mt-2'>
                    <div className='col'>
                      <span>Home No / Gali No</span>
                      <p>{user.hno}</p>
                    </div>
                    <div className='col'>
                      <span>City</span>
                      <p>{user.city}</p>
                    </div>
                  </div>
                  <div className='row justify-content-between mt-2'>
                    <div className='col'>
                      <span>District</span>
                      <p>{user.district}</p>
                    </div>
                    <div className='col'>
                      <span>Pin Code</span>
                      <p>{user.pincode}</p>
                    </div>
                  </div>

                  <div className='row justify-content-between mt-2'>
                    <div className='col'>
                      <span>State</span>
                      <p>{user.state}</p>
                    </div>
                    <div className='col'>
                      <span>Nationalty</span>

                      <div className='d-flex'>

                        <p>Indian</p>
                        <img width='30px' height='20px' className='mx-2' src={india} alt='india' />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></> : <Loader />
      }
    </>
  )
}

export default Profile