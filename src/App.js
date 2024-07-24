
import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './component/Home/Home';
import Login from './component/User-signin/Login';
import Signup from './component/User-signin/Signup';
import Aboutus from './component/AboutUs/Aboutus';
import Event from './component/Event/Event';
 import  SearchBus from '../src/component/TicketBooking/SearchBus'
import Header from './component/Home/Header';
import Footer from './component/Home/Footer';
import Profile from './component/User-signin/Profile';
import ResetPassword from './component/User-signin/ResetPassword';
import ForgetPasword from './component/User-signin/ForgetPasword';
import MyBooking from './component/MyTrip/MyBooking';
import ProccessToPay from '../src/component/TicketBooking/ProccessToPay'
import Contact from './component/ContactUs/Contact';
import UpCommingTrip from './component/UpcomingTrip/UpCommingTrip';
import NewOtp from './component/User-signin/NewOtp';
import ScrollToTop from './component/ScrollToTop';
import { ThemeContext } from './component/Context/Context'
import { useState } from 'react';
import FaqPage from './component/Page/FaqPage';
import Conditions from './component/Page/Conditions';
import BackToTopButton from './BackToTopButton/BackToTopButton';
import OURAGENCIE from './component/OUR AGENCIE/OURAGENCIE';
import BookYourTicket from './BOOK YOUR TICKET/BookYourTicket';
import AboutSubMenu from './component/AboutUs/AboutSubMenu';
import PassengerTrans from './component/Event/PassengerTrans';
import BusRental from './component/Event/BusRental';
import MailParcel from './component/Event/MailParcel';
import RegularTravel from './component/Event/RegularTravel';
import FirstClass from './component/Event/FirstClass';
import OurTeam from './component/AboutUs/OurTeam';
import OurFleet from './component/AboutUs/OurFleet';
import TermsConditions from './component/AboutUs/TermsConditions';
import RoundTrip from './component/TicketBooking/RoundTrip';

function App() {

  console.log("time=05:29 date:15/07/2024")
  const switchType = localStorage.getItem("switchMode");
  const [theme, setTheme] = useState(switchType);
  console.log('New change to the fileeeeeeeeeeeeeeeeeeeee');

  return (

    <div className={`App ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>

      <ScrollToTop />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Services" element={<Event />} />
          <Route path="/SearchBus" element={<SearchBus />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ForgetPasword" element={<ForgetPasword />} />
          <Route path="/MyBooking" element={<MyBooking />} />
          <Route path="/ProccessToPay" element={<ProccessToPay />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/UpCommingTrip" element={<UpCommingTrip />} />
          <Route path="/NewOtp" element={<NewOtp />} />
          <Route path="/FAQ" element={<FaqPage />} />
          <Route path="/Conditions" element={<Conditions />}/>
          <Route path="/OURAGENCIE'" element={<OURAGENCIE/>} />
          <Route path="/BookYourTicket" element={<BookYourTicket/>} />
          <Route path="/AboutSubMenu" element={<AboutSubMenu/>} />
          <Route path="/PassengerTrans" element={<PassengerTrans/>} /> 
          <Route path="/BusRental" element={<BusRental/>} />
          <Route path="/MailParcel" element={<MailParcel/>} />
          <Route path="/RegularTravel" element={<RegularTravel/>} />
          <Route path="/FirstClass" element={<FirstClass/>} />
          <Route path="/OurTeam" element={<OurTeam/>} />
          <Route path="/OurFleet" element={<OurFleet/>} /> 
          <Route path="/TermsConditions" element={<TermsConditions/>} />
          <Route path="/RoundTrip" element={<RoundTrip/>} />

          
        </Routes>

        <Footer />
    
      </ThemeContext.Provider>

    </div>
  );
}

export default App;

















