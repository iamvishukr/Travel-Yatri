import OwlCarousel from 'react-owl-carousel';
import { useGetLatest10TripQuery } from '../../redux/services/trip';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/User';

const options = {
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
        0: {
            items: 1,
        },
        662: {
            items: 2
        },
        768: {
            items: 3,
        },
        992: {
            items: 4,
        },
    },
};
const LatestTrips: React.FC<any> = ({ registerChildRef }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();


    const { data, isLoading } = useGetLatest10TripQuery()

    return (<>
        {(!isLoading && data?.data?.length) ? <>
            <div id="yatri-latest-trips" className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h6 className="section-title bg-white text-center text-primary px-3">Latest Trips</h6>
                        <h1 className="mb-5">Our Recent Adventures !!</h1>
                    </div>
                </div>
                <div className='searched-cards-section' style={{ boxShadow: "none" }}>

                    <OwlCarousel className="owl-carousel searched-body testimonial-carousel position-relative" {...options}>
                        {data?.data?.map((trip, index) => {
                            return (
                                <div className="searched-card" key={index}>
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}${trip?.photos?.[0]?.path
                                            }`}
                                        alt="card_img"
                                    />
                                    <div className="trip-detail">
                                        <h4>{typeof trip?.place === "object" ? trip?.place?.join('-') : trip?.place}</h4>
                                        <div className="date-seats">
                                            <p>
                                                Starts from{" "}
                                                {format(
                                                    trip.startDate as string,
                                                    "LLL dd, yyyy"
                                                )}
                                            </p>
                                            <p> {trip?.leftSeats} Seats left</p>
                                        </div>
                                        <h6
                                            onClick={() => {
                                                if (registerChildRef.current && !user) {
                                                    registerChildRef.current.handleShow();
                                                } else {
                                                    navigate("/dashboard/all-trip");
                                                }
                                            }}
                                        >
                                            View details
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}

                    </OwlCarousel>
                </div>

            </div>
        </> : <></>}
    </>
    )
}

export default LatestTrips