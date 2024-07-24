import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useAsyncError, useLocation } from 'react-router-dom'
import axios from 'axios'
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
export default function ProccessToPay() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation()
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [bearerToken, setbearerToken] = useState('');
    const [key, setkey] = useState("")
    const [phone, setphone] = useState("")
    const [apikey,setApiKey] =useState('')

    const { data, email, pasengerInformation, fareType, IDGet, sourcePay, destinationPay } = location.state;
    const age = pasengerInformation.map(info => Number(info.age))
    const name = pasengerInformation.map(info => String(info.name))
    const gender = pasengerInformation.map(info => String(info.gender))
    console.log(pasengerInformation)
    let getTrip = data.map((info) => {
        return info.trip._id
    })
    console.log(getTrip)
    let getTripSourse = data.map((info) => {
        return info.trip.source
    })
    console.log(getTripSourse[0])

    const getlinkID = getTrip.filter((info, index) => {
        return info === IDGet
    })

    console.log(getlinkID)
    let getTripDate = data.map((info) => {
        return info.trip.startingDate
    })

    const DateType = getTripDate[0];
    console.log(DateType)
    let NumBerOfseat = localStorage.getItem('NumBerOfseat')
    console.log("mil to gya na", JSON.parse(NumBerOfseat))
    let NoArraySeat = JSON.parse(NumBerOfseat)

    const result = Object.keys(NoArraySeat).map((key) => NoArraySeat[key]);

    const getSeat = result[0]?.map((info) => info.seat);
    console.log(getSeat);

    const handleClickOpen = () => {
        axios.post(`http://13.51.205.211:4001/createApiUser`, {

            subscriptionKey: "939e26ed861c4ee1ad519608ec62d49e"
        }).then((response) => {
            console.log(response.data.bearerToken1)
            setbearerToken(response.data.bearerToken1)
            console.log(response.data.xReferenceId)
            setkey(response.data.xReferenceId)
            setApiKey(response.data.apiKey1.apiKey)
            alert(response.data.apiKey1.apiKey)
            alert('get data')
        }).catch((error) => {
            console.log(error)
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToken = (token) => {
        const request = {
            journey_date: DateType,
            selectedSeatNumbers: getSeat,
            email: email,
            totalFare_in_Euro: 1,
            passengers: pasengerInformation,
            payment: token.id,
            payment_key: 1
        }
        console.log(request, "Check payment request")
        console.log(token, "Check Tokennnnnnnnnnnnnnn")

        axios.post(`${BaseUrl}bookTicket/${getlinkID}?source=${sourcePay}&destination=${destinationPay}`, request).then((response) => {
            console.log(response)
            swal.fire(
                'Ticket Booked Successfully. Ticket sent to user email',
                'You clicked the button!',
                'success',
                navigate('/')
            )

        }).catch((error) => {
            console.log(error)
        })
    }

    const ReduestData = {
        xReferenceId: key,
        subscriptionKey: "939e26ed861c4ee1ad519608ec62d49e",
        bearerToken: bearerToken,
        amount: fareType,
        phone: phone,
        referenceNumber: "1234564"

    }

    const HandleRequestToPay = () => {
        axios.post(`http://13.51.205.211:4001/makePayment`, ReduestData).then((response) => {
            console.log(response.data.paymentStatus, 'get this new ewsponse for MTN payment')

            alert('payment done')

            axios.post(`${BaseUrl}bookTicket/${getlinkID}?source=${sourcePay}&destination=${destinationPay}`, {
                journey_date: DateType,
                selectedSeatNumbers: getSeat,
                email: email,
                totalFare_in_Euro: fareType,
                passengers: pasengerInformation,
                mtnResponse: response.data.paymentStatus,
                payment_key: 2,
                xReferenceId:response.data.xReferenceId,
                mtnApiKey:apikey

            }).then((response) => {
                console.log(response)
                swal.fire(
                    'Ticket Booked Successfully. Ticket sent to user email',
                    'You clicked the button!',
                    'success',
                    navigate('/')
                )

            }).catch((error) => {
                console.log(error, 'this is Mtn ERROR')
            })

        }).catch((error) => {
            console.log(error)
        })

    }

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
                            <p>
                                {t('Please pay within')}: <i className="fa-solid fa-clock-rotate-left" />{" "}
                                10:00 minutes
                            </p>
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
                                            <button type="submit">APPLY</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="securePay">
                                <div><img src="" alt="" />  {t('Secure payment')}</div>
                                <div><img src="" alt="" />  {t('Lightning fast refund')}</div>
                                <div><img src="" alt="" />  {t('Trusted by over 3.5Cr users')}</div>
                            </div>
                            {/* <div>
                                <h6 className="mb-4">Choose Payment methoddddddd</h6>
                            </div> */}
                            {/* //payment */}
                            <StripeCheckout
                                // onClick={()=>userPay()}                          
                                stripeKey="pk_live_51McrnfDj4KEhyOAB7CUrw0DQfL1sl4SscpIpPYl3NX6frIB7FsTeuAqYNJI3ZYBYEaMy6nuonSpxjCrcS4MN5hkk00dZrfQgGJ"
                                token={handleToken}
                                name={localStorage.getItem('name')}
                                panelLabel="Pay"
                                // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" 
                                amount={1 * 100}
                                currency="USD"

                            />
                            <div> <button className='btn mtn_pay_btn' onClick={handleClickOpen}>MTN payment</button>
                            </div>

                            <div className="privacy">
                                <p>
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
                                        <h6>Laxmi holidays</h6>
                                        <span> A/C Seater / Sleeper (2+2)</span>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="row">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-regular fa-calendar travelicon" /> */}
                                                    <CalendarMonthIcon />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <span>{t('Departure')}</span>
                                                <p>{DateType}</p>
                                                {/* <h6>{DateType}</h6> */}
                                                <p />
                                            </div>
                                            <div className="col-5">
                                                <div className="text-end">
                                                    <span>{t('Seats')}</span>
                                                    <h6>{getSeat.join(",")}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="row">
                                            <div className="col-1 d-flex justify-content-center align-items-center pe-0">
                                                <div>
                                                    {/* <i className="fa-solid fa-location-dot travelicon" /> */}
                                                    <PinDropIcon />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <span>{t('Boarding Point')} </span>
                                                <h6 className="mb-0">{sourcePay}</h6>
                                                {/* <p>Mori Gate gol chakker</p> */}
                                            </div>
                                            <div className="col-5">
                                                <div className="text-end">
                                                    <span>{t('Droping Point')} </span>
                                                    <h6 className="mb-0">{destinationPay}</h6>
                                                    {/* <p>Radha Petrol Pump</p> */}
                                                </div>
                                            </div>
                                        </div>
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
                                <h6 className="mb-0">{t('You are saving ₹ 38 on this ticket.')}</h6>
                            </div>
                            <div className="FARE">
                                <div className="fareinner">
                                    <div className="fare1 d-flex justify-content-between">
                                        <h6> {t('FARE BREAKUP')}</h6>
                                        <i className="fa-solid fa-angle-down" />
                                    </div>
                                    {/* <div className="fare2 d-flex justify-content-between">
                                        <p className="mb-1">Onward Fare</p>
                                        <p className="mb-1">INR 765.62</p>
                                    </div> */}
                                    <div className="fare3 d-flex justify-content-between">
                                        <p className="mb-0">{t('Total Payable')}</p>
                                        <p className="mb-0">{fareType}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
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
                                        <h6>Please confirm the MTN phone number that you will use ti pay for your order</h6>
                                        <p>payment request will be sent to this number</p>
                                        <div>
                                            <label>MTN Phone No</label>:
                                            <input type='number' onChange={(e) => setphone(e.target.value)}></input>
                                        </div>

                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{ width: 100 }}
                                            onClick={HandleRequestToPay}
                                        >
                                            Pay Now
                                        </Button>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    )}
                </div>
            </section>
        </>
    )
}
