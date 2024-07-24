import React from 'react'
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function WorkIt() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_how_it_work section-paddings">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="enjoy_journey text-center">
              <p className="smallTitle">{t('How it work')}</p>
              <div className="mainHeading">
                <h2>{t('4 Steps To Booking Our Bus')}</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                  tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-3 col-md-6 col-sm-12 stapBoxpadding">
            <div className="stapBox activeBg">
              <div className="stapIcon">
                {/* <i className="material-icons">filter_1</i> */}
                <Filter1Icon className="material-icons" />
              </div>
              <div className="stapText">
                <h3>{t('Select Your Bus')}</h3>
                <p>
                  Consequat justo posuere risus euismod ultrices nec cubilia
                  volutpat ligula.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 stapBoxpadding">
            <div className="stapBox">
              <div className="stapIcon">
                <Filter2Icon className="material-icons" />
                {/* <i className="material-icons">filter_2</i> */}
              </div>
              <div className="stapText">
                <h3>{t('Booking & Confirm')}</h3>
                <p>
                  Consequat justo posuere risus euismod ultrices nec cubilia
                  volutpat ligula.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 stapBoxpadding">
            <div className="stapBox">
              <div className="stapIcon">
                <Filter3Icon className="material-icons" />
                {/* <i className="material-icons">filter_3</i> */}
              </div>
              <div className="stapText">
                <h3>{t('Booking Payment')}</h3>
                <p>
                  Consequat justo posuere risus euismod ultrices nec cubilia
                  volutpat ligula.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 stapBoxpadding">
            <div className="stapBox">
              <div className="stapIcon">
                <Filter4Icon className="material-icons" />
                {/* <i className="material-icons">filter_4</i> */}
              </div>
              <div className="stapText">
                <h3>{t('Start Your Roadtrip')}</h3>
                <p>
                  Consequat justo posuere risus euismod ultrices nec cubilia
                  volutpat ligula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
