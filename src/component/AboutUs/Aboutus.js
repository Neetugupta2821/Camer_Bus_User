import React from 'react'

import WhoAre from '../Home/WhoAre'
import WhyChoose from '../Home/WhyChoose'
import make from '../image/we-makeImg1.jpg'
import make2 from '../image/we-makeImg2.jpg'
import make3 from '../image/we-makeImg3.jpg'
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';



export default function Aboutus() {
  const { t, i18n } = useTranslation();
  return (
    <>

      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>{t('About Us')}</h2>
                <p>Be comfortable while you travel with our reliable bus rental.</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <WhoAre />
      <WhyChoose />
      <section className="section_We_make_sure section-paddings">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="row we_make_sureImg">
                <div className="col-md-6">
                  <div className="we-makeImg1">
                    <img src={make} alt="busImg" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="weMakeRightImg pb-2">
                    <img src={make2} alt="busImg" />
                  </div>
                  <div className="weMakeRightImg pt-3">
                    <img src={make3} alt="busImg" />
                  </div>
                </div>
              </div>
              <div className="excellentService">
                <div className="thumbIcon">
                  <span>
                    <i className="material-icons">{t('verified')}</i>
                  </span>
                </div>
                <div className="excellentCont">
                  <span>{t('Exellent Service')}</span>
                  <p>Lorem fusce nullam facilisi consequat rutrum quam nam.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="we_make_sure">
                <div className="mainHeading">
                  <h2>{t('We make sure every bus is in excellent shape')}</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                  tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.{" "}
                </p>
                <ul className="we_make_list">
                  <li>
                    <i className="material-icons"><CheckIcon /></i>
                    {t('Confirming a proper amount of engine oil and coolant')}
                  </li>
                  <li>
                    <i className="material-icons"><CheckIcon /></i>{t('Ensuring that tire pressure is at an appropriate level')}
                  </li>
                  <li>
                    <i className="material-icons"><CheckIcon /></i>{t('Measuring tire tread depth for optimum traction')}
                  </li>
                  <li>
                    <i className="material-icons"><CheckIcon /></i>{t('Keeping electrical equipment clean and free of dust')}
                  </li>
                </ul>
                {/* <a href="#!" className="bannerBtn mt-5">
            Discover More <i className="fi fi-rr-arrow-up-right" />
          </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>




    </>
  )
}
