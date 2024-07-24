import React from 'react'
import bus1 from '../image/bus1.jpg'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

export default function OurFleet() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section class="submenu_page">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <h4 class="mb-0">{t('Our Fleet')}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
                <div className="row justify-content-center  my-5">
                    <div className="col-md-11">
                        <div className="text-content">
                            <div className="help text">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="busDetails">
                                            <div className="choosebusImg">
                                                <img src={bus1} alt="img" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h5>{t('Our Fleet')}</h5>
                                        <p>
                                            {t('We update our fleet each year with new buses to ensure our customers receive the benefits of the latest standards of comfort. All of our vehicles are staffed by skilled drivers to make your trip a totally enjoyable experience. Our buses are expertly maintained by trained mechanics and thoroughly cleaned after each trip.')}
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
