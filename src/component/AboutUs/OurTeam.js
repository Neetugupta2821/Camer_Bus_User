import React from 'react'
import bus1 from '../image/bus1.jpg'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

export default function OurTeam() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <section class="submenu_page">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12">
              <h4 class="mb-0">{t('Our Team')}</h4>
            </div>
          </div>
        </div>
      </section>
      <div class="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-11">
            <div className="text-content">
              <div className="blog text">
                <div className="row">
                  <div className="col-md-12">
                    <div className="busDetails">
                      <div className="choosebusImg">
                        <img src={bus1} alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <h5>{t('Our Team')}</h5>
                    <p>
                      {t('Amour Mezam employs over 100 staff in our 14 branches, including drivers. Because they are key to maintaining our vision, our employees are experienced and trained to go above and beyond to provide the best possible service at our agencies and on the roads to offer you an enjoyable journey.')}
                    </p>
                    <p>
                      {t('We offer competitive wages as well as in house training.')}
                    </p>
                    <p>{t('Many of our employees have been with Amour Mezam for many years. Our Values remind us to keep our workplace pleasant, fair, friendly and encouraging, and this is reflected in our employees and in our reputation in the communities we serve.')}:</p>
                    <p>
                      {t('At Amour Mezam, our employees are not just part of the company; they are part of a family.')}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
