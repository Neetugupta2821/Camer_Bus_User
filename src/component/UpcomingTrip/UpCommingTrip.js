import React from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../Api/BaseUrl';
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
import EastIcon from '@mui/icons-material/East';
// import { useLocation } from 'react-router-dom'
export default function UpCommingTrip() {
    const { t, i18n } = useTranslation();
    const location = useLocation()
    const { data, data2,bookingId } = location.state
    console.log(data)
    console.log(data2)
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [NewTripId, setNewTipId] = useState("")
    const [UpBookId, setUpBookId] = useState("")
    const [Trip, setTrip] = useState([])
    // const [isLoading, setIsLoading] = useState(false);
    const [jobErr, setJobErr] = useState(false);
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
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

        // setIsLoading(true);
        axios.post(`${BaseUrl}getUpcomingTrip_for_DateChange?sourceStop=${data}&destinationStop=${data2}`,{
            bookingId:bookingId
        }).then((response) => {
            console.log(response.data.trips, "this is myyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            setTrip(response.data.trips)
            swal.close(); // Close the SweetAlert popup
            // setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            swal.close(); // Close the SweetAlert popup
        })
    }, [])
    const handleUpcomingTrip = (e, id) => {
        e.preventDefault()
        setOpen(true);
        console.log(id)
        setNewTipId(id)

    }
    const handleBookUpComingTrip = () => {
        setJobErr({
            UpBookId: false,


        });
        if (!UpBookId) {
            setJobErr((prevState) => ({ ...prevState, UpBookId: true }));
        }
        if (!UpBookId) {
            return;
        }
        axios.post(`${BaseUrl}changeTrip`, {
            bookingId: UpBookId,
            newTripId: NewTripId
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setOpen(false);
            }  

            swal.fire(
                `${t(response.data.message)}`,
               t('success')
            )
            setUpBookId("")
        }).catch((error) => {
            setOpen(false);
            seterror({ isarray: true, error: error })
            swal.fire("Error", `${t(error?.response?.data?.error)}`, "error");
            swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
        })
    }
    return (
        <>
            <section className="innerbanner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="innerBannerCont">
                                <h2>{("Bus Tickets")}</h2>
                                <p>{("Be comfortable while you travel with our reliable bus rental.")}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section_bus_tickets">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <div className='d-flex align-items-center justify-content-center'>
                                {isLoading && (<div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>)}
                            </div> */}

                            {Trip.length === 0 ? "No Trip Found" : (<div className="sort-results">
                                <ul className="sort-sec">
                                    <li className="filterlist w-22 dis-flex">
                                        <span className="busFound">
                                            <span className="f-bold busFound">81 Buses </span>
                                            {t("found")}
                                        </span>
                                        <span className="f-bold busFound">SORT BY:</span>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Departure")}
                                            <i className="" />
                                        </a>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Duration")}
                                            <i className="" />
                                        </a>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Arrival")}
                                            <i className="" />
                                        </a>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Ratings")}
                                            <i className="" />
                                        </a>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Fare")}
                                            <i className="icon-down-arrow" />
                                        </a>
                                    </li>
                                    <li className="filterlist">
                                        <a>
                                            {t("Seats Available")}
                                            <i className="" />
                                        </a>
                                    </li>
                                </ul>
                                {Trip.map((info, index) => {
                                    return (<>
                                        <div className="ticketsDetails">
                                            <div className="row-one">
                                                <ul className="sort-sec">
                                                    <li className="column-one w-22">
                                                        <div className="larg_font">{info.trip.bus_no} </div>
                                                        <div className="font-s marTop10">{info.trip.bus_type}</div>
                                                    </li>
                                                    <li className="column-two">
                                                        <div className="larg_font">{info.trip.startingTime}</div>
                                                        <div className="font-s marTop44">

                                                        </div>
                                                    </li>
                                                    <li className="column-three">
                                                        <div className="fontMDtext ">{info.trip.startingDate}</div>
                                                    </li>
                                                    <li className="column-four">
                                                        <div className="fontNolmal larg_font">9:00</div>
                                                        <div className="font-s redtext marTop10">21-Sep</div>
                                                        <div className="font-s">Teen Imli Rivan Travels</div>
                                                    </li>
                                                    <li className="column-five">
                                                        <div className="font-s starRat">
                                                            <span>
                                                                {" "}
                                                                <i className="material-icons">star </i> 3.6
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li className="column-five">
                                                        <div className="fontMDtext">Starts from</div>
                                                        <div className="font-s inrPrice">
                                                        FCFA <dl>1398 </dl> <strong>1328</strong>
                                                        </div>
                                                        <div className="font-s marTop10 saleIcon">
                                                            camer Travel applied

                                                        </div>
                                                    </li>
                                                    <li className="column-five">
                                                        <div className="font-s">{info.trip.Available_seat.length} </div>
                                                        <div className="font-s">7 Single</div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-two mt-4">
                                                <div className="amenities-icon">
                                                    <ul className="amenities-ul">
                                                        <li>
                                                            <a href="#!">
                                                                {/* <ControlCameraIcon /> */}

                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                {/* <VideoCallIcon /> */}
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                {/* < PlayCircleOutlineIcon /> */}
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                {/* <PhoneMissedIcon /> */}
                                                            </a>{" "}
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                {/* <ControlPointIcon /> */}
                                                            </a>{" "}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="liveTraking">
                                                    <a href="#!">
                                                        <i><MyLocationIcon /> Live Tracking{" "}</i>
                                                    </a>
                                                </div>
                                                <div className="returnTrip">
                                                <h6>{info.trip.source} <EastIcon />{info.trip.destination}</h6>
                                                    <p>
                                                        <strong>Return Trip camer Travel </strong> : Unlock min. 10%
                                                        OFF on return ticket
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row-three mt-3">
                                            <ul className="bottom-panel">
                                                    <li className="amenties b-p-list max_width_1">
                                                        <span className="txt-val ">{t("Amenities")}</span>
                                                    </li>
                                                    <li className="amenties b-p-list max_width_2">
                                                        <span className="txt-val ">{t("Bus Photos")}</span>
                                                    </li>
                                                    <li className="amenties b-p-list max_width_3">
                                                        <span className="txt-val ">{t('Boarding Dropping Points')}</span>
                                                    </li>
                                                    <li className="amenties b-p-list max_width_4">
                                                        <span className="txt-val ">{t('Reviews')}</span>
                                                    </li>
                                                    <li className="amenties b-p-list max_width_5">
                                                        <span className="txt-val ">{t('Booking policies')}</span>
                                                    </li>
                                                    {/* <li className="amenties b-p-list max_width_6">
                                                        <span className="txt-val ">{t('Bus Route')}</span>
                                                    </li> */}
                                                </ul>
                                                <div className="viewSeatsBtn">
                                                    {/* onClick={(e) => handlfunction(info.trip._id)} */}
                                                    <a href="" onClick={(e) => handleUpcomingTrip(e, info.trip._id)} >{t('Change Trip')}</a>
                                                </div>
                                            </div>

                                        </div>
                                    </>)
                                })}


                            </div>)}

                        </div>

                    </div>
                </div>
                <React.Fragment>
                    <Dialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        open={open}
                        onClose={handleClose}

                    >

                        <DialogContent   >

                            <Box
                                noValidate
                                component="form"

                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 'fit-content',

                                }}
                            >
                                <Box>
                                    <TextField fullWidth label="booking ID" id="fullWidth" size="small" sx={{ width: 400 }} onChange={(e) => setUpBookId(e.target.value)}
                                    /><br></br>
                                    <span style={{ color: "red" }}>
                                        {jobErr && !UpBookId
                                            ? "*Please Enter Your Booking Id."
                                            : ""}
                                    </span>
                                    {/* {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""} */}
                                </Box><br></br>

                                <Button variant="contained" size="small" sx={{ width: 100 }} onClick={handleBookUpComingTrip}>Submit</Button>

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>

            </section>
        </>
    )
}
