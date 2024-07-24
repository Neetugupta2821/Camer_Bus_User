import React, { useEffect, useState, useRef } from 'react';
import busImg from '../image/busImg.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { BaseUrl } from '../../Api/BaseUrl';
import swal from 'sweetalert2'
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import wellet from '../image/wallet.png'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import bus3 from '../image/bus3.jpg'
import bus6 from '../image/bus6.png'


export default function Banner() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [source, setSource] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

    setcolor({
      height: '300px'
    });
  }

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
  const isTextOnly = (text) => {
    const textPattern = /^[A-Za-z\s]+$/; // Regular expression for text-only (letters and spaces)
    return textPattern.test(text);
  };

  const handleSource = (e) => {
    setSource(e.target.value);

    setErrors({ ...errors, source: "" })
    axios.get(`${BaseUrl}allStops`, {
      params: { source: e.target.value }
    }).then((response) => {
      // console.log(response.data.stop_details);
      const typeData = response.data.stop_details;

      const result = typeData.filter((item) => {
        return item && item.stopName &&
          item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      // console.log(result);

      setSuggestion(result);
    }).catch((error) => {

      console.log(error);


    });



  }

  const handleSuggestionClick = (suggestion) => {
    setSource(suggestion);
    setSelectedSuggestion(suggestion);
    setSuggestion([]);
  };

  const [destination, setDestination] = useState("");
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [selectedSuggestion1, setSelectedSuggestion1] = useState(null);

  const handleDestination = (e) => {
    setDestination(e.target.value);

    setErrors({ ...errors, destination: "" });
    axios.get(`${BaseUrl}allStops`, {
      params: { destination: e.target.value }
    }).then((response) => {
      // console.log(response.data.stop_details);
      const typeData = response.data.stop_details;

      const result = typeData.filter((item) => {
        return item && item.stopName &&
          item.stopName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      // console.log(result);
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

          navigate('/SearchBus', { state: { data: response.data.trips, sourceType: source, destinationType: destination, date: date } });
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
      {/* <section id="bannerSec">
        <div className="heroBannerSec">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="leftSideBannertext">
                  <h1>{t('Charter With Us For An Adventure-Filled Journey')}</h1>
                  <p>
                    {t('Charter your own Adventure Bus tour to the national parks. Choose your own itinerary or let us design one for you! Hiking, camping, rafting, and more.')}
                  </p>
                  {/* <a href="#!" className="bannerBtn">
                    Start Booking <i className="fi fi-rr-arrow-up-right" />
                  </a> */}
      {/* </div>
              </div>
              <div className="col-md-6">
                <div className="rightSideBannerImg">
                  <img src={busImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      // </section> */}
      <section>
        <div className="carousel-container">
          <div ref={carousel} className="carousel w-full h-[600px] sm:w-[600px] sm:h-auto mx-auto relative"
          >
            <div class="carousel-cell sliderimg">
              <img src={bus6} class="d-block w-100" alt="..." />
              <div class="carousel-caption  leftSideBannertext">
                <h1>Charter With Us For An Adventure-Filled Journey</h1>
                <p>Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sagittis et.</p>
                <a href="our_profile.html" class="bannerBtn">Start Booking <i class="fi fi-rr-arrow-up-right"></i></a>
              </div>
            </div>
            <div class="carousel-cell sliderimg">
              <img src={bus3} class="d-block w-100" alt="..." />
              <div class="carousel-caption  leftSideBannertext">
                <h1>Charter With Us For An Adventure-Filled Journey</h1>
                <p>Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sagittis et.</p>
                <a href="our_profile.html" class="bannerBtn">Start Booking <i class="fi fi-rr-arrow-up-right"></i></a>
              </div>
            </div>
            <div class="carousel-cell sliderimg">
              <img src={bus6} class="d-block w-100" alt="..." />
              <div class="carousel-caption  leftSideBannertext">
                <h1>Charter With Us For An Adventure-Filled Journey</h1>
                <p>Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sagittis et.</p>
                <a href="our_profile.html" class="bannerBtn">Start Booking <i class="fi fi-rr-arrow-up-right"></i></a>
              </div>
            </div>
            <div class="carousel-cell sliderimg">
              <img src={bus3} class="d-block w-100" alt="..." />
              <div class="carousel-caption  leftSideBannertext">
                <h1>Charter With Us For An Adventure-Filled Journey</h1>
                <p>Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sagittis et.</p>
                <a href="our_profile.html" class="bannerBtn">Start Booking <i class="fi fi-rr-arrow-up-right"></i></a>
              </div>
            </div>
            <div class="carousel-cell sliderimg">
              <img src={bus6} class="d-block w-100" alt="..." />
              <div class="carousel-caption  leftSideBannertext">
                <h1>Charter With Us For An Adventure-Filled Journey</h1>
                <p>Luctus nisi pharetra mollis aliquet iaculis tempus potenti. Dictumst vestibulum luctus eget sit sagittis et.</p>
                <a href="our_profile.html" class="bannerBtn">Start Booking <i class="fi fi-rr-arrow-up-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="online-booking-form">
        <div className="container">
          <div className="formBgColor">
            <div className="row">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="onlineBooking">
                  <div class="bookimg_Details">
                    <div class="bookimg">
                      <AccountBalanceWalletIcon />
                    </div>
                    <p class="ps-4">{t('BUY YOUR TICKET HERE')}</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className='formbook'>
                      <div className="me-3">
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
                      <div className="me-3">
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
                      <div>
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
                    </div>
                    <div className="">
                      <div className="bookBusBtn">
                        <button type="submit" className="bookTicketBtn">
                          {t('Search Buses')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
