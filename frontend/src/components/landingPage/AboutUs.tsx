import "./styles.scss";

const AboutUs = () => {
  return (
    <>
      <div className="container-xxl py-5" id="yatri-about">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp d-flex align-items-center justify-content-center"
              data-wow-delay="0.1s"
            >
              {/* <div className="position-relative h-100 "> */}
              <div className="ty-ring">
                <img
                  className="traveller-img  img-fluid"
                  src="img/about.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* </div> */}
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to <span className="text-primary">Travel Yatris</span>
              </h1>
              <p className="mb-4">
                At Travel Yatris, we believe that every journey should be an
                adventure, whether you’re exploring a new city or revisiting a
                favorite destination. Our platform connects passionate travelers
                with experienced trip organizers, making it easier than ever to
                find, plan, and embark on the perfect getaway.
              </p>
              {/* <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>First className Flights</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Handpicked Hotels</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>5 Star Accommodations</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Latest Model Vehicles</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>150 Premium City Tours</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>24/7 Service</p>
                                </div>
                            </div>
                            <a className="btn btn-primary py-3 px-5 mt-2" href="">Read More</a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
