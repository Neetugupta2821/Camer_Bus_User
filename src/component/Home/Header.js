import React, { useEffect, useState, useRef } from 'react'
import logo from '../image/logo-full.png'
import { Link, NavLink } from "react-router-dom";
import '../Home/Header.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BaseUrl, ImageBaseUrl } from '../../Api/BaseUrl';
import { ThemeContext } from '../Context/Context'
import { useContext, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import light from '../image/dark.png'
import dark from '../image/light.png'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BackToTopButton from '../../BackToTopButton/BackToTopButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReactFlagsSelect from "react-flags-select";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Header({ flagNationCode }) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  let name = localStorage.getItem('name')
  let name2 = localStorage.getItem('name')
  let name3 = localStorage.getItem('name')
  const [ImageType, setImageType] = useState("")
  const [notification, setnotification] = useState([])
  const [Count, setCount] = useState("")
  const [show, setshow] = useState(" ")
  const [hideShow, SetHideShow] = useState(true)
  const [select, setSelect] = useState(useState(localStorage.getItem('language')));
  // const onSelect = (code) => setSelect(code);
  // console.log("SELECT", select);
  // const onSelect = (code) => {
  //   i18n.changeLanguage(code);
  //   console.log("SELECT", code);

  //   localStorage.setItem("language", code)

  // }
  const handlesubmit = (code) => {
    i18n.changeLanguage(code);
    console.log("SELECT", code);

    localStorage.setItem("language", code)

  }

  const toggleTheme = () => {

    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  localStorage.setItem("switchMode", theme)

  let email = localStorage.getItem('email')
  let profileImage = localStorage.getItem('profileImage')
  let idType = localStorage.getItem('id')

  const [open1, setOpen1] = useState(false)
  const [open, setOpen] = useState(false)
  // const [open2, setOpen2] = useState(false)
  // const toggleMenu = () => {
  //   setOpen(!open);
  //   setOpen1(false)
  // };
  // const toggleMenu2 = () => {
  //   setOpen1(!open1)
  //   setOpen(false)
  // };
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/')

  }
  const HandleNotification = () => {
    axios.get(`${BaseUrl}getNotification/${idType}`).then((response) => {
      console.log(response.data)

      setnotification(response.data.notification_details, 'notification')
    }).then((error) => {
      console.log(error)
    })

  }
  const HandleNotiFicatinCount = () => {
    axios.get(`${BaseUrl}notificationCount/${idType}`).then((response) => {
      console.log(response.data.unseenNotifications_Count, 'notification Countttttttttttt')
      setCount(response.data.unseenNotifications_Count)
      setshow(response.data.unseenNotification.notification_status)

    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    HandleNotiFicatinCount()
  }, [Count])
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    setOpen(!open);
    setOpen1(false);
  };
  const toggleMenu2 = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    setOpen1(!open1);
    setOpen(false);
  };
  const toggleMenu3 = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation

    setOpen1(false);
    setOpen(false);
  };

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const handleClickOutsideProfile = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
      setOpen1(false);
    }
  };

  const handleClickOutsideNotification = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setOpen1(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideProfile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideNotification);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNotification);
    };
  }, []);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [scrollY, setScrollY] = useState(0);


  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const OnHideshowButton = () => {
    SetHideShow(!hideShow)
  }
  const handleSeeNotification = (id) => {
    axios.post(`${BaseUrl}/seenUserNotification/${id}`).then((response)=>{
      console.log(response)
      HandleNotification()
      HandleNotiFicatinCount()
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div><>
      <a href="http://wa.me/+237677632545" class="float" target="_blank">
        <WhatsAppIcon className='my-float' />
      </a>
      <BackToTopButton />
      <header>
        <div class='bg-white top-header'>
          <div class="container">
            {hideShow &&
              <div class="navbar_top" >
                <div class="navbar_top1">
                  <div class="navbar_top_items">
                    <LocalPhoneIcon style={{ "color": "#999999", "font-size": "15px" }} />
                    <a href="tel:+237677632545"> +237 6 77 63 25 45  </a>
                  </div>
                  <div class="navbar_top_items">
                    <MailOutlineIcon style={{ "color": "#999999", "font-size": "15px" }} />
                    <a href="mailto:camertravel237@gmail.com">camertravel237@gmail.com</a>
                  </div>
                  <div class="navbar_top_items">
                    <AvTimerIcon style={{ "color": "#999999", "font-size": "15px" }} />
                    <a href=""> Mon – Sun 07:00 - 22:00</a>
                  </div>
                </div>

                <div class="navbar_top2">
                  <div class="navbar_top_items">
                    <a href="https://www.facebook.com/profile.php?id=61556376180411"> <FacebookIcon style={{ "color": "#999999", "font-size": "20px" }} /></a>
                  </div>
                  <div class="navbar_top_items">
                    <a href="https://www.linkedin.com/in/camer-travel-b454502b4/"><LinkedInIcon style={{ "color": "#999999", "font-size": "20px" }} /></a>
                  </div>
                  <div class="d-flex align-items-center px-2">
                    <a href="https://twitter.com/CamerTravel"><TwitterIcon style={{ "color": "#999999", "font-size": "20px" }} /></a>
                  </div>
                  <div class="d-flex align-items-center px-2">
                    <a><img src="https://amourmezam.com/images/en.jpg" onClick={() => handlesubmit("GB")} /> </a>
                  </div>
                  <div class="d-flex align-items-center px-2">
                    <a><img src='https://amourmezam.com/images/fr.jpg' onClick={() => handlesubmit("FR")} /> </a>
                  </div>
                  {/* <div><ReactFlagsSelect
                   className='countrybtn'
                   selected={select}
                   onSelect={onSelect}
                   countries={["fi", "GB", "FR"]}
                 /></div> */}
                </div>
              </div>
            }
          </div>
          <div className='HideShowToggle_button' onClick={OnHideshowButton}>
            {hideShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>

        <nav className={`navbar navbar-expand-lg navBgColor second-header ${scrollDirection === 'down' ? 'sticky' : ''}`} id='stickyHeader'>
          <div className="container px-0">
            <a className="navbar-brand " href="/"   >
              <img src={logo} />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fi fi-br-menu-burger"></i>
            </button>

            <div className="collapse navbar-collapse  hoverabledrop" id="navbarCollapse">
              <ul className="navbar-nav mb-2 mb-md-0" style={{ "white-space": "nowrap" }}>

                <li className="nav-item">
                  <abbr title={t('Home')} style={{ "text-decoration": "none" }}><NavLink className='nav-link' to="/">{t('Home')} </NavLink></abbr>
                </li>

                <li className="nav-item"  >
                  <NavLink className='nav-link' to="/Aboutus" id="aboutUsDropdown"  >
                    {t('About Us')}
                    {/* <ArrowDropDownIcon onClick={toggleMenu3} /> */}
                  </NavLink>
                  <ul class="dropdown">
                    <Link className='nav-link' to="/AboutSubMenu" ><li>{t('Presentation')}</li></Link>
                    <Link className='nav-link' to="/OurTeam" ><li>{t('Our Team')}  </li></Link>
                    <Link className='nav-link' to="/OurFleet" ><li> {t('Our Fleet')}</li></Link>
                    <Link className='nav-link' to="/TermsConditions" ><li>{t('Terms & Conditions')}</li></Link>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink className='nav-link' to="/Services">{t('Services')}</NavLink>
                  <ul class="dropdown">
                    <Link className='nav-link' to="/PassengerTrans"> <li>{t('Passenger Transportation')}</li></Link>
                    <Link className='nav-link' to="/MailParcel"><li> {t('Mail and Parcel')} </li></Link>
                    <Link className='nav-link' to="/BusRental"><li> {t('Bus Rental')}</li></Link>
                    <Link className='nav-link' to="/FirstClass"><li> {t('First Class Travel')}</li></Link>
                    <Link className='nav-link' to="/RegularTravel"><li> {t('Regular Travel')}</li></Link>
                  </ul>
                </li>

                <li className="nav-item">
                  <abbr title={t('OUR AGENCIES')} style={{ "text-decoration": "none" }}><NavLink className='nav-link' to="/OURAGENCIE'">{t('Our Agencies')}</NavLink></abbr>
                </li>

                <li className="nav-item">
                  <abbr title={t('BOOK YOUR TICKET')} style={{ "text-decoration": "none" }}><NavLink className='nav-link' to="/BookYourTicket">{t('Book Your Ticket')}</NavLink></abbr>
                </li>

                <li className="nav-item">
                  <abbr title={t('FAQ')} style={{ "text-decoration": "none" }}><NavLink className='nav-link' to="/FAQ">{t('FAQ')}</NavLink></abbr>
                </li>

                <li className="nav-item">
                  <abbr title={t('Contact Us')} style={{ "text-decoration": "none" }}><NavLink className='nav-link' to="/Contact">{t('Contact Us')}</NavLink></abbr>
                </li>
              </ul>
              <div className='use_profile2'>
                {!name && !email ? (
                  <form className="" role="search">

                    <NavLink to="/Login"><a className="btn logBtn" type="submit">
                      {t('Sign In')}{" "}
                    </a></NavLink>

                    <NavLink to="/Signup"><a href="/Signup" className="btn logBtn" type="submit">
                      {t('Sign Up')}{" "}
                    </a></NavLink>

                  </form>) : (
                  <div className="use_profile">
                    <div className="dropdown_prof">
                      <div className="profile">
                        <div className="img-box">
                          <img
                            src={profileImage ? `${ImageBaseUrl}${profileImage}` : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            alt="some user image"
                          />
                        </div>

                        <div className="user text-start LightDarkNotification2">
                          <h3>{name}</h3>
                          <p>{email}</p>
                        </div>
                      </div>
                      <ul className="dropdown_prof-content menuProfile">
                        <div className='Show_notification_hide'>
                          <div clas sName="user text-start">
                            <h6>{name}</h6>
                            <p >{email}</p>
                          </div>
                        </div>
                        <Link to="/Profile" className='nav-link'>
                          <li  >
                            <i className="ph-bold ph-user" />
                            {t('My Profile')}
                          </li>
                        </Link>

                        <Link to="/MyBooking" className='nav-link'>
                          <li  >
                            <i className="ph-bold ph-envelope-simple" />
                            {t('My Trips')}
                          </li>
                        </Link>
                        <li style={{ "cursor": "pointer" }}>
                          <i className="ph-bold ph-question" />
                          {t("Wallet / Cards")}
                        </li>

                        <li onClick={handleLogOut} style={{ "cursor": "pointer" }} >
                          <i className="ph-bold ph-sign-out" />
                          {t('Sign Out')}
                        </li>

                        <li style={{ "cursor": "pointer" }}>{t('Sign Out all devices')}{" "}
                        </li>


                      </ul>
                    </div>

                    <div className='notification_icon LightDarkNotification' onClick={HandleNotification}  >
                      <li className="header-account-link" onClick={toggleTheme}>
                        {theme === "dark" ? (
                          <span className="material-icons" title="Switch to Light Mode" style={{ "color": "white", "padding": "5px 0" }}>
                            <DarkModeIcon />
                          </span>
                        ) : (
                          <span className="material-icons" title="Switch to Dark Mode" style={{ "color": "white", "padding": "5px 0" }}>
                            <WbSunnyIcon />
                          </span>
                        )}
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link  ai-icon"
                        >
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={toggleMenu2}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.8333 5.91732V3.49998C12.8333 2.85598 13.356 2.33331 14 2.33331C14.6428 2.33331 15.1667 2.85598 15.1667 3.49998V5.91732C16.9003 6.16698 18.5208 6.97198 19.7738 8.22498C21.3057 9.75681 22.1667 11.8346 22.1667 14V18.3913L23.1105 20.279C23.562 21.1831 23.5142 22.2565 22.9822 23.1163C22.4513 23.9761 21.5122 24.5 20.5018 24.5H15.1667C15.1667 25.144 14.6428 25.6666 14 25.6666C13.356 25.6666 12.8333 25.144 12.8333 24.5H7.49817C6.48667 24.5 5.54752 23.9761 5.01669 23.1163C4.48469 22.2565 4.43684 21.1831 4.88951 20.279L5.83333 18.3913V14C5.83333 11.8346 6.69319 9.75681 8.22502 8.22498C9.47919 6.97198 11.0985 6.16698 12.8333 5.91732ZM14 8.16664C12.4518 8.16664 10.969 8.78148 9.87469 9.87581C8.78035 10.969 8.16666 12.453 8.16666 14V18.6666C8.16666 18.8475 8.12351 19.026 8.04301 19.1881C8.04301 19.1881 7.52384 20.2265 6.9755 21.322C6.88567 21.5028 6.89501 21.7186 7.00117 21.8901C7.10734 22.0616 7.29517 22.1666 7.49817 22.1666H20.5018C20.7037 22.1666 20.8915 22.0616 20.9977 21.8901C21.1038 21.7186 21.1132 21.5028 21.0234 21.322C20.475 20.2265 19.9558 19.1881 19.9558 19.1881C19.8753 19.026 19.8333 18.8475 19.8333 18.6666V14C19.8333 12.453 19.2185 10.969 18.1242 9.87581C17.0298 8.78148 15.547 8.16664 14 8.16664Z"
                              fill="#fff"
                            />
                          </svg>
                          {/* {show === 1 ? <span className='badge' style={{ "backgroundColor": "red", "color": "white" }}>{Count}</span> : null} */}
                          <span className='badge' style={{ "backgroundColor": "red", "color": "white" }}>{Count}</span> 
                          <div className="pulse-css" />
                        </a>
                        {/* */}
                        {open1 && (
                          <div className='menuProfile1' id="myDIV" ref={notificationRef}  >
                            <div
                              className="widget-media dz-scroll p-3 addClass"
                            >
                              <ul className="timeline">
                                {Array.isArray(notification) && notification.map((info, index) => (
                                  <li key={index} onClick={() => handleSeeNotification(info._id)}>
                                    <b>{index + 1}</b>.

                                    {info.message}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </li>
                    </div>
                    {/*  */}
                  </div>
                )}
                {!name && !email ? (<div className='my-3'>
                  <ul className="ps-0 mb-0">
                    <li className="header-account-link" onClick={toggleTheme}>
                      {theme === "dark" ? (
                        <span className="material-icons" title="Switch to Light Mode" style={{ "color": "white", "padding": "20px" }}>
                          <DarkModeIcon />
                        </span>
                      ) : (
                        <span className="material-icons" title="Switch to Dark Mode" style={{ "color": "white", "padding": "20px" }}>
                          <WbSunnyIcon />
                        </span>
                      )}
                    </li>
                  </ul>
                  {/* <h6 style={{ "color": "white" }} onClick={toggleTheme}>{theme}</h6> */}
                </div>) : ""}
              </div>
            </div>


            {/* <select className="selectpicker" data-width="fit">
              <option > <Us /> United States</option>
              <option  > <Us /> United States</option>
            </select> */}
          </div>
        </nav>
      </header>
    </>
    </div>
  )
}