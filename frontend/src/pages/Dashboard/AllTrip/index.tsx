import React, { useEffect, useRef, useState } from 'react'
import { useGetTripQuery } from '../../../redux/services/trip'
import { IChildRef } from '../GetTrip'
import TripDetailModel from '../../../components/Dashboard/Modals/TripDetailModel'
import TripCard from '../../../components/Dashboard/TripCard'
import { IGetTripResponse } from '../../../contracts/IGetTripResponse'
import BookingModal from '../../../components/Dashboard/Booking/BookingModal'
import { useLazyCanCreateReviewQuery, useLazyGetReviewOfTripQuery } from '../../../redux/services/review'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { Value } from '../GetBooking'
import { endOfYear, startOfYear } from 'date-fns'

const AllTrip = () => {
    const [trip, setCurrentTrip] = useState<IGetTripResponse | null>(null)
    const singleTripRef = useRef<IChildRef>()
    const [query, setQuery] = useState<{ dateRange: Value, place: string, isExpired: boolean, userLong?: string, userLat?: string }>({
        dateRange: [startOfYear(new Date()), endOfYear(new Date())],
        place: "",
        isExpired: false
    })
    const [showBooking, setShowBooking] = useState(false);
    const [price, setPrice] = useState<null | {price: number, roomSharing: string}>()

    console.log(price , ">>>>>> price ")


    const { data } = useGetTripQuery({ ...query })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const OnDateChange = (date: Value) => {
        setQuery({
            ...query,
            dateRange: date
        })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Get latitude and longitude
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setQuery({
                        ...query,
                        userLat: latitude + "",
                        userLong: longitude + ""
                    })
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    // Handle errors
                    console.error(`Error getting location: ${error.message}`);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [])


    // here  we will intialize both review lazy rtk hook and pass it in TripCard and call it from there
    const [getReviewTrigger, { data: reviewData }] = useLazyGetReviewOfTripQuery()
    const [canCreateReview, { data: createReview }] = useLazyCanCreateReviewQuery()

    return (
        <>
            <div className="filters">
                <div className="search-input">
                    <input className="search" placeholder="Search place" name="place" onChange={onChange} />
                    <div className="search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <DateRangePicker
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYY"
                    className="custom-date-picker"
                    onChange={OnDateChange}
                    value={query.dateRange}
                    calendarIcon={<i className="fas fa-calendar"></i>}
                />
            </div>
            {data?.length ? <>

                <div className='ty-trip-card-list'>
                    {data?.map((trip, index) => {
                        return <React.Fragment key={index}>
                            <TripCard
                                canCreateReview={canCreateReview}
                                getReviewTrigger={getReviewTrigger}
                                key={index}
                                trip={trip}
                                singleTripRef={singleTripRef}
                                setCurrentTrip={setCurrentTrip}
                            />
                        </React.Fragment>
                    })}
                </div>

                <TripDetailModel reviewData={reviewData} createReview={createReview} setShowBooking={setShowBooking} setPrice={setPrice} ref={singleTripRef} trip={trip} />

                <BookingModal show={showBooking} trip={trip as IGetTripResponse} handleClose={() => { setShowBooking(false); setPrice(null) }} price={price} />
            </> : <>
                {/* no-trip-imagination */}
                <div className="no-trip-animation">
                    {/* @ts-ignore */}
                    <dotlottie-player className="lottie-animation" src="https://lottie.host/64399492-7487-4946-880b-95ff9eae4015/HfG6jmgzJE.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></dotlottie-player>
                    <div className="no-trip-text">
                        <p>No trips available. Check back soon for <span>new adventures!</span></p>
                    </div>
                </div>

            </>}

        </>
    )
}

export default AllTrip