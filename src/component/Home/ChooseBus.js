import React from 'react'
import bus1 from '../image/bus1.jpg'
import bus2 from '../image/bus2.jpg'
import bus3 from '../image/bus3.jpg'
import GradeIcon from '@mui/icons-material/Grade';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
export default function ChooseBus() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section_who-we-are section-paddings">
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <div className="leftCont">
          <div className="enjoy_journey text-start">
            <p className="smallTitle">{t('Choose the bus')}</p>
            <div className="mainHeading">
              <h2>{t('Get on the road with our bus rental')}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="rightCont">
          <p>
          {t('Since 1998,Camer Travel provides we have affordable transportation solutions to fit most any budget. We consistently deliver the level of quality and professionalism that sets the transportation industry standard')}
          </p>
        </div>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-4 AddGapTop">
        <div className="busDetails">
          <div className="choosebusImg">
            <img src={bus1}  alt="img" />
          </div>
          <div className="detailCont">
            <h3>
              Setra Bus <span>/ 56-Passenger</span>
            </h3>
            <ul className="ratting">
              <li>
                <GradeIcon  className="material-icons"/>
                {/* <i ">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
              </li>
              <li>
                <StarHalfIcon className="material-icons"/>
                {/* <i  >star_half</i> */}
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
<<<<<<< HEAD
            {/* <a href="#!" className="viewDetailBtn">
              View Detail
            </a> */}
=======
            <a href="#!" className="viewDetailBtn">
              View Detail
            </a>
>>>>>>> origin/master
          </div>
        </div>
      </div>
      <div className="col-md-4 AddGapTop">
        <div className="busDetails">
          <div className="choosebusImg">
            <img src={bus2}  alt="img" />
          </div>
          <div className="detailCont">
            <h3>
              Van Hool Bus <span>/ 56-Passenger</span>
            </h3>
            <ul className="ratting">
              <li>
                <GradeIcon  className="material-icons"/>
                {/* <i ">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
              </li>
              <li>
                <StarHalfIcon className="material-icons"/>
                {/* <i  >star_half</i> */}
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
<<<<<<< HEAD
            {/* <a href="#!" className="viewDetailBtn">
              View Detail
            </a> */}
=======
            <a href="#!" className="viewDetailBtn">
              View Detail
            </a>
>>>>>>> origin/master
          </div>
        </div>
      </div>
      <div className="col-md-4 AddGapTop">
        <div className="busDetails">
          <div className="choosebusImg">
            <img src={bus3}  alt="img" />
          </div>
          <div className="detailCont">
            <h3>
              MCI Bus <span>/ 56-Passenger</span>
            </h3>
            <ul className="ratting">
              <li>
                <GradeIcon  className="material-icons"/>
                {/* <i ">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
                {/* <i className="material-icons">star</i> */}
              </li>
              <li>
              <GradeIcon  className="material-icons"/>
              </li>
              <li>
                <StarHalfIcon className="material-icons"/>
                {/* <i  >star_half</i> */}
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
<<<<<<< HEAD
            {/* <a href="#!" className="viewDetailBtn">
              View Detail
            </a> */}
=======
            <a href="#!" className="viewDetailBtn">
              View Detail
            </a>
>>>>>>> origin/master
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}
