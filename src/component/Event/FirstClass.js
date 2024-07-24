import React from 'react'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import email from '../image/email (3).png'
import phone from '../image/phone-with-wire.png'
import map from '../image/map.png'
import bus1 from '../image/bus1.jpg'

export default function FirstClass() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section class="submenu_page">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <h4 class="mb-0">{t('First Class Travel')} </h4>
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
                                    <div className="col-md-6">
                                        <div className="busDetails">
                                            <div className="choosebusImg">
                                                <img src={bus1} alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="busDetails">
                                            <div className="choosebusImg">
                                                <img src={bus1} alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div>
                                            <h5>{t('First Class Travel')}</h5>
                                            <p>
                                                {t('Camer bus is Cameroon leading provider of express bus services, providing interurban passenger transportation services using buses.')}
                                            </p>
                                            <p>
                                                {t('At Camer bus, The Safety and comfort of all Passengers is our upmost Concern. Our buses run on an intensive networkB of local bus routes serving the population of Cameroon from Bamenda to Yaounde, Douala, Buea, etc.We have also been investing on improving the quality of service.Frequencies of many bus routes have been improved over the last five years.')}
                                            </p>
                                            <p>{t('Our Service includes')}:</p>
                                            <ul>
                                                <li>
                                                    <b>{t('First Class Travel')}:</b> {t('VIP transportation services, with one of the most modern fleets of state-of-the-art vehicles in Cameroon. Our First Class travel Services is available from Bamenda to Yaounde, Yaounde to Bamenda, Bamenda to Douala and Douala to Bamenda.')}
                                                </li>
                                                <li>
                                                    <b>{t('Regular Travel')}:</b> {t('We equally provide regular travel services to and from Bamenda, Yaounde, Douala, Buea, Limbe, Tiko, Kumba, Kumbo, Mbouda, Fundong, Ndop, Ndu, and Nkambe.')}
                                                </li>
                                                <li>
                                                    <b>{t('Online Bus Ticket Booking')}:</b>{t('We offer online bus ticket booking to our passengers to help them save time. Passengers can buy their ticket days ahead on our website our mobile application.')}
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
