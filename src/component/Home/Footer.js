import React from 'react'
import logo from '../image/logo-full.png'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.css'
import { Link } from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import './Flags.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useContext, useLayoutEffect } from 'react';
import { ThemeContext } from '../Context/Context'

export default function Footer() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [select, setSelect] = useState(useState(localStorage.getItem('language')));
  // const onSelect = (code) => setSelect(code);
  // console.log("SELECT", select);
  const onSelect = (code) => {
    i18n.changeLanguage(code);
    console.log("SELECT", code);

    localStorage.setItem("language", code)

  }

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // }

  return (
    <footer className="footerSection">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="commanFoot">
              <div className="footerLogo">
                <img src={logo} alt="logo-full" />
              </div>
              <p>
                Molestie ad feugiat est facilisi faucibus magnis. Convallis magna
                pellentesque odio fusce turpis elit.
              </p>
              <a href="tel:+237677632545" className="viewDetailBtn">
                {" "}
                <LocalPhoneIcon className="material-icons" /> +237 6 77 63 25 45
                {/* <i className="material-icons">phone</i> +91-000-000-0000 */}
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <div className="commanFoot">
              <h3>{t('Company')}</h3>
              <ul>
                <Link to="/BookYourTicket"><li>
                  <a href=" ">{t('Book your ticket')}</a>
                </li></Link>
                <Link to="/Aboutus"><li>  <a href=" ">{t('About Us')}</a>
                </li></Link>
                <Link to="/FAQ"><li>
                  <a href=" ">{t(`FAQ & Support`)}</a>
                </li></Link>
                <Link to='/Conditions'><li>
                  <a href=" ">{t('Terms And Conditions')}</a>
                </li></Link>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="commanFoot">
              <h3>{t('Services')}</h3>
              <ul>
                <Link to="/PassengerTrans"><li>
                  <a href=" ">{t('Passenger Transportation')}</a>
                </li></Link>
                <Link to="/FirstClass"><li>
                  <a href=" ">{t('First Class Travel')}</a>
                </li></Link>
                <Link to="/MailParcel"><li>
                  <a href=" ">{t('Mail and Parcel')}</a>
                </li></Link>
                <Link to="/RegularTravel"> <li>
                  <a href=" ">{t('Regular Travel')}</a>
                </li></Link>
                <Link to="/BusRental"><li>
                  <a href=" ">{t('Bus Rental')}</a>
                </li></Link>

              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="commanFoot">
              <h3>{t('Get In Touch')}</h3>
              <div className="footAdd">
                {/* <p>
                  <strong>Address :</strong> Sector 64, block H-3 Wangi No 22
                  Jakarta - India{" "}
                </p> */}
                {/* <p>
                  <strong>Email :</strong> info@gmail.com{" "}
                </p> */}
                {/* <p>
                  <strong>Phone :</strong> +91-000-000-0000{" "}
                </p> */}
                <div className="followMedia">
                  <span>
                    <strong style={{ "padding": "5px 2px" }}>{t('Follow Us')}:</strong>
                  </span>
                  <ul className="socialMedia">
                    <li>
                      <a href="http://wa.me/+237677632545">
                        <WhatsAppIcon className="material-icons" />
                        {/* <i >facebook</i> */}
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61556376180411">
                        <FacebookIcon className="material-icons" />
                        {/* <i className="material-icons">facebook</i> */}
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://twitter.com/CamerTravel">
                        <TwitterIcon className="material-icons" />
                        {/* <i className="material-icons">facebook</i> */}
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://www.instagram.com/camertraveler/">
                        <InstagramIcon className="material-icons" />
                        {/* <i className="material-icons">facebook</i> */}
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://www.youtube.com/channel/UC-5mkJuRzA9IUbIx3BpvHTQ">
                        <YouTubeIcon className="material-icons" />
                        {/* <i className="material-icons">facebook</i> */}
                      </a>{" "}
                    </li>

                  </ul>
                </div>

                <div><ReactFlagsSelect
                   className={`countrybtn ${theme ==='dark' ? 'dark-mode' : ''}`}
                  selected={select}
                  onSelect={onSelect}
                  countries={["fi", "GB", "FR"]}
                  placeholder="Select Language"

                /></div>
                {/* <div>
                  <h1>{t('Call for detail information')}</h1>
                  <button onClick={() => changeLanguage('gb')}>English</button>
                  <button onClick={() => changeLanguage('fr')}>French</button>
                  <button>{t('buttonText')}</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footerBottom">
              <p>{t('Copyright © 2023 Camer Travel, All rights reserved')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}
















