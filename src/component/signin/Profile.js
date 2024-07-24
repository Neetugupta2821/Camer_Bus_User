
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import EditIcon from '@mui/icons-material/Edit';
import { BaseUrl, ImageBaseUrl } from '../../Api/BaseUrl'


export default function Profile() {
  const uploadedImage = React.useRef(null)
  let emailType = localStorage.getItem('email');
  console.log(emailType)
  let emailSign = localStorage.getItem('emailSign')
  console.log(emailSign)
  const [userin, setuserin] = useState([])
  const [selectedImage, setSelectedImage] = useState("");
  const [message, setmessage] = useState(false)
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })
  const [required, setrequired] = useState(false)

  const handelUserData = () => {
    axios.get(`${BaseUrl}getUser/${emailType}`).then((response) => {
      console.log(response.data.user_Details, "chek profileimageeeeeeeeeeeeeeeeeeeeeeeeeee")
      setuserin(response.data.user_Details)
      setupdate(response.data.user_Details)
      setSelectedImage(`${`http://13.51.205.211:4001/`}${response.data.user_Details.profileImage}`)
      console.log(selectedImage, "hello")
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handelUserData()
  }, [])
  const [update, setupdate] = useState({
    profileImage: " ",
    fullName: " ",
    email: " ",
    phone_no: " ",
    age: "",
    gender: ""
  })

  const changehandle = (e) => {
    const { name, value } = e.target;
    setupdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };


  // const handleImageChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(selectedFile);
  //   setupdate({ ...update, profileImage: selectedFile });
  //   setuserin(imageUrl)
  // };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update.profileImage || !update.fullName || !update.email || !update.phone_no || !update.age || !update.gender) {
      setrequired(true)

    }

    const formData = new FormData();
    formData.append('profileImage', update.profileImage);
    formData.append('fullName', update.fullName);
    formData.append('email', update.email);
    formData.append('phone_no', update.phone_no || ''); // Provide a default empty string if phone_no is undefined

    formData.append('age', !isNaN(update.age) ? parseInt(update.age) : 0);

    formData.append('gender', update.gender || ''); // Provide a default empty string if gender is undefined

    axios.put(`${BaseUrl}updateUser/${userin._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },

    }).then((response) => {
      console.log(response)
      handelUserData()
      setupdate(response)
      setSelectedImage(`${response.profileImage}`);
      setrequired(false)
      localStorage.setItem('fullname', update.fullName)
      swal.fire(
        'profile updates!',
        'Your profile has been updated successfully',
        'success'
      )
    }).catch((error) => {
      console.log(error)
    })

  }





  const handleImageUpload = e => {
    const [file] = e.target.files;
    // setState((prevState) => ({ ...prevState, profile: e.target.files[0] }))
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const LoginEmail = localStorage.getItem('email')
  const [change, setChange] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const handleChange = (e) => {
    setChange((predata) => ({
      ...predata,
      [e.target.name]: e.target.value
    }))
  }
  let {
    email,
    oldPassword,
    newPassword,
    confirmPassword
  } = change
  const handlChangepassword = () => {

    if (!oldPassword || !newPassword || !confirmPassword) {
      setmessage(true)


    } else {
      setmessage(false)
      axios.post(`${BaseUrl}userChangePass`, {
        email: LoginEmail,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      }).then((response) => {

        swal.fire(
          'Password changed!',
          'your password has been changed successfully',
          'success'
        )
        setChange({
          email: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
        console.log(response)
        seterror({ isarray: false })
      }).catch((error) => {

        seterror({ isarray: true, error: error })
        console.log(error)
      })
      console.log({
        email,
        oldPassword,
        newPassword,
        confirmPassword
      })
    }

  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setupdate({ ...update, profileImage: file });
    }
  };
  // localStorage.setItem('fullname',response.data.user.fullName)
  localStorage.setItem('fullname', update.fullName)
  localStorage.setItem('profileImage', update.profileImage)
  console.log(update, "chekUpdate data")
  return (
    <>
      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>Our Profile</h2>
                <p>Be comfortable while you travel with our reliable bus rental.</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-paddings">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <dibv className="">
                <div className="content">
                  {/* <div class="LeftsidePro"> */}
                  <input
                    className="inputNone"
                    type="radio"
                    name="slider"
                    defaultChecked=""
                    id="profile"
                  />
                  <input className="inputNone" type="radio" name="slider" id="blog" />
                  {/* <input className="inputNone" type="radio" name="slider" id="help" />
                  <input className="inputNone" type="radio" name="slider" id="code" /> */}
                  <input
                    className="inputNone"
                    type="radio"
                    name="slider"
                    id="about" 
                  />
                  <div className="list">
                    <label htmlFor="profile" className="home">
                      <span>My Profile</span>
                    </label>
                    <label htmlFor="blog" className="blog">
                      <span>Change Password</span>
                    </label>
                    <div className="slider" />
                  </div>
                  {/* </div> */}
                  <div className="text-content">
                    <div className="home text">
                      <span style={{ "color": "Red" }}>{required ? "Please fill in all required fields.*" : null}</span>
                      <form onSubmit={handleSubmit}>
                        <div className="userDetails">
                          <div className="updateImg">
                            <div className="avatar-upload">
                              <div className="avatar-edit">
                                <input type="file" id="image"
                                  onChange={(event) => {
                                    handleImageChange(event);
                                    handleImageUpload(event)
                                  }}
                                />
                                <label htmlFor="image"><EditIcon /></label>
                              </div>
                              <div className="avatar-preview">
                                <label htmlFor="image">
                                  <img
                                    ref={uploadedImage}
                                    alt="not found"
                                    className="rounded-circle"
                                    width="150px"
                                    src={`${ImageBaseUrl}${update.profileImage}`}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row userdet1">
                            <div className="col-md-6 userdetLeft form-group">
                              <div className="usertext">Your Name*</div>
                              <input
                                className="disappear form-control"
                                type="text"
                                name="fullName"
                                value={update.fullName}
                                onChange={changehandle}
                                onKeyPress={(e) => {
                                  if (e.key.match(/[0-9]/)) {
                                    e.preventDefault();
                                  }
                                }}
                                maxLength={40}
                              />
                            </div>
                            <div className="col-md-6 userdetRight form-group">
                              <div className="usertext">Email*</div>
                              <input
                                id=""
                                className="disappear form-control"
                                type="email"
                                name="email"
                                value={update.email}
                                disabled

                              />
                            </div>
                            {/* <div className="col-md-6 userdetRight form-group">
                            <div className="usertext">Password*</div>
                            <input
                              id=""

                              className="disappear form-control"
                              type="password"
                              value={update.password}
                              name="password"
                            />
                          </div> */}
                            <div className="col-md-6 userdetRight form-group">
                              <div className="usertext">Phone Number*</div>
                              <input
                                id=""
                                className="disappear form-control"
                                value={update.phone_no}
                                name="phone_no"
                                onChange={changehandle}
                                pattern="[0-9]*"
                                maxLength="10"

                              />

                            </div>
                            <div className="col-md-6 userdetRight">
                              <div className="usertext">Age*</div>
                              <input
                                id=""

                                className="disappear form-control"

                                disabled=""
                                value={update.age}
                                name="age"
                                onChange={changehandle}
                                onKeyPress={(e) => {
                                  if (!/[0-9]/.test(e.key) || update.age.length >= 2) {
                                    e.preventDefault();
                                  }
                                }}
                                maxLength={2}
                              />
                            </div>
                            <div className="col-md-6 gender mt-3">
                              <div className="usertext">Gender*</div>
                              <span>
                                <input
                                  type="radio"
                                  id="male"
                                  name="gender"
                                  value="male"  // Set the value for the male option
                                  onChange={changehandle}
                                  checked={update.gender === 'male'}  // Check if the value matches 'male'
                                />

                                <label htmlFor="male">Male</label>
                              </span>
                              <span>
                                <input
                                  type="radio"
                                  id="female"
                                  name="gender"
                                  value="female"  // Set the value for the female option
                                  onChange={changehandle}
                                  checked={update.gender === 'female'}  // Check if the value matches 'female'
                                />

                                <label htmlFor="female">Female</label>
                              </span>
                            </div>
                          </div>
                        </div><br></br>
                        <input type="submit" value="UPDATE" className='month-link' />
                      </form>
                    </div>
                    {/* <div className="blog text">
                      <div className="title">See Booking History</div>
                      <div className="allbookingList">
                        <div className="bookingCont">
                          <div className="cityname">
                            <span className="d-flex">
                              <i className="material-icons"> directions_bus </i>
                              <h4>London Travel</h4>
                            </span>
                            <span>Luxury</span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="blog text">
                      <div className="title">Change password</div>
                      <span style={{ "color": "red" }}>{message ? "Please fill in all required fields.*" : null}</span>
                      <form>
                        <div className="col-md-6 form-group my-4">
                          <input
                            type="text"
                            className="form-control"

                            placeholder='Email'
                            onChange={handleChange}
                            value={LoginEmail}
                            name="email"
                            disabled
                          />
                        </div>
                        <div className="col-md-6 form-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="oldPassword"
                            placeholder='Old Password'
                            onChange={handleChange}
                            value={change.oldPassword}
                          />
                          {error.isarray ? <div className="text-danger">{error.error.response.data.IncorrectPassword}</div> : ""}

                        </div>
                        <div className="col-md-6 form-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="newPassword"
                            placeholder='New Password'
                            onChange={handleChange}
                            value={change.newPassword}
                          />


                        </div>
                        <div className="col-md-6 form-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            value={change.confirmPassword}
                          />
                          {error.isarray ? <div className="text-danger">{error.error.response.data.notMatchedPassword}</div> : ""}

                        </div>
                        <div className="col-md-12 form-group ">
                          <button type="button" className="viewDetailBtn mt-4" onClick={handlChangepassword}>
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <div className="code text">
                      <div className="title">Forget password</div>
                      <form>
                        <div className="col-md-6 form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="Enter Ticket No"
                            placeholder='Email'
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Confirm Password*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Enter Ticket No"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <button type="button" className="viewDetailBtn mt-4" onClick={handlForgetPassword}>
                            Reset Password
                          </button>
                        </div>
                      </form>
                    </div> */}
                  </div>
                </div>
              </dibv>
            </div>
          </div>
        </div>
      </section>

    </>


  )
}




























