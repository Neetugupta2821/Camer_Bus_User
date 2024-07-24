import React, { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import './ResetPassword.css'
import { BaseUrl } from '../../Api/BaseUrl';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId")
    console.log(userId)
    const [password, setpassword] = useState("")
    const handleResetpassword = (e) => {
        e.preventDefault();
        axios.post(`${BaseUrl}resetPassword/${userId}`, {
            password: password

        }).then((response) => {
            seterror({ isarray: false, error: error })
            console.log(response)
            swal.fire('Password changed!')
            navigate('/Login')
        }).catch((error) => {
            seterror({ isarray: true, error: error })
            console.log(error)
        });
    }

    return (
        <>
            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="innerBannerCont">
                                <h2>Reset password</h2>
                                <p>Be comfortable while you travel with our reliable bus rental.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-paddings">
                <div className="loginSignUp">
                    <div className="authincation">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="authincation-content">
                                        <div className="row no-gutters">
                                            <div className="col-xl-12">
                                                <div className="auth-form">
                                                    <h4 className="text-center text-white">
                                                        Reset Password
                                                    </h4>
                                                    <form onSubmit={handleResetpassword} >
                                                        <div className="form-group">
                                                            <label className="mb-1 text-white">
                                                                <strong>password*</strong>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Please enter email"
                                                                required=""
                                                                onChange={(e) => setpassword(e.target.value)}
                                                                value={password}
                                                                name="password"


                                                            />
                                                             {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                                        </div>


                                                        <div className="text-center">
                                                            <Button variant="contained" type='submit' className="btn btnTextColor btn-block mt-3">Reset Password</Button>

                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
