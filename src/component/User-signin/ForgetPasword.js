import React, { useState } from 'react'
import Newsletter from '../Home/Newsletter'
import { Button } from '@mui/material';
import axios from 'axios'
import swal from 'sweetalert2'
import { BaseUrl } from '../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ForgetPasword() {
    const { t, i18n } = useTranslation();
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

            swal.fire({
                title: t("Login successful"),
                text: t(response.data.message),
                icon: "success"
              });
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
                                <h2>{t('Forget password')}</h2>
                                <p>{t('Be comfortable while you travel with our reliable bus rental.')}</p>

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
                                                       {t('Forgot Password')}
                                                    </h4>
                                                    <form onSubmit={handlForgetpassword}>
                                                        <div className="form-group">
                                                            <label className="mb-1 text-white">
                                                                <strong>{t("Email")}*</strong>
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
                                                            {error.isarray ? <div className="text-danger">{t(error.error.response.data.message)}</div> : ""}
                                                        </div>


                                                        <div className="text-center">
                                                            <Button variant="contained" type='submit' className="btn btnTextColor btn-block mt-3">{t("Forget Password")}</Button>

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
