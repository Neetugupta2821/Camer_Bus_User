import React from 'react'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import email from '../image/email (3).png'
import phone from '../image/phone-with-wire.png'
import map from '../image/map.png'

import bus1 from '../image/bus1.jpg'

export default function BusRental() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section class="submenu_page">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <h4 class="mb-0">{t('Bus Rental')}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
                <div className="row justify-content-center my-5">
                    <div className="col-md-11">
                        <div className="text-content">
                            <div className="code text">
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
                                    <div>
                                        <h5>{t('Bus Rental')}</h5>
                                        <p>
                                            {t('Camer bus rental service offers state-of-the-art buses that provide the ultimate in comfort, technology and safety.Customers have the option to book the vehicle that best suits their needs to travel to any destination within Cameroon.')}
                                        </p>
                                        <p>
                                            {t('We provide the best in luxury coach travel whilst offering high standards of safety and comfort. We invest in the best modern technology and each of our drivers has been hand-picked and specially trained to provide the best possible service to our coach passengers.')}
                                        </p>
                                        <p>
                                            {t('Whether you need a vehicle for a corporate event, travel groups, a party bus or any other special occasions, we can get you to your destination safely an on-time. Your ride will be clean, comfortable, enjoyable, and safe. Our professional and experienced drivers will provide you with a discreet, smooth, reliable service. Your privacy and safety is our top priority.')}
                                        </p>
                                        <p>
                                            {t('Are you planning a group travel, call or email us with your transportation needs.')}
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
