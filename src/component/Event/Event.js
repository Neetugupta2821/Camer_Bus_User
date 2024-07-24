import React from 'react'

import bus1 from '../image/bus1.jpg'
import bus2 from '../image/bus1.jpg'
import bus3 from '../image/bus1.jpg'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Link, NavLink } from "react-router-dom";
import  transport from '../image/transportation.jpg'
import BusRental from  '../image/bus-location.jpg'
import parcel from  '../image/parcel.jpg'
export default function Event() {
  const { t, i18n } = useTranslation();
  return (
    <>

      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>{t('Services')}</h2>
                <p>{t('Be comfortable while you travel with our reliable bus rental.')}</p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-paddings">
        <div className="container">
          <div className="row">
            <div className="col-md-4 p-0 p-0">
              <div className="service_inner_p">
                <img src={transport}  alt="" />
                <h5 className="py-3">{t('FIRST CLASS TRAVEL')}</h5>
                <p className="p-4">
                   {t('Camer Bus provides interurban passenger transportation services,with one of the most modern fleets in Cameroon.')}
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service_inner_p">
                <img src={BusRental} alt="" />
                <h5 className="py-3">{t('REGULAR TRAVEL')}</h5>
                <p className="p-4">
                {t('Camer Bus provides interurban passenger transportation services,with one of the most modern fleets in Cameroon.')}
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service_inner_p">
                <img src={parcel}  alt="" />
                <h5 className="py-3">{t('MAIL AND PARCEL')}</h5>
                <p className="p-4">
                {t('Camer Bus provides interurban passenger transportation services,with one of the most modern fleets in Cameroon.')}
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service_inner_p">
                <img src={transport}  alt="" />
                <h5 className="py-3">{t('PASSENGER TRANSPORTATION')}</h5>
                <p className="p-4">
                {t('Camer Bus provides interurban passenger transportation services,with one of the most modern fleets in Cameroon.')}
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0">
              <div className="service_inner_p">
                <img src={BusRental}  alt="" />
                <h5 className="py-3">{t('BUS RENTAL')}</h5>
                <p className="p-4">
                {t('Camer Bus provides interurban passenger transportation services,with one of the most modern fleets in Cameroon.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
