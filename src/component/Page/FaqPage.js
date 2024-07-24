import React from 'react'
import { useTranslation } from 'react-i18next';


export default function FaqPage() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="innerBannerCont">
                                <h2>FAQ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-paddings">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="enjoy_journey text-center">
                                <p className="smallTitle">FAQ</p>
                                <div className="mainHeading">
                                    <h2>{t('Frequently Asked Questions')}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="accordion mt-5" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                       
                                    >
                                       {t("What is Departure time for VIP Buses ?")}
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p>
                                            {t('Yes, tickets purchased online can be cancelled. Using the amour mezam booking app, go to my trips and then follow the instructions, Note that online tickets can only be cancelled before the stated departure time, it is not possible to cancel tickets after the departure time')}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                              
                                    >
                                       {t("Can i cancel the tickets i purchased online?")}
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p>
                                        {t('Yes, tickets purchased online can be cancelled. Using the amour mezam booking app, go to my trips and then follow the instructions, Note that online tickets can only be cancelled before the stated departure time, it is not possible to cancel tickets after the departure time')}.
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                      {t('I can not find trips to or from Buea, Limbe, Tiko and Kumba.')}
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p>
                                        {t('Yes, tickets purchased online can be cancelled. Using the amour mezam booking app, go to my trips and then follow the instructions, Note that online tickets can only be cancelled before the stated departure time, it is not possible to cancel tickets after the departure time')}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour"
                                        aria-expanded="false"
                                        aria-controls="collapseFour"
                                    >
                                        {t('What Happens, if I come late to the bus station?')}
                                    </button>
                                </h2>
                                <div
                                    id="collapseFour"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingFour"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p>
                                        {t('Yes, tickets purchased online can be cancelled. Using the amour mezam booking app, go to my trips and then follow the instructions, Note that online tickets can only be cancelled before the stated departure time, it is not possible to cancel tickets after the departure time')}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>

    )
}
