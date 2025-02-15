import Header from '../components/landingPage/Header'
import AboutUs from '../components/landingPage/AboutUs'
import Destination from '../components/landingPage/Destination'
import ContactUs from '../components/landingPage/ContactUs'
import Footer from '../components/landingPage/Footer'
import Travellers from '../components/landingPage/travellers'
import Why from '../components/landingPage/Why'
import Testimonial from '../components/landingPage/Testimonial'
import LatestTrips from '../components/landingPage/latestTrips'
import { useRef } from 'react'
import Faq from '../components/landingPage/Faq'

export interface IChildRef {
    handleClose: () => void;
    handleShow: () => void;
  }
const Home = () => {
    const registerChildRef = useRef<IChildRef>();
    const loginChildRef = useRef<IChildRef>();

    return (
        <>
            <Header registerChildRef={registerChildRef} loginChildRef={loginChildRef}/>
            <LatestTrips registerChildRef={registerChildRef}/>
            <AboutUs />
            <Travellers />
            <Destination />
            <ContactUs />
            <Testimonial />
            <Why />
            <Faq />
            <Footer />
        </>
    )
}

export default Home