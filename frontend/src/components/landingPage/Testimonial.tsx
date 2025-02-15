import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Testimonial = () => {
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
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    };

    return (
        <div id="yatri-testimonials" className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="text-center">
                    <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
                    <h1 className="mb-5">Our Clients Say!!!</h1>
                </div>
                <OwlCarousel className="owl-carousel testimonial-carousel position-relative" {...options}>
                    <div className="testimonial-item bg-white text-center border p-4">
                        <img
                            className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                            src="img/testimonial/testimonial-1.jpg"
                            alt="Client 1"
                            style={{ width: '80px', height: '80px' }}
                        />
                        <h5 className="mb-0">Ankit</h5>
                        {/* <p>New York, USA</p> */}
                        <p className="mb-0">
                            An unforgettable experience! Every detail was taken care of, making our trip smooth and worry-free
                        </p>
                    </div>
                    <div className="testimonial-item bg-white text-center border p-4">
                        <img
                            className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                            src="img/testimonial/testimonial-2.jpeg"
                            alt="Client 2"
                            style={{ width: '80px', height: '80px' }}
                        />
                        <h5 className="mb-0">Aahil khan</h5>
                        {/* <p>New York, USA</p> */}
                        <p className="mt-2 mb-0">
                            The best travel agency I've ever used! Great destinations, well-planned itineraries, and excellent support
                        </p>
                    </div>
                    <div className="testimonial-item bg-white text-center border p-4">
                        <img
                            className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                            src="img/testimonial/testimonial-3.jpeg"
                            alt="Client 3"
                            style={{ width: '80px', height: '80px' }}
                        />
                        <h5 className="mb-0">Uday sharma</h5>
                        {/* <p>New York, USA</p> */}
                        <p className="mt-2 mb-0">
                            Highly recommended! They made our dream vacation a reality with personalized service and unique experiences.
                        </p>
                    </div>
                    <div className="testimonial-item bg-white text-center border p-4">
                        <img
                            className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                            src="img/testimonial/testimonial-4.jpeg"
                            alt="Client 4"
                            style={{ width: '80px', height: '80px', objectFit: "cover" }}
                        />
                        <h5 className="mb-0">kamal</h5>
                        {/* <p>New York, USA</p> */}
                        <p className="mt-2 mb-0">
                            From booking to travel, everything was perfect. The team’s knowledge and care made the trip truly memorable!
                        </p>
                    </div>
                    <div className="testimonial-item bg-white text-center border p-4">
                        <img
                            className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                            src="img/testimonial/testimonial-5.jpeg"
                            alt="Client 4"
                            style={{ width: '80px', height: '80px', objectFit: "cover" }}
                        />
                        <h5 className="mb-0">sanjay</h5>
                        {/* <p>New York, USA</p> */}
                        <p className="mt-2 mb-0">
                            A fantastic journey! The itinerary was well-organized, with perfect accommodations and amazing local experiences."
                        </p>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    )
}

export default Testimonial