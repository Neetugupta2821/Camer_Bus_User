import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../Api/BaseUrl'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function CalCulateFare({ trigger, settrigger, passenferInfo, seat, id, sourceNext, destinationNext, allData, email, iditem }) {
    const [Fare, setFare] = useState("");
    const { t, i18n } = useTranslation();
    const passengerAges = passenferInfo.map(info => Number(info.age));
    // console.log(passengerAges)
    const seatType = seat;
     

    // console.log(seatType.map((info, index) => {
    //     const i = index
    //     return
    //     for (let i = 0; i <= index.length;i++) {
    //         info[i]
    //     }
    // }))

    // console.log(id);
    // console.log(sourceNext);
    // console.log(destinationNext);
    // console.log(allData)
    const allTripData = allData
    const emailType = email
    const pasengerInformation = passenferInfo
    const IdType = iditem
    const source=sourceNext
    const destination=destinationNext
    // console.log(emailType)
    // console.log(pasengerInformation)
    // console.log(IdType)



    const handleSubmit = () => {
        let request = {
            selectedSeatNumbers: seatType,
            passengerAges: passengerAges,
        };
        axios.post(`${BaseUrl}calculateFareForSelectedSeats/${id}?sourceStop=${source}&destinationStop=${destination}`, request)
            .then((response) => {
                console.log(response.data.passengersfare
                    .Fare_in_Euro);
                console.log(response.data.totalFare_in_Euro);
                setFare(response.data.totalFare_in_Euro);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleSubmit();
    }, [passengerAges, seatType]);
    return trigger && (
        <div className='form_body'>
            <div className='form_tittle1'>
                <div class="boardingORdroppingPopup mt-2 hideboarddrop">
                    <div className="proceedto">
                        <div className="boardandDropTitle">
                            <h5 className="title_bd">{t('Boarding & Dropping')}</h5>
                            <button className="changeBtn" onClick={() => settrigger(false)} >{t('Change')}</button>
                        </div>
                        <ul className="fromTodropingList">
                            <li>
                                <div className="addTime">
                                    <span>{source}</span> <strong>00:15</strong>
                                </div>

                            </li>
                            <li>
                                <div className="addTime">
                                    <span>{destination}</span> <strong>04:00</strong>
                                </div>

                            </li>
                        </ul>
                        <div className="seatNo">
                            <h5>{t('Seat No.')}</h5>
                            <span>{seatType.join(', ')}</span>
                        </div>
                        <div className="fareDetails">
                            <h4>{t('Fare Details')}</h4>
                            <div className="bookingAmount">
                                <span>{t('Amount')}</span>
                                <h5>{Fare}</h5>
                            </div>
                            <p className="duringpaymenttext">{t('Taxes will be calculated during payment')}</p>

                        </div>
                        <Link to="/ProccessToPay" state={{ data: allTripData, email: emailType, pasengerInformation: pasengerInformation, fareType: Fare, IDGet: IdType,sourcePay:source,destinationPay:destination}} > <button
                            className="continueBtn proceedToBtn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"

                        >
                             {t('Proceed To pay')}
                        </button></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}




 