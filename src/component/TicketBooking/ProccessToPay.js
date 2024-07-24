import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Button, Stack, responsiveFontSizes } from '@mui/material';
import { useAsyncError, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';
import { BaseUrl } from '../../Api/BaseUrl';
import swal from 'sweetalert2'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PersonIcon from '@mui/icons-material/Person';
import EastIcon from '@mui/icons-material/East';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import i18n, { use } from 'i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { TailSpin } from 'react-loader-spinner'
import Backdrop from '@mui/material/Backdrop';
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import mtnpay from '.././image/mtn_payment.png'
 
import ChairIcon from '@mui/icons-material/Chair';
import orangepey from '.././image/orange_pay.png'
import WestIcon from '@mui/icons-material/West';



import LinearProgress from '@mui/material/LinearProgress';
export default function ProccessToPay() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [orange, setOrange] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState("sm");
    const [phone, setPhone] = useState("");
    const [accesstoken, setAccesstoken] = useState('');
    const [payToken, setPayToken] = useState('');
    const [orangeno, setOrangeno] = useState('');
    const [bar, setBar] = useState(false);
    const [blogErr, setBlogErr] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [messageId, setMessageID] = useState("");

    const [access_token, setAccess_token] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [checkStatusInterval, setCheckStatusInterval] = useState(null);
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [onGoingSeat, setOnGoingSeat] = useState('')
    const [onTripID, setOnTripID] = useState('')
    const [dateType, setDateType] = useState(null);
    const [roundTripDate, setRoundTripDate] = useState(null);
    const [seat, setSeat] = useState(null);
    const [linkID, setLinkID] = useState(null);


    const { data, email, pasengerInformation, fareType, IDGet, sourcePay, destinationPay, retruenTripId, returnSeatNo, firstSeatamount, secondseatamount } = location.state;
    const age = pasengerInformation.map(info => Number(info.age))
    const name = pasengerInformation.map(info => String(info.name))
    const gender = pasengerInformation.map(info => String(info.gender))
    // const [error, seterror] = useState({
    //     error: {

    //     }, isarray: false
    // })
    // console.log(pasengerInformation)
    console.log(retruenTripId)
    const handleRoundTripData = () => {
        let getTrip, getTripSourse, getlinkID, getTripDate, DateType, getRoundTripDate, NumBerOfseat, NoArraySeat, result, getSeat;

        if (localStorage.getItem("SetTripstatus") === 'oneway') {
            getTrip = data?.map((info) => info.trip._id);
            console.log(data    )
            getTripSourse = data?.map((info) => info.trip.source);

            getlinkID = getTrip?.filter((info) => info === IDGet);
          
            setLinkID(getlinkID);

            getTripDate = data?.map((info) => info.trip.startingDate);
            DateType = getTripDate[0];
            setDateType(DateType);

            NumBerOfseat = localStorage.getItem('NumBerOfseat');
            NoArraySeat = JSON.parse(NumBerOfseat);

            result = Object.keys(NoArraySeat).map((key) => NoArraySeat[key]);

            getSeat = result[0]?.map((info) => info.seat);
            setSeat(getSeat);
            console.log(seat)
        } else {
            getTrip = data.outboundTrips?.map((info) => info.trip._id);
            getRoundTripDate = data.outboundTrips?.map((info) => info.trip.startingDate);
            setRoundTripDate(getRoundTripDate[0]);

            console.log(getRoundTripDate[0]);


            NumBerOfseat = localStorage.getItem('NumBerOfseat');
            NoArraySeat = JSON.parse(NumBerOfseat);

            console.log(NoArraySeat); // Verify the structure of NoArraySeat

            let seatNumbers = null;

            // Iterate over keys (trip IDs) in NoArraySeat
            Object.keys(NoArraySeat).forEach((tripId) => {
                if (tripId !== retruenTripId) {
                    // Found matching trip ID, get the seat information
                    seatNumbers = NoArraySeat[tripId].map(info => info.seat);
                    setOnTripID(tripId)
                }
            });

            setOnGoingSeat(seatNumbers); // This will log the seat numbers associated with retruenTripId



        }
    }

    useEffect(() => {
        handleRoundTripData();
    }, []);


    // console.log(getSeat);

    const handleClickOpen = () => {
        setOpen(true)

    };


    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = () => {
        setOrange(false);
    };
    console.log(dateType, roundTripDate, seat, onGoingSeat)
    const handleToken = (token) => {
        const request = {
            journey_date: dateType ? dateType : roundTripDate,
            selectedSeatNumbers: seat ? seat : onGoingSeat,
            email: email,
            totalFare_in_Euro: fareType,
            passengers: pasengerInformation,
            payment: token.id,
            payment_key: 1,
            return_tripId: retruenTripId,
            return_SeatNumbers: returnSeatNo
        }
        console.log(request, "Check payment request")
        console.log(token, "Check Tokennnnnnnnnnnnnnn")
        setOpen1(true)

        axios.post(`${BaseUrl}bookTicket/${linkID ? linkID : onTripID}?source=${sourcePay}&destination=${destinationPay}`, request).then((response) => {
            console.log(response.data.bookingId, 'stripe');

            if (response.status === 200) {
                axios.post(`${BaseUrl}updateBooking/${response.data.bookingId}`)
                    .then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                            setOpen1(false)
                            swal.fire(
                                `${response.data.message}`,
                                t('Please check your email for further details'),
                                'success'
                            ).then(() => {
                                navigate('/');
                            });
                        } else if (response.data.failedMessage) {
                            console.log(response.data.failedMessage);
                            swal.fire({
                                icon: "error",
                                title: `${t(response.data.failedMessage)}`,
                                text: t("Something went wrong!"),
                            }).then(() => {
                                navigate('/');
                            });
                        }
                    })
                    .catch((error) => {
                        setOpen1(false)
                        alert(t(error?.response?.data?.message));
                    });
            }
        }).catch((error) => {
            console.log(error)
            setOpen1(false)
            swal.fire("Error", `${t(error?.response?.data?.error_message)}`, "error");
        })
    }


    const ReduestData = {
        subscriberMsisdn: phone,
        amount: fareType.toString()
    };

    useEffect(() => {
        if (messageId && access_token && startTime) {
            const checkPaymentStatus = () => {
                if (paymentProcessed) return; // Exit if payment is already processed

                axios.post(`${BaseUrl}mtn_checkPaymentStatus`, {
                    message_id: messageId,
                    access_token: access_token
                })
                    .then((response) => {
                        console.log(response);
                        console.log(response.data.paymentStatus.status);

                        if (response.data.paymentStatus.status === 'SUCCESSFUL') {
                            swal.close();
                            alert(t('Payment status received successfully'));
                            clearInterval(intervalId);
                            setPaymentProcessed(true);
                            bookTicketMTN(response);
                        } else if (Date.now() - startTime >= 60000) { // 5 minutes in milliseconds
                            if (!paymentProcessed) {
                                swal.close();
                                alert(t('Payment failed: Payment status could not be confirmed within 1 minutes.'));
                                clearInterval(intervalId);
                                setPaymentProcessed(true);
                                bookTicketMTN(response);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error occurred while checking payment status:', error);
                        swal.close();
                        swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
                        clearInterval(intervalId);
                    });
            };

            const intervalId = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds

            return () => clearInterval(intervalId); // Clear interval on component unmount
        }
    }, [messageId, access_token, startTime, paymentProcessed]);

    const handlePaymentRequest = () => {
        setOpen(false);
        setOpen1(true);

        axios.post(`${BaseUrl}mtn_payment`, ReduestData)
            .then((response) => {
                console.log(response);
                setMessageID(response.data.payment_data.MessageId);
                setAccess_token(response.data.access_token);
                setStartTime(Date.now());
                setPaymentProcessed(false); // Reset paymentProcessed state

                if (response.status === 200) {
                    setOpen1(false);
                    swal.fire({
                        title: t("Waiting for response"),
                        html: t("Pay Request Accepted. The customer will have to confirm the payment by entering their PIN code and you will then receive an SMS. Thank you for using MTN Money services."),
                        timerProgressBar: true,
                        didOpen: () => {
                            swal.showLoading();
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                setOpen1(false);
                if (error?.response?.data?.message) {
                    swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
                } else {
                    swal.fire("Error", "An unknown error occurred.", "error");
                }
            });
    };
    const bookTicketMTN = (responseMTN) => {
        setOpen1(true);
        console.log('check the booking API pending');

        axios.post(`${BaseUrl}bookTicket/${linkID ? linkID : onTripID}?source=${sourcePay}&destination=${destinationPay}`, {
            journey_date: dateType ? dateType : roundTripDate,
            selectedSeatNumbers: seat ? seat : onGoingSeat,
            email: email,
            totalFare_in_Euro: fareType,
            payment_key: 2,
            passengers: pasengerInformation,
            mtnResponse: responseMTN,
            accessToken: accesstoken,
            payToken: payToken,
            return_tripId: retruenTripId,
            return_SeatNumbers: returnSeatNo
        })
            .then((response) => {
                console.log(response.data.bookingId);
                if (response.status === 200) {
                    axios.post(`${BaseUrl}updateBooking/${response.data.bookingId}`)
                        .then((updateResponse) => {
                            setOpen1(false);
                            if (updateResponse.data.message) {
                                console.log(updateResponse.data.message);
                                swal.fire(
                                    `${t(updateResponse.data.message)}`,
                                    t('Please check your email for further details'),
                                    'success'
                                ).then(() => {
                                    navigate('/');
                                });
                            } else if (updateResponse.data.failedMessage) {
                                console.log(updateResponse.data.failedMessage);
                                swal.fire({
                                    icon: "error",
                                    title: `${t(updateResponse.data.failedMessage)}`,
                                    text: t("Something went wrong!"),
                                }).then(() => {
                                    navigate('/');
                                });
                            }
                        })
                        .catch((error) => {
                            setOpen1(false);
                            console.log(error?.response?.data?.message);
                            swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
                        });
                }
            })
            .catch((error) => {
                setOpen1(false);
                console.log(error?.response?.data?.message);
                swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
            });
    };

    const handleOrangePayment = () => {

        let timerInterval;

        swal.fire({
            title: t("Waiting for response"),
            html: t("Please wait while we process your request..."),
            timerProgressBar: true,
            didOpen: () => {
                swal.showLoading();
                const timer = swal.getPopup().querySelector("b");
                if (timer) { // Check if the timer element exists
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Math.ceil(swal.getTimerLeft() / 1000)}`;
                    }, 100);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        });

        axios.post(`${BaseUrl}initiatePayment`).then((response) => {
            setAccesstoken(response.data.data.access_token)
            setPayToken(response.data.data.payToken)
            console.log(response.data.data.access_token, response.data.data.payToken)
            swal.close(); // Close the SweetAlert popup
            alert(t('Payment request successfully initiated'));
            setOrange(true)
        }).catch((error) => {
            console.log(error);
            swal.close(); // Close the SweetAlert popup
            alert(t('Error occurred while fetching data'));
        });
    }
    const amount = toString(fareType)
    const HandleRequestToPayorange = () => {
        setOpen1(true);
        setOrange(false);
        axios.post(`${BaseUrl}pay`, {
            access_token: accesstoken,
            amount: String(fareType),
            subscriberMsisdn: orangeno,
            payToken: payToken
        })
            .then((response) => {
                setOrange(false);
                setOpen1(false);
                ;
                if (response) {
                    swal.fire({
                        title: t("Waiting for response"),
                        html: t("Payment done. The customer will have to confirm the payment by entering their PIN code and you will then receive an SMS. Thank you for using Orange Money services."),
                        timerProgressBar: true,
                        didOpen: () => {
                            swal.showLoading();
                        },
                    });
                }
                const checkPaymentStatus = () => {
                    axios.post(`${BaseUrl}checkPaymentStatus`, {
                        access_token: accesstoken,
                        payToken: payToken
                    })
                        .then((response) => {

                            console.log(response.data.paymentStatus)
                            // setResponseOrg(response.data.paymentStatus)
                            console.log(response.data.paymentStatus.data.status);
                            if (response.data.paymentStatus.data.status === 'SUCCESSFULL') {
                                swal.close();
                                alert(t('Payment status received successfully'));

                                // Proceed with booking the ticket
                                bookTicket(response.data.paymentStatus);

                            } else {
                                // If payment status is not yet confirmed and the timer hasn't expired, keep checking
                                if (Date.now() - startTime < 60000) { // 30 minutes in milliseconds
                                    setTimeout(checkPaymentStatus, 5000); // Check again after 5 seconds
                                } else {
                                    // If timer has expired, close loading indicator and notify user
                                    swal.close();
                                    alert(t('Payment failed: Payment status could not be confirmed within 1 minutes.'));
                                    bookTicket(response.data.paymentStatus);
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Error occurred while checking payment status:', error);
                            swal.close();
                            alert(t('Error occurred while fetching payment status'));
                        });
                };



                // Start checking payment status immediately after initiating payment
                const startTime = Date.now(); // Record start time
                checkPaymentStatus();
            })
            .catch((error) => {
                console.error(t('Error occurred while initiating payment:'), error);
                setOpen1(false)

                swal.fire("Error", t("Payment request failed"), "error");
            });
    };
    // console.log(responseOrg)
    const bookTicket = (responseOrg) => {
        setOpen1(true)
        console.log('chek the booking Api pending')
        axios.post(`${BaseUrl}bookTicket/${linkID ? linkID : onTripID}?source=${sourcePay}&destination=${destinationPay}`, {
            journey_date: dateType ? dateType : roundTripDate,
            selectedSeatNumbers: seat ? seat : onGoingSeat,
            email: email,
            totalFare_in_Euro: fareType,
            payment_key: 3,
            passengers: pasengerInformation,
            orangeResponse: responseOrg,
            accessToken: accesstoken,
            payToken: payToken,
            return_tripId: retruenTripId,
            return_SeatNumbers: returnSeatNo

        })
            .then((response) => {
                console.log(response.data.bookingId);
                if (response.status === 200) {

                    axios.post(`${BaseUrl}updateBooking/${response.data.bookingId}`)
                        .then((response) => {

                            if (response.data.message) {
                                console.log(response.data.message);
                                setOpen1(false)
                                swal.fire(
                                    `${t(response.data.message)}`,
                                    t('Please check your email for further details'),
                                    'success'
                                ).then(() => {
                                    navigate('/');
                                });
                            } else if (response.data.failedMessage) {
                                console.log(response.data.failedMessage);
                                setOpen1(false)
                                swal.fire({
                                    icon: "error",
                                    title: `${t(response.data.failedMessage)}`,
                                    text: t("Something went wrong!"),
                                }).then(() => {
                                    navigate('/');
                                });
                            }
                        })
                        .catch((error) => {
                            setOpen1(false)
                            console.log(error?.response?.data?.message);
                        });
                }
            })
            .catch((error) => {
                swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
            });
    };

    return (
        <>
            <section className='container'>
                <div className="payTime">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="text-center">
                                <p>
                                    {sourcePay}<EastIcon />{destinationPay}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {/* <p>
                                {t('Please pay within')}: <i className="fa-solid fa-clock-rotate-left" />{" "}
                                10:00 minutes
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="payContainer">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="payForm">
                                <form action="">
                                    <div className="mb-3" style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="ENTER OFFER CODE"
                                        />
                                        <div className="applytn">
                                            <button type="text" disabled>APPLY</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="securePay">
                                <div><img src="" alt="" />{t('Secure payment')}</div>
                                <div><img src="" alt="" />{t('Lightning fast refund')}</div>
                                <div><img src="" alt="" />{t('Trusted by over 3.5Cr users')}</div>
                            </div>
                            {/* <div>
                                <h6 className="mb-4">Choose Payment methoddddddd</h6>
                            </div> */}
                            {/* //payment */}
                            <div className='d-flex stripePaymnet'>
                                {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.commusoft.us%2Fsoftware-integrations%2Fstripe-payment%2F&psig=AOvVaw07XoRxJ59iORS658gs_xfg&ust=1712743537662000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDOpvjxtIUDFQAAAAAdAAAAABAEhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRek2EqBo5YIE0TPMVMlIFA594WZZeuqYdAQQ&s" /> */}
                                <StripeCheckout
                                    // onClick={()=>userPay()}                           
                                    stripeKey="pk_live_51McrnfDj4KEhyOABTOsJbKBdBGkxG2imP6fnF5czWqr8R2PP05LDYJ0SzlObPslhIwxwOdrEYlffn8g8qQDoHDrp00fZj3EmMV"
                                    // stripeKey="pk_test_51PNUK4GfZjktm0MxctB7CmLLDYUXl3sxQo70IqV2sqXafWWcLklKyBbh7SV4fwyiBQMVAXcd5BZVmE3rfEI2QbHs00fgmvVF7T"
                                    token={handleToken}
                                    name={localStorage.getItem('name')}
                                    panelLabel="Pay"
                                    // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" 
                                    amount={fareType} // Amount in cents (1 cent = 1 FCFA)
                                    currency="XAF"

                                />


                                <div className='border shadow-sm  ms-1'>
                                    <img onClick={handleClickOpen} src={mtnpay} />
                                </div>
                                <div className='border shadow-sm  mx-1'>
                                    <img onClick={handleOrangePayment} src={orangepey} />
                                </div>
                            </div>

                            <div className="privacy">
                                <p className='mt-3'>
                                    {t('By clicking on pay you agree to our')}{" "}
                                    <a href="">{t('Terms Of Use')}</a> &amp;{" "}
                                    <a href="">{t('Privacy Policy')}</a>{" "}
                                </p>
                            </div>

                            {/* payment integeration */}

                        </div>
                        <div className="col-lg-4">
                            <div className="passengerDetails">
                                <div className="p-3">
                                    <div className="BusName">
                                        {/* <h6>Laxmi holidays</h6>
                                        <span> A/C Seater / Sleeper (2+2)</span> */}
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="row align-items-center">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-regular fa-calendar travelicon" /> */}
                                                    <ChairIcon />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <p className='mb-0'>Outbound seat No</p>
                                            </div>
                                            <div className="col-5">
                                                <div className="text-end">
                                                    <span>{t('Seats')}</span>
                                                    <h6>{seat?seat:onGoingSeat}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        {localStorage.getItem("SetTripstatus") === "oneway"? null:  <div className="row align-items-center">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-regular fa-calendar travelicon" /> */}
                                                    <ChairIcon />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <p>Return Seat NO</p>
                                            </div>
                                            <div className="col-5">
                                                <div className="text-end">
                                                    <span>{t('Seats')}</span>

                                                    <h6>{returnSeatNo}</h6>
                                                </div>
                                            </div>
                                        </div>}
                                        
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="row">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-solid fa-location-dot travelicon" /> */}
                                                    <EastIcon />
                                                </div>
                                            </div>
                                            <div className="col-3">

                                                <h6 className="mb-0">{sourcePay}</h6>
                                                {/* <p>Mori Gate gol chakker</p> */}
                                            </div>
                                            <div className="col-3">
                                                <div className="text-end">

                                                    <h6 className="mb-0">{destinationPay}</h6>
                                                    {/* <p>Radha Petrol Pump</p> */}
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div className="text-end">

                                                    <h6 className="mb-0">{fareType?fareType:firstSeatamount}<CurrencyFrancIcon/></h6>
                                                    {/* <p>Radha Petrol Pump</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        {localStorage.getItem("SetTripstatus") === "oneway" ? null : <div className="row">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-solid fa-location-dot travelicon" /> */}
                                                    <WestIcon />
                                                </div>
                                            </div>
                                            <div className="col-3">

                                                <h6 className="mb-0">{destinationPay}</h6>
                                                {/* <p>Mori Gate gol chakker</p> */}
                                            </div>
                                            <div className="col-3">
                                                <div className="text-end">

                                                    <h6 className="mb-0">{sourcePay}</h6>
                                                    {/* <p>Radha Petrol Pump</p> */}
                                                </div>
                                            </div>
                                            <div className="col-5">

                                                <div className="text-end">

                                                    <h6 className="mb-0"> {secondseatamount} <CurrencyFrancIcon/></h6>
                                                    {/* <p>Radha Petrol Pump</p> */}
                                                </div>
                                            </div>
                                        </div>}

                                    </div>
                                </div>
                                <div className="aboutPerson">
                                    <h6 className="mb-0">
                                        <PersonIcon /> &nbsp;&nbsp;{name.join(",")}
                                        ({age.join(",")},{gender.join(",")})
                                    </h6>
                                </div>
                            </div>
                            <div className="ticket">

                                <h6 className="mb-0"> {t("You are saving  38 FCFA on this ticket")}</h6>
                            </div>
                            <div className="FARE">
                                <div className="fareinner">
                                    <div className="fare1 d-flex justify-content-between">
                                        {localStorage.getItem("SetTripstatus") === "oneway" ? <h6> {t('FARE BREAKUP')}</h6> : <p style={{ "color": "#6d01a7" }}>{t("5% of discount will be applied")}</p>}

                                        <i><CurrencyFrancIcon/></i>
                                    </div>
                                    {/* <div className="fare2 d-flex justify-content-between">
                                        <p className="mb-1">Onward Fare</p>
                                        <p className="mb-1">INR 765.62</p>
                                    </div> */}
                                    <div className="fare3 d-flex justify-content-between">
                                        <p className="mb-0">{t('Total Payable')}</p>
                                        <p className="mb-0">{fareType} </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <React.Fragment>
                        {/* Your existing dialog/modal component */}
                        {open && (
                            <React.Fragment>
                                <Dialog
                                    fullWidth={fullWidth}
                                    maxWidth={maxWidth}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <DialogContent>
                                        <Box
                                            noValidate
                                            component="form"
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "fit-content",
                                            }}
                                        >
                                            {/* <h6>{t('Please confirm the MTN phone number that you will use ti pay for your  Booking')}</h6>
                                            <p>{t('Payment request will be sent to this number')}</p> */}
                                            <div className='accountimg'>
                                                <p className='mb-0 me-3'>Your Account</p>
                                                <div>
                                                    <img src={mtnpay} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className='form-label'>{t('MTN Phone No')}</label> :&nbsp;
                                                <input type='number' className='form-control mb-4' onChange={(e) => setPhone(e.target.value)}></input>
                                            </div>

                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{ width: 100 }}
                                                onClick={handlePaymentRequest}
                                            >
                                                {t('Pay Now')}
                                            </Button>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>{t("Close")}</Button>
                                    </DialogActions>
                                </Dialog>

                            </React.Fragment>
                        )}
                    </React.Fragment>
                    <React.Fragment>
                        {/* Your existing dialog/modal component */}
                        {/* {bar && phone.length !== 0 && (
                            <React.Fragment>
                                <Dialog
                                    fullWidth={fullWidth}
                                    maxWidth={maxWidth}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <DialogContent>
                                        <Box sx={{ display: 'flex' }} alignItems="center" gap={4}
                                            p={2} height={200}
                                            width={200}>
                                            <CircularProgress />
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </Dialog>

                            </React.Fragment>
                        )} */}
                    </React.Fragment>
                    {orange && (
                        <React.Fragment>
                            <Dialog
                                fullWidth={fullWidth}
                                maxWidth={maxWidth}
                                open={orange}
                                onClose={handleClose}
                            >
                                <DialogContent>
                                    <Box
                                        noValidate
                                        component="form"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "fit-content",
                                        }}
                                    >
                                        {/* <h6>{t('Please confirm the orange phone number that you will use ti pay for your booking')}</h6>
                                        <p>{t('Payment request will be sent to this number')}</p> */}
                                        <div className='accountimg'>
                                            <p className='mb-0 me-3'>Your Account</p>
                                            <div>
                                                <img className='border' src={orangepey} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className='form-label'>{t('Orange Phone No')}</label> : &nbsp;
                                            <input type='number' className='form-control mb-4' onChange={(e) => setOrangeno(e.target.value)}></input>
                                        </div>
                                        <span style={{ color: "red" }}>
                                            {blogErr && !phone
                                                ? "*Please Enter Your room_number"
                                                : ""}
                                        </span>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{ width: 100 }}
                                            onClick={HandleRequestToPayorange}
                                        >
                                            {t("Pay Now")}
                                        </Button>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose2}>{t("Close")}</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open1}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </div>
            </section>
        </>
    )
}
