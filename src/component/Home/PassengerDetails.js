import React, { useState, useEffect } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalCulateFare from "./CalCulateFare";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function PassengerDetails({
  trigger1,
  settrigger1,
  getTripData,
  getTripId,
  sourceNew,
  destinationNew,
}) {
  const source = sourceNew;
  const destination = destinationNew;

  const [passengerInfo, setPassengerInfo] = useState([]);
  const Isdisable = passengerInfo.some(
    (info) => !info.name && !info.age && !info.gender === " "
  );
  const [data, setData] = useState([{ name: "", age: "", gender: "" }]);
  const [validationErr, setValidationErr] = useState(false);
  const [error, setError] = useState(false);

  let NumBerOfseat = localStorage.getItem("NumBerOfseat");
  let NoArraySeat = JSON.parse(NumBerOfseat);
  const result = Object.keys(NoArraySeat).map((key) => NoArraySeat[key]);
  const [email, setemail] = useState("");
  const [popUp, setPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const[show,setShow] =useState(false)
  
   
  let emailType = localStorage.getItem("email");

  const getSeat = result[0]?.map((info) => info.seat);

  const MAinId = getTripId;
  const searchBusData = getTripData;
  let getTrip = getTripData.map((info) => {
    return info.trip._id;
  });

  const getlinkID = getTrip.filter((info, index) => {
    return info === getTripId;
  });

  let getTripDate = getTripData.map((info) => {
    return info.trip.startingDate;
  });

  const DateType = getTripDate[0];

  const handleClose = () => {
    setOpen(false);
  };

//   const handlepassangerData = () => {
  

//     if (emailType === null) {
//       setOpen(true);
//     } else if (
//       !passengerInfo.name === "" &&
//       !passengerInfo.age === "" &&
//       !passengerInfo.gender === ""
//     ) {
//       setSubmitting(true);
//       setPopup(false);
//       settrigger1(false);
//     } else {
//       setPopup(true);
//       setSubmitting(false);
//     }
//   };

  const handlePassengerInfoChange = (e, index) => {
    const tempData = [...data];

    if (!tempData[index]) {
      tempData[index] = { name: "", age: "", gender: "" };
    }

    tempData[index][e.target.name] = e.target.value;

    setData(tempData);
  };

  const handleSubmit = () => {
    
    if(emailType){
        
        const isValid = result[0]?.every((passenger, index) => {
            const info = data[index];
            return (
              info &&
              info.name.trim() !== "" &&
              info.age.trim() !== "" &&
              info.gender.trim() !== "" // Validate gender
            );
          });
      
          setValidationErr(!isValid);
          console.log(email,"get the email ny777777777777777777777")
      
          if (isValid && email) {
            setShow(false)
            console.log("All fields filled:", data);
            setError(false);
            setPopup(true)
            settrigger1(false)
          } else {
            console.log("All fields are required");
            setError(true);
            setShow(true)
             
          }
    }else(
        setOpen(true)
    )
  };
  const { t, i18n } = useTranslation();

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
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => settrigger1(false)}
                />
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
                    <span style={{ color: "red" }}>
                      {" "}
                      {error ? "All (*) fields are mandatory to filled!" : ""}
                    </span>{" "}
                    <form className="row mainForm">
                      {result[0]?.map((passenger, index) => (
                        <div key={index}>
                          <div className="col-md-12 form-group">
                            <small>Passenger {index + 1}</small> <br></br>
                            <label className="inputLabel">{t('Name*')}</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Passenger ${index + 1} Name`}
                              onChange={(e) =>
                                handlePassengerInfoChange(e, index)
                              }
                              name="name"
                            />
                          </div>

                          <div className="col-md-6 form-group mt-3">
                            <label className="inputLabel"> {t('Age*')}</label>
                            <input
                              className="form-control"
                              onChange={(e) =>
                                handlePassengerInfoChange(e, index)
                              }
                              name="age"
                            />
                          </div>

                          <div className="col-md-6 form-group mt-3">
                            <label className="inputLabel"> {t ('Gender*')}</label>
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
                          </div>
                        </div>
                      ))}
                    </form>
                    <div className="col-md-12 form-group ">
                      <label className="inputLabel">{t('City of Residence')}</label>
                      <input
                        type="taxt"
                        id="City"
                        className="form-control"
                        name="City"
                      />
                    </div>
                    <div className="col-md-12 form-group mt-3">
                      <label className="inputLabel">{t('State of Residence')} </label>
                      <input
                        type="taxt"
                        id="State"
                        className="form-control"
                        name="State"
                        readOnly=""
                        autoComplete="off"
                      />
                    </div>
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
                        <label className="inputLabel">Email*</label>
                        <input
                          type="taxt"
                          id="email"
                          className="form-control"
                          name="name"
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12 form-group mt-3">
                        <label className="inputLabel">{t('Phone Number')}</label>
                        <div className="row">
                          <div className="col-md-3">
                            <input
                              type="taxt"
                              id="Age"
                              className="form-control"
                              name="Age"
                            />
                          </div>
                          <div className="col-md-9">
                            <input
                              type="taxt"
                              id="Age"
                              className="form-control"
                              name="Age"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 form-group ">
                        <div className="GSTform">
                          <div className="gst-check">
                            <input type="checkbox" id="gstcheck" />
                            <label htmlFor="gstcheck">
                              {t('I have a GST number (optional)?')}
                            </label>
                          </div>
                          <div className="row" style={{}}>
                            <div className="col-md-6 form-group mt-3">
                              <label className="inputLabel">GSTIN</label>
                              <input
                                type="taxt"
                                id="name"
                                className="form-control"
                                name="name"
                              />
                            </div>
                            <div className="col-md-6 form-group mt-3">
                              <label className="inputLabel">
                                Business Name
                              </label>
                              <input
                                type="taxt"
                                id="name"
                                className="form-control"
                                name="name"
                              />
                            </div>
                            <div className="col-md-6 form-group mt-3">
                              <label className="inputLabel">
                                Business Address
                              </label>
                              <input
                                type="taxt"
                                id="name"
                                className="form-control"
                                name="name"
                              />
                            </div>
                            <div className="col-md-6 form-group mt-3">
                              <label className="inputLabel">
                                Business Email
                              </label>
                              <input
                                type="taxt"
                                id="name"
                                className="form-control"
                                name="name"
                              />
                            </div>
                            <div className="col-md-12 form-group mt-3">
                              <p className="case_of_invalid">
                                 {t('In case of invalid/cancelled GSTIN, this booking')}
                               {t('shall be considered as personal  booking')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>{" "}
                  {/* informationForm */}
                </div>
                <div className="popupFooter">
                  <p className="ByclickingProceed">
                     {t('By clicking on proceed, I agree that I have read and understood the ')}<a href="#!">{t('TnCs')}</a>{t('and the')}{" "}
                    <a href="#!">{t ('Privacy Policy')} </a>
                  </p>
                  <div className="proceedPay">
                    <div className="totleAmt">
                      {/* Total Amount :<span>INR 396.95</span> */}
                    </div>
                    {/* <Link to="/component/Home/ProccessToPay"><button className="proceedBtnPay" onClick={handlepassangerData}>Proceed to pay</button></Link>  */}
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
                        <p>kindly sign up your account</p>
                        <Link to="/Signup">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ width: 100 }}
                          >
                            signup
                          </Button>
                        </Link>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Close</Button>
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
        id={getlinkID}
        allData={searchBusData}
        email={email}
        iditem={MAinId}
        sourceNext={source}
        destinationNext={destination}
      />
    </div>
  );
}
