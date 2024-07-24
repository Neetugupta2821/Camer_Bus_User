import React, { useState } from 'react'
import Newsletter from '../Home/Newsletter'
import { Button } from '@mui/material';
import axios from 'axios'
import swal from 'sweetalert2'
import { BaseUrl } from '../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
export default function ForgetPasword() {
    const navigate = useNavigate();
    const [email, setemail] = useState(" ")
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    const handlForgetpassword = (e) => {
        e.preventDefault();
        axios.post(`${BaseUrl}forgetPassOTP`, {
            email: email
        }).then((response) => {
            console.log(response)
            seterror({ isarray: false, error: error })
            if (response?.status === 200) {

                navigate('/NewOtp')


            }
            else {
                alert(response?.message)

            }

            // localStorage.setItem("token", response.data.token.token);

            swal.fire('chek your email for the OTP')
        }).catch((error) => {
            seterror({ isarray: true, error: error })
            console.log(error)
        })
    }

    return (
        <>
            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="innerBannerCont">
                                <h2>Forget password</h2>
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
                                                        Forgot Password
                                                    </h4>
                                                    <form onSubmit={handlForgetpassword}>
                                                        <div className="form-group">
                                                            <label className="mb-1 text-white">
                                                                <strong>Email*</strong>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Please enter email"
                                                                required=""
                                                                onChange={(e) => setemail(e.target.value)}
                                                                value={email}
                                                                name="email"

                                                            />
                                                            {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                                        </div>


                                                        <div className="text-center">
                                                            <Button variant="contained" type='submit' className="btn btnTextColor btn-block mt-3">Forget Password</Button>

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
