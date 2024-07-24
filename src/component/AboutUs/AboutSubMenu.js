import React from 'react'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Link, NavLink } from "react-router-dom";
import bus1 from '../image/bus1.jpg'
import bus2 from '../image/bus1.jpg'
import bus3 from '../image/bus1.jpg'
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export default function AboutSubMenu() {
  const { t, i18n } = useTranslation();
  return (
    <> <section class="submenu_page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12">
            <h4 class="mb-0">{t('Presentation')}</h4>
          </div>
        </div>
      </div>
    </section>
      <div class="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-11">
            <div className="text-content">
              <div className="home text">
                <div className="row">
                  <div className="col-md-12">
                    <div className="busDetails">
                      <div className="choosebusImg">
                        <img src={bus1} alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div>
                      <h5>{t('Presentation')}</h5>

                      <h4 className='presentation_text'>{t('WELCOME TO AMOUR MEZAM COMPANY LTD')} </h4>

                      <p>
                        {t('Founded in 1998, Amour Mezam Company LTD is a Cameroon’s leading transportation Company providing bus transportation services to and from 13 towns in Cameroon. Our recognizable buses have been plying the roads of Cameroon since 1998 and we are proud to have become the safe, friendly and trustworthy company people have come to rely on to get them safely to their destinations every day.')}
                      </p>
                      <p>
                        {t('Every year, thousands of passengers travel with us to more than 15 destinations on our modern fleet of buses. We aim to provide you with a quality, reliable and safe service, delivered with courtesy, at value for money prices.')}
                      </p>
                      <h4 className='presentation_text'>{t('HOW WE OPERATE')} </h4>

                      <p>
                        {t('Amour Mezam owns and operates 14 branches in 13 towns in Cameroon. This ease our passengers to use our services when they need them. In each of our bus stations, we have trained staff who take care of customer service. We constantly strive to make our services better by offering:')}
                      </p>
                      <ul>
                        <li>{t('Value for money fares for all.')}</li>
                        <li>{t('Journey times which ensure that less time is spent travelling and more at your chosen destination.')}</li>
                        <li>{t('Modern buses which offer a safe, comfortable environment.')}</li>
                        <li>{t('Reliability. We endeavour to get you where you want to go at the time you want to be there.')}</li>
                      </ul>
                      <h5>{t('OUR FOCUS IS ON SAFETY AND OUR PASSENGERS')}</h5>
                      <ul>
                        <li>
                          {t('Amour Mezam is more than a transportation company. We are an integral part of each community we serve.')}
                        </li>
                        <li>
                          {t('Passengers’ comfort and safety is our primary focus. We are proud to reinforce our convictions and Core Values with Safe Journey as it represents our deepest commitment to Safety and is the ultimate promise Amour Mezam makes to each other, to the communities where we operate, and to the public and customers that we value deeply.')}
                        </li>
                        <li>
                          {t('Safe Journey means taking safety seriously on a personal level throughout our company. It’s about making good choices for ourselves, our co-workers, passengers and the public.')}
                        </li>
                        <li>
                          {t('Amour Mezam focuses on you our customers. Because we focus on passengers, and not on packages or freight transportation, our business really is all about people. Our level of excellence in customer service is like no other and our passengers come from all walks of life. From business travelers working on the road, to students making their way to school, to taking a loved one safely home for the holidays we are happy to make your trip an enjoyable and memorable experience.')}
                        </li>
                      </ul>
                    </div>
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
