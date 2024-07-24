import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../Api/BaseUrl'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import EastIcon from '@mui/icons-material/East';
export default function CalCulateFare({ trigger, settrigger, passenferInfo, seat, id, sourceNext, destinationNext, allData, email, iditem, roundTrip, returnTripId }) {
    const [Fare, setFare] = useState("");
    const [firstTripFare, setFirstTripFare] = useState("")
    const [secondTripFare, setSecondTripFare] = useState("")
    const [seatInfo, setSeatInfo] = useState([]);
    const [returnSeatNo, setReturnSeatNo] = useState("")

    const { t, i18n } = useTranslation();
    const passengerAges = passenferInfo.map(info => Number(info.age));
    console.log(passengerAges)
    const seatType = seat;




    const allTripData = allData
    const emailType = email
    const pasengerInformation = passenferInfo
    const IdType = iditem
    const source = sourceNext
    const destination = destinationNext



    const handleSubmit = () => {
        if (localStorage.getItem("SetTripstatus") === "oneway") {
            let request = {
                selectedSeatNumbers: seatType,
                passengerAges: passengerAges,
            };
            axios.post(`${BaseUrl}calculateFareForSelectedSeats/${id}?sourceStop=${source}&destinationStop=${destination}`, request)
                .then((response) => {
                    console.log(response.data.passengersfare.Fare_in_Euro);
                    console.log(response.data.totalFare_in_Euro);
                    setFare(response.data.totalFare_in_Euro);
                })
                .catch((error) => {
                    console.error("One-way trip error:", error);
                });
        } 
    }
    const RoundTripFareCalculate = ()=>{
        if (localStorage.getItem("SetTripstatus") === "roundtrip"){
        const seatFirst = Object.values(roundTrip)[0]?.map((info) => info.seat);
        const seatSecond = Object.values(roundTrip)[1]?.map((info) => info.seat);

        if (Object.keys(roundTrip)[0] === returnTripId) {
            setReturnSeatNo(seatFirst);
        } else {
            setReturnSeatNo(seatSecond);
        }

        axios.post(`${BaseUrl}calculateFareForSelectedSeats/${Object.keys(roundTrip)[0]}?sourceStop=${source}&destinationStop=${destination}`, {
            selectedSeatNumbers: seatFirst,
            passengerAges: passengerAges
        })
            .then((response) => {
                console.log(response.data.totalFare_in_Euro);
                setFirstTripFare(response.data.totalFare_in_Euro);
            })
            .catch((error) => {
                console.error("First leg of round trip error:", error);
            });

        axios.post(`${BaseUrl}calculateFareForSelectedSeats/${Object.keys(roundTrip)[1]}?sourceStop=${destination}&destinationStop=${source}`, {
            selectedSeatNumbers: seatSecond,
            passengerAges: passengerAges
        })
            .then((response) => {
                console.log(response.data.totalFare_in_Euro);
                setSecondTripFare(response.data.totalFare_in_Euro);
            })
            .catch((error) => {
                console.error("Second leg of round trip error:", error);
            });
    }
}
    

    useEffect(() => {
        handleSubmit();
        setTimeout(RoundTripFareCalculate, 5000);
    }, [passengerAges, seatType, roundTrip]);

    useEffect(() => {
        if (firstTripFare !== 0 && secondTripFare !== 0) {
            const finalFare = (firstTripFare + secondTripFare) * 0.05;
            setFare(Math.round(firstTripFare + secondTripFare - finalFare));
        }
    }, [firstTripFare, secondTripFare]);

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
                                    <span>{source}<EastIcon />{destination}</span>
                                    <strong>{localStorage.getItem("SetTripstatus") === "oneway" ? Fare : firstTripFare}</strong>
                                </div>


                            </li>
                            {localStorage.getItem("SetTripstatus") === "oneway" ? null
                                :
                                <li><div className="addTime">
                                    <span>{destination}<EastIcon />{source}</span> <strong>{secondTripFare}</strong>
                                </div></li>
                            }


                        </ul>

                        <div className="fareDetails">
                            <h4>{t('Fare Details')}</h4>
                            <div className="bookingAmount">
                                <span>{t('Amount')}</span>
                                <h5>{Fare}</h5>
                            </div>
                            {localStorage.getItem("SetTripstatus") === "oneway" ? null : <p style={{ "color": "#6d01a7" }}>{t("5% of discount will be applied")}</p>}


                        </div>
                        <div className="seatNo">
                            <h5>{t('Seat No.')}</h5>
                            <span>{seatType.join(', ')} <br></br> {returnSeatNo}</span>
                        </div>
                        <Link to="/ProccessToPay" state={{ data: allTripData, email: emailType, pasengerInformation: pasengerInformation, fareType: Fare, IDGet: IdType, sourcePay: source, destinationPay: destination, retruenTripId: returnTripId, returnSeatNo: returnSeatNo, firstSeatamount: firstTripFare, secondseatamount: secondTripFare }} > <button
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




