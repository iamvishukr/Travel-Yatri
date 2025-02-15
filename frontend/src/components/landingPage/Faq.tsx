import "./faq.scss"

const Faq = () => {
    return (
        <>

            <div id="yatri-faq" className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h6 className="section-title bg-white text-center text-primary px-3">Faq's</h6>
                        {/* <h1 className="mb-5">Our Clients Say!!!</h1> */}
                    </div>
                    <div className="w-lg-50 mx-auto" style={{ marginTop: "20px" }}>
                        {/* <h6 className="mb-2">FAQ | Frequently Asked Questions</h6>
                        <h2 className="mb-5">Have a Questions</h2> */}
                        <div className="accordion accordion-flush" id="accordionExample">

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll1"  aria-controls="coll1">
                                        <h5> What is Travel Yatris? </h5>
                                    </button>
                                </h2>
                                <div id="coll1" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Travel Yatris is your trusted travel companion offering curated trips, personalized itineraries, and unique travel experiences designed for explorers of all kinds.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll2" aria-expanded="true" aria-controls="coll2">
                                        <h5> How do I book a trip on Travel Yatris? </h5>
                                    </button>
                                </h2>
                                <div id="coll2" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        You can browse our trips, select your desired package, and book directly through our website. Simply follow the prompts on the trip page to confirm your booking.


                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll3" aria-expanded="true" aria-controls="coll3">
                                        <h5> Do you offer customizable travel packages?  </h5>
                                    </button>
                                </h2>
                                <div id="coll3" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Yes, we offer customizable travel packages to suit your preferences. You can reach out to us with your requirements, and we’ll create a tailor-made itinerary for you.




                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#coll4" aria-expanded="true" aria-controls="coll4">
                                        <h5> What payment methods do you accept?</h5>
                                    </button>
                                </h2>
                                <div id="coll4" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        We accept all major credit/debit cards, net banking, UPI, and digital wallets.




                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Faq