import React, { useState, useEffect } from 'react'
// import Header from './Header'
import './SearchBus.css'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SellIcon from '@mui/icons-material/Sell';
import { useLocation } from 'react-router-dom';
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios';
import PassengerDetails from '../TicketBooking/PassengerDetails'
import { BaseUrl } from '../../Api/BaseUrl';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Swal from 'sweetalert2'
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import { ImageBaseUrl } from '../../Api/BaseUrl';
import swal from 'sweetalert2'
import EastIcon from '@mui/icons-material/East';
export default function RoundTrip() {
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
  const getAll = location.state.data.outboundTrips
  const returnTrips = location.state.data.returnTrips
  console.log(getAll, returnTrips)
  const [NewData, setNewDAta] = useState(getAll)
  const [newreturnTrips, setReturnTrips] = useState(returnTrips)
  const [sitArray, setSitArray] = useState([])
  const [retruenTripId, setRetruenTripId] = useState('')
  const [SeatreturnTrips, setSeatReturnTrips] = useState([])
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
  const [seatColors, setSeatColors] = useState({});
  const [seatColorsRound, setSeatColorsRound] = useState({});
  const [util, setUtil] = useState([])
  const [amenitiesVisibleRound, setAmenitiesVisibleRound] = useState(false);
  const [activeAmenitiesIndexRound, setActiveAmenitiesIndexRound] = useState(null);
  const [BusImageRound, setBusImageRound] = useState(false)
  const [activeBusIndexRound, setactiveBusIndexRound] = useState(null);
  const [policiesRound, setPoliciesRound] = useState(false)
  const [activepoliciesIndexRound, setactivepoliciesIndexRound] = useState(null);
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
  const hansleAmentiesRound = (index) => {
    setAmenitiesVisibleRound(!amenitiesVisibleRound);
    setActiveAmenitiesIndexRound(index);
  };
  const handleBusImageRound = (index) => {
    setBusImageRound(!BusImageRound)
    setactiveBusIndexRound(index);
  };
  const handlePoliciyTypeRound = (index) => {
    setPoliciesRound(!policiesRound)
    setactivepoliciesIndexRound(index);
  };
  const popUpType = popUp;
  // console.log(NewData)
  const id = NewData.map((info) => {
    return info._id
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
    // const filterID = id.filter((info) => {
    //   return info === getId
    // })
    //  console.log(filterID,getId,"chek thi sheat Id")
    axios.post(`${BaseUrl}viewSeats`, {
      tripId: getId
    }).then((response) => {
      console.log(response.data.Seat_Info, "get seat of trip")
      setSitArray(response.data.Seat_Info)

    }).catch((error) => {
      console.log(error, "get the errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    })
  }
  const [isDetailsOpenReturnTrips, setIsDetailsOpenReturnTrips] = useState(Array(newreturnTrips.length).fill(false));
  const handleViewSeatsReturnTripsClick = (index, e, idtype) => {
    e.preventDefault()
    // Create a copy of the state array and toggle the open/close state for the clicked bus
    const updatedIsDetailsOpen = [...isDetailsOpen];
    for (let i = 0; i < updatedIsDetailsOpen.length; i++) {
      if (i !== index) {
        updatedIsDetailsOpen[i] = false;
      }
    }
    updatedIsDetailsOpen[index] = !updatedIsDetailsOpen[index];
    setIsDetailsOpenReturnTrips(updatedIsDetailsOpen);
    const getId = idtype;
    console.log(getId)
    // const filterID = id.filter((info) => {
    //   return info === getId
    // })
    //  console.log(filterID,getId,"chek thi sheat Id")
    axios.post(`${BaseUrl}viewSeats`, {
      tripId: getId
    }).then((response) => {
      console.log(response.data.Seat_Info, "get seat of trip")
      setSeatReturnTrips(response.data.Seat_Info)

    }).catch((error) => {
      console.log(error, "get the errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    })
  }

  const HandeSelect = (seat, tripId) => {
    console.log(tripId)
    console.log(seat)
    setSeatColors(prevSeatColors => ({
      ...prevSeatColors,
      [seat.seat]: prevSeatColors[seat.seat] === '#281b84' ? 'green' : '#281b84'
    }));
    // const objectLength = Object.keys(selectedSeatsMap).length;
    // const objectLength = Object.keys(selectedSeatsMap).length;
    // if (objectLength === 0) {
    //   setBording((Bording) => !Bording)
    // }
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


  
  const HandeSelectReturn = (seat, tripId) => {
    console.log(tripId)
    console.log(seat)
    setSeatColorsRound(prevSeatColors => ({
      ...prevSeatColors,
      [seat.seat]: prevSeatColors[seat.seat] === '#281b84' ? 'green' : '#281b84'
    }));
    // const objectLength = Object.keys(selectedSeatsMap).length;
    // const objectLength = Object.keys(selectedSeatsMap).length;
    // if (objectLength === 0) {
    //   setBording((Bording) => !Bording)
    // }
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

  const seatFirst = Object.values(selectedSeatsMap)[0]?.map((info) => info.seat);
  const seatSecond = Object.values(selectedSeatsMap)[1]?.map((info) => info.seat);
  console.log(seatFirst, seatSecond)
  const handlshow = (id) => {
    console.log(typeof (selectedSeatsMap))
    setRetruenTripId(id)
    if (seatFirst.length === seatSecond.length) {
      setpopUp(true)
    } else {
      Swal.fire("Please select the same number of seats for Outbound and return trips.");
    }

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
        title: t('Sorry'),
        text: t('No matching trips found for the selected criteria!'),
        icon: "Error"
      });
      // swal.fire("Error", `${t(error?.response?.data?.message)}`, "error");
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
          <div>
            {/* <div className='mb-4'>
              <div className=''>
                <h6>{t('FILTERS')}</h6>
                <div className="d-flex align-items-center">
                  <h6 className='mb-0'>{t('BUS TYPES')} </h6>
                  <div className='d-flex justify-content-start align-items-center ms-3'>
                    <input type="checkbox" name="" id="bustype" onClick={handleChange} value='AC' />
                    <label for="bustype" class="font-s py-2 px-2">AC (126)</label>
                  </div>
                  <div className=' d-flex justify-content-start align-items-center ms-3'>
                    <input type="checkbox" name="" id="bustype1" onClick={handleChange} value='Non-AC' />
                    <label for="bustype1" class="font-s py-2 px-2">Non-AC (74)</label>
                  </div>
                  <div className='d-flex justify-content-start align-items-center ms-3'>
                    <input type="checkbox" name="" id="bustype2" value='luxury' onClick={handleChange} />
                    <label for="bustype2" class="font-s py-2 px-2">{t('luxury')}(143)</label>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <h6 className='mb-0'>{t('TIME')} </h6>
                <div className='d-flex justify-content-start align-items-center ms-3'>
                  <input type="checkbox" name="" id="arrival1" onClick={handleChange1} value='12:00 am - 06:00 am' />
                  <label for="arrival1" class="font-s py-2 px-2">12:00 am - 06:00 am(54)</label>
                </div>
                <div className='d-flex justify-content-start align-items-center ms-3'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='06:00 am - 11:00 am' />
                  <label for="arrival2" class="font-s py-2 px-2">06:00 am - 11:00 am (35)</label>
                </div>
                <div className='d-flex justify-content-start align-items-center ms-3'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='12:00 pm - 6:00 pm ' />
                  <label for="arrival2" class="font-s py-2 px-2">12:00 pm - 6:00 pm (35)</label>
                </div>
                <div className='d-flex justify-content-start align-items-center ms-3'>
                  <input type="checkbox" name="" id="arrival2" onClick={handleChange1} value='06:00 pm - 11:00 pm' />
                  <label for="arrival2" class="font-s py-2 px-2">06:00 pm - 11:00 pm (35)</label>
                </div>
              </div>
            </div> */}
            <div className='row'>
              <div className="col-lg-6">
                <div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <div className="f-bold busFound ps-3">{t('SORT BY:')}</div>
                      <div className="busFound">
                        <span className="busFound">81  {t('Buses')} </span>
                        {t('found')}
                      </div>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Departure')}
                        <i className="" />
                      </a>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Duration')}
                        <i className="" />
                      </a>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Arrival')}
                        <i className="" />
                      </a>
                    </div>
                  </div>
                  {dataArray.length === 0 && dataArray1.length === 0 ? (
                    <>
                      {Array.isArray(NewData) && NewData.map((info, index) => {
                        return (<>
                          <div className="ticketsDetails ticketsDetails2">
                            <div>
                              <div className="row">
                                <div className="col-md-3 ps-4">
                                  <div className="larg_font">{info.trip.bus_no}</div>
                                  <div className="font-s marTop10">{info.trip.bus_type}</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="larg_font">{info.departureTime} </div>
                                  <div className="font-s">{source}</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="fontMDtext ">{info.stopsDuration.hours}Hours, {info.stopsDuration.minutes}minutes</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="fontNolmal larg_font">{info.destinationExpectedTime}</div>
                                  <div className="font-s">{destination}</div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex mt-4">
                              <div className="liveTraking" onClick={(e) => handleLivetracking(e, info.trip._id)}>
                                <a href=" ">
                                  <i><MyLocationIcon />{t('Live Tracking')}{" "}</i>
                                </a>
                              </div>

                              <div className="returnTrip">
                                <h6>{info.trip.source} <EastIcon />{info.trip.destination}</h6>
                                <p>
                                  <strong>{t('Return Trip camer Travel')}</strong>
                                  :  {t('Unlock min. 10% OFF on return ticket')}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex mt-3">
                              <ul className="bottom-panel p-0">
                                <li className="amenties b-p-list">
                                  <span className="txt-val" onClick={(e) => hansleAmenties(index)}>{t('Amenities')}</span>
                                </li>
                                <li className="amenties b-p-list">
                                  <span className="txt-val " onClick={(e) => handleBusImage(index)}>{t('Bus Photos')}</span>
                                </li>
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Boarding Dropping Points')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Reviews')} </span>
                              </li> */}
                                <li className="amenties b-p-list">
                                  <span className="txt-val" onClick={(e) => handlePoliciyType(index)}>{t('Booking policies')}</span>
                                </li>
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li> */}
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
                                        <p>
                                          <i className="fi fi-rs-ticket-alt"></i>
                                          {info.trip.amenities.map((amenity, index) => (
                                            <span key={index}>{t(amenity)}{index < info.trip.amenities.length - 1 ? ', ' : ''}</span>
                                          ))}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>)}
                            {BusImage && activeBusIndex === index && (<div id="carouselbus" class="carouselbus">
                              <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                  {info.trip.images.map((item) => (
                                    <div class="carousel-item active">
                                      <img src={`${ImageBaseUrl}${item}`} class="d-block w-100" alt="..." />
                                    </div>
                                  ))}
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
                                <h5 className="pb-3">{t("Travel Related Policies")}</h5>
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-rr-woman-head" />
                                  </div>
                                  <div>
                                    <h6>{t("Child passenger policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Children above the age of 6 will need a ticket")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-ss-luggage-rolling" />
                                  </div>
                                  <div>
                                    <h6>{t("Luggage policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("2 pieces of luggage will be accepted free of charge per passenger. Excess items will be chargeable Excess baggage over 20 kgs per passenger will be chargeable")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-br-paw" />
                                  </div>
                                  <div>
                                    <h6>{t("Pets Policy")}</h6>
                                    <p className="font-s mb-0">{t("Pets are not allowed")}</p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-rr-bottle" />
                                  </div>
                                  <div>
                                    <h6>{t("Liquor Policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Carrying or consuming liquor inside the bus is prohibited. Bus reserves the right to deboard drunk passengers.")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-ss-bus" />
                                  </div>
                                  <div>
                                    <h6>{t("Pick up time policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Bus operator is not obligated to wait beyond the scheduled departure time of the bus. No refund request will be entertained for late arriving passengers.")}
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
                                  <div className="col-4">
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
                                                      <div>
                                                        <span className="material-icons">
                                                          <abbr title={`Seat:${sitArray[1]?.seat} | ${sitArray[1]?.seatType}`}>
                                                            {sitArray[1]?.status === 0 ? (
                                                              <ChairIcon
                                                                onClick={() => HandeSelect(sitArray[1], info.trip._id)}
                                                                style={{
                                                                  color: seatColors[sitArray[1]?.seat] || 'green', // default to green
                                                                  fontWeight: seatColors[sitArray[1]?.seat] === '#281b84' ? 800 : 'normal'
                                                                }}
                                                                className={`${seatColors[sitArray[1]?.seat] === '#281b84' ? 'selected' : ''}`}
                                                              />
                                                            ) : (
                                                              <ChairIcon htmlColor="red" />
                                                            )}
                                                          </abbr>
                                                        </span>

                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[0]?.seat} | ${sitArray[0]?.seatType}`}>{sitArray[0]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[0], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[0]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[0]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[0]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[6]?.seat} | ${sitArray[6]?.seatType}`}>{sitArray[6]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[6], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[6]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[6]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[6]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[5]?.seat} | ${sitArray[5]?.seatType}`}>{sitArray[5]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[5], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[5]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[5]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[5]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[4]?.seat} | ${sitArray[4]?.seatType}`}>{sitArray[4]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[4], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[4]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[4]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[4]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[3]?.seat} | ${sitArray[3]?.seatType}`}>{sitArray[3]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[3], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[3]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[3]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[3]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[2]?.seat} | ${sitArray[2]?.seatType}`}>{sitArray[2]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[2], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[2]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[2]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[2]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[11]?.seat} | ${sitArray[11]?.seatType}`}>{sitArray[11]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[11], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[11]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[11]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[11]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[10]?.seat} | ${sitArray[10]?.seatType}`}>{sitArray[10]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[10], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[10]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[10]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[10]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[9]?.seat} | ${sitArray[9]?.seatType}`}>{sitArray[9]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[9], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[9]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[9]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[9]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[8]?.seat} | ${sitArray[8]?.seatType}`}>{sitArray[8]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[8], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[8]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[8]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[8]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[7]?.seat} | ${sitArray[7]?.seatType}`}>{sitArray[7]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[7], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[7]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[7]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[7]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[14]?.seat} | ${sitArray[14]?.seatType}`}>{sitArray[14]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[14], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[14]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[14]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[14]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[13]?.seat} | ${sitArray[13]?.seatType}`}>{sitArray[13]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[13], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[13]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[13]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[13]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
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
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[19]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[19]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[18]?.seat} | ${sitArray[18]?.seatType}`}>{sitArray[18]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[18], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[18]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[18]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[18]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[17]?.seat} | ${sitArray[17]?.seatType}`}>{sitArray[17]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[17], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[17]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[17]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[17]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[16]?.seat} | ${sitArray[16]?.seatType}`}>{sitArray[16]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[16], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[16]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[16]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[16]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[15]?.seat} | ${sitArray[15]?.seatType}`}>{sitArray[15]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[15], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[15]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[15]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[15]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[24]?.seat} | ${sitArray[24]?.seatType}`}>{sitArray[24]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[24], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[24]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[24]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[24]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[23]?.seat} | ${sitArray[23]?.seatType}`}>{sitArray[23]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[23], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[23]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[23]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[23]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[22]?.seat} | ${sitArray[22]?.seatType}`}>{sitArray[22]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[22], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[22]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[22]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[22]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[21]?.seat} | ${sitArray[21]?.seatType}`}>{sitArray[21]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[21], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[21]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[21]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[21]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[20]?.seat} | ${sitArray[20]?.seatType}`}>{sitArray[20]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[20], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[20]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[20]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[20]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[29]?.seat} | ${sitArray[29]?.seatType}`}>{sitArray[29]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[29], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[29]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[29]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[29]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[28]?.seat} | ${sitArray[28]?.seatType}`}>{sitArray[28]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[28], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[28]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[28]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[28]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[27]?.seat} | ${sitArray[27]?.seatType}`}>{sitArray[27]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[27], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[27]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[27]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[27]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[26]?.seat} | ${sitArray[26]?.seatType}`}>{sitArray[26]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[26], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[26]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[26]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[26]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[25]?.seat} | ${sitArray[25]?.seatType}`}>{sitArray[25]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[25], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[25]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[25]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[25]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${sitArray[34]?.seat} | ${sitArray[34]?.seatType}`}>{sitArray[34]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[34], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[34]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[34]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[34]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[33]?.seat} | ${sitArray[33]?.seatType}`}>{sitArray[33]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[33], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[33]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[33]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[33]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[32]?.seat} | ${sitArray[32]?.seatType}`}>{sitArray[32]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[32], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[32]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[32]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[32]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[31]?.seat} | ${sitArray[31]?.seatType}`}>{sitArray[31]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[31], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[31]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[31]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[31]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${sitArray[30]?.seat} | ${sitArray[30]?.seatType}`}>{sitArray[30]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[30], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[30]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[30]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[30]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[39]?.seat} | ${sitArray[39]?.seatType}`}>{sitArray[39]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[39], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[39]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[39]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[39]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[38]?.seat} | ${sitArray[38]?.seatType}`}>{sitArray[38]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[38], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[38]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[38]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[38]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[37]?.seat} | ${sitArray[37]?.seatType}`}>{sitArray[37]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[37], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[37]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[37]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[37]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[36]?.seat} | ${sitArray[36]?.seatType}`}>{sitArray[36]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[36], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[36]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[36]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[36]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[35]?.seat} | ${sitArray[35]?.seatType}`}>{sitArray[35]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[35], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[35]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[35]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[35]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[44]?.seat} | ${sitArray[44]?.seatType}`}>{sitArray[44]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[44], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[44]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[44]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[44]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[43]?.seat} | ${sitArray[43]?.seatType}`}>{sitArray[43]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[43], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[43]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[43]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[43]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${sitArray[42]?.seat} | ${sitArray[42]?.seatType}`}>{sitArray[42]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[42], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[42]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[42]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[42]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[41]?.seat} | ${sitArray[41]?.seatType}`}>{sitArray[41]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[41], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[41]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[41]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[41]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[40]?.seat} | ${sitArray[40]?.seatType}`}>{sitArray[40]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[40], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[40]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[40]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[40]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[49]?.seat} | ${sitArray[49]?.seatType}`}>{sitArray[49]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[49], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[49]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[49]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[49]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[48]?.seat} | ${sitArray[48]?.seatType}`}>{sitArray[48]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[48]?.seat, info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[48]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[48]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[48]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[47]?.seat} | ${sitArray[47]?.seatType}`}>{sitArray[47]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[47], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[47]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[47]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[47]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[46]?.seat} | ${sitArray[46]?.seatType}`}>{sitArray[46]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[46], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[46]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[46]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[46]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[45]?.seat} | ${sitArray[45]?.seatType}`}>{sitArray[45]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[45], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[45]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[45]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[45]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                          
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[54]?.seat} | ${sitArray[54]?.seatType}`}>{sitArray[54]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[54], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[54]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[54]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[54]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[53]?.seat} | ${sitArray[53]?.seatType}`}>{sitArray[53]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[53], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[53]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[53]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[53]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[52]?.seat} | ${sitArray[52]?.seatType}`}>{sitArray[52]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[52], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[52]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[52]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[52]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${sitArray[51]?.seat} | ${sitArray[51]?.seatType}`}>{sitArray[51]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[51], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[51]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[51]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[51]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[50]?.seat} | ${sitArray[50]?.seatType}`}>{sitArray[50]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[50], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[50]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[50]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[50]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[57]?.seat} | ${sitArray[57]?.seatType}`}>{sitArray[57]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[57], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[57]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[57]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[57]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[56]?.seat} | ${sitArray[56]?.seatType}`}>{sitArray[56]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[56], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[56]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[56]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[56]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[55]?.seat} | ${sitArray[55]?.seatType}`}>{sitArray[55]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[55], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[55]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[55]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[55]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
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
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[62]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[62]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[61]?.seat} | ${sitArray[61]?.seatType}`}>{sitArray[61]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[61], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[61]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[61]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[61]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[60]?.seat} | ${sitArray[60]?.seatType}`}>{sitArray[60]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[60], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[60]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[60]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[60]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[59]?.seat} | ${sitArray[59]?.seatType}`}>{sitArray[59]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[59], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[59]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[59]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[59]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[58]?.seat} | ${sitArray[58]?.seatType}`}>{sitArray[58]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[58], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[58]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[58]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[58]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[68]?.seat} | ${sitArray[68]?.seatType}`}>{sitArray[68]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[68], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[68]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[68]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[68]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[67]?.seat} | ${sitArray[67]?.seatType}`}>{sitArray[67]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[67], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[67]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[67]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[67]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[66]?.seat} | ${sitArray[66]?.seatType}`}>{sitArray[66]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[66], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[66]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[66]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[66]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[65]?.seat} | ${sitArray[65]?.seatType}`}>{sitArray[65]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[65], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[65]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[65]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[65]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${sitArray[64]?.seat} | ${sitArray[64]?.seatType}`}>{sitArray[64]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[64], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[64]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColors[sitArray[64]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[64]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${sitArray[63]?.seat} | ${sitArray[63]?.seatType}`}>{sitArray[63]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelect(sitArray[63], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(sitArray[63]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColors[sitArray[63]?.seat] || 'green', // default to green
                                                            fontWeight: seatColors[sitArray[63]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
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
                          <div className="ticketsDetails ticketsDetails2">
                            <div>
                              <ul className="row">
                                <li className="col-md-3 ps-4">
                                  <div className="larg_font">{info.trip.bus_no}</div>
                                  <div className="font-s marTop10">{info.trip.bus_type}</div>
                                </li>
                                <li className="col-md-3">
                                  <div className="larg_font">{info.DepartureTime}</div>
                                  <div className="font-s marTop44">
                                  </div>
                                </li>
                                <li className="col-md-3">
                                  <div className="fontMDtext ">hours{info.stopsDuration.hours},minutes{info.stopsDuration.minutes} </div>
                                </li>
                                <li className="col-md-3">
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
                                    FCFA  <dl>1398 </dl> <strong>1328</strong>
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
                            <div className="d-flex mt-4">
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
                              <ul className="bottom-panel p-0">
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
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li> */}
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
                                                      <strong>{info.trip.startingTime}sdgfhngmhnm,</strong>
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
                                              className="tab-pane fade"
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
              <div className="col-lg-6">
                <div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <div className="f-bold busFound ps-3">{t('SORT BY:')}</div>
                      <div className="busFound">
                        <span className="busFound">81  {t('Buses')} </span>
                        {t('found')}
                      </div>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Departure')}
                        <i className="" />
                      </a>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Duration')}
                        <i className="" />
                      </a>
                    </div>
                    <div className='col-md-3'>
                      <a>
                        {t('Arrival')}
                        <i className="" />
                      </a>
                    </div>
                  </div>


                  {dataArray.length === 0 && dataArray1.length === 0 ? (
                    <>
                      {Array.isArray(newreturnTrips) && newreturnTrips.map((info, index) => {
                        return (<>
                          <div className="ticketsDetails ticketsDetails2">
                            <div>
                              <div className="row">
                                <div className="col-md-3 ps-4">
                                  <div className="larg_font">{info.trip.bus_no}</div>
                                  <div className="font-s marTop10">{info.trip.bus_type}</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="larg_font">{info.departureTime} </div>
                                  <div className="font-s">{destination}</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="fontMDtext "> {info.stopsDuration.hours}Hours, {info.stopsDuration.minutes}minutes</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="fontNolmal larg_font">{info.destinationExpectedTime}</div>
                                  <div className="font-s">{source}</div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex mt-4">

                              <div className="liveTraking" onClick={(e) => handleLivetracking(e, info.trip._id)}>
                                <a href=" ">
                                  <i><MyLocationIcon />{t('Live Tracking')}{" "}</i>
                                </a>
                              </div>
                              <div className="returnTrip">
                                <h6>{info.trip.source} <EastIcon />{info.trip.destination}</h6>
                                <p>
                                  <strong>{t('Return Trip camer Travel')}</strong>
                                  :  {t('Unlock min. 10% OFF on return ticket')}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex mt-3">
                              <ul className="bottom-panel p-0">
                                <li className="amenties b-p-list">
                                  <span className="txt-val" onClick={(e) => hansleAmentiesRound(index)}>{t('Amenities')}</span>
                                </li>
                                <li className="amenties b-p-list">
                                  <span className="txt-val " onClick={(e) => handleBusImageRound(index)}>{t('Bus Photos')}</span>
                                </li>
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Boarding Dropping Points')}</span>
                              </li>
                              <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Reviews')} </span>
                              </li> */}
                                <li className="amenties b-p-list">
                                  <span className="txt-val" onClick={(e) => handlePoliciyTypeRound(index)}>{t('Booking policies')}</span>
                                </li>
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li> */}
                              </ul>
                              <div className="viewSeatsBtn">
                                {/* onClick={(e) => handlfunction(info.trip._id)} */}
                                <a href="" onClick={(e) => handleViewSeatsReturnTripsClick(index, e, info.trip._id)} >{t('View Seats')}</a>
                              </div>
                            </div>

                            {amenitiesVisibleRound && activeAmenitiesIndexRound === index && (<div class="Supported" id="Supported">
                              <div class="container-fluid">
                                <div class="row">
                                  <div class="col-lg-10">
                                    <div class="local_activityicons">
                                      <div>
                                        <p>
                                          <i className="fi fi-rs-ticket-alt"></i>
                                          {info.trip.amenities.map((amenity, index) => (
                                            <span key={index}>{t(amenity)}{index < info.trip.amenities.length - 1 ? ', ' : ''}</span>
                                          ))}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>)}
                            {BusImageRound && activeBusIndexRound === index && (<div id="carouselbus" class="carouselbus">
                              <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                  {info.trip.images.map((item) => (
                                    <div class="carousel-item active">
                                      <img src={`${ImageBaseUrl}${item}`} class="d-block w-100" alt="..." />
                                    </div>
                                  ))}
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
                            {policiesRound && activepoliciesIndexRound === index && (<>
                              {/* Hello world */}
                              <div className="bookingPolicies" id="bookingPolicies">
                                <h5 className="pb-3">{t("Travel Related Policies")}</h5>
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-rr-woman-head" />
                                  </div>
                                  <div>
                                    <h6>{t("Child passenger policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Children above the age of 6 will need a ticket")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-ss-luggage-rolling" />
                                  </div>
                                  <div>
                                    <h6>{t("Luggage policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("2 pieces of luggage will be accepted free of charge per passenger. Excess items will be chargeable Excess baggage over 20 kgs per passenger will be chargeable")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-br-paw" />
                                  </div>
                                  <div>
                                    <h6>{t("Pets Policy")}</h6>
                                    <p className="font-s mb-0">{t("Pets are not allowed")}</p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-rr-bottle" />
                                  </div>
                                  <div>
                                    <h6>{t("Liquor Policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Carrying or consuming liquor inside the bus is prohibited. Bus reserves the right to deboard drunk passengers.")}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="d-flex align-items-center">
                                  <div className="policyicon">
                                    <i className="fi fi-ss-bus" />
                                  </div>
                                  <div>
                                    <h6>{t("Pick up time policy")}</h6>
                                    <p className="font-s mb-0">
                                      {t("Bus operator is not obligated to wait beyond the scheduled departure time of the bus. No refund request will be entertained for late arriving passengers.")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                            )}
                            {isDetailsOpenReturnTrips[index] && (<div id={`my-hidden-element-${index}`} className="openMoreDetails hidden">
                              <div className="seatPrice">
                                <a onClick={(e) => handleViewSeatsReturnTripsClick(index, e, info.trip._id)} className="closeBtn">
                                  <Button> <span className="material-icons" variant="outlined">{t('close')}</span></Button>
                                </a>
                              </div>
                              <div className="selectSheatsSec">
                                <div className="row justify-content-between">
                                  <div className="col-4">
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
                                                      <div> <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[1]?.seat} | ${SeatreturnTrips[1]?.seatType}`}
                                                      >{SeatreturnTrips[1]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                        HandeSelectReturn(SeatreturnTrips[1], info.trip._id)
                                                      }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[1]) ? 'selected' : ''
                                                        }`} 
                                                        style={{
                                                          color: seatColorsRound[sitArray[1]?.seat] || 'green', // default to green
                                                          fontWeight: seatColorsRound[sitArray[1]?.seat] === '#281b84' ? 800 : 'normal'
                                                        }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>

                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[0]?.seat} | ${SeatreturnTrips[0]?.seatType}`}>{SeatreturnTrips[0]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[0], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[0]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[1]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[1]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[6]?.seat} | ${SeatreturnTrips[6]?.seatType}`}>{SeatreturnTrips[6]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[6], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[6]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[6]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[6]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} 
                                                          />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[5]?.seat} | ${SeatreturnTrips[5]?.seatType}`}>{SeatreturnTrips[5]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[5], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[5]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[5]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[5]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[4]?.seat} | ${SeatreturnTrips[4]?.seatType}`}>{SeatreturnTrips[4]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[4], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[4]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[4]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[4]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[3]?.seat} | ${SeatreturnTrips[3]?.seatType}`}>{SeatreturnTrips[3]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[3], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[3]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[3]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[3]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[2]?.seat} | ${SeatreturnTrips[2]?.seatType}`}>{SeatreturnTrips[2]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[2], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[2]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[2]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[2]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[11]?.seat} | ${SeatreturnTrips[11]?.seatType}`}>{SeatreturnTrips[11]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[11], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[11]) ? 'selected' : ''
                                                          }`}  
                                                          style={{
                                                            color: seatColorsRound[sitArray[11]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[11]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[10]?.seat} | ${SeatreturnTrips[10]?.seatType}`}>{SeatreturnTrips[10]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[10], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[10]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[10]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[10]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[9]?.seat} | ${SeatreturnTrips[9]?.seatType}`}>{SeatreturnTrips[9]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[9], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[9]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[9]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[9]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[8]?.seat} | ${SeatreturnTrips[8]?.seatType}`}>{SeatreturnTrips[8]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[8], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[8]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[8]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[8]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[7]?.seat} | ${SeatreturnTrips[7]?.seatType}`}>{SeatreturnTrips[7]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[7], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[7]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[7]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[7]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[14]?.seat} | ${SeatreturnTrips[14]?.seatType}`}>{SeatreturnTrips[14]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[14], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[14]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[14]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[14]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[13]?.seat} | ${SeatreturnTrips[13]?.seatType}`}>{SeatreturnTrips[13]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[13], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[13]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[13]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[13]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons" style={{ color: "red" }}>
                                                          {" "}
                                                          <abbr title={`Seat:${SeatreturnTrips[12]?.seat} | ${SeatreturnTrips[12]?.seatType}`}>  <ChairIcon htmlColor="red" /></abbr>
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
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[19]?.seat} | ${SeatreturnTrips[19]?.seatType}`}>{SeatreturnTrips[19]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[19], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[19]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[19]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[19]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[18]?.seat} | ${SeatreturnTrips[18]?.seatType}`}>{SeatreturnTrips[18]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[18], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[18]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[18]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[18]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[17]?.seat} | ${SeatreturnTrips[17]?.seatType}`}>{SeatreturnTrips[17]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[17], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[17]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[17]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[17]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[16]?.seat} | ${SeatreturnTrips[16]?.seatType}`}>{SeatreturnTrips[16]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[16], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[16]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[16]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[16]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[15]?.seat} | ${SeatreturnTrips[15]?.seatType}`}>{SeatreturnTrips[15]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[15], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[15]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[15]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[15]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[24]?.seat} | ${SeatreturnTrips[24]?.seatType}`}>{SeatreturnTrips[24]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[24], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[24]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[24]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[24]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[23]?.seat} | ${SeatreturnTrips[23]?.seatType}`}>{SeatreturnTrips[23]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[23], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[23]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[23]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[23]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[22]?.seat} | ${SeatreturnTrips[22]?.seatType}`}>{SeatreturnTrips[22]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[22], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[22]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[22]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[22]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[21]?.seat} | ${SeatreturnTrips[21]?.seatType}`}>{SeatreturnTrips[21]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[21], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[21]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[21]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[21]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[20]?.seat} | ${SeatreturnTrips[20]?.seatType}`}>{SeatreturnTrips[20]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[20], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[20]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[20]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[20]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[29]?.seat} | ${SeatreturnTrips[29]?.seatType}`}>{SeatreturnTrips[29]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[29], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[29]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[29]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[29]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[28]?.seat} | ${SeatreturnTrips[28]?.seatType}`}>{SeatreturnTrips[28]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[28], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[28]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[28]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[28]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[27]?.seat} | ${SeatreturnTrips[27]?.seatType}`}>{SeatreturnTrips[27]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[27], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[27]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[27]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[27]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[26]?.seat} | ${SeatreturnTrips[26]?.seatType}`}>{SeatreturnTrips[26]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[26], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[26]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[26]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[26]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[25]?.seat} | ${SeatreturnTrips[25]?.seatType}`}>{SeatreturnTrips[25]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[25], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[25]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[25]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[25]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${SeatreturnTrips[34]?.seat} | ${SeatreturnTrips[34]?.seatType}`}>{SeatreturnTrips[34]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[34], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[34]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[34]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[34]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[33]?.seat} | ${SeatreturnTrips[33]?.seatType}`}>{SeatreturnTrips[33]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[33], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[33]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[33]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[33]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[32]?.seat} | ${SeatreturnTrips[32]?.seatType}`}>{SeatreturnTrips[32]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[32], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[32]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[32]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[32]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[31]?.seat} | ${SeatreturnTrips[31]?.seatType}`}>{SeatreturnTrips[31]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[31], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[31]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[31]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[31]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${SeatreturnTrips[30]?.seat} | ${SeatreturnTrips[30]?.seatType}`}>{SeatreturnTrips[30]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[30], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[30]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[30]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[30]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[39]?.seat} | ${SeatreturnTrips[39]?.seatType}`}>{SeatreturnTrips[39]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[39], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[39]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[39]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[39]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[38]?.seat} | ${SeatreturnTrips[38]?.seatType}`}>{SeatreturnTrips[38]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[38], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[38]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[38]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[38]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[37]?.seat} | ${SeatreturnTrips[37]?.seatType}`}>{SeatreturnTrips[37]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[37], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[37]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[37]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[37]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[36]?.seat} | ${SeatreturnTrips[36]?.seatType}`}>{SeatreturnTrips[36]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[36], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[36]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[36]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[36]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[35]?.seat} | ${SeatreturnTrips[35]?.seatType}`}>{SeatreturnTrips[35]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[35], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[35]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[35]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[35]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[44]?.seat} | ${SeatreturnTrips[44]?.seatType}`}>{SeatreturnTrips[44]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[44], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[44]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[44]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[44]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[43]?.seat} | ${SeatreturnTrips[43]?.seatType}`}>{SeatreturnTrips[43]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[43], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[43]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[43]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[43]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${SeatreturnTrips[42]?.seat} | ${SeatreturnTrips[42]?.seatType}`}>{SeatreturnTrips[42]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[42], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[42]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[42]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[42]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[41]?.seat} | ${SeatreturnTrips[41]?.seatType}`}>{SeatreturnTrips[41]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[41], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[41]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[41]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[41]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[40]?.seat} | ${SeatreturnTrips[40]?.seatType}`}>{SeatreturnTrips[40]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[40], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[40]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[40]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[40]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[49]?.seat} | ${SeatreturnTrips[49]?.seatType}`}>{SeatreturnTrips[49]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[49], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[49]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[49]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[49]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[48]?.seat} | ${SeatreturnTrips[48]?.seatType}`}>{SeatreturnTrips[48]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[48]?.seat, info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[48]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[48]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[48]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[47]?.seat} | ${SeatreturnTrips[47]?.seatType}`}>{SeatreturnTrips[47]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[47], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[47]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[47]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[47]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[46]?.seat} | ${SeatreturnTrips[46]?.seatType}`}>{SeatreturnTrips[46]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[46], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[46]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[46]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[46]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[45]?.seat} | ${SeatreturnTrips[45]?.seatType}`}>{SeatreturnTrips[45]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[45], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[45]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[45]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[45]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[54]?.seat} | ${SeatreturnTrips[54]?.seatType}`}>{SeatreturnTrips[54]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[54], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[54]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[54]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[54]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[53]?.seat} | ${SeatreturnTrips[53]?.seatType}`}>{SeatreturnTrips[53]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[53], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[53]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[53]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[53]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[52]?.seat} | ${SeatreturnTrips[52]?.seatType}`}>{SeatreturnTrips[52]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[52], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[52]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[52]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[52]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${SeatreturnTrips[51]?.seat} | ${SeatreturnTrips[51]?.seatType}`}>{SeatreturnTrips[51]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[51], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[51]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[51]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[51]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[50]?.seat} | ${SeatreturnTrips[50]?.seatType}`}>{SeatreturnTrips[50]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[50], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[50]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[50]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[50]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[57]?.seat} | ${SeatreturnTrips[57]?.seatType}`}>{SeatreturnTrips[57]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[57], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[57]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[57]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[57]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[56]?.seat} | ${SeatreturnTrips[56]?.seatType}`}>{SeatreturnTrips[56]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[56], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[56]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[56]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[56]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[55]?.seat} | ${SeatreturnTrips[55]?.seatType}`}>{SeatreturnTrips[55]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[55], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[55]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[55]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[55]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
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
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[62]?.seat} | ${SeatreturnTrips[62]?.seatType}`}>{SeatreturnTrips[62]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[62], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[62]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[62]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[62]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[61]?.seat} | ${SeatreturnTrips[61]?.seatType}`}>{SeatreturnTrips[61]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[61], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[61]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[61]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[61]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[60]?.seat} | ${SeatreturnTrips[60]?.seatType}`}>{SeatreturnTrips[60]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[60], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[60]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[60]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[60]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[59]?.seat} | ${SeatreturnTrips[59]?.seatType}`}>{SeatreturnTrips[59]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[59], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[59]) ? 'selected' : ''
                                                          }`}  style={{
                                                            color: seatColorsRound[sitArray[59]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[59]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                          
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[58]?.seat} | ${SeatreturnTrips[58]?.seatType}`}>{SeatreturnTrips[58]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[58], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[58]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[58]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[58]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="d-flex justify-content-between">
                                                    <div className="seat_persons1">
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[68]?.seat} | ${SeatreturnTrips[68]?.seatType}`}>{SeatreturnTrips[68]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[68], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[68]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[68]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[68]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[67]?.seat} | ${SeatreturnTrips[67]?.seatType}`}>{SeatreturnTrips[67]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[67], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[67]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[67]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[67]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[66]?.seat} | ${SeatreturnTrips[66]?.seatType}`}>{SeatreturnTrips[66]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[66], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[66]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[66]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[66]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[65]?.seat} | ${SeatreturnTrips[65]?.seatType}`}>{SeatreturnTrips[65]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[65], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[65]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[65]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[65]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"> <abbr title={`Seat:${SeatreturnTrips[64]?.seat} | ${SeatreturnTrips[64]?.seatType}`}>{SeatreturnTrips[64]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[64], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[64]) ? 'selected' : ''
                                                          }`}
                                                          style={{
                                                            color: seatColorsRound[sitArray[64]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[64]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }} />) : (<ChairIcon htmlColor="red" />)}</abbr></span>
                                                          
                                                      </div>
                                                      <div>
                                                        <span className="material-icons"><abbr title={`Seat:${SeatreturnTrips[63]?.seat} | ${SeatreturnTrips[63]?.seatType}`}>{SeatreturnTrips[63]?.status === 0 ? (<ChairIcon color="success" onClick={() => {
                                                          HandeSelectReturn(SeatreturnTrips[63], info.trip._id)
                                                        }} className={`${selectedSeatsMap[info.trip._id]?.includes(SeatreturnTrips[63]) ? 'selected' : ''
                                                          }`} 
                                                          style={{
                                                            color: seatColorsRound[sitArray[63]?.seat] || 'green', // default to green
                                                            fontWeight: seatColorsRound[sitArray[63]?.seat] === '#281b84' ? 800 : 'normal'
                                                          }}/>) : (<ChairIcon htmlColor="red" />)}</abbr></span>
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
                                    {/*End off tabPopup */}
                                  </div>
                                  <div className="bottomPrice">

                                    <button className="continueBtn continueGoproseed" onClick={(e) => handlshow(info.trip._id)}>
                                      {t('Continue')}
                                    </button>
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
                          <div className="ticketsDetails ticketsDetails2">
                            <div>
                              <ul className="row">
                                <li className="col-md-3 ps-4">
                                  <div className="larg_font">{info.trip.bus_no}</div>
                                  <div className="font-s marTop10">{info.trip.bus_type}</div>
                                </li>
                                <li className="col-md-3">
                                  <div className="larg_font">{info.DepartureTime}</div>
                                  <div className="font-s marTop44">
                                  </div>
                                </li>
                                <li className="col-md-3">
                                  <div className="fontMDtext ">hours{info.stopsDuration.hours},minutes{info.stopsDuration.minutes} </div>
                                </li>
                                <li className="col-md-3">
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
                                    FCFA  <dl>1398 </dl> <strong>1328</strong>
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
                            <div className="d-flex mt-4">
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
                              <ul className="bottom-panel p-0">
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
                                {/* <li className="amenties b-p-list">
                                <span className="txt-val ">{t('Bus Route')}</span>
                              </li> */}
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
                                                      <strong>{info.trip.startingTime}dfhfgjhnmbn</strong>
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
                                              className="tab-pane fade"
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
            </div>
            {pupup1 && <div className='form_body'>
              <div className='form_tittle' style={{ "height": "40%" }}>
                <button className='close_btn' onClick={() => setpopup1(false)}><CancelOutlinedIcon /></button>
                <form className=''>
                  <section class="traking_main_page">
                    {/* <div class="traking_heading text-center">
                      <h6>Get benefits like:</h6>
                    </div> */}
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
        <PassengerDetails trigger1={popUp} settrigger1={setpopUp} getTripData={location.state.data} BothTripID={selectedSeatsMap} sourceNew={source} destinationNew={destination} returnTripId={retruenTripId} />
      </section>
    </>
  )
}