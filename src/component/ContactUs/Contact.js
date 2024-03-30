import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import Email from '@mui/icons-material/Email';
import { BaseUrl } from '../../Api/BaseUrl';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function Contact() {
  const { t, i18n } = useTranslation();
  const [userName,setuserName]=useState("")
  const [email,setemail]=useState("")
  const [company,setcompany]=useState("")
  const [message,setmessage]=useState("")
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validateValues = () => {
    let errors = {};
   
    const ageRegex = /^(?:[2-9]|[1-9][0-9])$/;
    if (!email) {
        errors.email = "Email is required";
    }  
    if (!company) {
        errors.company = "Company Name is required";
    }
    if (!message) {
        errors.message = "Message is required";
    }
    if (!userName) {
      errors.userName = "FullName is required";
  } else if (!/^[A-Za-z ]{1,20}$/.test(userName)) {
      errors.userName = "FullName must contain only alphabets";
  }
    
    return errors;
};
   
   


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues());
    axios
      .post(`${BaseUrl}contactUs`, {
        fullName:userName,
        email:email,
        companyName: company,
        message:message,
      })
      .then((response) => {
        console.log(response);
        setSubmitting(true);
        if (response.status === 200) {
          alert("Message created successfully");
          setuserName(" ")
          setemail(" ")
          setcompany(" ")
          setmessage(" ")

           
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>{t('Contact Us')}</h2>
                <p>Be comfortable while you travel with our reliable bus rental.</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-paddings">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact_usDetails">
                <div className="callNow contactNow">
                  <span className="callIcon">
                    <i className="material-icons"><LocationOnIcon /></i>
                  </span>
                  <div className="callText">
                    <h2>{t('Office Location')}</h2>
                    <label>Cameroon, Yaoundé BP:6083</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact_usDetails leftRightBorder">
                <div className="callNow contactNow">
                  <span className="callIcon">
                    <i className="material-icons"><LocalPhoneIcon /></i>
                  </span>
                  <div className="callText">
                    <h2>{t('Phone Number')}</h2>
                    <label>+237677632545</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact_usDetails">
                <div className="callNow contactNow">
                  <span className="callIcon">
                    <i className="material-icons"><EmailIcon /></i>
                  </span>
                  <div className="callText">
                    <h2>{t('Email Address')}</h2>
                    <label>camertravel237@gmail.com</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fillFormContactus">
            <div className="row">
              <div className="col-md-7">
                <div className="contactUsForm contain">
                  <div className="mainHeading">
                    <h2>{t('Send us a Message')}</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                      tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                  </div>
                  <div className="form">
                    <form id="submit-form" className="row" action="" onSubmit={handleSubmit}>
                      <div className="col-md-6 form-group">
                        <input
                          id="Name"
                          className="form-input"
                          type="text"
                          placeholder={message.Name ? '' : 'Your Name*'}
                          onChange={(e)=>setuserName(e.target.value)}
                          value={userName}
                          name="userName"
                          onKeyPress={(e) => {
                            if (e.key.match(/[0-9]/)) {
                                e.preventDefault();
                            }

                        }}
                        maxLength={20}
                           
                        />
                         
                        {errors.userName && <div className="text-danger">{errors.userName}</div>}
                      </div>
                      <div className="col-md-6 form-group">
                        <input
                          id="email"
                          className="form-input"
                          type="email"
                          placeholder="Your Email*"
                          onChange={(e)=>setemail(e.target.value)}
                          value={email}
                          name="email"
                           
                        />
                        <small className="name-error" />
                        {errors.email  && <div className="text-danger">{errors.email }</div>}
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          id="company-name"
                          className="form-input"
                          type="text"
                          placeholder="Company Name*"
                          required=""
                          onChange={(e)=>setcompany(e.target.value)}
                         value={company}
                          name="company"
                           
                        />
                          {errors.company && <div className="text-danger">{errors.company}</div>}
                        <small />
                      </div>
                      
                      <div className="col-md-12 form-group">
                        <textarea
                          minLength={10}
                          id="message"
                          cols={30}
                          rows={7}
                          placeholder="Your Message*"
                          required=""
                          defaultValue={""}
                          onChange={(e)=>setmessage(e.target.value)}
                          value={message}
                          name="message"
                          
                        />
                          {errors.message && <div className="text-danger">{errors.message}</div>}
                        <small />
                      </div>
                      {/* <div className="col-md-12 form-group">
                        <input
                          type="checkbox"
                          id="checkbox"
                          name="checkbox"
                          defaultChecked=""
                        />{" "}
                        Yes, I would like to receive communications by call / email
                        about Company's services.
                      </div> */}
                      <div className="col-md-12 form-group">
                        <input
                          type="submit"
                          className="submit-btn bannerBtn"
                          defaultValue="Submit"
                          onclick="checkValidations()"
                        />
                        {/* <button className="reset-btn bannerBtn" onclick="reset()">
                    Reset
                  </button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-5 ps-0">
                <div className="locationMap">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3980.764218974311!2d11.5179239!3d3.8606987!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1700642428113!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  )
}
