import React, { useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import swal from 'sweetalert2'
export default function NewOtp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [otp, setotp] = useState("")
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })


  const handleOnsubmit = (e) => {
    e.preventDefault();
    axios.post(`${BaseUrl}verifyOTP`, {
      otp: otp
    }).then((response) => {
      console.log(response.data.userId)
      seterror({ isarray: false, error: error })
      localStorage.setItem("userId", response.data.userId);
      swal.fire(
        `${t(response.data.message)}`,
        
        'success'
    )
      if (response?.status === 200) {

        navigate('/ResetPassword');
      } else {
        alert(response?.message);
      }
    }).catch((error) => {

      seterror({ isarray: true, error: error })
      console.log(error)
    })

  }
  console.log(otp)

  return (
    <>
      {/* Hello world */}
      <section className="section-paddings">
        <div className="loginSignUp">
          <div className="authincation">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="authincation-content pb-5">
                    <div className="row no-gutters">
                      <div className="col-xl-12">
                        <div className="p-4">
                          <h4 className="text-center text-white py-5">
                            OTP Verification
                          </h4>
                          <form onSubmit={handleOnsubmit}>
                            <p className="text-white text-center">
                              An otp has been sent to ********k876@gmail.com
                            </p>
                            <div className="container text-center">
                              <div id="inputs" className="inputs4">
                                <input
                                  type="text"

                                  placeholder="enter otp"
                                  onChange={(e) => setotp(e.target.value)}
                                  value={otp}
                                  name="otp"
                                />
                                {error.isarray ? <div className="text-danger">{t(error?.error?.response?.data?.message)}</div> : ""}
                              </div>

                            </div>

                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn btnTextColor btn-block mt-5"
                              >
                                Verify
                              </button>
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
