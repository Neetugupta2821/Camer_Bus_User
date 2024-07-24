import React from 'react'
// import bus1 from '../image/bus1.jpg'
// import bus2 from '../image/bus2.jpg'
// import bus3 from '../image/bus3.jpg'
import img1 from '../image/img1.jpg'
import img2 from '../image/img2.jpg'
import img3 from '../image/img3.jpg'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function WhoAre() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_who-we-are section-paddings">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="leftCont">
              <div className="enjoy_journey">
                <p className="smallTitle">{t('Who we are')}</p>
                <div className="mainHeading">
                  <h2>{t('Enjoy the journey – travel with us')}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="rightCont">
              <p>
                {t('Founded in 1998, Camer Travel is a Cameroon’s leading transportation Company providing bus transportation services to and from 13 towns in Cameroon. Our recognizable buses have been plying the roads of Cameroon since 1998 and we are proud to have become the safe, friendly and trustworthy company people have come to rely on to get them safely to their destinations every day.Every year, thousands of passengers travel with us to more than 15 destinations on our modern fleet of buses. We aim to provide you with a quality, reliable and safe service, delivered with courtesy, at value for money prices.Who we are')}
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="ImageSeter">
              <img src={img1} alt="img" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="ImageSeter">
              <img src={img2} alt="img" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="ImageSeter">
              <img src={img3} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
