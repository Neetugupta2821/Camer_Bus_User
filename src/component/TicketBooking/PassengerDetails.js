import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalCulateFare from '../TicketBooking/CalCulateFare'
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

export default function PassengerDetails({
  trigger1,
  settrigger1,
  getTripData,
  getTripId,
  sourceNew,
  destinationNew,
  BothTripID,
  returnTripId
}) {
  const { t, i18n } = useTranslation();
  const source = sourceNew;
  const destination = destinationNew;

  const [passengerInfo, setPassengerInfo] = useState([]);
  const [data, setData] = useState([{ name: "", age: "", gender: "" }]);
  const [touched, setTouched] = useState([{ name: false, age: false, gender: false }]);
  const [validationErr, setValidationErr] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setemail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [popUp, setPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [firstID, setFirstID] = useState("")
  const [secondID, setSecondId] = useState("")
  const [show, setShow] = useState(false)
  const [tripid, setTripID] = useState("")
  let NumBerOfseat = localStorage.getItem("NumBerOfseat");
  let NoArraySeat = JSON.parse(NumBerOfseat);
  const result = Object.keys(NoArraySeat).map((key) => NoArraySeat[key]);

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only letters and spaces
  const validateAge = (age) => /^\d{1,2}$/.test(age); // Only digits, 1 or 2 digits long
  const validateGender = (gender) => ["male", "female"].includes(gender);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
  const validatePhoneNumber = (phone) => /^\d+$/.test(phone); // Only digits

  let emailType = localStorage.getItem("email");
  const getSeat = result[0]?.map((info) => info.seat);

  const MAinId = getTripId;
  const searchBusData = getTripData;
  const handleFunction = () => {
    // Check if 'roundtrip' key exists in localStorage
    if (localStorage.getItem("SetTripstatus") === "oneway") {
      // Get trip IDs from getTripData
      let getTrip = getTripData?.map((info) => info.trip._id);

      // Filter out the specific trip ID
      const getlinkID = getTrip?.filter((info) => info === getTripId);
      setTripID(getlinkID)
      // Get starting dates from getTripData
      let getTripDate = getTripData?.map((info) => info.trip.startingDate);

      // Get the first trip's starting date
      const DateType = getTripDate[0];

      // Add your logic here for using getlinkID and DateType
      console.log("Trip ID:", getlinkID);
      console.log("Trip Starting Date:", DateType);
    } else {
      console.log(BothTripID)
    }
  };

  useEffect(() => {
    handleFunction();
  }, [getTripData, getTripId, BothTripID]);



  const handleClose = () => {
    setOpen(false);
  };

  const handlePassengerInfoChange = (e, index) => {
    const { name, value } = e.target;
    const tempData = [...data];
    const tempTouched = [...touched];

    // Ensure the data and touched arrays are properly initialized for the given index
    if (!tempData[index]) {
      tempData[index] = { name: "", age: "", gender: "" };
    }
    if (!tempTouched[index]) {
      tempTouched[index] = { name: false, age: false, gender: false };
    }

    tempData[index][name] = value;
    tempTouched[index][name] = true;

    setData(tempData);
    setTouched(tempTouched);
    setValidationErr(false); // Reset validation error when user starts typing
  };


  const handleEmailChange = (e) => {
    setemail(e.target.value);
    setEmailTouched(true);
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneTouched(true);
  }

  const handleSubmit = () => {
    const isValid = data.every((info) => {
      return (
        validateName(info.name) &&
        validateAge(info.age) &&
        validateGender(info.gender)
      );
    });

    const isEmailValid = validateEmail(email);

    // Additional validation for age between 1-2 years
    const isAgeValid = data.every((info) => {
      const age = parseInt(info.age);
      return !(age >= 1 && age <= 2);
    });

    if (!isValid || !isEmailValid || !isAgeValid) {
      setError(true);
      setValidationErr(true);
      return;
    }

    if (emailType) {
      setShow(false);
      setError(false);
      setPopup(true);
      settrigger1(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      {trigger1 && (
        <div
          className="modal"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {t('Passenger Details')}
                </h1>
                <button
                  type="button"
                  className="close_btn"
                  data-bs-dismiss="modal"
                  onClick={() => settrigger1(false)}
                ><CloseIcon /></button>
              </div>
              <div className="modal-body">
                <div className="passengerInformation">
                  <h3 className="informationTitle">
                    <span className="material-icons">
                      <AccountCircleIcon />
                    </span>{" "}
                    {t('Passenger Information')}
                  </h3>
                  <div className="informationForm">
                    {validationErr && <span style={{ color: "red" }}>All (*) fields are mandatory and must be valid!</span>}
                    <form className="row mainForm">
                      {result[0]?.map((passenger, index) => (
                        <div key={index}>
                          <div className="col-md-12 form-group">
                            <small>Passenger {index + 1}</small> <br></br>
                            <label className="inputLabel">{t('Name')}<span style={{ "color": "red" }}>*</span></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Passenger ${index + 1} Name`}
                              onChange={(e) =>
                                handlePassengerInfoChange(e, index)
                              }
                              name="name"
                            />
                            {touched[index]?.name && !validateName(data[index]?.name) && <span style={{ color: 'red' }}>Invalid name. Only letters and spaces are allowed.</span>}
                          </div>

                          <div className="col-md-6 form-group mt-3">
                            <label className="inputLabel"> {t('Age')}<span style={{ "color": "red" }}>*</span></label>
                            <input
                              className="form-control"
                              onChange={(e) =>
                                handlePassengerInfoChange(e, index)
                              }
                              name="age"
                            />
                            {touched[index]?.age &&
                              (!validateAge(data[index]?.age) ||
                                (parseInt(data[index]?.age) >= 1 &&
                                  parseInt(data[index]?.age) <= 2) ||
                                parseInt(data[index]?.age) <= 0) && (
                                <span style={{ color: "red" }}>
                                  {t("Child seats cannot be booked. Only ages 3 and above are allowed.")}
                                </span>
                              )}

                          </div>

                          <div className="col-md-6 form-group mt-3">
                            <label className="inputLabel"> {t('Gender')}<span style={{ "color": "red" }}>*</span></label>
                            <select
                              className="form-select"
                              onChange={(e) =>
                                handlePassengerInfoChange(e, index)
                              }
                              name="gender"
                            >
                              <option value="">{t('Select Gender')} </option>
                              <option value="male">{t('Male')} </option>
                              <option value="female">{t('Female')}</option>
                            </select>
                            {touched[index]?.gender && !validateGender(data[index]?.gender) && <span style={{ color: 'red' }}>Invalid gender. Please select a gender.</span>}
                          </div>
                        </div>
                      ))}
                    </form>
                  </div>
                  <h3 className="informationTitle">
                    <span className="material-icons">
                      <AccountCircleIcon />{" "}
                    </span>{" "}
                    {t('Contact Details')}
                  </h3>
                  <div className="informationForm">
                    <p className="yourTicket">
                      {t('Your ticket will be sent to these details')}
                    </p>
                    <form className="row mainForm">
                      <div className="col-md-12 form-group ">
                        <label className="inputLabel">{t("Email")}<span style={{ "color": "red" }}>*</span></label>
                        <input
                          type="text"
                          id="email"
                          className="form-control"
                          name="email"
                          onChange={handleEmailChange}
                        />
                        {emailTouched && !validateEmail(email) && <span style={{ color: 'red' }}>Invalid email address.</span>}
                      </div>
                      <div className="col-md-12 form-group mt-3">
                        <label className="inputLabel mb-3">{t('Phone Number')}</label>
                        <div className="d-flex align-items-center justify-content-center">
                          <Autocomplete
                            id="country-select-demo"
                            sx={{ width: 200, m: 0 }}
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.phone}
                            renderOption={(props, option) => (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                  loading="lazy"
                                  width="20"
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  alt=""
                                />
                                {option.label} ({option.code}) +{option.phone}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose a country"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password',
                                }}
                              />
                            )}
                          />
                          <input
                            type="number"
                            id="phone-number"
                            className="form-control"
                            name="phone-number"
                            style={{ 'padding': '8px' }}
                            onChange={handlePhoneChange}
                          />
                          {phoneTouched && !validatePhoneNumber(phone) && <span style={{ color: 'red' }}>Invalid phone number.</span>}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="popupFooter">
                  <p className="ByclickingProceed">
                    {t('By clicking on proceed, I agree that I have read and understood the ')}<Link to='/Conditions' >{t('Terms And Conditions')}</Link>
                  </p>
                  <div className="proceedPay">
                    <button className="proceedBtnPay" onClick={handleSubmit}>
                      {t('Proceed to booking')}
                    </button>
                  </div>
                </div>
              </div>

              {emailType === null && (
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
                        <p>{t('kindly sign up your account')}</p>
                        <Link to="/Signup">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ width: 100 }}
                          >
                            {t("Sign up")}
                          </Button>
                        </Link>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>{t("Close")}</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}

      <CalCulateFare
        trigger={popUp}
        settrigger={setPopup}
        passenferInfo={data}
        seat={getSeat}
        id={tripid}
        roundTrip={BothTripID}
        allData={searchBusData}
        email={email}
        iditem={MAinId}
        sourceNext={source}
        destinationNext={destination}
        returnTripId={returnTripId}
      />
    </div>
  );
}

const countries = [
  { code: 'AD', phone: '376' },
  {
    code: 'AE',

    phone: '971',
  },
  { code: 'AF', phone: '93' },
  {
    code: 'AG',

    phone: '1-268',
  },
  { code: 'AI', phone: '1-264' },
  { code: 'AL', phone: '355' },
  { code: 'AM', phone: '374' },
  { code: 'AO', phone: '244' },
  { code: 'AQ', phone: '672' },
  { code: 'AR', phone: '54' },
  { code: 'AS', phone: '1-684' },
  { code: 'AT', phone: '43' },
  {
    code: 'AU',

    phone: '61',
    suggested: true,
  },
  { code: 'AW', phone: '297' },
  { code: 'AX', phone: '358' },
  { code: 'AZ', phone: '994' },
  {
    code: 'BA',

    phone: '387',
  },
  { code: 'BB', phone: '1-246' },
  { code: 'BD', phone: '880' },
  { code: 'BE', phone: '32' },
  { code: 'BF', phone: '226' },
  { code: 'BG', phone: '359' },
  { code: 'BH', phone: '973' },
  { code: 'BI', phone: '257' },
  { code: 'BJ', phone: '229' },
  { code: 'BL', phone: '590' },
  { code: 'BM', phone: '673' },
  { code: 'BO', phone: '591' },
  { code: 'BR', phone: '55' },
  { code: 'BS', phone: '1-242' },
  { code: 'BT', phone: '975' },
  { code: 'BV', hone: '47' },
  { code: 'BW', phone: '267' },
  { code: 'BY', phone: '375' },
  { code: 'BZ', phone: '501' },
  {
    code: 'CA',

    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',

    phone: '61',
  },
  {
    code: 'CD',

    phone: '243',
  },
  {
    code: 'CF',

    phone: '236',
  },
  {
    code: 'CG',

    phone: '242',
  },
  { code: 'CH', phone: '41' },
  { code: 'CI', phone: '225' },
  { code: 'CK', phone: '682' },
  { code: 'CL', phone: '56' },
  { code: 'CM', phone: '237' },
  { code: 'CN', phone: '86' },
  { code: 'CO', phone: '57' },
  { code: 'CR', phone: '506' },
  { code: 'CU', phone: '53' },
  { code: 'CV', phone: '238' },
  { code: 'CW', phone: '599' },
  { code: 'CX', phone: '61' },
  { code: 'CY', phone: '357' },
  { code: 'CZ', phone: '420' },
  {
    code: 'DE',

    phone: '49',
    suggested: true,
  },
  { code: 'DJ', phone: '253' },
  { code: 'DK', phone: '45' },
  { code: 'DM', phone: '1-767' },
  {
    code: 'DO',

    phone: '1-809',
  },
  { code: 'DZ', phone: '213' },
  { code: 'EC', phone: '593' },
  { code: 'EE', phone: '372' },
  { code: 'EG', phone: '20' },
  { code: 'EH', phone: '212' },
  { code: 'ER', phone: '291' },
  { code: 'ES', phone: '34' },
  { code: 'ET', phone: '251' },
  { code: 'FI', phone: '358' },
  { code: 'FJ', phone: '679' },
  {
    code: 'FK',

    phone: '500',
  },
  {
    code: 'FM',

    phone: '691',
  },
  { code: 'FO', phone: '298' },
  {
    code: 'FR',

    phone: '33',
    suggested: true,
  },
  { code: 'GA', phone: '241' },
  { code: 'GB', phone: '44' },
  { code: 'GD', phone: '1-473' },
  { code: 'GE', phone: '995' },
  { code: 'GF', phone: '594' },
  { code: 'GG', hone: '44' },
  { code: 'GH', phone: '233' },
  { code: 'GI', phone: '350' },
  { code: 'GL', phone: '299' },
  { code: 'GM', phone: '220' },
  { code: 'GN', phone: '224' },
  { code: 'GP', phone: '590' },
  { code: 'GQ', phone: '240' },
  { code: 'GR', phone: '30' },
  {
    code: 'GS',

    phone: '500',
  },
  { code: 'GT', phone: '502' },
  { code: 'GU', phone: '1-671' },
  { code: 'GW', phone: '245' },
  { code: 'GY', phone: '592' },
  { code: 'HK', phone: '852' },
  {
    code: 'HM',

    phone: '672',
  },
  { code: 'HN', phone: '504' },
  { code: 'HR', phone: '385' },
  { code: 'HT', phone: '509' },
  { code: 'HU', phone: '36' },
  { code: 'ID', phone: '62' },
  { code: 'IE', phone: '353' },
  { code: 'IL', phone: '972' },
  { code: 'IM', phone: '44' },
  { code: 'IN', phone: '91' },
  {
    code: 'IO',

    phone: '246',
  },
  { code: 'IQ', phone: '964' },
  {
    code: 'IR',

    phone: '98',
  },
  { code: 'IS', phone: '354' },
  { code: 'IT', phone: '39' },
  { code: 'JE', phone: '44' },
  { code: 'JM', phone: '1-876' },
  { code: 'JO', phone: '962' },
  {
    code: 'JP',

    phone: '81',
    suggested: true,
  },
  { code: 'KE', phone: '254' },
  { code: 'KG', phone: '996' },
  { code: 'KH', phone: '855' },
  { code: 'KI', phone: '686' },
  { code: 'KM', phone: '269' },
  {
    code: 'KN',

    phone: '1-869',
  },
  {
    code: 'KP',

    phone: '850',
  },
  { code: 'KR', phone: '82' },
  { code: 'KW', phone: '965' },
  { code: 'KY', phone: '1-345' },
  { code: 'KZ', phone: '7' },
  {
    code: 'LA',

    phone: '856',
  },
  { code: 'LB', phone: '961' },
  { code: 'LC', phone: '1-758' },
  { code: 'LI', phone: '423' },
  { code: 'LK', phone: '94' },
  { code: 'LR', phone: '231' },
  { code: 'LS', phone: '266' },
  { code: 'LT', phone: '370' },
  { code: 'LU', phone: '352' },
  { code: 'LV', phone: '371' },
  { code: 'LY', phone: '218' },
  { code: 'MA', phone: '212' },
  { code: 'MC', phone: '377' },
  {
    code: 'MD',

    phone: '373',
  },
  { code: 'ME', phone: '382' },
  {
    code: 'MF',

    phone: '590',
  },
  { code: 'MG', phone: '261' },
  { code: 'MH', phone: '692' },
  {
    code: 'MK',

    phone: '389',
  },
  { code: 'ML', phone: '223' },
  { code: 'MM', phone: '95' },
  { code: 'MN', phone: '976' },
  { code: 'MO', phone: '853' },
  {
    code: 'MP',

    phone: '1-670',
  },
  { code: 'MQ', phone: '596' },
  { code: 'MR', phone: '222' },
  { code: 'MS', phone: '1-664' },
  { code: 'MT', phone: '356' },
  { code: 'MU', phone: '230' },
  { code: 'MV', phone: '960' },
  { code: 'MW', phone: '265' },
  { code: 'MX', phone: '52' },
  { code: 'MY', phone: '60' },
  { code: 'MZ', phone: '258' },
  { code: 'NA', phone: '264' },
  { code: 'NC', phone: '687' },
  { code: 'NE', phone: '227' },
  { code: 'NF', phone: '672' },
  { code: 'NG', phone: '234' },
  { code: 'NI', hone: '505' },
  { code: 'NL', phone: '31' },
  { code: 'NO', phone: '47' },
  { code: 'NP', phone: '977' },
  { code: 'NR', phone: '674' },
  { code: 'NU', phone: '683' },
  { code: 'NZ', phone: '64' },
  { code: 'OM', phone: '968' },
  { code: 'PA', phone: '507' },
  { code: 'PE', phone: '51' },
  { code: 'PF', phone: '689' },
  { code: 'PG', phone: '675' },
  { code: 'PH', phone: '63' },
  { code: 'PK', phone: '92' },
  { code: 'PL', phone: '48' },
  {
    code: 'PM',

    phone: '508',
  },
  { code: 'PN', phone: '870' },
  { code: 'PR', phone: '1' },
  {
    code: 'PS',

    phone: '970',
  },
  { code: 'PT', phone: '351' },
  { code: 'PW', phone: '680' },
  { code: 'PY', phone: '595' },
  { code: 'QA', phone: '974' },
  { code: 'RE', phone: '262' },
  { code: 'RO', phone: '40' },
  { code: 'RS', phone: '381' },
  { code: 'RU', phone: '7' },
  { code: 'RW', phone: '250' },
  { code: 'SA', phone: '966' },
  { code: 'SB', phone: '677' },
  { code: 'SC', phone: '248' },
  { code: 'SD', phone: '249' },
  { code: 'SE', phone: '46' },
  { code: 'SG', phone: '65' },
  { code: 'SH', phone: '290' },
  { code: 'SI', phone: '386' },
  {
    code: 'SJ',

    phone: '47',
  },
  { code: 'SK', phone: '421' },
  { code: 'SL', phone: '232' },
  { code: 'SM', phone: '378' },
  { code: 'SN', phone: '221' },
  { code: 'SO', phone: '252' },
  { code: 'SR', phone: '597' },
  { code: 'SS', phone: '211' },
  {
    code: 'ST',

    phone: '239',
  },
  { code: 'SV', phone: '503' },
  {
    code: 'SX',

    phone: '1-721',
  },
  {
    code: 'SY',

    phone: '963',
  },
  { code: 'SZ', phone: '268' },
  {
    code: 'TC',

    phone: '1-649',
  },
  { code: 'TD', phone: '235' },
  {
    code: 'TF',

    phone: '262',
  },
  { code: 'TG', phone: '228' },
  { code: 'TH', phone: '66' },
  { code: 'TJ', phone: '992' },
  { code: 'TK', phone: '690' },
  { code: 'TL', phone: '670' },
  { code: 'TM', phone: '993' },
  { code: 'TN', phone: '216' },
  { code: 'TO', phone: '676' },
  { code: 'TR', phone: '90' },
  {
    code: 'TT',

    phone: '1-868',
  },
  { code: 'TV', phone: '688' },
  {
    code: 'TW',

    phone: '886',
  },
  {
    code: 'TZ',

    phone: '255',
  },
  { code: 'UA', phone: '380' },
  { code: 'UG', phone: '256' },
  {
    code: 'US',

    phone: '1',
    suggested: true,
  },
  { code: 'UY', phone: '598' },
  { code: 'UZ', phone: '998' },
  {
    code: 'VA',

    phone: '379',
  },
  {
    code: 'VC',

    phone: '1-784',
  },
  { code: 'VE', phone: '58' },
  {
    code: 'VG',

    phone: '1-284',
  },
  {
    code: 'VI',

    phone: '1-340',
  },
  { code: 'VN', phone: '84' },
  { code: 'VU', phone: '678' },
  { code: 'WF', phone: '681' },
  { code: 'WS', phone: '685' },
  { code: 'XK', phone: '383' },
  { code: 'YE', phone: '967' },
  { code: 'YT', phone: '262' },
  { code: 'ZA', phone: '27' },
  { code: 'ZM', phone: '260' },
  { code: 'ZW', phone: '263' },
];
