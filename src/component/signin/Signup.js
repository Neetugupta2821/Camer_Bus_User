import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BaseUrl } from '../../Api/BaseUrl';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [inputarr, setInputarr] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [fullName, setfullName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phoneNo, setphoneNo] = useState("")
    const [age, setage] = useState("")
    const [gender, setgender] = useState("")
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })


    const validateValues = () => {
        let errors = {};
       
        const ageRegex = /^(?:[2-9]|[1-9][0-9])$/;
        if (!fullName) {
            errors.fullName = "FullName is required";
        } else if (!/^[A-Za-z ]{1,20}$/.test(fullName)) {
            errors.fullName = "FullName must contain only alphabets";
        }
        if (!email) {
            errors.email = "Email is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        if (!phoneNo) {
            errors.phoneNo = "Phone_no is required";
        } else if (phoneNo.length !== 10) {
            errors.phone_no = "Phone no must be exactly 10 number";
        }
        if (!age) {
            errors.age = "Age is required";
        } else if (!ageRegex.test(age)) {
            errors.age = "Age must be a number between 2 and 99";
        }
        if (!gender) {
            errors.gender = "Gender is required";
        }
        return errors;
    };

    const handSubmit = (e) => {
        e.preventDefault();
        setErrors(validateValues());

        axios.post(`${BaseUrl}register`, {
            fullName: fullName,
            email: email,
            password: password,
            phone_no: phoneNo,
            age: age,
            gender: gender,
        }).then((response) => {
            setSubmitting(true);
            console.log(response)


            // localStorage.setItem("FullnameSign", response.data.Data.fullName)
            // localStorage.setItem("emailSign", response.data.Data.email)

            if (response?.status === 200) {
                setIsLoggedIn(true)
                navigate('/Login')
            }
            else {
                alert(response?.message)
                setIsLoggedIn(false)
            }

            alert("Account Created Successfully")
        }).catch((error) => {
            seterror({ isarray: true, error: error })
            console.log(error)
        })
        console.log({
            fullName,
            email,
            password,
            phoneNo,
            age,
            gender,
        })
        console.log()
    }


    // Get user email from local storage
    // const userEmail = localStorage.getItem("userEmail");

    // // Get user full name from local storage
    // const userFullName = localStorage.getItem("userFullName");

    return (
        <>

            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="innerBannerCont">
                                <h2>Sign Up</h2>
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
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6">
                                    <div className="authincation-content">
                                        <div className="row no-gutters">
                                            <div className="col-xl-12">
                                                <div className="auth-form">
                                                    <h4 className="text-center mb-4 text-white">
                                                        Sign up your account
                                                    </h4>
                                                    <>
                                                        {/* Hello world */}
                                                        <form onSubmit={handSubmit}>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="fullname" className="mb-1 text-white">
                                                                            <strong>FullName</strong>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="fullname"
                                                                            className="form-control"
                                                                            placeholder="username"
                                                                            name="fullName"
                                                                            value={fullName}
                                                                            onChange={(e) => setfullName(e.target.value)}
                                                                            onKeyPress={(e) => {
                                                                                if (e.key.match(/[0-9]/)) {
                                                                                    e.preventDefault();
                                                                                }
                                                
                                                                            }}
                                                                            maxLength={40}
                                                                        />
                                                                    </div>
                                                                    {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                                                                </div>
                                                                <div className="col-lg-6 col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="phoneno" className="mb-1 text-white">
                                                                            <strong>Phone no</strong>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="phoneno"
                                                                            className="form-control"
                                                                            placeholder="Phone no"
                                                                            name='phoneNo'
                                                                            value={phoneNo}
                                                                            onChange={(e) => setphoneNo(e.target.value)}
                                                                            pattern="[0-9]*"
                                                                            maxLength="10"
                                                                        />
                                                                    </div>
                                                                    {errors.phoneNo && <div className="text-danger">{errors.phoneNo}</div>}
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">

                                                                        <label htmlFor="email" className="mb-1 text-white">
                                                                            <strong>Email</strong>
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            id="email"
                                                                            className="form-control"
                                                                            placeholder="info@camer.com"

                                                                            name='email'
                                                                            value={email}
                                                                            onChange={(e) => setemail(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                                                    {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="password" className="mb-1 text-white">
                                                                            <strong>Password</strong>
                                                                        </label>
                                                                        <input
                                                                            type="password"
                                                                            id="password"
                                                                            className="form-control"
                                                                            placeholder="Password"
                                                                            defaultValue="Password"

                                                                            onChange={(e) => setpassword(e.target.value)}
                                                                            name="password" value={password}
                                                                        />

                                                                    </div>
                                                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                                                </div>
                                                                <div className="col-lg-6 col-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="age" className="mb-1 text-white">
                                                                            <strong>Age</strong>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="age"
                                                                            className="form-control"
                                                                            placeholder="Age"

                                                                            name="age"
                                                                            value={age}
                                                                            onChange={(e) => setage(e.target.value)}
                                                                            onKeyPress={(e) => {
                                                                                if (!/[0-9]/.test(e.key) || age.length >= 2) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            }}
                                                                            maxLength={2}
                                                                        />
                                                                        {errors.age && <div className="text-danger">{errors.age}</div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-12">
                                                                    <div className="form-group genderheading">
                                                                        <h6 className="text-white"

                                                                        >Gender</h6>
                                                                        <div className="d-flex mt-3" onChange={(e) => setgender(e.target.value)} value={gender}  >
                                                                            {/* <input type="radio" value="male" name="gender" /> Male
                                                                            <input type="radio" value="female" name="gender" /> Female
                                                                            <input type="radio" value="other" name="gender" /> Other */}
                                                                            <>
                                                                                <div>
                                                                                    <label htmlFor="female" className="mb-1 text-white">
                                                                                        Female
                                                                                    </label>
                                                                                    <input id="female" type="radio" className='ms-1' name="gender" value="female" />
                                                                                </div>
                                                                                <div className="px-3">
                                                                                    <label htmlFor="male" className="mb-1 text-white">
                                                                                        Male
                                                                                    </label>
                                                                                    <input id="male" type="radio" className='ms-1' name="gender" value="male" />
                                                                                </div>
                                                                                <div>
                                                                                    <label htmlFor="other" className="mb-1 text-white">
                                                                                        Other
                                                                                    </label>
                                                                                    <input id="other" type="radio" className='ms-1' name="gender" value="other" />
                                                                                </div>
                                                                            </>


                                                                        </div>
                                                                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center mt-4">
                                                                <button type="submit" className="btn btnTextColor btn-block" >
                                                                    Sign up
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </>

                                                    <div className="new-account mt-3">
                                                        <p className="text-white">
                                                            Already have an account?{" "}
                                                            <Link to="/Login"><a className="text-white" href="login.html">
                                                                Sign in
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
