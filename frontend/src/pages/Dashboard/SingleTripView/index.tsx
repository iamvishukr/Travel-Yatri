import "./style.scss"

const SingleTripView = () => {
    return (
        <div className="single-trip-view">
            <div className="itinerary">
                <h1 className="trip-heading">Itinerary</h1>
                <div className="itinerary-road-map">
                    <div className="bus-top">
                        <i className="fas fa-bus"></i>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 0
                        </div>
                        <div className="right-item">
                            Departure to chopta in the evening
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 1
                        </div>
                        <div className="right-item">
                            Reach chopta and check in to camps
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 2
                        </div>
                        <div className="right-item">
                            Trek from chopta to tungnath chandrashila
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 3
                        </div>
                        <div className="right-item">
                            Chopta to sari deoriatal and departure back to delhi
                        </div>
                    </div>
                    <div className="itinerary-map-item">
                        <div className="left-item">
                            Day 4
                        </div>
                        <div className="right-item">
                            Reach back in the early morning.
                        </div>
                    </div>
                    <div className="bus-top bottom">
                        <i className="fas fa-bus"></i>
                    </div>
                </div>
            </div>

            <div className="itinerary">
                <h1 className="trip-heading">Batches</h1>
                <div className="batches">
                    <div className="batches-dates">
                        <div className="month">
                            May
                        </div>
                        <div className="date-intervals">
                            <div>03-May to  07-May</div>
                            <div>10-May to  14-May</div>
                            <div>17-May to  21-May</div>
                            <div>24-May to  28-June</div>
                            <div>31-May to  04-June</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            June
                        </div>
                        <div className="date-intervals">
                            <div>07-June to  12-June</div>
                            <div>14-June to  19-June</div>
                            <div>21-June to  26-June</div>
                            <div>28-June to  02-July</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            July
                        </div>
                        <div className="date-intervals">
                            <div>05-July to  09-July</div>
                            <div>12-July to  16-July</div>
                            <div>19-July to  23-July</div>
                            <div>26-July to  30-July</div>
                        </div>
                    </div>
                    <div className="batches-dates">
                        <div className="month">
                            Aug
                        </div>
                        <div className="date-intervals">
                            <div>03-Aug to  10-Aug</div>
                            <div>13-Aug to  17-Aug</div>
                            <div>20-Aug to  24-Aug</div>
                            <div>27-Aug to  01-Sep</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="itinerary">
                <h1 className="trip-heading">Inclusions</h1>
                <div className="inclusions">
                    <ul>
                        <li>Accomodation (2-night stay in chopta)</li>
                        <li>4 Meals (2 breakfast + 2 dinners)</li>
                        <li>Transfer to/from in AC Traveler</li>
                        <li>All sightseeing mentioned in the itinerary</li>
                        <li>Trekking to Tungnath chandrashilla</li>
                        <li>Trip Captain</li>
                    </ul>
                </div>

                <h1 className="exclusion-heading trip-heading">Exclusions</h1>
                <div className="exclusions">
                    <li>Any other Food and Beverage charge that is not included in the package.</li>
                    <li>Any other expense not included in the inclusion column.</li>
                    <li>Any other costing involved due to natural calamity forced circumstances which are out of our control.</li>
                    <li>Any entry tickets to the viewpoints.</li>
                </div>
            </div>

            <div className="itinerary">
                <h1 className="trip-heading">Terms and conditions</h1>
                <div className="terms-conditions">
                    <ul>
                        <li>The advance amount is non-refundable under any circumstances.</li>
                        <li>Full Payment of the trip cost must be made 24 hours before the trip begins. Pending Payments may eventually lead to the cancellation of your booking.</li>
                        <li>The IDs will be verified before boarding. No boarding shall be entertained without a valid Govt. ID.</li>
                        <li>The Transfer of the bookings is not permitted. Only the names mentioned at the time of confirmation shall be allowed to travel.</li>
                        <li>No refunds shall be made towards any inclusion(s) not availed by the Client.</li>
                        <li>Travelers must take care of their luggage & belongings. The management shall not be accountable for missing items along the tour.</li>
                        <li>The time of departure is stated & fixed. All travelers must update their status with the Trip Coordinator(s), & report at the pickup point 30 mins prior to the scheduled departure.</li>
                        <li>Drinking & Smoking are strictly prohibited during journey due to the health & safety of fellow passengers.</li>
                        <li>No act of misconduct or indiscipline shall be tolerated on the tours. We are a cordial travel community and we aspire to bring to you a hassle-free and memorable experience.</li>
                        <li>Trip Ek Art shall not be responsible for any delays or alterations in the program or indirectly incurred expenses in cases such as natural hazards, accidents, breakdown of machinery, weather conditions, landslides, political closure, or any untoward incidents.</li>
                        <li>We do not provide any insurance policy to cover the expenditure on sickness or accidents or losses incurred due to theft or other reasons.</li>
                        <li>
                            Numerous factors such as weather and road conditions the physical ability of participants etc. may bring alteration in the itinerary. We reserve the right to make necessary changes in the schedule in the interest of safety, comfort, and general well-being!
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default SingleTripView