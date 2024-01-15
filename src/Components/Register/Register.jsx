import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import img from '../../Assets/register_img.png';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import PopUp from '../Layouts/PopUps/PopUp';
import PopUpError from '../Layouts/PopUps/PopUpError';

const Step1 = ({ setStep, formData, handleInputChange, setGender }) => {

    return (
        <div id='first'>
            <h4>Personal Profile</h4>
            <form className='stepForm pt-2'>
                <div className='mt-2'>
                    <label>Name</label><br />
                    <input value={formData.Name} name='Name' onChange={handleInputChange} placeholder='Enter Name' />
                </div>
                <div className='mt-2'>
                    <label>Email</label><br />
                    <input value={formData.email} name='email' onChange={handleInputChange} placeholder='Enter Email' />
                </div>
                <div className="mt-2 row">
                    <div className='col'>
                        <label>Phone No</label><br />
                        <input type='number' value={formData.phone} name='phone' onChange={handleInputChange} placeholder="Enter Phone no." />
                    </div>
                    <div className='col'>
                        <label>Gender</label><br />
                        <div className='d-flex mt-2'>
                            <div className='d-flex'>
                                <label>Male</label>
                                <input className='mx-2' type='radio' name='gender' value="male" onChange={e => setGender(e.target.value)} />
                            </div>
                            <div className='d-flex mx-5'>
                                <label>Female</label>
                                <input className='mx-2' type='radio' name='gender' value="female" onChange={e => setGender(e.target.value)} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <label>Password</label><br />
                    <input type='password' value={formData.password} name='password' onChange={handleInputChange} placeholder="Enter Password (Minimum 8 Characters)" />
                </div>
                <div className='mt-2'>
                    <label>Confirm Password</label><br />
                    <input type='password' value={formData.cPassword} name='cPassword' onChange={handleInputChange} placeholder="Confirm Password" />
                </div>

                <div className='d-flex mt-4 justify-content-left'>
                    <div className='d-flex'>
                        <div style={{ color: "#e0e0e0" }}>
                            <IoIosArrowBack />
                            <span >Previous</span>
                        </div>
                        <div className='hov mx-4' onClick={() => setStep(2)} style={{ cursor: "pointer" }}>
                            <span>Next</span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

const Step2 = ({ setStep, createAccount, formData, handleInputChange }) => {

    const statesList = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Maharashtra', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman & Nicobar (UT)', 'Chandigarh (UT)', 'Dadra & Nagar Haveli and Daman & Diu (UT)',
        'Delhi [National Capital Territory (NCT)]', 'Jammu & Kashmir (UT)', 'Ladakh (UT)', 'Lakshadweep (UT)', 'Puducherry (UT)',
    ];

    return (
        <div id='second'>
            <h4>Address</h4>
            <form className='stepForm pt-2'>
                <div className='mt-2'>
                    <label>Home No.</label><br />
                    <input value={formData.hNo} name='hNo' onChange={handleInputChange} placeholder='Enter Home No. / Village / Gali No.' />
                </div>
                <div className='mt-2'>
                    <label>City</label><br />
                    <input value={formData.city} name='city' onChange={handleInputChange} placeholder='Enter City' />
                </div>
                <div className='mt-2'>
                    <label>District</label><br />
                    <input value={formData.district} name='district' onChange={handleInputChange} placeholder="Enter District" />
                </div>
                <div className='mt-2'>
                    <label>Pin code</label><br />
                    <input type='number' value={formData.pinCode} name='pinCode' onChange={handleInputChange} placeholder="Enter Password" />
                </div>
                <div className='mt-2'>
                    <label>State</label><br />
                    <select value={formData.state} name='state' onChange={handleInputChange} >
                        <option selected>Select State</option>
                        {statesList.map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='d-flex mt-4 justify-content-between'>
                    <div className='d-flex'>
                        <div className='hov' onClick={() => setStep(1)} style={{ cursor: "pointer" }}>
                            <IoIosArrowBack />
                            <span >Previous</span>
                        </div>
                        <div className='mx-4' style={{ color: "#bfbfbf" }} >
                            <span>Next</span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <button className='btn btn-danger' onClick={createAccount}>Submit</button>
                </div>
            </form>
        </div>
    );
};


// ========================================================================================================================================

const Register = () => {

    const navigate = useNavigate()

    const [currentStep, setStep] = useState(1);
    const [gender, setGender] = useState();

    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        cPassword: '',
        hNo: '',
        city: '',
        district: '',
        pinCode: '',
        state: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(name, value, type)
    };

    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpError, setShowPopUpError] = useState(false);

    const createAccount = async (e) => {
        try {

            e.preventDefault()

            if (!formData.Name || !formData.email || !formData.phone || !formData.password || !formData.cPassword || !formData.hNo || !formData.city || !formData.district || !formData.pinCode || formData.state === 'Select State') {
                alert("Please Fill all the fileds")
            }
            else if (formData.password !== formData.cPassword) {
                setShowPopUpError(true)
            }
            else {
                
                let result = await fetch('http://localhost:7000/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: formData.Name,
                        email: formData.email,
                        phone: formData.phone,
                        gender: formData.gender,
                        password: formData.password,
                        cPassword: formData.cPassword,
                        hno: formData.hNo,
                        city: formData.city,
                        pincode: formData.pinCode,
                        district: formData.district,
                        state: formData.state,
                        gender: gender
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                result = await result.json()
                setShowPopUp(true)
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className='register' style={{ display: "flex", alignItems: "center" }}>
                <div className='container'>
                    <div className='reg_img'>
                        <img src={img} alt='Registration' />
                        <div>
                            <h4>Create Account</h4>
                            <p className='mt-3'>Outfit Hill has thousand of products<br />You can purchase that outfit you want </p>
                        </div>
                    </div>
                    <div className='form'>
                        {currentStep === 1 ? <Step1 setGender={setGender} setStep={setStep} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} /> : <Step2 setStep={setStep} createAccount={createAccount} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />}
                    </div>
                </div>
                {showPopUp && <PopUp msg={"User Registered Sussessfully"} url={'/login'}/>}
                {showPopUpError && <PopUpError msg={"Passwords are not matching"} url={'/register'}/>}
            </div>
        </>
    );
};

export default Register;
