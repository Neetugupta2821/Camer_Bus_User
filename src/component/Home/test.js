import React from 'react'

const test = () => {
  return (
    <div>
          <div className="cardDetail">
                                <form>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            onClick={handlsubmitDebit}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Debit/ATM Card

                                        </label>
                                        {debit && (<div
                                            className="debitNo mt-3"

                                            id="AflexRadioDefault1"
                                        >
                                            <div>
                                                <div className='credit_body'>
                                                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                                        <TextField id="outlined-basic" label="DEBIT CARD NUMBER" variant="outlined" className="AddPAdding"  onChange={(e)=>setnumber(e.target.value)}/>
                                                        <TextField id="outlined-basic" label="MM" variant="outlined" sx={{ width: 100 }} className="AddPAdding" onChange={(e)=>setmonth(e.target.value)}/>
                                                        <TextField id="outlined-basic" label="YYYY" variant="outlined" sx={{ width: 100 }} className="AddPAdding"onChange={(e)=>setYear(e.target.value)} />
                                                        <TextField id="outlined-basic" label="CVV NUMBER" variant="outlined" className="AddPAdding"onChange={(e)=>setcvc(e.target.value)} /><br></br>

                                                    </Stack>

                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input checkbtn"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault"
                                                    >
                                                        Secure your card as per the latest RBI guidelines{" "}
                                                        {/* <a href="">Know more</a> */}
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="button" className="paymentbtn" onClick={handlePaytoBook}>
                                                    PAY INR 608.48
                                                </button>
                                            </div>
                                            <div className="privacy">
                                                <p>
                                                    By clicking on pay you agree to our{" "}
                                                    <a href="">Terms Of Use</a> &amp;{" "}
                                                    <a href="">Privacy Policy</a>{" "}
                                                </p>
                                            </div>
                                        </div>)}

                                    </div>
                                    <hr />
                                    <div className="form-check">
                                        <input
                                            className="form-check-input radiobtn"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            onclick={handleSubmitcredit}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Credit Card

                                        </label>
                                        {credit && (<div
                                            className="debitNo mt-3"
                                            id="AflexRadioDefault2"
                                        >
                                            <div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="DEBIT CARD NUMBER"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="NAME ON CARD"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="expirydate">
                                                            <div className="mb-3">
                                                                <label htmlFor="expiry" className="form-label">
                                                                    Expiry Date
                                                                </label>
                                                                <div className="d-flex">
                                                                    <input
                                                                        type="month"
                                                                        className="form-control"
                                                                        id="expiry"
                                                                        placeholder="MONTH"
                                                                    />
                                                                    <input
                                                                        type="month"
                                                                        className="form-control"
                                                                        id="expiry"
                                                                        placeholder="YEAR"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="cvvNumber">
                                                            <div className="d-flex align-items-center">
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="CVV NUMBER"
                                                                    />
                                                                </div>
                                                                <div className="ps-3">
                                                                    <a href=""> What is this?</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input checkbtn"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault"
                                                    >
                                                        Secure your card as per the latest RBI guidelines{" "}
                                                        <a href="">Know more</a>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="button" className="paymentbtn">
                                                    PAY INR {fareType}
                                                </button>
                                            </div>
                                            <div className="privacy">
                                                <p>
                                                    By clicking on pay you agree to our{" "}
                                                    <a href="">Terms Of Use</a> &amp;{" "}
                                                    <a href="">Privacy Policy</a>{" "}
                                                </p>
                                            </div>
                                        </div>)}

                                    </div>
                                </form>
                            </div>
    </div>
  )
}

export default test






















