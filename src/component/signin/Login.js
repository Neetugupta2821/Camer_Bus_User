import React, { useState } from 'react'

import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { BaseUrl } from '../../Api/BaseUrl';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, OAuthProvider } from "firebase/auth"
import swal from 'sweetalert2'


const firebaseConfig = {
  apiKey: "AIzaSyDPGBd--82YCWjR6G7xBlW4yCtepCa99pU",
  authDomain: "busapp-1dc4b.firebaseapp.com",
  projectId: "busapp-1dc4b",
  storageBucket: "busapp-1dc4b.appspot.com",
  messagingSenderId: "682984709844",
  appId: "1:682984709844:web:2be01fdea2aeaa8b156541"
};
export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })
  const validateValues = () => {
    let errors = {};
    if (!email) {
      seterror({ isarray: false })
      errors.email = "Email is required";


    }
    if (!password) {
      errors.password = "Password is required";
      seterror({ isarray: false })
    }

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues());
    axios.post(`${BaseUrl}login`, {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setSubmitting(true);
      console.log(response.data.user)
      console.log(response.data.user.fullName);
      const Name = response.data.user.fullName
      console.log(response.data.user.email);
      console.log(response.data.user._id);

      localStorage.setItem('name', Name)

      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('profileImage', response.data.user.profileImage)
      localStorage.setItem('id', response.data.user._id)
      
        setIsLoggedIn(true)
        swal.fire({
          title: "Login successful",
          text: "You clicked the button!",
          icon: "success"
        });
        setemail('');
        setpassword('');
        navigate('/')
    }).catch((error) => {
      setIsLoggedIn(false)
      swal.fire("Error", `${error?.response?.data?.restricted_message}`, "error");
       
    })

  }


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider();
  const ApplEprovider = new OAuthProvider('apple.com')
  const signInWIthGoogle = (e) => {
    e.preventDefault(); // Corrected typo
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In Result:", result);
        const name = (result.user.displayName)
        const email = (result.user.email)
        const photoURL = (result.user.photoURL)
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("photoUrl", photoURL)
        navigate('/')

      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          // Handle the popup closed by the user
          console.log('Authentication popup closed by the user');
        } else {
          console.error(error);
        }
      });

  };
  const signInWithFacebook = (e) => {
    e.preventDefault();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log("facebook Sign-In Result:", result);
        const name = result.user.displayName;
        console.log(name)
        localStorage.setItem("name", name)
        navigate('/');
      })
      .catch((error) => {

        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)

        const email = error.customData.email;
        console.log(email)




        // ...
      });
  };
  const signInWithApple = (e) => {
    e.preventDefault();
    signInWithPopup(auth, ApplEprovider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // Apple credential
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);

        // ...
      });
  }
  return (

    <>

      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>Login</h2>
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
                            Sign in your account
                          </h4>
                          <form onSubmit={handleSubmit}>
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
                              />
                            </div>
                            {errors.email ? <div className="text-danger">{errors.email}</div> : <div className="text-danger">{error?.error?.response?.data?.EmailMessage ? error?.error?.response?.data?.EmailMessage : errors?.email}</div>}
                            {/* {error.isarray? <div className="text-danger">{error?.error?.response?.data?.EmailMessage}</div> :"" } */}
                            <div className="form-group">
                              <label className="mb-1 text-white">
                                <strong>Password*</strong>
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required=""
                                onChange={(e) => setpassword(e.target.value)}
                              />
                            </div>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                            {/* {error.isarray ? <div className="text-danger">{error.error.response.data.passwordMessage}</div> : ""} */}
                            <div className="d-flex justify-content-between mt-4 mb-2">
                              <div className="form-group">
                                {/* <div className="form-check custom-checkbox ms-1 text-white">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="basic_checkbox_1"
                                    required=""
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="basic_checkbox_1"
                                  >
                                    Remember my preference
                                  </label>
                                </div> */}
                              </div>
                              <div className="form-group">
                                <Link to="/ForgetPasword"> <a className="text-white" href="/ForgetPasword">
                                  Forgot Password?
                                </a></Link>
                              </div>
                            </div>
                            <div className="text-center">
                              <Button variant="contained" type='submit' className="btn btnTextColor btn-block mt-3">Sign In</Button>
                              {/* <button
                          type="submit"
                          className="btn btnTextColor btn-block mt-3"
                        >
                          Sign In
                        </button> */}
                            </div>
                            <div className="form-group">
                              <div className="horizonline">
                                <hr />
                                <span className="textLoginWith">OR</span>
                              </div>
                              <ul className="loginWith">
                                <li>
                                  <a href=" ">
                                    <GoogleIcon className="fa-brands fa-google-plus-g" onClick={signInWIthGoogle} />

                                  </a>{" "}
                                </li>
                                <li>
                                  <a href="#!">
                                    <FacebookOutlinedIcon className="fa-brands fa-facebook-f" onClick={signInWithFacebook} />

                                  </a>{" "}
                                </li>
                                <li>
                                  <a href=" ">
                                    <AppleIcon className="fa-brands fa-apple" onClick={signInWithApple} />
                                    {/* <i className="fa-brands fa-apple" /> */}
                                  </a>{" "}
                                </li>
                              </ul>
                            </div>
                          </form>
                          <div className="new-account mt-3">
                            <p className="text-white">
                              Don't have an account?{" "}
                              <Link to="/Signup">   <a className="text-white" href="/Signup">
                                Sign up
                              </a></Link>
                            </p>
                          </div>
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















