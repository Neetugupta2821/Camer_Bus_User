import React from 'react'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function Transportation() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_group_Transportation ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="premiumBus">
              <p className="smallTitle">{t('Premium Bus Charter')}</p>
              <div className="mainHeading">
                <h2>{t('Group Transportation Just Got Easier With Our Bus Rental')}</h2>
                <p>
                  {t('Camer Travel bus rental service offers state-of-the-art buses that provide the ultimate in comfort, technology and safety. Customers have the option to book the vehicle that best suits their needs to travel to any destination within Cameroon.')}
                </p>
                {/* <a href="#!" className="bannerBtn">
              Discover More <i className="fi fi-rr-arrow-up-right" />
            </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
