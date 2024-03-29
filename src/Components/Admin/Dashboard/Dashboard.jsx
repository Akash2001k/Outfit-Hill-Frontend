import React, { useState, useEffect } from 'react'
import './Dashboard.scss'
import { TbLoader } from "react-icons/tb";
import { VscInfo } from "react-icons/vsc";
import { PiTruckFill } from "react-icons/pi";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts";

const Dashboard = () => {

    const [pending, setPending] = useState('')
    const [confirm, setConfirm] = useState('')
    const [dispatch, setDispatch] = useState('')
    const [delever, setDelever] = useState('')

    const getResult = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/admin/allorders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        result = await result.json()
        console.log(result)

        const pendingResult = result.filter((item) => item.order_details.status === "pending")
        const confirmResult = result.filter((item) => item.order_details.status === "confirmed")
        const dispatchResult = result.filter((item) => item.order_details.status === "dispatched")
        const deleverResult = result.filter((item) => item.order_details.status === "delevered")

        setPending(pendingResult.length)
        setConfirm(confirmResult.length)
        setDispatch(dispatchResult.length)
        setDelever(deleverResult.length)
    }

    useEffect(() => {
        getResult()
    }, [])

    const chartData = [
        { course: "python", Students: 60, fees: 200 },

        { course: "React Js", Students: 150, fees: 410 },

        { course: "Java", Students: 390, fees: 300 },

        { course: "C programming", Students: 231, fees: 325 },

        { course: "Javascript", Students: 301, fees: 225 },

        { course: "C++", Students: 671, fees: 400 }
    ];

    return (
        <div className='dashboard'>
            <div className="container">
                <div className='dashboardCards'>

                    <div className='dbcard' style={{ background: "linear-gradient(45deg,#e69f12,#e88c02)" }}>
                        <div className='about'>
                            <div className='icon'><TbLoader /></div>
                            <span >Pending Orders</span>
                        </div>

                        <div className='number'>
                            <h2>{pending ? pending : 0}</h2>
                            <Link style={{ color: "white" }} to='/admin/allorder'><VscInfo /></Link>
                        </div>

                    </div>

                    <div className='dbcard' style={{ background: "linear-gradient(45deg,#4a4a4a,#262525)" }}>
                        <div className='about'>
                            <div className='icon'><IoMdCheckmark /></div>
                            <span >Confirmed Orders</span>
                        </div>

                        <div className='number'>
                            <h2>{confirm ? confirm : 0}</h2>
                            <Link style={{ color: "white" }} to='/admin/allorder'><VscInfo /></Link>
                        </div>

                    </div>

                    <div className='dbcard' style={{ background: "linear-gradient(45deg,#e72ea0,#c22fd4)" }}>
                        <div className='about'>
                            <div className='icon'><PiTruckFill /></div>
                            <span >Dispatched Orders</span>
                        </div>

                        <div className='number'>
                            <h2>{dispatch ? dispatch : 0}</h2>
                            <Link style={{ color: "white" }} to='/admin/allorder'><VscInfo /></Link>
                        </div>

                    </div>

                    <div className='dbcard' style={{ background: "linear-gradient(45deg,#12e055,#32a858)" }}>
                        <div className='about'>
                            <div className='icon'><IoCheckmarkDoneSharp /></div>
                            <span >Delevered Orders</span>
                        </div>

                        <div className='number'>
                            <h2>{delever ? delever : 0}</h2>
                            <Link style={{ color: "white" }} to='/admin/allorder'><VscInfo /></Link>
                        </div>

                    </div>

                </div>

                {/* <div className='charts'>
                   
                   

                    <div className='lineChart' >
                        <div className='d-flex justify-content-between w-100 px-4'>
                            <p>ORDER BY LIST</p>
                            <Link style={{ fontSize:"20px" }} to='/admin/allorder'><VscInfo /></Link>
                        </div>
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 20, right: 45 }}>
                            <CartesianGrid vertical={false} />
                                <XAxis dataKey="course" interval={"preserveStartEnd"} />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(10,10,10,0.8)", color: "white" }}  />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="Students"
                                    stroke="blue"
                                    activeDot={{ r: 8 }}
                                    strokeWidth="3px"
                                />
                                <Tooltip contentStyle={{ backgroundColor: "rgba(10,10,10,0.8)", color: "white" }} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="fees"
                                    stroke="red"
                                    activeDot={{ r: 8 }}
                                    strokeWidth="3px"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Dashboard