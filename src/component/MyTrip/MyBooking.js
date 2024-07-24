import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './UpComingTrip.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BaseUrl } from '../../Api/BaseUrl';
import swal from 'sweetalert2'
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

import { Link } from "react-router-dom";
import moment from 'moment';



export default function MyBooking() {
    const { t, i18n } = useTranslation();
    const [booking, setBooking] = useState([])
    const [email, setemail] = useState(" ")
    const [bookId, setbooId] = useState(" ")
    const [UpBookId, setUpBookId] = useState("")
    const [NewTripId, setNewTipId] = useState("")
    const [Trip, setTrip] = useState([])
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [History, setHistory] = useState([])
    const UserId = localStorage.getItem('id')
    const source = localStorage.getItem('source')
    const destination = localStorage.getItem('destination')
    const [totalFare, setTotalFare] = useState(null);
    const [paymentKey, setPaymentKey] = useState(null);

    const [bookingDetails, setBookingDetails] = useState({
        refundAmount: null,
        cancellationType: null,

    });
    // const [errors, setErrors] = useState({});
    // const [submitting, setSubmitting] = useState(false);
    const [blogErr, setBlogErr] = useState(false);
    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    // const validateValues = () => {
    //     let errors = {};
    //     if (!email) {
    //         errors.email = "email is required";
    //     }
    //     if (!bookId) {
    //         errors.bookId = "bookId is required";
    //     }



    //     return errors;
    // };
    console.log(UserId)
    useEffect(() => {

        axios.post(`${BaseUrl}getUpcomingTrip_for_DateChange?sourceStop=${source}&destinationStop=${destination}`).then((response) => {
            console.log(response.data.trips)
            setTrip(response.data.trips)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`${BaseUrl}upcoming_Booking/${UserId}`).then((response) => {
            console.log(response.data.bookings)

            setBooking(response.data.bookings)


        }).catch((error) => {
            console.log(error)
        })

    }, [])

    const handleCancelBook = () => {
        setBlogErr({ email: false, bookId: false });
    
        if (!email) {
            setBlogErr(prevState => ({ ...prevState, email: true }));
        }
        if (!bookId) {
            setBlogErr(prevState => ({ ...prevState, bookId: true }));
        }
        if (!email || !bookId) {
            return;
        }
    
        axios.get(`${BaseUrl}getBooking/${bookId}`)
            .then(response => {
                console.log(response);
    
                const data = response.data; // Adjust based on the actual API response structure
                const transaction = response.data.transaction_details; // Adjust based on the actual API response structure
    
                // Set the state immediately after receiving the response
                setBookingDetails({
                    refundAmount: data.refundAmount,
                    cancellationType: data.cancellationType,
                });
                setTotalFare(data.booking_details.totalFare);
                setPaymentKey(transaction.payment_key);
    
                // Destructure the booking details to use in SweetAlert2
                const { refundAmount, cancellationType } = data;
                console.log(refundAmount, cancellationType, totalFare, paymentKey);
                console.log(bookingDetails);
                const swalWithBootstrapButtons = swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });
    
                swalWithBootstrapButtons.fire({
                    title: `<p><strong>Dear ${localStorage.getItem("name")},</strong> We would like to confirm that you have paid <strong>${data.booking_details.totalFare}</strong> via <strong>${transaction.payment_key === 1 ? "Stripe Payment" : transaction.payment_key === 2 ? "MTN Payment" : transaction.payment_key === 3 ? "Orange Payment" : "Unknown"}</strong>. 
                    Your request is in <strong>${data.cancellationType}</strong> mode, so your refund amount will be <strong>${data.refundAmount}</strong>.</p>`,
                    text: t(`Are you sure you want to cancel the ticket?`),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: t('Yes, cancel it!'),
                    cancelButtonText:t('No, keep it!'),
                    reverseButtons: true
                }).then(result => {
                    if (result.isConfirmed) {
                        axios.post(`${BaseUrl}cancelTicket`, {
                            email: email,
                            bookingId: bookId,
                            refundAmount: refundAmount
                        })
                            .then(response => {
                                console.log(response);
                                swal.fire(
                                    `Your booking with Booking ID ${bookId} has been cancelled.`,
                                    'Your booking has been cancelled successfully.',
                                    'success'
                                );
                            })
                            .catch(error => {
                                seterror({ isArray: true, error: error });
                                console.log(error);
                                swal.fire(
                                    'Error',
                                    `${error?.response?.data?.alreadyCancelledMessage}`,
                                    'error'
                                );
                            });
                    } else if (result.dismiss === swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire({
                            title: 'Cancelled',
                            text: 'Your booking is safe :)',
                            icon: 'error'
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error);
                swal.fire(
                    'Error',
                    t('There was an error fetching your booking details. Please try again later.'),
                    'error'
                );
            });
    };
    


    const handleUpcomingTrip = (e, id) => {
        e.preventDefault()
        setOpen(true);
        setNewTipId(id)

    }
    console.log(NewTripId)
    const handleClose = () => {
        setOpen(false);
    };

    const handleBookUpComingTrip = () => {
        axios.post(`${BaseUrl}changeTrip`, {
            bookingId: UpBookId,
            newTripId: NewTripId
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setOpen(false);
            } else {

            }
            swal.fire(
                `Trip changed successfully`,
                'success'
            )
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        axios.post(`${BaseUrl}bookingHistory/${UserId}`).then((response) => {
            console.log(response.data.bookings, "histeryshowwwwwwwwwwwwwwww")
            setHistory(response.data.bookings)

        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const handelChangUpcomingTrip = (source, destination) => {

    }
    return (
        <section className="section-paddings">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <dibv className="">
                            <div className="content">
                                {/* <div class="LeftsidePro"> */}
                                <input
                                    className="inputNone"
                                    type="radio"
                                    name="slider"
                                    defaultChecked=""
                                    id="profile"
                                />
                                <input className="inputNone" type="radio" name="slider" id="blog" />
                                <input className="inputNone" type="radio" name="slider" id="help" />
                                <input className="inputNone" type="radio" name="slider" id="code" />
                                <input
                                    className="inputNone"
                                    type="radio"
                                    name="slider"
                                    id="about"
                                />
                                <div className="list">
                                    <label htmlFor="profile" className="home">
                                        <span>{t("My Booking")}</span>
                                    </label>
                                    <label htmlFor="blog" className="blog">
                                        <span>{t("Cancel your Ticket")}</span>
                                    </label>
                                    <label htmlFor="help" className="help">
                                        <span>{t('Booking History')}</span>
                                    </label>
                                    {/* <label htmlFor="help" className="help">
                                        <span>Upcoming Trip</span>
                                    </label> */}
                                    {/* <label htmlFor="code" className="code">
                                        <span>Booking History- </span>
                                    </label> */}
                                    <div className="slider" />
                                </div>
                                {/* </div> */}
                                <div className="text-content">
                                    <div className="home text">
                                        <div className="title"></div>


                                    </div>
                                    <div className="home text">
                                        {booking.length === 0 ? (<p> {t("No previous bookings")}</p>) : (
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow style={{ "white-space": "nowrap" }}>
                                                            <TableCell>{t("Date")}</TableCell>
                                                            <TableCell>{t("Email")}</TableCell>
                                                            <TableCell>{t("Seat No")}</TableCell>
                                                            <TableCell>{t("TotalFare")}</TableCell>
                                                            <TableCell>{t("Status")}</TableCell>
                                                            <TableCell>{t("Booking ID")}</TableCell>
                                                            <TableCell>{t("Coming Trip")}</TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {booking.map((info, index) => {
                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell style={{ "padding": "7px" }}>{moment(info.date).format("DD-MM-YYYY")}</TableCell>
                                                                    <TableCell style={{ "padding": "7px" }}>{info.userEmail}</TableCell>
                                                                    <TableCell style={{ "padding": "7px" }}>{info.selectedSeatNumbers.join(',')?info.selectedSeatNumbers.join(','):info.return_SeatNumbers.join(',')}</TableCell>
                                                                    <TableCell style={{ "padding": "7px" }}>{info.totalFare?info.totalFare:"----"}</TableCell>
                                                                    <TableCell style={{ "padding": "7px" }}>{info.status}</TableCell>
                                                                    <TableCell style={{ "padding": "7px" }}>{info.bookingId}</TableCell>
 

                                                                    <TableCell style={{ "padding": "7px" }}><Link to="/UpCommingTrip" state={{ data: info.source, data2: info.destination, bookingId: info.bookingId }}><Button variant="contained" onClick={handelChangUpcomingTrip(info.source, info.destination)}>change trip</Button></Link> </TableCell>

                                                                </TableRow>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        )}

                                    </div>



                                    <div className="blog text">

                                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" style={{ "display": "grid" }}>
                                            <Box><TextField id="outlined-size-small" label={t("Email")} variant="outlined" size="small" type='email' sx={{ width: 250 }} name="email" onChange={(e) => setemail(e.target.value)} value={email} />
                                                <span style={{ color: "red" }}>
                                                    {blogErr && !email
                                                        ? "*Please Enter Your  bookId"
                                                        : ""}
                                                </span>
                                                {error.isarray ? <div className="text-danger">{error.error.response.data.unAuthMessage}</div> : ""}</Box>
                                            <Box><TextField id="outlined-size-small" label={t("Booking ID")} variant="outlined" size="small" type='text' sx={{ width: 250 }} name="bookingId" onChange={(e) => setbooId(e.target.value)} value={bookId} />
                                                <span style={{ color: "red" }}>
                                                    {blogErr && !bookId
                                                        ? "*Please Enter Your  bookId"
                                                        : ""}
                                                </span>
                                                {error.isarray ? <div className="text-danger">{error.error.response.data.BookingNotFound}</div> : ""}</Box>
                                            <Box>{error.isarray ? <div className="text-danger">{error.error.response.data.alreadyCancelledMessage}</div> : ""}</Box>
                                            <Box><Button type="submit" size="small" variant="contained" onClick={handleCancelBook}>submit</Button></Box>
                                        </Stack>
                                        <Box mt={4}>
                                            <Typography variant="h6">{t("Policy Content")}</Typography>
                                            <Typography variant="body1">
                                                {/* Add static policy content here */}
                                                <h2>{t("Cancellation Policy")}</h2>
                                                <p>{t("Thank you for choosing our bus service. Below is our cancellation policy:")}</p>
                                                <ul>
                                                    <li>{t("Cancellation requests must be submitted at least 24 hours before the scheduled departure time.")}</li>
                                                    <li>{t("A cancellation fee of 10% of the ticket price will be deducted for all cancellations made within 24-48 hours before the departure time.")}</li>
                                                    <li>{t("No refunds will be issued for cancellations made less than 24 hours before the departure time.")}</li>
                                                    <li>{t("To cancel your booking, please provide your email address and booking ID.")}</li>
                                                    <li>{t("Refunds, if applicable, will be processed within 5-7 business days to the original payment method.")}</li>
                                                </ul>
                                            </Typography>
                                        </Box>
                                    </div>
                                    <div className="help text">
                                        {History.length === 0 ? (<p>{t("No booking  History")}</p>) : (<TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow style={{ "white-space": "nowrap" }}>
                                                        <TableCell>{t("Date")}</TableCell>
                                                        <TableCell>{t("Email")}</TableCell>
                                                        <TableCell>{t("Seat No")}</TableCell>
                                                        <TableCell>{t("TotalFare")}</TableCell>
                                                        <TableCell>{t("Booking ID")}</TableCell>
                                                        <TableCell>{t("Status")}</TableCell>
                                                        <TableCell>{t("Payment Status")}</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {History.map((info, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>{moment(info.date).format("DD-MM-YYYY")}</TableCell>
                                                                <TableCell>{info.userEmail}</TableCell>
                                                                <TableCell>{info.selectedSeatNumbers.join(",")}</TableCell>
                                                                <TableCell>{info.totalFare}</TableCell>
                                                                <TableCell>{info.bookingId}</TableCell>
                                                                <TableCell>{info.status}</TableCell>
                                                                <TableCell>{info.paymentStatus}</TableCell>


                                                            </TableRow>
                                                        )
                                                    })}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>)}



                                    </div>
                                </div>
                            </div>
                        </dibv>
                    </div >
                </div >
            </div >
        </section >
    )
}
