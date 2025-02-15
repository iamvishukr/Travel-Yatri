import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import SingleTripView from "./SingleTripView";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import { ICanCreateReviewResponse } from "../../../contracts/ICanCreateReviewResponse";
import { IGetReviewOfTripResponse } from "../../../contracts/IGetReviewOfTripResponse";

const TripDetailModel = forwardRef((
    { trip, setShowBooking, createReview, reviewData, setPrice }: {
        trip: IGetTripResponse | null,
        setShowBooking?: (show: boolean) => void,
        setPrice: (args: {price: number, roomSharing: string}) =>  void,
        createReview: ICanCreateReviewResponse | undefined,
        reviewData: IGetReviewOfTripResponse | undefined
    }, ref) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowBooking = (price: number, roomSharing: string) => {
        if (setShowBooking) {
            setShowBooking(true);

            setPrice({price, roomSharing})
        }
    }

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
    }))

    return (
        <Modal className="trip-detail-model" size="lg" show={show} onHide={handleClose}>
            <SingleTripView
                canCreateReview={createReview}
                reviewData={reviewData}
                trip={trip as IGetTripResponse}
                handleShowBooking={handleShowBooking}
                handleClose={handleClose} />
        </Modal>
    )
})

export default TripDetailModel;