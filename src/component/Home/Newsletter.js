import React from 'react'
import { Link } from "react-router-dom";

export default function Newsletter() {
  return (
    <section className="section_newsletter">
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="newsletterText">
            <h3>
              Signup our newsletter to get update information, news, insight or
              promotions.
            </h3>
          </div>
        </div>
        <div className="col-md-5">
          <div className="newsletterForm">
            <form>
              <input
                type="text"
                id="newsletter"
                placeholder="Enter youre email..."
                className="form-control"
                required=""
              />
              <Link to="/Signup"><button className="viewDetailBtn" >Sign Up</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}
