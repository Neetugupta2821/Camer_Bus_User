import React from 'react';
import { useTranslation } from 'react-i18next';
// Import the Tamil locale from date-fns if you need it for date formatting elsewhere in your code
import { format } from 'date-fns';
import { ta } from 'date-fns/locale';

export default function Conditions() {
    const { t, i18n } = useTranslation();

    return (
        <>
            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="innerBannerCont">
                                <h2>{t("Terms And Conditions")}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-paddings">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="enjoy_journey text-center">
                                <div className="mainHeading my-4">
                                    <h2>{t("IMPORTANT : ADHERE TO STATE GUIDELINES")}</h2>
                                    <p>
                                        {t("Most states have released their own guidelines for inbound and outbound travellers vis-a-vis passes, permits, quarantine rules and other requirements. Please go through the guidelines of your source and destination state carefully before planning your travel, for a hassle-free experience.")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="enjoy_journey text-start mt-4">
                                <div className="mainHeading mainHeading11">
                                    <h2 className="text-center">{t("TERMS OF SERVICE")}</h2>
                                    <div>
                                        <div>
                                            <p className="smallTitle1">{t("BUS:ROLE OF CAMER BUS")}</p>
                                            <ul>
                                                <li>
                                                    {t("Camer only provides a technology platform that connects intending travelers with bus operators. It doesn’t operate any bus or offer the service of transportation to the User. Camer Bus also doesn’t act as an agent of any bus operator in the process of providing the above-mentioned technology platform services.")}
                                                </li>
                                                <li>
                                                    {t("The bus ticket booking voucher which Camer Bus issues to a User is solely based on the information provided or updated by the bus operator regarding the seat availability.")}
                                                </li>
                                                <li>
                                                    {t("The amenities, services, routes, fares, schedule, bus type, seat availability and any other details pertaining to the bus service are provided by the respective bus  operator and Camer Bus has no control over such  information provided by the bus operator.")}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">
                                                {t('BUS:LIMITATION OF LIABILITY OF CAMER BUS')}
                                            </p>
                                            <p>
                                                {t("In its role as a technology platform to enable transactions between the bus operators and the Users, Camer Bus shall not be responsible for the operations of the bus operator including, but not limited to the following:")}
                                            </p>
                                            <ul>
                                                <li>{t("Timely departure or arrival of the bus;")}</li>
                                                <li>
                                                    {t("The conduct of bus operator's employees, representatives or agents;")}
                                                </li>
                                                <li>
                                                    {t("The condition of the bus, seats etc. not being up to the customer's expectation or as per the description provided by the bus operator;")}
                                                </li>
                                                <li>{t("Cancellation of the trip due to any reasons;")}</li>
                                                <li>{t('Loss or damage of the baggage of the customer;')}</li>
                                                <li>
                                                    {t("The bus operator changing a customer's seat for any reason whatsoever;")}
                                                </li>
                                                <li>
                                                    {t("Bus operator informing a wrong boarding point for the issuance of the booking confirmation voucher, or changing such boarding point eventually with or without any notification to Camer Bus or the User;")}
                                                </li>
                                                <li>
                                                    {t("Bus operator using a separate pick-up vehicle to transport the User from the designated boarding point to the actual place of departure of the bus.")}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">
                                                {t("BUS:RESPONSIBILITIES OF THE USERS")}
                                            </p>
                                            <ul>
                                                <li>
                                                    {t("Users are advised to call the bus operator to find out the exact boarding point, or any information which they may need for the purpose of boarding or travel in that trip.")}
                                                </li>
                                                <li>
                                                    {t("At the time of boarding the bus, Users shall furnish a copy of the ticket, and any valid identity proof like aadhar card, passport, PAN card or voter identification card or any other identity proof issued by a government authority.")}
                                                </li>
                                                <li>
                                                    {t("Users are required to reach the boarding place at least 30 minutes before the scheduled departure time.")}
                                                </li>
                                                <li>{t('All tickets issued shall be non-transferable.')}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("BUS:CANCELLATION OF TICKET")}</p>
                                            <ul>
                                                <li>
                                                    {t("Cancellation of tickets can be done either through the User’s login in the Camer Bus’s website or mobile application, or by calling on the customer care number;")}
                                                </li>
                                                <li>
                                                    {t("Any cancellation is subject to such cancellation charges as mentioned on the ticket.")}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("BUS:RESCHEDULING OF TICKET")}</p>
                                            <ul>
                                                <li>
                                                    {t("Rescheduling (i.e. change of date of travel) of the tickets can be done through the User’s login in the Camer Bus’s website or mobile application, or by reaching out to the customer support team;")}
                                                </li>
                                                <li>
                                                    {t('Rescheduling is an option provided only by select bus operators. The policy for the same shall be available on  the e-ticket.')}
                                                </li>
                                                <li>
                                                    {t("Rescheduling a ticket is subject to charges as mentioned on the e-ticket. Fare difference, if applicable, shall be borne by the customer. However, if the fare of the rescheduled ticket is lower than the current fare, the fare difference shall not be refunded.")}
                                                </li>
                                                <li>
                                                    {t("Rescheduling a ticket can be availed only once per booking, if applicable. Once the travel date change option is availed, the ticket cannot be further canceled.")}
                                                </li>
                                                <li>
                                                    {t("Tickets are non-transferrable and the originally booked passengers are to travel upon such rescheduling.")}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:ROLE OF CAMER BUS")}</p>
                                            <ul>
                                                <li>
                                                    {t("Camer Bus only provides a technology platform that connects intending travelers with vehicle operators to hire an entire vehicle. It doesn’t operate any vehicle oroffer the service of transportation to the User. Instead fulfilment of these bookings is done by operators who are empanelled with Camer Bus. Camer Bus also does not act as an agent of any bus or cab operator in the process of providing the above-mentioned technology platform services.")}
                                                </li>
                                                <li>
                                                    {t("The Vehicle booking details which Camer Bus issues to a User is solely based on the information provided or updated by the vehicle operator.")}
                                                </li>
                                                <li>
                                                    {t("The amenities, services, fares, routes, schedule, vehicle type and any other details pertaining to the transportation service are provided by the respective  vehicle operator and Camer Bus has no control over such information provided by the operator or fulfillment of the same.")}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:LIMITATION OF LIABILITY OF CAMER BUS")}</p>
                                            <p>
                                                {t("In its role as a technology platform to enable transactions between the vehicle operators and the Users, Camer Bus shall not be responsible for the operations of the vehicle operator including, but not limited to the following:")}
                                            </p>
                                            <ul>
                                                <li>{t("Timely departure or arrival of the vehicle;")}</li>
                                                <li>{t("The conduct of vehicle operator's employees, representatives or agents;")}</li>
                                                <li>{t("The condition of the vehicle not being up to the customer's expectation or as per the description provided by the vehicle operator;")}</li>
                                                <li>{t("Cancellation of the trip due to any reasons;")}</li>
                                                <li>{t('Loss or damage of the baggage of the customer;')}</li>
                                                <li>{t("The vehicle operator changing a customer's seat or vehicle type for any reason whatsoever;")}</li>
                                                <li>{t("Vehicle operator informing a wrong boarding point for the issuance of the booking confirmation voucher, or changing such boarding point eventually with or without any notification to Camer Bus or the User;")}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:RESPONSIBILITIES OF THE USERS")}</p>
                                            <ul>
                                                <li>{t("Users are advised to call the vehicle operator to find out the exact boarding point, or any information which they may need for the purpose of boarding or travel in that trip;")}</li>
                                                <li>{t("At the time of boarding the vehicle, Users shall furnish a copy of the ticket, and any valid identity proof like aadhar card, passport, PAN card or voter identification card or any other identity proof issued by a government authority;")}</li>
                                                <li>{t("Users are required to reach the boarding place at least 30 minutes before the scheduled departure time;")}</li>
                                                <li>{t('All tickets issued shall be non-transferable.')}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:CANCELLATION OF TICKET")}</p>
                                            <ul>
                                                <li>{t("Cancellation of tickets can be done either through the User’s login in the Camer Bus’s website or mobile application, or by calling on the customer care number;")}</li>
                                                <li>{t("Any cancellation is subject to such cancellation charges as mentioned on the ticket. However, rescheduling of the ticket is not allowed.")}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:MODIFICATIONS & REFUNDS")}</p>
                                            <p>{t("Please note the following carefully:")}</p>
                                            <ul>
                                                <li>{t("Modifications to the ticket such as change in date or time of travel, change in pick up or drop locations are not allowed.")}</li>
                                                <li>{t("In case of any modification requirements, the User will have to cancel the existing ticket and make a new booking for the modified requirements.")}</li>
                                                <li>{t("Refunds for cancellations will be processed as per the terms and conditions mentioned on the ticket.")}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-5">
                                            <p className="smallTitle1">{t("RYDE:DISPUTES")}</p>
                                            <ul>
                                                <li>{t("Any dispute arising from the usage of the service shall be subject to the exclusive jurisdiction of the courts in Bangalore.")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-center">{t("Thank you for choosing Camer Bus.")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
