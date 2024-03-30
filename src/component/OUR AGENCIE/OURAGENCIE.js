import React from 'react'
import home from '../image/setting.png'
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function OURAGENCIE() {
  const { t, i18n } = useTranslation();
  return (
     <>
     <section className="agencies">
  <div className="container">
    <div className="mainHeading">
      <h2 className="mb-5">{t('OUR AGENCIES')}</h2>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('BAMENDA')}({t('HEAD OFFICE')})</h5>
            <p>{t('Opposite PMI Mile 2 Nkwen, Bamenda')}</p>
            <p>{t('Tel')}: (+237) 233 36 37 55 / 233 02 81 83</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('YAOUNDE BIYEM ASSI')}</h5>
            <p>{t('Biyem Assi (Towards Biscuiterie)')}</p>
            <p>{t('Tel')}: (+237) 699 96 80 58</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('YAOUNDE OLEMBE')}</h5>
            <p>{t('Olembe')}</p>
            <p>{t('Tel')}: (+237) 242 04 13 49 </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('DOUALA AGENCY')}</h5>
            <p>{t('Bonabéri')}</p>
            <p>{t('Tel')}: (+237) 243 03 35 56 </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('BUEA AGENCY')}</h5>
            <p>{t('Mile 17')}</p>
            <p>{t('Tel')}: (+237) 696 31 53 43</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('LIMBE AGENCY')}</h5>
            <p>{t('Gare Routière')}</p>
            <p>{t('Tel')}: (+237) 696 16 35 21</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('MBOUDA AGENCY')}</h5>
            <p>{t('Opposite Eneo')}</p>
            <p>{t('Tel')}: (+237) 677 97 96 04</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('TIKO AGENCY')}</h5>
            <p>{t('Opposite 3613')}</p>
            <p>{t('Tel')}: (+237) 696 72 63 10</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('ABADJOU AGENCY')}</h5>
            <p>{t('Koumbou')}</p>
            <p>{t('Tel')}: (+237) (+237) 699 52 75 35</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('KUMBO AGENCY')}</h5>
            <p>{t('Tobin Modern Market')}</p>
            <p>{t('Tel')}: (+237) 696 15 30 01</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('NKAMBE AGENCY')}</h5>
            <p>{t('Former Youth & SportS Office')}</p>
            <p>{t('Tel')}: (+237) 233 36 37 55 / 233 02 81 83</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('NDOP AGENCY')}</h5>
            <p>{t('Opposite Stadium')}</p>
            <p>{t('Tel')}: (+237) 677 64 46 23</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('KUMBA AGENCY')}</h5>
            <p>{t('Opposite Long Road entrance, Besides Green Oil')}</p>
            <p>{t('Tel')}: (+237) 698 65 95 75 </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('FUNDONG AGENCY')}</h5>
            <p>{t('Near Grand Stand')}</p>
            <p>{t('Tel')}: (+237) 675 82 97 70</p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="bamenda">
          <div className="bamenda_img">
            <img src={home} alt="" />
          </div>
          <div>
            <h5>{t('NDU AGENCY')}</h5>
           
            <p>{t('Tel')}: (+237) 679 72 01 62 </p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

     </>
  )
}
