import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Api/BaseUrl';
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import email from '../component/image/email (3).png'
import phone from '../component/image/phone-with-wire.png'
import map from '../component/image/map.png'
import wellet from '../component/image/wallet.png'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function BookYourTicket() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [source, setSource] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const today = new Date();
    const [color, setcolor] = useState("")
    const minDate = today.toISOString().split('T')[0];
    const handleStyleType = () => {
        console.log("handleStyleType is called");
        setcolor({
            height: '300px'
        });
    }
    const validateValues = () => {
        let errors = {};
        if (!source) {
            errors.source = "Departure City is required";
        } else if (!/^[A-Za-z ]{1,20}$/.test(source)) {
            errors.source = "Source must contain only alphabets";
        }
        if (!destination) {
            errors.destination = "Arrival City is required";
        } else if (!/^[A-Za-z ]{1,20}$/.test(destination)) {
            errors.destination = "Destination must contain only alphabets";
        }
        if (!date) {
            errors.date = "Date is required";
        }

        return errors;
    };
    const handleSource = (e) => {
        setSource(e.target.value);

        setErrors({ ...errors, source: "" })
        axios.get(`${BaseUrl}allStops`, {
            params: { source: e.target.value }
        }).then((response) => {
            console.log(response.data.stop_details);
            const typeData = response.data.stop_details;

            const result = typeData.filter((item) => {
                return item && item.stopName &&
                    item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
            });
            console.log(result);

            setSuggestion(result);
        }).catch((error) => {

            console.log(error);


        });



    }
    const handleSuggestionClick = (suggestion) => {
        setSource(suggestion);
        setSelectedSuggestion(suggestion);
        setSuggestion([]);
    }
    const [destination, setDestination] = useState("");
    const [destinationSuggestion, setDestinationSuggestion] = useState([]);
    const [selectedSuggestion1, setSelectedSuggestion1] = useState(null);
    const handleDestination = (e) => {
        setDestination(e.target.value);

        setErrors({ ...errors, destination: "" });
        axios.get(`${BaseUrl}allStops`, {
            params: { destination: e.target.value }
        }).then((response) => {
            console.log(response.data.stop_details);
            const typeData = response.data.stop_details;

            const result = typeData.filter((item) => {
                return item && item.stopName &&
                    item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
            });
            console.log(result);
            setDestinationSuggestion(result)

        }).catch((error) => {
            console.log(error);
        });


    }
    const handleSuggestionClick1 = (destinationSuggestion) => {
        setDestination(destinationSuggestion);
        setSelectedSuggestion1(destinationSuggestion);
        setDestinationSuggestion([]);
    };
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateValues();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post(`${BaseUrl}searchTrips`, {
                sourceStop: source,
                destinationStop: destination,
                date: date
            }).then((response) => {
                setSubmitting(true);
                if (response?.status === 200) {

                    navigate('/SearchBus', { state: { data: response.data.trips, sourceType: source, destinationType: destination } });
                } else {
                    alert(response?.message);
                }
            }).catch((error) => {
                swal.fire("No matching trips found for the selected date");
                console.log(error);

            });
            console.log({
                source,
                destination,
                date
            });
        } else {
            // Handle and display errors
            setErrors(validationErrors);
        }
    }
    localStorage.setItem("source", source);
    localStorage.setItem('destination', destination);
    return (
        <>
            <section className="agencies">
                <div className="container">
                    <div className="mainHeading">
                        <h2 className="mb-5">{t('BOOK YOUR TICKET')}</h2>
                    </div>
                    <div className="online-booking-form1">
                        <div className="container">
                            <div className="formBgColor1">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="callNowSection">
                                            <h3>Call Now !</h3>
                                            <div className="callNow">
                                                <span className="callIcon">
                                                    <i className="material-icons"><LocalPhoneIcon/></i>
                                                </span>
                                                <div className="callText">
                                                    <label>Call for detail information</label>
                                                    <h2>+91-000-000-0000</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="onlineBooking">
                                            <div className="bookimg_Details">
                                                <div className="bookimg">
                                                    <img src={wellet}  alt="" />
                                                </div>
                                                <p className="ps-4">{t('BUY YOUR TICKET HERE')}</p>
                                            </div>
                                            <form className="row" onSubmit={handleSubmit}>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="selectFromLocation" onChange={handleStyleType}>
                                                        <div>
                                                            <input
                                                                id="outlined-basic"
                                                                placeholder="Departure City"
                                                                variant="outlined"
                                                                onChange={handleSource}
                                                                value={source}
                                                                name="source"
                                                                onKeyPress={(e) => {
                                                                    if (e.key.match(/[0-9]/)) {
                                                                        e.preventDefault();
                                                                    }

                                                                }}
                                                                inputProps={{ maxLength: 20 }}
                                                            />
                                                            <div className='result_list1 fromInput'  >
                                                                {Array.isArray(suggestion) && suggestion.map((info) => (
                                                                    <ul key={info._id}>
                                                                        <li
                                                                            onClick={() => handleSuggestionClick(info.stopName)}
                                                                        >
                                                                            {info.stopName}
                                                                        </li>
                                                                    </ul>
                                                                ))}
                                                            </div>


                                                            {errors.source && <div className="text-danger">{errors.source}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="selectToLocation">
                                                        <div>
                                                            <input
                                                                id="outlined-basic"
                                                                placeholder='Arrival City'
                                                                variant="outlined"
                                                                onChange={handleDestination}
                                                                value={destination}
                                                                name="destination"
                                                                style={{ "position": "relative" }}
                                                                onKeyPress={(e) => {
                                                                    if (e.key.match(/[0-9]/)) {
                                                                        e.preventDefault();
                                                                    }

                                                                }}
                                                                inputProps={{ maxLength: 20 }}

                                                            />

                                                            <div className='result_list1 fromInput' >
                                                                {Array.isArray(destinationSuggestion) && destinationSuggestion.map((info) => (
                                                                    <ul key={info._id}>
                                                                        <li
                                                                            onClick={() => handleSuggestionClick1(info.stopName)}
                                                                        >
                                                                            {info.stopName}
                                                                        </li>
                                                                    </ul>
                                                                ))}
                                                            </div>

                                                        </div>
                                                        {errors.destination && <div className="text-danger">{errors.destination}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="selectDate">
                                                        <TextField
                                                            id="outlined-size-small"
                                                            variant="outlined"
                                                            size="small"
                                                            type='date'
                                                            sx={{ width: 200 }}
                                                            onChange={(e) => setDate(e.target.value)}
                                                            value={date}
                                                            name="date"
                                                            inputProps={{ min: minDate }}
                                                            style={{ "backgroundColor": "transparent", "minHeight": "44px" }}
                                                        />
                                                    </div>
                                                    {errors.date && <div className="text-danger">{errors.date}</div>}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div>
                                                        <button
                                                            onclick="window.open('bus_tickets.html')"
                                                            className="bookTicketBtn"
                                                        >
                                                           {t('Search Buses')}{" "}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact_via">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="phone_img">
                                        <img src={phone}  alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="phone_content">
                                        <h6>Phone:</h6>
                                        <p>+237 233363755 / 233028183</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="phone_img">
                                        <img src={map} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="phone_content">
                                        <h6>Address:</h6>
                                        <p>Bamenda, Opposite PMI Mile 2 Nkwen</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="phone_img">
                                        <img src={email}  alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="phone_content">
                                        <h6>E-mail:</h6>
                                        <p>moc.mazemruoma@tcatnoc</p>
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
