import React from 'react'
import smiling from '../image/smiling-woman.png'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function Rental_bus() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_bus_rental">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="bus_rental_cont">
              <div className="mainHeading">
                <h2>{t('A bus rental thats affordable and comfortable')}</h2>
              </div>
              <p>

                {t('Camer travel bus rental service offers state-of-the-art buses that provide the ultimate in comfort, technology and safety. Customers have the option to book the vehicle that best suits their needs to travel to any destination within Cameroon.We provide the best in luxury coach travel whilst offering high standards of safety and comfort. We invest in the best modern technology and each of our drivers has been hand-picked and specially trained to provide the best possible service to our coach passengers.')}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div className="busCondown">
                    <div className="condNumber">
                      <span>25+</span>
                    </div>
                    <h3>{t('Bus Ready')}</h3>
                    <p>
                    {t('Bus Tickets Online Booking at lowest rates, easy cancellation.')}
                    </p>
                  </div>



                  
                </div>
                <div className="col-md-6">
                  <div className="busCondown">
                    <div className="condNumber">
                      <span>97+</span>
                    </div>
                    <h3>{t('Satisfied Customer')}</h3>
                    <p>
                      Sed nunc si consectetur convallis facilisis dictumst nibh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="bus_rentalImg">
              <img src={smiling} />
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
