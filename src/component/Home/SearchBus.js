import React, { useState, useEffect } from 'react'
import Header from './Header'
import './SearchBus.css'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SellIcon from '@mui/icons-material/Sell';
import { useLocation } from 'react-router-dom';
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios';
import PassengerDetails from './PassengerDetails';
import { BaseUrl } from '../../Api/BaseUrl';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Swal from 'sweetalert2'
export default function SearchBus() {
  const { t, i18n } = useTranslation();
  const [pupup1, setpopup1] = useState(false);
  const location = useLocation()

  const source = location.state.sourceType
  const destination = location.state.destinationType
  const date = location.state.date

  const mystyle = {
    transform: "rotate(270deg)",
    color: "#b7b7b7",
    cursor: "pointer",
  };

  const getAll = location.state.data
  const [NewData, setNewDAta] = useState(getAll)
  const [sitArray, setSitArray] = useState([])
  const [Bording, setBording] = useState(true)
  const [popUp, setpopUp] = useState(false)
  const [idData, setidData] = useState("")
  const [countType, setCountType] = useState(false)
  const [drop, setdrop] = useState(false)
  const [selectedSeatsMap, setSelectedSeatsMap] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [amenitiesVisible, setAmenitiesVisible] = useState(false);
  const [activeAmenitiesIndex, setActiveAmenitiesIndex] = useState(null);
  const [BusImage, setBusImage] = useState(false)
  const [activeBusIndex, setactiveBusIndex] = useState(null);
  const [policies, setPolicies] = useState(false)
  const [activepoliciesIndex, setactivepoliciesIndex] = useState(null);
  const [util, setUtil] = useState([])



  const hansleAmenties = (index) => {
    setAmenitiesVisible(!amenitiesVisible);
    setActiveAmenitiesIndex(index);
  };

  const handleBusImage = (index) => {
    setBusImage(!BusImage)
    setactiveBusIndex(index);
  };
  const handlePoliciyType = (index) => {
    setPolicies(!policies)
    setactivepoliciesIndex(index);
  };


  const popUpType = popUp;
  // console.log(NewData)
  const id = NewData.map((info) => {
    return info.trip._id
  }
  )
  // console.log(id)
  const [isDetailsOpen, setIsDetailsOpen] = useState(Array(NewData.length).fill(false));
  const handleViewSeatsClick = (index, e, idtype) => {
    e.preventDefault()

    // Create a copy of the state array and toggle the open/close state for the clicked bus
    const updatedIsDetailsOpen = [...isDetailsOpen];
    for (let i = 0; i < updatedIsDetailsOpen.length; i++) {
      if (i !== index) {
        updatedIsDetailsOpen[i] = false;
      }
    }
    updatedIsDetailsOpen[index] = !updatedIsDetailsOpen[index];
    setIsDetailsOpen(updatedIsDetailsOpen);
    const getId = idtype;
    console.log(getId)
    const filterID = id.filter((info) => {
      return info === getId
    })
    // console.log(filterID)
    axios.post(`${BaseUrl}viewSeats`, {
      tripId: filterID
    }).then((response) => {
      console.log(response.data.Seat_Info, "get seat of trip")
      setSitArray(response.data.Seat_Info)

    }).catch((error) => {
      console.log(error, "get the errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    })
  }





  const HandeSelect = (seat, tripId) => {
    console.log(tripId)
    console.log(seat)
    // const objectLength = Object.keys(selectedSeatsMap).length;
    const objectLength = Object.keys(selectedSeatsMap).length;
    if (objectLength === 0) {
      setBording((Bording) => !Bording)
    }
    const updatedSelectedSeatsMap = { ...selectedSeatsMap };
    if (!updatedSelectedSeatsMap[tripId]) {
      updatedSelectedSeatsMap[tripId] = [];
      console.log(updatedSelectedSeatsMap, 'ppppppppppppppppppppppppppppppppppppppppp')
      // Initialize if it doesn't exist
    }
    const selectedSeatsForBus = updatedSelectedSeatsMap[tripId];
    if (seat.status === 1) {
      return; // Do nothing if the seat is not selectable
    }

    if (selectedSeatsForBus.includes(seat)) {
      updatedSelectedSeatsMap[tripId] = selectedSeatsForBus.filter(
        (selectedSeat) => selectedSeat !== seat)
    } else if (seat.status === 0) {
      updatedSelectedSeatsMap[tripId] = [...selectedSeatsForBus, seat];
    }
    setSelectedSeatsMap(updatedSelectedSeatsMap);
    console.log(selectedSeatsMap)
  }
  useEffect(() => {
    // console.log("After Selection:", selectedSeatsMap);
  }, [selectedSeatsMap])




  // Update the selectedSeatsMap state


  // Log the current selectedSeatsMap state
  console.log('Current selectedSeatsMap:', selectedSeatsMap);
  const handleDropPoint = () => {
    setBording(false)
    setdrop((drop) => !drop)
  }


  const handlshow = (id) => {
    console.log(id)
    setidData(id)
    { checked === true && (setpopUp(true)) }
    // Open the popup when countType is truthy


  }

  localStorage.setItem("NumBerOfseat", JSON.stringify(selectedSeatsMap))


  const [ActiveStops, setActiveStops] = useState([])
  const handleLivetracking = (e, id) => {
    e.preventDefault()

    setpopup1(true)
    const stopData = NewData.filter((info) => {
      return info.trip._id === id

    })
    console.log(stopData)


    const StopsActive = stopData.map((item) => {
      setActiveStops(item.trip.stops)
    });
    console.log(StopsActive, 'ssssssssssssssssssssssssssss')

  }



  const [dataArray, setdataArray] = useState([]);

  const handleChange = (e) => {
    // setisChecked(e.target.checked);
    if (e.target.checked === true) {
      setdataArray([...dataArray, e.target.value]);
    }
    else if (e.target.checked === false) {
      let freshArray = dataArray.filter(val => val !== e.target.value);
      setdataArray([...freshArray]);
    }

  }
  const [dataArray1, setdataArray1] = useState([]);

  const handleChange1 = (e) => {
    // setisChecked(e.target.checked);
    if (e.target.checked === true) {
      setdataArray1([...dataArray1, e.target.value]);
    }
    else if (e.target.checked === false) {
      let freshArray = dataArray1.filter(val => val !== e.target.value);
      setdataArray1([...freshArray]);
    }

  }

  useEffect(() => {
    // console.log(dataArray)
    // console.log(dataArray1)
    const formattedAmenities = dataArray.join(', ');
    const formattedAmenities1 = dataArray1.join(', ');
    // console.log(formattedAmenities)
    // console.log(formattedAmenities1)
    axios.post(`${BaseUrl}filter-trips`, {
      sourceStop: source,
      destinationStop: destination,
      date: date,
      busType: formattedAmenities,
      arrivalTimeRange: formattedAmenities1
    }).then((response) => {
      console.log(response.data.trips)
      setUtil(response.data.trips)
    }).catch((error) => {
      console.log(error)
      Swal.fire({
        title: "Sorry",
        text: "No matching trips found for the selected criteria!",
        icon: "success"
      });
    })
    // console.log(dataArray,dataArray1,);
    // console.log(formattedAmenities,formattedAmenities1,source,destination,date);
  }, [dataArray, dataArray1]);
  return (
    <>
      <section className="innerbanner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="innerBannerCont">
                <h2>{t('Bus Tickets')}</h2>
                <p>{t('Be comfortable while you travel with our reliable bus rental.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_bus_tickets">
        <div className="container">
          <div className="row">
            <div class="col-lg-2">
              <div>
                <h6>{t('FILTERS')}</h6>
                {/* <div class="d-flex justify-content-between">
                <div>
                  <p class="font-s mb-0 pt-1"><i class="fi fi-ss-route px-2 "></i>{t('Live Tracking')}(127)</p>
                </div>
                <div>
                  <i class="fi fi-bs-check font-s"></i>
                </div>
                </div> */}
                {/* <div>
                <h6>{t('DEPARTURE TIME')}</h6>
                <div>
                  <input type="checkbox" name="" id="before" />
                  <label for="before" class="font-s py-2"><i class="fi fi-br-sunrise px-2"></i>{t('Before 6 am ')}(41)</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="before1"   value='10:00-17:00'  />
                  <label for="before1" class="font-s py-2"> <i class="fi fi-br-brightness px-2"></i> 10:00-17:00(38)</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="before2" />
                  <label for="before2" class="font-s py-2">  12 pm to 6 pm (59)</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="before3" />
                  <label for="before3" class="font-s py-2"><i class="fi fi-sr-sunset px-2"></i>{t('After')}6 pm (35)</label>
                </div>
                </div> */}
                <div class="pt-3">
                  <h6>{t('BUS TYPES')} </h6>
                  <div>
                    <input type="checkbox" name="" id="bustype" onClick={handleChange} value='AC' />
                    <label for="bustype" class="font-s py-2 px-2">AC (126)</label>
                  </div>
                  <div>
                    <input type="checkbox" name="" id="bustype1" onClick={handleChange} value='Non-AC' />
                    <label for="bustype1" class="font-s py-2 px-2">Non-AC (74)</label>
                  </div>
                  <div>
                    <input type="checkbox" name="" id="bustype2" value='luxury' onClick={handleChange} />
                    <label for="bustype2" class="font-s py-2 px-2">{t('luxury')}(143)</label>
                  </div>
                </div>
              </div>
              <div class="pt-3 mb-5">
                <h6>{t('TIME')} </h6>
                <div className='d-flex justify-content-start align-items-baseline'>
                  <input type="checkbox" name="" id="arrival1" onClick={handleChange1} value='12:00 am - 06:00 am' />
                  <label for="arrival1" class="font-s py-2 px-2">12:00 am - 06:00 am(54)</label>
                </div>
                <div className='d-flex justify-content-start align-items-baseline'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='06:00 am - 11:00 am' />
                  <label for="arrival2" class="font-s py-2 px-2">06:00 am - 11:00 am (35)</label>
                </div>
                <div className='d-flex justify-content-start align-items-baseline'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='12:00 pm - 6:00 pm ' />
                  <label for="arrival2" class="font-s py-2 px-2">12:00 pm - 6:00 pm (35)</label>
                </div>
                <div className='d-flex justify-content-start align-items-baseline'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='06:00 pm - 11:00 pm' />
                  <label for="arrival2" class="font-s py-2 px-2">06:00 pm - 11:00 pm (35)</label>
                </div>
              </div>
            </div>
            <div className="col-lg-10 ">
              <div className="sort-results">
                <ul className="sort_section">
                  <li>
                    <div className="busFound">
                      <span className="f-bold busFound">81  {t('Buses')} </span>
                      {t('found')}
                    </div>
                    <div className="f-bold busFound ps-3">{t('SORT BY:')}</div>
                  </li>
                  <li>
                    <a>
                      {t('Departure')}
                      <i className="" />
                    </a>
                  </li>
                  <li>
                    <a>
                      {t('Duration')}
                      <i className="" />
                    </a>
                  </li>
                  <li>
                    <a>
                      {t('Arrival')}
                      <i className="" />
                    </a>
                  </li>
                  <li>
                    <a>
                      {t('Ratings')}
                      <i className="" />
                    </a>
                  </li>
                  <li>
                    <a>
                      {t('Fare')}
                      <i className="icon-down-arrow" />
                    </a>
                  </li>
                  <li>
                    <a>
                      {t('Seats Available')}
                      <i className="" />
                    </a>
                  </li>
                </ul>
                {dataArray.length === 0 && dataArray1.length === 0 ? (
                  <>
                    {Array.isArray(NewData) && NewData.map((info, index) => {
                      return (<>
                        <div className="ticketsDetails">
                          <div className="row-one">
                            <ul className="sort-sec">
                              <li className="column-one">
                                <div className="larg_font">{info.trip.bus_no}</div>
                                <div className="font-s marTop10">{info.trip.bus_type}</div>
                              </li>
                              <li className="column-two">
                                <div className="larg_font">{info.DepartureTime} </div>
                                <div className="font-s marTop44">

                                </div>
                              </li>
                              <li className="column-three  w-22">
                                <div className="fontMDtext ">hours{info.stopsDuration.hours},mintes{info.stopsDuration.minutes}</div>
                              </li>
                              <li className="column-four  w-22">
                                <div className="fontNolmal larg_font">{info.ArrivalTime}</div>
                                <div className="font-s redtext marTop10">21-Sep</div>
                                <div className="font-s">Teen Imli Rivan Travels</div>
                              </li>
                              <li className="column-five ">
                                <div className="font-s starRat">
                                  <span>
                                    {" "}
                                    <i className="material-icons">star </i> 3.6
                                  </span>
                                </div>
                              </li>
                              <li className="column-five  w-22">
                                <div className="fontMDtext">Starts from</div>
                                <div className="font-s inrPrice">
                                  INR <dl>1398 </dl> <strong>1328</strong>
                                </div>
                                <div className="font-s marTop10 saleIcon">
                                  <SellIcon />camer Travel applied

                                </div>
                              </li>
                              <li className="column-five">
                                <div className="font-s">{info.trip.Available_seat.length}</div>
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
                            <div className="liveTraking" onClick={(e) => handleLivetracking(e, info.trip._id)}>
                              <a href=" ">
                                <i><MyLocationIcon />{t('Live Tracking')}{" "}</i>
                              </a>
                            </div>
                            <div className="returnTrip">
                              <p>
                                <strong>{t('Return Trip camer Travel')}</strong>
                                :  {t('Unlock min. 10% OFF on return ticket')}
                              </p>
                            </div>
                          </div>
                          <div className="row-three mt-3">
                            <ul className="bottom-panel">
                              <li className="amenties b-p-list">
                                <span className="txt-val" onClick={(e) => hansleAmenties(index)}>{t('Amenities')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val " onClick={(e) => handleBusImage(index)}>{t('Bus Photos')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Boarding Dropping Points')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Reviews')} </span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val" onClick={(e) => handlePoliciyType(index)}>{t('Booking policies')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li>
                            </ul>
                            <div className="viewSeatsBtn">
                              {/* onClick={(e) => handlfunction(info.trip._id)} */}
                              <a href="" onClick={(e) => handleViewSeatsClick(index, e, info.trip._id)} >{t('View Seats')}</a>
                            </div>
                          </div>

                          {amenitiesVisible && activeAmenitiesIndex === index && (<div class="Supported" id="Supported">
                            <div class="container-fluid">
                              <div class="row">
                                <div class="col-lg-10">
                                  <div class="local_activityicons">
                                    <div>
                                      <p><i class="fi fi-rs-ticket-alt"></i>{info.trip.amenities}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>)}
                          {BusImage && activeBusIndex === index && (<div id="carouselbus" class="carouselbus">
                            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                  <img src="assets\images\bus1.jpg" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                  <img src="assets\images\bus2.jpg" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                  <img src="assets\images\bus3.jpg" class="d-block w-100" alt="..." />
                                </div>
                              </div>
                              <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                              </button>
                            </div>
                          </div>)}
                          {policies && activepoliciesIndex === index && (<>
                            {/* Hello world */}
                            <div className="bookingPolicies" id="bookingPolicies">
                              <h5 className="pb-3">Travel Related Policies</h5>
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-rr-woman-head" />
                                </div>
                                <div>
                                  <h6>Child passenger policy</h6>
                                  <p className="font-s mb-0">
                                    Children above the age of 6 will need a ticket
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-ss-luggage-rolling" />
                                </div>
                                <div>
                                  <h6>Luggage policy</h6>
                                  <p className="font-s mb-0">
                                    2 pieces of luggage will be accepted free of charge per passenger.
                                    Excess items will be chargeable Excess baggage over 20 kgs per
                                    passenger will be chargeable
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-br-paw" />
                                </div>
                                <div>
                                  <h6>Pets Policy</h6>
                                  <p className="font-s mb-0">Pets are not allowed</p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-rr-bottle" />
                                </div>
                                <div>
                                  <h6>Liquor Policy</h6>
                                  <p className="font-s mb-0">
                                    Carrying or consuming liquor inside the bus is prohibited. Bus
                                    operator reserves the right to deboard drunk passengers.
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-ss-bus" />
                                </div>
                                <div>
                                  <h6>Pick up time policy</h6>
                                  <p className="font-s mb-0">
                                    Bus operator is not obligated to wait beyond the scheduled departure
                                    time of the bus. No refund request will be entertained for late
                                    arriving passengers.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                          )}
                          {isDetailsOpen[index] && (<div id={`my-hidden-element-${index}`} className="openMoreDetails hidden">
                            <div className="seatPrice">

                              <a onClick={(e) => handleViewSeatsClick(index, e, info.trip._id)} className="closeBtn">
                                <Button> <span className="material-icons" variant="outlined">{t('close')}</span></Button>
                              </a>
                            </div>

                            <div className="selectSheatsSec">
                              <div className="row justify-content-between">
                                <div className="col-md-4">
                                  <div className="tab-content" id="pills-tabContent">
                                    <div
                                      className="tab-pane fade show active"
                                      id="pills-home"
                                      role="tabpanel"
                                      aria-labelledby="pills-home-tab"
                                    >
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="mainbusbg">
                                              <div className="driveSeat">
                                                <i className="fi fi-br-steering-wheel" />
                                              </div>

                                              <div className="seatingSpace">
                                                <div className="d-flex justify-content-between">
                                                  <div className="contucteur">
                                                    <span>CONDUCTEUR</span>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div> <span className="material-icons"><abbr title={`Seat:${sitArray[1]?.seat} | ${sitArray[1]?.seatType}`}
                                                    >{sitArray[1]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                      HandeSelect(sitArray[1], info.trip._id)
                                                    }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[1]) ? 'selected' : ''
                                                      }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>

                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[0]?.seat} | ${sitArray[0]?.seatType}`}>{sitArray[0]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[0], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[0]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[6]?.seat} | ${sitArray[6]?.seatType}`}>{sitArray[6]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[6], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[6]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[5]?.seat} | ${sitArray[5]?.seatType}`}>{sitArray[5]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[5], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[5]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[4]?.seat} | ${sitArray[4]?.seatType}`}>{sitArray[4]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[4], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[4]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[3]?.seat} | ${sitArray[3]?.seatType}`}>{sitArray[3]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[3], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[3]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[2]?.seat} | ${sitArray[2]?.seatType}`}>{sitArray[2]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[2], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[2]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[11]?.seat} | ${sitArray[11]?.seatType}`}>{sitArray[11]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[11], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[11]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[10]?.seat} | ${sitArray[10]?.seatType}`}>{sitArray[10]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[10], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[10]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[9]?.seat} | ${sitArray[9]?.seatType}`}>{sitArray[9]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[9], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[9]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[8]?.seat} | ${sitArray[8]?.seatType}`}>{sitArray[8]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[8], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[8]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[7]?.seat} | ${sitArray[7]?.seatType}`}>{sitArray[7]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[7], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[7]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[14]?.seat} | ${sitArray[14]?.seatType}`}>{sitArray[14]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[14], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[14]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[13]?.seat} | ${sitArray[13]?.seatType}`}>{sitArray[13]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[13], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[13]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons" style={{ color: "red" }}>
                                                        {" "}
                                                        <abbr title={`Seat:${sitArray[12]?.seat} | ${sitArray[12]?.seatType}`}>  <ChairIcon htmlColor="red" /></abbr>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div className="contucteur">
                                                      <span className="m-0">ENTRY</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[19]?.seat} | ${sitArray[19]?.seatType}`}>{sitArray[19]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[19], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[19]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[18]?.seat} | ${sitArray[18]?.seatType}`}>{sitArray[18]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[18], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[18]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[17]?.seat} | ${sitArray[17]?.seatType}`}>{sitArray[17]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[17], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[17]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[16]?.seat} | ${sitArray[16]?.seatType}`}>{sitArray[16]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[16], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[16]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[15]?.seat} | ${sitArray[15]?.seatType}`}>{sitArray[15]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[15], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[15]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[24]?.seat} | ${sitArray[24]?.seatType}`}>{sitArray[24]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[24], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[24]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[23]?.seat} | ${sitArray[23]?.seatType}`}>{sitArray[23]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[23], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[23]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[22]?.seat} | ${sitArray[22]?.seatType}`}>{sitArray[22]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[22], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[22]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[21]?.seat} | ${sitArray[21]?.seatType}`}>{sitArray[21]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[21], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[21]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[20]?.seat} | ${sitArray[20]?.seatType}`}>{sitArray[20]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[20], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[20]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[29]?.seat} | ${sitArray[29]?.seatType}`}>{sitArray[29]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[29], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[29]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[28]?.seat} | ${sitArray[28]?.seatType}`}>{sitArray[28]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[28], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[28]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[27]?.seat} | ${sitArray[27]?.seatType}`}>{sitArray[27]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[27], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[27]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[26]?.seat} | ${sitArray[26]?.seatType}`}>{sitArray[26]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[26], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[26]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[25]?.seat} | ${sitArray[25]?.seatType}`}>{sitArray[25]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[25], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[25]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[34]?.seat} | ${sitArray[34]?.seatType}`}>{sitArray[34]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[34], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[34]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[33]?.seat} | ${sitArray[33]?.seatType}`}>{sitArray[33]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[33], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[33]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[32]?.seat} | ${sitArray[32]?.seatType}`}>{sitArray[32]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[32], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[32]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[31]?.seat} | ${sitArray[31]?.seatType}`}>{sitArray[31]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[31], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[31]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[30]?.seat} | ${sitArray[30]?.seatType}`}>{sitArray[30]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[30], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[30]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[39]?.seat} | ${sitArray[39]?.seatType}`}>{sitArray[39]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[39], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[39]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[38]?.seat} | ${sitArray[38]?.seatType}`}>{sitArray[38]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[38], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[38]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[37]?.seat} | ${sitArray[37]?.seatType}`}>{sitArray[37]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[37], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[37]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[36]?.seat} | ${sitArray[36]?.seatType}`}>{sitArray[36]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[36], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[36]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[35]?.seat} | ${sitArray[35]?.seatType}`}>{sitArray[35]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[35], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[35]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[44]?.seat} | ${sitArray[44]?.seatType}`}>{sitArray[44]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[44], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[44]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[43]?.seat} | ${sitArray[43]?.seatType}`}>{sitArray[43]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[43], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[43]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[42]?.seat} | ${sitArray[42]?.seatType}`}>{sitArray[42]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[42], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[42]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[41]?.seat} | ${sitArray[41]?.seatType}`}>{sitArray[41]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[41], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[41]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[40]?.seat} | ${sitArray[40]?.seatType}`}>{sitArray[40]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[40], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[40]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[49]?.seat} | ${sitArray[49]?.seatType}`}>{sitArray[49]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[49], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[49]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[48]?.seat} | ${sitArray[48]?.seatType}`}>{sitArray[48]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[48]?.seat, info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[48]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[47]?.seat} | ${sitArray[47]?.seatType}`}>{sitArray[47]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[47], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[47]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[46]?.seat} | ${sitArray[46]?.seatType}`}>{sitArray[46]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[46], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[46]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[45]?.seat} | ${sitArray[45]?.seatType}`}>{sitArray[45]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[45], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[45]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[54]?.seat} | ${sitArray[54]?.seatType}`}>{sitArray[54]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[54], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[54]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[53]?.seat} | ${sitArray[53]?.seatType}`}>{sitArray[53]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[53], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[53]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[52]?.seat} | ${sitArray[52]?.seatType}`}>{sitArray[52]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[52], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[52]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[51]?.seat} | ${sitArray[51]?.seatType}`}>{sitArray[51]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[51], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[51]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[50]?.seat} | ${sitArray[50]?.seatType}`}>{sitArray[50]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[50], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[50]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[57]?.seat} | ${sitArray[57]?.seatType}`}>{sitArray[57]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[57], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[57]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[56]?.seat} | ${sitArray[56]?.seatType}`}>{sitArray[56]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[56], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[56]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[55]?.seat} | ${sitArray[55]?.seatType}`}>{sitArray[55]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[55], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[55]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div className="contucteur">
                                                      <span className="m-0">ENTRY</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[62]?.seat} | ${sitArray[62]?.seatType}`}>{sitArray[62]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[62], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[62]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[61]?.seat} | ${sitArray[61]?.seatType}`}>{sitArray[61]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[61], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[61]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[60]?.seat} | ${sitArray[60]?.seatType}`}>{sitArray[60]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[60], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[60]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[59]?.seat} | ${sitArray[59]?.seatType}`}>{sitArray[59]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[59], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[59]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[58]?.seat} | ${sitArray[58]?.seatType}`}>{sitArray[58]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[58], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[58]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[68]?.seat} | ${sitArray[68]?.seatType}`}>{sitArray[68]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[68], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[68]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[67]?.seat} | ${sitArray[67]?.seatType}`}>{sitArray[67]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[67], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[67]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[66]?.seat} | ${sitArray[66]?.seatType}`}>{sitArray[66]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[66], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[66]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[65]?.seat} | ${sitArray[65]?.seatType}`}>{sitArray[65]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[65], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[65]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[64]?.seat} | ${sitArray[64]?.seatType}`}>{sitArray[64]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[64], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[64]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[63]?.seat} | ${sitArray[63]?.seatType}`}>{sitArray[63]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[63], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[63]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                                <div className="col-md-4">
                                  {Bording ? (<div className="seatLagent myDiv">
                                    <form className="row availableCheckbox">
                                      <h5>{t('Seat Lagent')}</h5>
                                      <div className="col-md-4 form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="Available"
                                          style={{ "backgroundColor": "green" }}
                                        />
                                        <label className="form-check-label" htmlFor="Available">
                                          {t('Available')}
                                        </label>
                                      </div>
                                      <div className="col-md-4 form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="Unavailable"
                                          style={{ "backgroundColor": "red" }}
                                        />
                                        <label className="form-check-label" htmlFor="Unavailable">
                                          {t('Unavailable')}
                                        </label>
                                      </div>
                                    </form>
                                  </div>) : (
                                    <div className="tabPopup myDiv">
                                      <div className="boardingAndDropPoint hideboarddrop">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                          <li className="nav-item" role="presentation">
                                            <button
                                              className="nav-link active"
                                              id="boarding_point"
                                              data-bs-toggle="pill"
                                              data-bs-target="#boarding"
                                              type="button"
                                              role="tab"
                                              aria-controls="boarding"
                                              aria-selected="true"
                                            >
                                              {t('Boarding Point')}
                                            </button>
                                          </li>
                                          <li className="nav-item" role="presentation">
                                            <button
                                              className="nav-link"
                                              id="dropping_point"
                                              data-bs-toggle="pill"
                                              data-bs-target="#dropping"
                                              type="button"
                                              role="tab"
                                              aria-controls="dropping"
                                              aria-selected="false"
                                            >
                                              {t('Dropping Point')}
                                            </button>
                                          </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                          <div
                                            className="tab-pane fade show active"
                                            id="boarding"
                                            role="tabpanel"
                                            aria-labelledby="boarding_point"
                                          >
                                            <div className="radioButton">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  name="flexRadioDefault"
                                                  id="Station1"
                                                  onClick={handleDropPoint}
                                                />
                                                <label className="form-check-label" htmlFor="Station1">
                                                  <span className="startTime">
                                                    <strong>{info.trip.startingTime}</strong>
                                                  </span>
                                                  <span>
                                                    <h5>{source}</h5>

                                                  </span>
                                                </label>
                                              </div>

                                            </div>
                                            <div className="bottomPrice">
                                              <div className="duringpayment">
                                                <span className="amountTaxes">
                                                  <b style={{ "color": "black" }}>{t('selected seat')}
                                                  </b>{Array.isArray(selectedSeatsMap[info.trip._id]) &&
                                                    selectedSeatsMap[info.trip._id].map((info, index) => (
                                                      <small key={index} style={{ "color": "black" }}> <React.Fragment key={index}>
                                                        {index > 0 && ', '}
                                                        {info.seat}
                                                      </React.Fragment></small>
                                                    ))
                                                  }
                                                </span>
                                                <span className="inrprice"> </span>
                                              </div>
                                            </div>
                                          </div>
                                          {drop ? (<div
                                            className=" "
                                            id="dropping"
                                            role="tabpanel"
                                            aria-labelledby="dropping_point"
                                          >


                                            <div className="radioButton">
                                              <p className="single_dropping">
                                                {t('*This bus has a single dropping point')}
                                              </p>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  name="flexRadioDefault"
                                                  id="dropping1"
                                                  defaultChecked={checked}
                                                  onChange={() => setChecked((state) => !state)}

                                                />
                                                <label className="form-check-label" htmlFor="dropping1">
                                                  <span className="startTime">
                                                    <strong>04:00</strong>
                                                  </span>
                                                  <span>
                                                    <h5>{destination}</h5>
                                                    <p>

                                                    </p>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="bottomPrice">
                                              <div className="duringpayment">
                                                <span className="amountTaxes">
                                                  {t('Amount')}{" "}
                                                  <small>{t('(Taxes will be calculated during payment)')} </small>
                                                </span>
                                                <span className="inrprice"></span>
                                              </div>
                                              <button className="continueBtn continueGoproseed" onClick={(e) => handlshow(info.trip._id)}>
                                                {t('Continue')}
                                              </button>
                                            </div>
                                          </div>) : ""}


                                        </div>
                                      </div>

                                    </div>)}


                                  {/*End off tabPopup */}
                                </div>
                              </div>
                            </div>
                          </div>)}
                        </div>
                      </>)

                    })}

                  </>) : (
                  <>
                    {Array.isArray(util) && util.map((info, index) => {
                      return (<>
                        <div className="ticketsDetails">
                          <div className="row-one">
                            <ul className="sort-sec">
                              <li className="column-one w-22">
                                <div className="larg_font">{info.trip.bus_no}</div>
                                <div className="font-s marTop10">{info.trip.bus_type}</div>
                              </li>
                              <li className="column-two">
                                <div className="larg_font">{info.DepartureTime}</div>
                                <div className="font-s marTop44">

                                </div>
                              </li>
                              <li className="column-three">
                                <div className="fontMDtext ">hours{info.stopsDuration.hours},mintes{info.stopsDuration.minutes} </div>
                              </li>
                              <li className="column-four">
                                <div className="fontNolmal larg_font">{info.ArrivalTime}</div>
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
                                  INR <dl>1398 </dl> <strong>1328</strong>
                                </div>
                                <div className="font-s marTop10 saleIcon">
                                  <SellIcon />camer Travel applied

                                </div>
                              </li>
                              <li className="column-five">
                                <div className="font-s">{info.trip.Available_seat.length}</div>
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
                            <div className="liveTraking" onClick={(e) => handleLivetracking(e, info.trip._id)}>
                              <a href=" ">
                                <i><MyLocationIcon />{t('Live Tracking')}{" "}</i>
                              </a>
                            </div>
                            <div className="returnTrip">
                              <p>
                                <strong>{t('Return Trip camer Travel')}</strong>
                                :  {t('Unlock min. 10% OFF on return ticket')}
                              </p>
                            </div>
                          </div>
                          <div className="row-three mt-3">
                            <ul className="bottom-panel">
                              <li className="amenties b-p-list">
                                <span className="txt-val" onClick={(e) => hansleAmenties(index)}>{t('Amenities')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val " onClick={(e) => handleBusImage(index)}>{t('Bus Photos')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Boarding Dropping Points')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Reviews')} </span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val" onClick={(e) => handlePoliciyType(index)}>{t('Booking policies')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li>
                            </ul>
                            <div className="viewSeatsBtn">
                              {/* onClick={(e) => handlfunction(info.trip._id)} */}
                              <a href="" onClick={(e) => handleViewSeatsClick(index, e, info.trip._id)} >{t('View Seats')}</a>
                            </div>
                          </div>

                          {amenitiesVisible && activeAmenitiesIndex === index && (<div class="Supported" id="Supported">
                            <div class="container-fluid">
                              <div class="row">
                                <div class="col-lg-10">
                                  <div class="local_activityicons">
                                    <div>
                                      <p><i class="fi fi-rs-ticket-alt"></i>{info.trip.amenities}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>)}
                          {BusImage && activeBusIndex === index && (<div id="carouselbus" class="carouselbus">
                            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-inner">
                                <div class="carousel-item active">
                                  <img src="assets\images\bus1.jpg" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                  <img src="assets\images\bus2.jpg" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                  <img src="assets\images\bus3.jpg" class="d-block w-100" alt="..." />
                                </div>
                              </div>
                              <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                              </button>
                            </div>
                          </div>)}
                          {policies && activepoliciesIndex === index && (<>
                            {/* Hello world */}
                            <div className="bookingPolicies" id="bookingPolicies">
                              <h5 className="pb-3">Travel Related Policies</h5>
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-rr-woman-head" />
                                </div>
                                <div>
                                  <h6>Child passenger policy</h6>
                                  <p className="font-s mb-0">
                                    Children above the age of 6 will need a ticket
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-ss-luggage-rolling" />
                                </div>
                                <div>
                                  <h6>Luggage policy</h6>
                                  <p className="font-s mb-0">
                                    2 pieces of luggage will be accepted free of charge per passenger.
                                    Excess items will be chargeable Excess baggage over 20 kgs per
                                    passenger will be chargeable
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-br-paw" />
                                </div>
                                <div>
                                  <h6>Pets Policy</h6>
                                  <p className="font-s mb-0">Pets are not allowed</p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-rr-bottle" />
                                </div>
                                <div>
                                  <h6>Liquor Policy</h6>
                                  <p className="font-s mb-0">
                                    Carrying or consuming liquor inside the bus is prohibited. Bus
                                    operator reserves the right to deboard drunk passengers.
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center">
                                <div className="policyicon">
                                  <i className="fi fi-ss-bus" />
                                </div>
                                <div>
                                  <h6>Pick up time policy</h6>
                                  <p className="font-s mb-0">
                                    Bus operator is not obligated to wait beyond the scheduled departure
                                    time of the bus. No refund request will be entertained for late
                                    arriving passengers.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                          )}
                          {isDetailsOpen[index] && (<div id={`my-hidden-element-${index}`} className="openMoreDetails hidden">
                            <div className="seatPrice">

                              <a onClick={(e) => handleViewSeatsClick(index, e, info.trip._id)} className="closeBtn">
                                <Button> <span className="material-icons" variant="outlined">{t('close')}</span></Button>
                              </a>
                            </div>

                            <div className="selectSheatsSec">
                              <div className="row justify-content-between">
                                <div className="col-md-4">
                                  <div className="tab-content" id="pills-tabContent">
                                    <div
                                      className="tab-pane fade show active"
                                      id="pills-home"
                                      role="tabpanel"
                                      aria-labelledby="pills-home-tab"
                                    >
                                      <div className="container">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="mainbusbg">
                                              <div className="driveSeat">
                                                <i className="fi fi-br-steering-wheel" />
                                              </div>

                                              <div className="seatingSpace">
                                                <div className="d-flex justify-content-between">
                                                  <div className="contucteur">
                                                    <span>CONDUCTEUR</span>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div> <span className="material-icons"><abbr title={`Seat:${sitArray[1]?.seat} | ${sitArray[1]?.seatType}`}
                                                    >{sitArray[1]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                      HandeSelect(sitArray[1], info.trip._id)
                                                    }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[1]) ? 'selected' : ''
                                                      }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>

                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[0]?.seat} | ${sitArray[0]?.seatType}`}>{sitArray[0]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[0], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[0]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[6]?.seat} | ${sitArray[6]?.seatType}`}>{sitArray[6]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[6], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[6]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[5]?.seat} | ${sitArray[5]?.seatType}`}>{sitArray[5]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[5], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[5]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[4]?.seat} | ${sitArray[4]?.seatType}`}>{sitArray[4]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[4], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[4]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[3]?.seat} | ${sitArray[3]?.seatType}`}>{sitArray[3]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[3], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[3]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[2]?.seat} | ${sitArray[2]?.seatType}`}>{sitArray[2]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[2], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[2]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[11]?.seat} | ${sitArray[11]?.seatType}`}>{sitArray[11]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[11], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[11]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[10]?.seat} | ${sitArray[10]?.seatType}`}>{sitArray[10]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[10], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[10]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[9]?.seat} | ${sitArray[9]?.seatType}`}>{sitArray[9]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[9], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[9]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[8]?.seat} | ${sitArray[8]?.seatType}`}>{sitArray[8]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[8], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[8]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[7]?.seat} | ${sitArray[7]?.seatType}`}>{sitArray[7]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[7], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[7]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[14]?.seat} | ${sitArray[14]?.seatType}`}>{sitArray[14]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[14], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[14]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[13]?.seat} | ${sitArray[13]?.seatType}`}>{sitArray[13]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[13], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[13]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons" style={{ color: "red" }}>
                                                        {" "}
                                                        <abbr title={`Seat:${sitArray[12]?.seat} | ${sitArray[12]?.seatType}`}>  <ChairIcon htmlColor="red" /></abbr>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div className="contucteur">
                                                      <span className="m-0">ENTRY</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[19]?.seat} | ${sitArray[19]?.seatType}`}>{sitArray[19]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[19], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[19]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[18]?.seat} | ${sitArray[18]?.seatType}`}>{sitArray[18]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[18], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[18]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[17]?.seat} | ${sitArray[17]?.seatType}`}>{sitArray[17]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[17], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[17]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[16]?.seat} | ${sitArray[16]?.seatType}`}>{sitArray[16]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[16], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[16]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[15]?.seat} | ${sitArray[15]?.seatType}`}>{sitArray[15]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[15], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[15]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[24]?.seat} | ${sitArray[24]?.seatType}`}>{sitArray[24]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[24], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[24]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[23]?.seat} | ${sitArray[23]?.seatType}`}>{sitArray[23]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[23], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[23]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[22]?.seat} | ${sitArray[22]?.seatType}`}>{sitArray[22]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[22], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[22]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[21]?.seat} | ${sitArray[21]?.seatType}`}>{sitArray[21]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[21], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[21]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[20]?.seat} | ${sitArray[20]?.seatType}`}>{sitArray[20]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[20], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[20]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[29]?.seat} | ${sitArray[29]?.seatType}`}>{sitArray[29]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[29], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[29]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[28]?.seat} | ${sitArray[28]?.seatType}`}>{sitArray[28]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[28], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[28]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[27]?.seat} | ${sitArray[27]?.seatType}`}>{sitArray[27]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[27], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[27]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[26]?.seat} | ${sitArray[26]?.seatType}`}>{sitArray[26]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[26], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[26]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[25]?.seat} | ${sitArray[25]?.seatType}`}>{sitArray[25]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[25], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[25]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[34]?.seat} | ${sitArray[34]?.seatType}`}>{sitArray[34]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[34], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[34]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[33]?.seat} | ${sitArray[33]?.seatType}`}>{sitArray[33]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[33], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[33]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[32]?.seat} | ${sitArray[32]?.seatType}`}>{sitArray[32]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[32], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[32]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[31]?.seat} | ${sitArray[31]?.seatType}`}>{sitArray[31]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[31], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[31]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[30]?.seat} | ${sitArray[30]?.seatType}`}>{sitArray[30]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[30], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[30]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[39]?.seat} | ${sitArray[39]?.seatType}`}>{sitArray[39]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[39], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[39]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[38]?.seat} | ${sitArray[38]?.seatType}`}>{sitArray[38]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[38], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[38]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[37]?.seat} | ${sitArray[37]?.seatType}`}>{sitArray[37]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[37], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[37]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[36]?.seat} | ${sitArray[36]?.seatType}`}>{sitArray[36]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[36], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[36]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[35]?.seat} | ${sitArray[35]?.seatType}`}>{sitArray[35]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[35], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[35]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[44]?.seat} | ${sitArray[44]?.seatType}`}>{sitArray[44]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[44], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[44]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[43]?.seat} | ${sitArray[43]?.seatType}`}>{sitArray[43]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[43], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[43]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[42]?.seat} | ${sitArray[42]?.seatType}`}>{sitArray[42]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[42], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[42]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[41]?.seat} | ${sitArray[41]?.seatType}`}>{sitArray[41]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[41], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[41]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[40]?.seat} | ${sitArray[40]?.seatType}`}>{sitArray[40]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[40], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[40]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[49]?.seat} | ${sitArray[49]?.seatType}`}>{sitArray[49]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[49], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[49]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[48]?.seat} | ${sitArray[48]?.seatType}`}>{sitArray[48]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[48]?.seat, info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[48]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[47]?.seat} | ${sitArray[47]?.seatType}`}>{sitArray[47]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[47], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[47]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[46]?.seat} | ${sitArray[46]?.seatType}`}>{sitArray[46]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[46], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[46]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[45]?.seat} | ${sitArray[45]?.seatType}`}>{sitArray[45]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[45], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[45]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[54]?.seat} | ${sitArray[54]?.seatType}`}>{sitArray[54]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[54], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[54]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[53]?.seat} | ${sitArray[53]?.seatType}`}>{sitArray[53]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[53], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[53]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[52]?.seat} | ${sitArray[52]?.seatType}`}>{sitArray[52]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[52], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[52]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[51]?.seat} | ${sitArray[51]?.seatType}`}>{sitArray[51]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[51], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[51]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[50]?.seat} | ${sitArray[50]?.seatType}`}>{sitArray[50]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[50], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[50]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[57]?.seat} | ${sitArray[57]?.seatType}`}>{sitArray[57]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[57], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[57]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[56]?.seat} | ${sitArray[56]?.seatType}`}>{sitArray[56]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[56], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[56]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[55]?.seat} | ${sitArray[55]?.seatType}`}>{sitArray[55]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[55], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[55]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div className="contucteur">
                                                      <span className="m-0">ENTRY</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[62]?.seat} | ${sitArray[62]?.seatType}`}>{sitArray[62]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[62], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[62]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[61]?.seat} | ${sitArray[61]?.seatType}`}>{sitArray[61]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[61], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[61]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[60]?.seat} | ${sitArray[60]?.seatType}`}>{sitArray[60]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[60], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[60]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[59]?.seat} | ${sitArray[59]?.seatType}`}>{sitArray[59]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[59], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[59]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[58]?.seat} | ${sitArray[58]?.seatType}`}>{sitArray[58]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[58], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[58]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                  <div className="seat_persons1">
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[68]?.seat} | ${sitArray[68]?.seatType}`}>{sitArray[68]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[68], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[68]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[67]?.seat} | ${sitArray[67]?.seatType}`}>{sitArray[67]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[67], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[67]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[66]?.seat} | ${sitArray[66]?.seatType}`}>{sitArray[66]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[66], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[66]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[65]?.seat} | ${sitArray[65]?.seatType}`}>{sitArray[65]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[65], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[65]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"> <abbr title={`Seat:${sitArray[64]?.seat} | ${sitArray[64]?.seatType}`}>{sitArray[64]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[64], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[64]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                    <div>
                                                      <span className="material-icons"><abbr title={`Seat:${sitArray[63]?.seat} | ${sitArray[63]?.seatType}`}>{sitArray[63]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelect(sitArray[63], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[63]) ? 'selected' : ''
                                                        }`} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                                <div className="col-md-4">
                                  {Bording ? (<div className="seatLagent myDiv">
                                    <form className="row availableCheckbox">
                                      <h5>{t('Seat Lagent')}</h5>
                                      <div className="col-md-4 form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="Available"
                                          style={{ "backgroundColor": "green" }}
                                        />
                                        <label className="form-check-label" htmlFor="Available">
                                          {t('Available')}
                                        </label>
                                      </div>
                                      <div className="col-md-4 form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="Unavailable"
                                          style={{ "backgroundColor": "red" }}
                                        />
                                        <label className="form-check-label" htmlFor="Unavailable">
                                          {t('Unavailable')}
                                        </label>
                                      </div>
                                    </form>
                                  </div>) : (
                                    <div className="tabPopup myDiv">
                                      <div className="boardingAndDropPoint hideboarddrop">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                          <li className="nav-item" role="presentation">
                                            <button
                                              className="nav-link active"
                                              id="boarding_point"
                                              data-bs-toggle="pill"
                                              data-bs-target="#boarding"
                                              type="button"
                                              role="tab"
                                              aria-controls="boarding"
                                              aria-selected="true"
                                            >
                                              {t('Boarding Point')}
                                            </button>
                                          </li>
                                          <li className="nav-item" role="presentation">
                                            <button
                                              className="nav-link"
                                              id="dropping_point"
                                              data-bs-toggle="pill"
                                              data-bs-target="#dropping"
                                              type="button"
                                              role="tab"
                                              aria-controls="dropping"
                                              aria-selected="false"
                                            >
                                              {t('Dropping Point')}
                                            </button>
                                          </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                          <div
                                            className="tab-pane fade show active"
                                            id="boarding"
                                            role="tabpanel"
                                            aria-labelledby="boarding_point"
                                          >
                                            <div className="radioButton">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  name="flexRadioDefault"
                                                  id="Station1"
                                                  onClick={handleDropPoint}
                                                />
                                                <label className="form-check-label" htmlFor="Station1">
                                                  <span className="startTime">
                                                    <strong>{info.trip.startingTime}</strong>
                                                  </span>
                                                  <span>
                                                    <h5>{source}</h5>

                                                  </span>
                                                </label>
                                              </div>

                                            </div>
                                            <div className="bottomPrice">
                                              <div className="duringpayment">
                                                <span className="amountTaxes">
                                                  <b style={{ "color": "black" }}>{t('selected seat')}
                                                  </b>{Array.isArray(selectedSeatsMap[info.trip._id]) &&
                                                    selectedSeatsMap[info.trip._id].map((info, index) => (
                                                      <small key={index} style={{ "color": "black" }}> <React.Fragment key={index}>
                                                        {index > 0 && ', '}
                                                        {info.seat}
                                                      </React.Fragment></small>
                                                    ))
                                                  }
                                                </span>
                                                <span className="inrprice"> </span>
                                              </div>
                                            </div>
                                          </div>
                                          {drop ? (<div
                                            className=" "
                                            id="dropping"
                                            role="tabpanel"
                                            aria-labelledby="dropping_point"
                                          >


                                            <div className="radioButton">
                                              <p className="single_dropping">
                                                {t('*This bus has a single dropping point')}
                                              </p>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  name="flexRadioDefault"
                                                  id="dropping1"
                                                  defaultChecked={checked}
                                                  onChange={() => setChecked((state) => !state)}

                                                />
                                                <label className="form-check-label" htmlFor="dropping1">
                                                  <span className="startTime">
                                                    <strong>04:00</strong>
                                                  </span>
                                                  <span>
                                                    <h5>{destination}</h5>
                                                    <p>

                                                    </p>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                            <div className="bottomPrice">
                                              <div className="duringpayment">
                                                <span className="amountTaxes">
                                                  {t('Amount')}{" "}
                                                  <small>{t('(Taxes will be calculated during payment)')} </small>
                                                </span>
                                                <span className="inrprice"></span>
                                              </div>
                                              <button className="continueBtn continueGoproseed" onClick={(e) => handlshow(info.trip._id)}>
                                                {t('Continue')}
                                              </button>
                                            </div>
                                          </div>) : ""}


                                        </div>
                                      </div>

                                    </div>)}


                                  {/*End off tabPopup */}
                                </div>
                              </div>
                            </div>
                          </div>)}
                        </div>
                      </>)

                    })}
                  </>
                )}

              </div>
            </div>
            {pupup1 && <div className='form_body'>
              <div className='form_tittle' style={{ "height": "40%" }}>
                <button className='close_btn' onClick={() => setpopup1(false)}><CancelOutlinedIcon /></button>
                <form className=''>
                  <section class="traking_main_page">

                    <div class="traking_heading text-center">
                      <h6>Get benefits like:</h6>
                    </div>
                    <div class="traking_inner">
                      <div>
                        <h6 class="mb-5 text-center">{source}<ArrowRightAltIcon />{destination}</h6>
                        <div class="main_route_list">
                          {ActiveStops.map((info) => (
                            <div class="route_list" >
                              <div class="route_list_list">
                                {info.stop_status === 1 ? <p class="routeline2"><CircleIcon /></p> : <p class="routeline"><CircleIcon /></p>}

                                <p class="mb-0">{info.stopName}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                </form>
              </div>
            </div>}

          </div>
        </div>
        <PassengerDetails trigger1={popUp} settrigger1={setpopUp} getTripData={location.state.data} getTripId={idData} sourceNew={source} destinationNew={destination} />
      </section>

    </>
  )
}










