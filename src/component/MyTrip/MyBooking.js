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
 
import Box from '@mui/material/Box';
 
import { Link } from "react-router-dom";
import moment from 'moment';



export default function MyBooking() {
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
    // const [errors, setErrors] = useState({});
    // const [submitting, setSubmitting] = useState(false);
    const [message,setmessage]=useState(false)
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
            console.log(response.data.trips, "this is myyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
            setTrip(response.data.trips)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        axios.get(`${BaseUrl}upcoming_Booking/${UserId}`).then((response) => {
            console.log(response.data.bookings,"dattttttttttttttttttt for")

            setBooking(response.data.bookings)


        }).catch((error) => {
            console.log(error)
        })

    }, [])

    const handleCancelBook = () => {
        if(!email || !bookId){
            setmessage(true)
            return;
        }
        // setErrors(validateValues());
        axios.post(`${BaseUrl}cancelTicket`, {
            email: email,
            bookingId: bookId
        }).then((response) => {
            console.log(response)
            swal.fire(
                `Your booking with Booking ID ${bookId} has been cancelled.`,
                'your booking has been cancelled successfully',
                'success'
            )
            // setSubmitting(true);
            setmessage(false)
        }).catch((error) => {

            seterror({ isarray: true, error: error })
            console.log(error)
           
        })
    }


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
                                        <span>My Booking</span>
                                    </label>
                                    <label htmlFor="blog" className="blog">
                                        <span>Cancel your Ticket</span>
                                    </label>
                                    <label htmlFor="help" className="help">
                                        <span>Booking History</span>
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
                                        {booking.length === 0 ? (<p> No previous bookings</p>) : (
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow style={{ "white-space": "nowrap" }}>
                                                            <TableCell>Date</TableCell>
                                                            <TableCell>Email</TableCell>
                                                            <TableCell>Seat No</TableCell>
                                                            <TableCell>TotalFare</TableCell>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Booking ID</TableCell>
                                                            <TableCell>Payment Status</TableCell>
                                                            <TableCell>Coming Trip</TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {booking.map((info, index) => {
                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell style={{"padding":"7px"}}>{moment(info.date).format("DD-MM-YYYY")}</TableCell>
                                                                    <TableCell style={{"padding":"7px"}}>{info.userEmail}</TableCell>
                                                                    <TableCell style={{"padding":"7px"}}>{info.selectedSeatNumbers.join(',')}</TableCell>
                                                                    <TableCell style={{"padding":"7px"}}>{info.totalFare}</TableCell>
                                                                    <TableCell style={{"padding":"7px"}}>{info.status}</TableCell>
                                                                    <TableCell style={{"padding":"7px"}}>{info.bookingId}</TableCell>
                                                                     
                                                                    <TableCell style={{"padding":"7px"}}>{info.paymentStatus}</TableCell>

                                                                    <TableCell style={{"padding":"7px"}}><Link to="/UpCommingTrip" state={{ data: info.source, data2: info.destination }}><Button variant="contained" onClick={handelChangUpcomingTrip(info.source, info.destination)}>change trip</Button></Link> </TableCell>

                                                                </TableRow>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        )}

                                    </div>



                                    <div className="blog text">
                                    <span style={{"color":"red"}}>{message? "Please fill in all required fields.*":null}</span>
                                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" style={{"display": "grid"}}>
                                       
                                            <Box><TextField id="outlined-size-small" label="Email" variant="outlined" size="small" type='email' sx={{ width: 250 }} name="email" onChange={(e) => setemail(e.target.value)} value={email} />
                                            {/* {errors.email ? <div className="text-danger">{errors.email}</div> : <div className="text-danger">{error?.error?.response?.data?.unAuthMessage ? error?.error?.response?.data?.unAuthMessage : errors?.email}</div>}
                                            {errors.email && <div className="text-danger">{errors.email}</div>} */}
                                            {error.isarray ? <div className="text-danger">{error.error.response.data.unAuthMessage}</div> : ""}</Box> 

                                            <Box><TextField id="outlined-size-small" label="Booking ID" variant="outlined" size="small" type='text' sx={{ width: 250 }} name="bookingId" onChange={(e) => setbooId(e.target.value)}  value={bookId}/>
                                            {/* {errors.bookId && <div className="text-danger">{errors.bookId}</div>} */}
                                                {error.isarray ? <div className="text-danger">{error.error.response.data.BookingNotFound}</div> : ""}</Box>
                                                <Box>   {error.isarray ? <div className="text-danger">{error.error.response.data.alreadyCancelledMessage}</div> : ""}</Box>

                                            <Box><Button type="submit" size="small" variant="contained" onClick={handleCancelBook}>submit</Button></Box>
                                          

                                        </Stack>
                                    </div>
                                    <div className="help text">
                                        {History.length === 0 ? (<p>No booking  History</p>) : (<TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow style={{ "white-space": "nowrap" }}>
                                                        <TableCell>Date</TableCell>
                                                        <TableCell>Email</TableCell>
                                                        <TableCell>Seat No</TableCell>
                                                        <TableCell>TotalFare</TableCell>
                                                        <TableCell>Booking ID</TableCell>
                                                        <TableCell>Status</TableCell>
                                                        <TableCell>Payment Status</TableCell>

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
