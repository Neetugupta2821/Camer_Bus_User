import React from 'react'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import bus1 from '../image/bus1.jpg'

export default function MailParcel() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section class="submenu_page">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <h4 class="mb-0">{t('Mail And Parcel')}</h4>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
                <div className="row justify-content-center my-5">
                    <div className="col-md-11">
                        <div className="text-content">
                            <div className="help text">
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
                                        <h5>{t('Mail And Parcel')}</h5>
                                        <p>
                                            {t('Do you need to send a letter or parcel in any of our 14 branches across Cameroun? Camer bus offers you a fast and reliable courier service to send your packets or parcels. We transport and deliver thousands of letters and parcels every day to and from Yaounde, Douala, Buea, Limbe, Tiko, Kumba, Kumbo, Mbouda, Fundong, Ndop, Ndu, and Nkambe.')}
                                        </p>
                                        <p>
                                            {t('The cost of the service depends on the size and weight of the item you are sending and its destination.')}
                                        </p>
                                        <p>
                                            {t('We ensure the safety and security of you parcels and do our very best to meet you delivery requirements. In the unlikely event of loss or damage, many products are available with compensation. However, the service does not include insurance cover and valuable items such as cash and coins, bank drafts, jewelry, and precious metals should not be sent using Camer bus.')}
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
