const Footer = () => {
  return (
    <div
      className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 footer-column-1">
            <h4 className="text-white mb-3">Company</h4>
            {/* <p className="text-left">At travelYatri, we believe that every journey should be an adventure, whether you’re exploring a new city or revisiting a favorite destination. Our platform connects passionate travelers with experienced trip organizers, making it easier than ever to find, plan, and embark on the perfect getaway.</p> */}
            <a className="btn btn-link" href="#yatri-home">Home</a>
            <a className="btn btn-link" href="#yatri-about">About</a>
            <a className="btn btn-link" href="#yatri-destination">Destination</a>
            <a className="btn btn-link" href="#yatri-testimonials">Testimonials</a>
            <a className="btn btn-link" href="#yatri-contact-us">Contact Us</a>
            {/* <a className="btn btn-link" href="">FAQs & Help</a> */}
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Contact</h4>
            {/* <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p> */}
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>6284 530 019
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>travellyatris@gmail.com
            </p>
            <div className="d-flex pt-2">
              <a
                className="btn btn-outline-light btn-social"
                href="https://www.instagram.com/Travel.yatris/"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="https://www.facebook.com/travelyatris?mibextid=rS40aB7S9Ucbxw6v" target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="https://x.com/travelyatris?t=xqBjS7VZEEBQO3woXu5cLA&s=08">
                <i className="fab fa-twitter"></i>
              </a>
              {/* <a className="btn btn-outline-light btn-social" href="">
                <i className="fab fa-linkedin-in"></i>
              </a> */}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 footer-gallery">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="row g-2 pt-2">
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-1.jpg"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-2.jpg"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-3.jpg"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-4.jpg"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-5.jpg"
                  alt=""
                />
              </div>
              <div className="col-4">
                <img
                  className="img-fluid bg-light p-1"
                  src="img/footer/footer-6.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6">
            <h4 className="text-white mb-3">Newsletter</h4>
            <p>
              Subscribe now for the latest travel tips, destination guides, and
              exclusive offers.
            </p>
            <div
              className="position-relative mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <input
                className="form-control border-primary w-100 py-3 ps-4 pe-5"
                type="text"
                placeholder="Your email"
              />
              <button
                type="button"
                className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
              >
                SignUp
              </button>
            </div>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;{" "}
              <a className="border-bottom" href="#">
                Travel Yatris
              </a>
              , All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <a href="">Home</a>
                {/* <a href="">Cookies</a>
                <a href="">Help</a> */}
                {/* <a href="">FQAs</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
