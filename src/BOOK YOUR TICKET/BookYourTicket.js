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
<<<<<<< HEAD
import DatePicker, { DateObject } from 'react-multi-date-picker';
import i18n from 'i18next';
export default function BookYourTicket() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
=======
import i18n from 'i18next';
export default function BookYourTicket() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
>>>>>>> origin/master
    const [source, setSource] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
<<<<<<< HEAD
    const [color, setcolor] = useState("")
    const today = new Date();
    const dropdownRef = useRef(null);
    const dropdestination = useRef(null);
    const carousel = useRef(null);

    useEffect(() => {
        initFlickity();
    }, []);

    async function initFlickity() {
        if (carousel.current) {
            const Flickity = (await import('flickity')).default;
            new Flickity(carousel.current, {
                cellAlign: 'left',
                contain: true,
                prevNextButtons: true,
                lazyLoad: true,
                wrapAround: true,
                autoPlay: 3000,
                pageDots: false,
            });
        }
    }


    const minDate = today.toISOString().split('T')[0];
    const handleStyleType = () => {

=======
    const today = new Date();
    const [color, setcolor] = useState("")
    const minDate = today.toISOString().split('T')[0];
    const handleStyleType = () => {
        console.log("handleStyleType is called");
>>>>>>> origin/master
        setcolor({
            height: '300px'
        });
    }
<<<<<<< HEAD

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Click occurred outside the dropdown, close it
                setSuggestion([]);
                setDestinationSuggestion([])
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup the event listener when the component is unmounted
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdestination.current && !dropdestination.current.contains(event.target)) {
                // Click occurred outside the dropdown, close it
                setSuggestion([]);
                setDestinationSuggestion([])
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup the event listener when the component is unmounted
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);



    const validateValues = () => {
        let errors = {};
        if (!source) {
            errors.source = t("Departure City is required");
        } else if (!/^[A-Za-z ]{1,20}$/.test(source)) {
            errors.source = t("Source must contain only alphabets");
        }
        if (!destination) {
            errors.destination = t("Arrival City is required");
        } else if (!/^[A-Za-z ]{1,20}$/.test(destination)) {
            errors.destination = t("Destination must contain only alphabets");
        }
        if (!date) {
            errors.date = t("Date is required");
=======
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
>>>>>>> origin/master
        }

        return errors;
    };
<<<<<<< HEAD
    const isTextOnly = (text) => {
        const textPattern = /^[A-Za-z\s]+$/; // Regular expression for text-only (letters and spaces)
        return textPattern.test(text);
    };

=======
>>>>>>> origin/master
    const handleSource = (e) => {
        setSource(e.target.value);

        setErrors({ ...errors, source: "" })
        axios.get(`${BaseUrl}allStops`, {
            params: { source: e.target.value }
        }).then((response) => {
<<<<<<< HEAD
            // console.log(response.data.stop_details);
=======
            console.log(response.data.stop_details);
>>>>>>> origin/master
            const typeData = response.data.stop_details;

            const result = typeData.filter((item) => {
                return item && item.stopName &&
                    item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
            });
<<<<<<< HEAD
            // console.log(result);
=======
            console.log(result);
>>>>>>> origin/master

            setSuggestion(result);
        }).catch((error) => {

            console.log(error);


        });



    }
<<<<<<< HEAD

=======
>>>>>>> origin/master
    const handleSuggestionClick = (suggestion) => {
        setSource(suggestion);
        setSelectedSuggestion(suggestion);
        setSuggestion([]);
<<<<<<< HEAD
    };

    const [destination, setDestination] = useState("");
    const [destinationSuggestion, setDestinationSuggestion] = useState([]);
    const [selectedSuggestion1, setSelectedSuggestion1] = useState(null);

=======
    }
    const [destination, setDestination] = useState("");
    const [destinationSuggestion, setDestinationSuggestion] = useState([]);
    const [selectedSuggestion1, setSelectedSuggestion1] = useState(null);
>>>>>>> origin/master
    const handleDestination = (e) => {
        setDestination(e.target.value);

        setErrors({ ...errors, destination: "" });
        axios.get(`${BaseUrl}allStops`, {
            params: { destination: e.target.value }
        }).then((response) => {
<<<<<<< HEAD
            // console.log(response.data.stop_details);
=======
            console.log(response.data.stop_details);
>>>>>>> origin/master
            const typeData = response.data.stop_details;

            const result = typeData.filter((item) => {
                return item && item.stopName &&
                    item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
            });
<<<<<<< HEAD
            // console.log(result);
=======
            console.log(result);
>>>>>>> origin/master
            setDestinationSuggestion(result)

        }).catch((error) => {
            console.log(error);
        });


    }
<<<<<<< HEAD

=======
>>>>>>> origin/master
    const handleSuggestionClick1 = (destinationSuggestion) => {
        setDestination(destinationSuggestion);
        setSelectedSuggestion1(destinationSuggestion);
        setDestinationSuggestion([]);
    };
<<<<<<< HEAD

    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));


=======
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
>>>>>>> origin/master
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

<<<<<<< HEAD
                    navigate('/SearchBus', { state: { data: response.data.trips, sourceType: source, destinationType: destination, date: date } });
=======
                    navigate('/SearchBus', { state: { data: response.data.trips, sourceType: source, destinationType: destination } });
>>>>>>> origin/master
                } else {
                    alert(response?.message);
                }
            }).catch((error) => {
<<<<<<< HEAD
                swal.fire(t("No matching trips found for the selected date"));
=======
                swal.fire("No matching trips found for the selected date");
>>>>>>> origin/master
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
<<<<<<< HEAD
    const [selectedOption, setSelectedOption] = useState('oneway');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

    };
    console.log(selectedOption)
    localStorage.setItem("SetTripstatus", selectedOption)
    localStorage.setItem("source", source);
    localStorage.setItem('destination', destination);

    const [dateRange, setDateRange] = useState([null, null]);
    const startDate = dateRange[0]?.format('YYYY-MM-DD');
    const endDate = dateRange[1]?.format('YYYY-MM-DD');
    console.log(startDate, endDate)
    const handleRoundTripData = (e) => {
        e.preventDefault();
        const validationErrors = validateValues();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post(`${BaseUrl}RoundTrip`, {
                sourceStop: source,
                destinationStop: destination,
                date: startDate,
                returnDate: endDate
            }).then((response) => {
                console.log(response)
                setSubmitting(true);
                if (response?.status === 200) {

                    navigate('/RoundTrip', { state: { data: response.data, sourceType: source, destinationType: destination, date: startDate } });
                } else {
                    alert(response?.message);
                }
            }).catch((error) => {
                swal.fire(t("No matching trips found for the selected date"));
                console.log(error);
            })
        } else {
            setErrors(validationErrors);
        }

    }

=======
    localStorage.setItem("source", source);
    localStorage.setItem('destination', destination);
>>>>>>> origin/master
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
<<<<<<< HEAD
                                    <div className="col-lg-4">
                                        <div className="callNowSection">
                                            <h3>{t('Call Now!')}</h3>
                                            <div className="callNow">
                                                <a className="callIcon" href="tel:+237677632545" >
                                                    <LocalPhoneIcon className="material-icons" />
                                                </a>
                                                <div className="callText">
                                                    <label>{t('Call for detail information')}</label>
                                                    <h2>+237 6 77 63 25 45</h2>
=======
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
>>>>>>> origin/master
                                                </div>
                                            </div>
                                        </div>
                                    </div>
<<<<<<< HEAD

                                    <div className="col-lg-8">
                                        <div className="onlineBooking">
                                            <form>
                                                <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav_triplink active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                                            <input
                                                                type='radio'
                                                                id='oneway'
                                                                name='trip'
                                                                value="oneway"
                                                                checked={selectedOption === 'oneway'}
                                                                onChange={handleOptionChange}
                                                            />
                                                            <label className='px-2' for="oneway">{t('One Way')}</label>
                                                        </button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav_triplink" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                                            <input
                                                                type='radio'
                                                                id='roundtrip'
                                                                name='trip'
                                                                value="roundtrip"
                                                                checked={selectedOption === 'roundtrip'}
                                                                onChange={handleOptionChange}
                                                            />
                                                            <label className='ps-2' for="roundtrip">{t('Round Trip')}</label>
                                                        </button>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                                        <div className='row'>
                                                            <div className='col-md-7'>
                                                                <div className='row'>
                                                                    <div className='col-md-6'>
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
                                                                                <div className='result_list1 fromInput' ref={dropdownRef} >
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
                                                                    <div className='col-md-6'>
                                                                        <div className="selectToLocation">
                                                                            <div>
                                                                                <input
                                                                                    id="outlined-basic"
                                                                                    placeholder={t('Arrival City')}
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

                                                                                <div className='result_list1 fromInput' ref={dropdestination}>
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
                                                                </div>
                                                            </div>
                                                            <div className='col-md-5'>
                                                                <div className="selectDate">
                                                                    <TextField
                                                                        id="outlined-size-small"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        type='date'
                                                                        sx={{
                                                                            width: '100%',
                                                                            backgroundColor: 'transparent',
                                                                            minHeight: 35,
                                                                            '& input': {
                                                                                backgroundColor: 'transparent'
                                                                            }
                                                                        }}
                                                                        onChange={(e) => setDate(e.target.value)}
                                                                        value={date}
                                                                        name="date"
                                                                        inputProps={{ min: minDate }}
                                                                        style={{ "backgroundColor": "transparent", "minHeight": "44px" }}
                                                                    />
                                                                </div>
                                                                {errors.date && <div className="text-danger">{errors.date}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="bookBusBtn">
                                                                <button type="submit" className="bookTicketBtn" onClick={handleSubmit}>
                                                                    {t('Search Buses')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                                        <div className='row'>
                                                            <div className='col-md-7'>
                                                                <div className='row'>
                                                                    <div className='col-md-6'>
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
                                                                                <div className='result_list1 fromInput' ref={dropdownRef} >
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
                                                                    <div className='col-md-6'>
                                                                        <div className="selectToLocation">
                                                                            <div>
                                                                                <input
                                                                                    id="outlined-basic"
                                                                                    placeholder={t('Arrival City')}
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
                                                                                <div className='result_list1 fromInput' ref={dropdestination}>
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
                                                                </div>
                                                            </div>
                                                            <div className='col-md-5'>
                                                                <div>
                                                                    {/* <div className="selectDate">
                                <TextField
                                  id="outlined-size-small"
                                  variant="outlined"
                                  size="small"
                                  type='date'
                                  sx={{
                                    width: '100%',
                                    backgroundColor: 'transparent',
                                    minHeight: 35,
                                    '& input': {
                                      backgroundColor: 'transparent'
                                    }
                                  }}
                                  onChange={(e) => setDate(e.target.value)}
                                  value={date}
                                  name="date"
                                  inputProps={{ min: minDate }}
                                  style={{ "backgroundColor": "transparent", "minHeight": "44px" }}
                                />
                              </div> */}
                                                                    <div className='date_pick'>
                                                                        <DatePicker
                                                                            value={dateRange}
                                                                            format="MM/DD/YYYY"
                                                                            placeholder="MM/DD/YYYY ~ MM/DD/YYYY"
                                                                            onChange={setDateRange}
                                                                            range
                                                                            numberOfMonths={2}
                                                                        />
                                                                    </div>
                                                                    {errors.date && <div className="text-danger">{errors.date}</div>}
                                                                    <p style={{ "color": "#6d01a7" }}>{t('5% of discount will be applied')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="bookBusBtn">
                                                                <button type="submit" className="bookTicketBtn" onClick={handleRoundTripData}>
                                                                    {t('Search Buses')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div class="bookimg_Details justify-content-between">
                      <div className='d-flex align-items-center'>
                        <div class="bookimg">
                          <AccountBalanceWalletIcon />
                        </div>
                        <p class="ps-4">{t('BUY YOUR TICKET HERE')}</p>
                      </div>
                    </div> */}

=======
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
>>>>>>> origin/master
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
<<<<<<< HEAD
                                        <img src={phone} alt="" />
=======
                                        <img src={phone}  alt="" />
>>>>>>> origin/master
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
<<<<<<< HEAD
                                        <img src={email} alt="" />
=======
                                        <img src={email}  alt="" />
>>>>>>> origin/master
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
