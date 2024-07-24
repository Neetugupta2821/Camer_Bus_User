import React from 'react'
import bus1 from '../image/bus1.jpg'
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Link, NavLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function TermsConditions() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <section class="submenu_page">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <h4 class="mb-0">{t('Terms & Conditions')}</h4>
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
                                    <div className="col-md-12">
                                        <div className="busDetails">
                                            <div className="choosebusImg">
                                                <img src={bus1} alt="img" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h5>{t('Terms & Conditions')}</h5>
                                        <b style={{ "color": "black" }}>{t('1- Capacity of Bus')}</b>
                                        <p>
                                            {t('The passenger capacity and speed limit of each bus are indicated on the bus. Passengers are advised to insist on compliance by the driver or agents of the company.')}
                                        </p>
                                        <b style={{ "color": "black" }}>{t('2- Validity of ticket')}</b>
                                        <p>
                                            {t('The validity of this ticket is 30 days from date of purchase and is subject to the notices and conditions above. The ticket must be retained in a good condition. No refunds will be made in respect of lost, mutilated or stolen tickets.')}
                                        </p>
                                        <b style={{ "color": "black" }}>{t('3- Arrival time of passengers')}</b>
                                        <p>
                                            {t('Passengers must be at the terminal at least thirty (30) minutes before the indicated departure time shown on the ticket. The company shall not be responsible for any loss or inconvenience suffered by any passenger not respecting this time limit.')}
                                        </p>
                                        <b style={{ "color": "black" }}>{t('4-  Safety of passengers and luggage')}</b>
                                        <p>
                                            {t('The company undertakes to use its best effort to carry the passenger and luggage with reasonable dispatch. The times shown on tickets, timetables or elsewhere are not guaranteed and form no part of this contract.')}
                                        </p>
                                        <Link to='/Conditions'><Button>Read more<ArrowForwardIcon style={{ "font-size": "17px" }} /></Button></Link>
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
