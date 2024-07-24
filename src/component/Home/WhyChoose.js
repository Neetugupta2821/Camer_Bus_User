import React from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function WhyChoose() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_Why_choose_Us">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="whyChoose">
            <div className="enjoy_journey text-start">
              <p className="smallTitle">{t('Why Choose Us')}</p>
              <div className="mainHeading">
                <h2>{t('Riding with us, your satisfaction is guaranteed!')}</h2>
                <p>
                {t('Since 1998, Camer Travel provides we have affordable transportation solutions to fit most any budget. We consistently deliver the level of quality and professionalism that sets the transportation industry standard')}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="guaranteedLine">
                  <div className="checkIcon">
                    <CheckBoxIcon className="material-icons"/>
                    {/* <i className="material-icons">check_box</i> */}
                  </div>
                  <div className="chooseHeadingTitle">
                    <h3>{t('Safety & Security')}</h3>
                    <p>
                    {t('Our priority is the safety and comfort of our passengers. Our goal at Amour Mezam is to give you a travel experience that is better than you could have imagined.')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="guaranteedLine">
                  <div className="checkIcon">
                  <CheckBoxIcon className="material-icons"/>
                    {/* <i className="material-icons">check_box</i> */}
                  </div>
                  <div className="chooseHeadingTitle">
                    <h3>{t('On Time & Punctual')}</h3>
                    <p>
                   {t('Our trained and experienced drivers and team goes above and beyond to provide the best possible service at our agencies and an enjoyable journey.')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="guaranteedLine">
                  <div className="checkIcon">
                  <CheckBoxIcon className="material-icons"/>
                    {/* <i className="material-icons">check_box</i> */}
                  </div>
                  <div className="chooseHeadingTitle">
                    <h3>{t('Professional Drivers')}</h3>
                    <p>
                    {t('Camer Travel employs over 100 staff in our 14 branches, including drivers. Because they are key to maintaining our vision, our employees are experienced')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="guaranteedLine">
                  <div className="checkIcon">
                  <CheckBoxIcon className="material-icons"/>
                    {/* <i className="material-icons">check_box</i> */}
                  </div>
                  <div className="chooseHeadingTitle">
                    <h3>{t('Well Maintenance')}</h3>
                    <p>
                    {t('VIP Buses depart every day at 8 am prompt and 8pm. However, due to the political climate in Bamenda, the evening buses depart at 7pm.')}  
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="weProvideBus_area">
            <div className="weProvideBus">
              <h3>{t('We Provide Best Bus For You')}</h3>
              <p>Quis arcu phasellus hac penatibus vivamus maximus.</p>
              <a href="#!" className="view_our_bus">
                {t('View Our Bus call_made')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}
