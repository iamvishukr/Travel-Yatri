import React from "react"
import { Modal } from "react-bootstrap"
import { IGetTripResponse } from "../../../contracts/IGetTripResponse"
import { Carousel } from "react-responsive-carousel"

interface IFullViewTripImage {
    show: boolean
    handleClose: () => void,
    trip: IGetTripResponse
}

const FullViewTripImage: React.FC<IFullViewTripImage> = ({ show, handleClose, trip }) => {
    return (
        <Modal className="trip-detail-model" show={show} onHide={handleClose}>
            <div className="full-view-image">
                <Carousel showThumbs={false} dynamicHeight={false}>
                    {trip?.photos?.map((photo, index) => (
                        <div key={index}>
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}${photo?.path}`}
                                alt="trip"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </Modal>
    )
}

export default FullViewTripImage