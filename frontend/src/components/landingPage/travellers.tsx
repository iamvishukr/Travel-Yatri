import "./styles.scss";

const Travellers = () => {
  return (
    <div className="container-xxl py-5 members">
      <div className="container">
        <div className="row align-items-center g-5 organizers">
          <div className="right col-lg-6">
            <h6 className="section-title bg-white text-center text-primary pe-3 ">
              Create and Share Your Adventure
            </h6>
            <h1 className="mb-4">Traveller</h1>
            <p>
              Looking for a unique travel experience? Browse through a variety
              of trips curated by seasoned organizers, from weekend getaways to
              extended expeditions. Whether you’re into adventure, relaxation,
              culture, or cuisine, travelYatri has something for everyone. Find
              your next destination and connect with like-minded explorers.
            </p>
            <p>
              Travel solo or with a group, you can join us either way, you’ll
              meet new people and forge friendships along the way
            </p>
          </div>
          <div className="left col-lg-6 d-flex align-items-center justify-content-center">
            <div className="ty-ring">
              <img
                className="traveller-img img-fluid"
                src="img/destination-8.jpg"
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center g-5 travellers">
          <div className="left col-lg-6 d-flex align-items-center justify-content-center">
            <div className="ty-ring">
              <img
                className="traveller-img img-fluid"
                src="img/travellers-1.jpeg"
              />
            </div>
          </div>
          <div className="right col-lg-6 ">
            <h6 className="section-title bg-white text-center text-primary pe-3 ">
              Explore Unique Journeys
            </h6>
            <h1 className="mb-4">Organizer</h1>
            <p>
              Are you a trip organizer with a passion for crafting memorable
              travel experiences? Join travelYatri and connect with travelers
              eager to explore the world. Share your itineraries, manage
              bookings, and grow your travel community. We’re here to help you
              bring your travel vision to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travellers;
