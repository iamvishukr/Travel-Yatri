import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { format } from "date-fns";
import "./styles.scss";
import { IChildRef } from "../../../pages/Dashboard/GetTrip";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import RenderContent from "../../Authentication/RenderContent";
import { ADMIN, ORGANIZER } from "../../../contracts/constants/roleConstant";
// import Confirmation from "../../common/Popups/Confirmation";
// import { useDeleteTripMutation } from "../../../redux/services/trip";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ITripCard {
    singleTripRef: MutableRefObject<IChildRef | undefined>;
    trip?: IGetTripResponse;
    setCurrentTrip: Dispatch<SetStateAction<IGetTripResponse | null>>;
    getReviewTrigger?: any;
    canCreateReview?: any;
}

const TripCard: React.FC<ITripCard> = ({ singleTripRef, trip, setCurrentTrip, canCreateReview, getReviewTrigger }) => {
    const [, setShowModal] = useState(false);
    // const [deleteTrip] = useDeleteTripMutation();
    const navigate = useNavigate();

    // const handleShow = () => setShowModal(true);
    // const handleClose = () => setShowModal(false);

    const handleViewTripDetails = () => {
        if (singleTripRef?.current) {
            singleTripRef?.current?.handleShow();
            setCurrentTrip(trip as IGetTripResponse);
            getReviewTrigger({ tripId: trip?._id });
            canCreateReview({ tripId: trip?._id });
        }
    };

    // const handleDelete = () => {
    //     deleteTrip({ id: trip?._id as string })
    //         .unwrap()
    //         .then((res) => {
    //             toast(res.message ?? "Trip can't be deleted as booking has been started...", {
    //                 type: "success",
    //                 theme: "colored",
    //             });
    //         })
    //         .catch((error) => {
    //             toast(error.message ?? "Trip can't be deleted as booking has been started.", {
    //                 type: "error",
    //                 theme: "colored",
    //             });
    //         })
    //         .finally(() => {
    //             handleClose();
    //         });
    // };

    const handleEdit = (renew: boolean = false) => {
        if (renew) {
            return navigate(`/dashboard/trip/${trip?._id}/renew`);
        } else if (trip?.leftSeats === trip?.totalSeats && !trip?.isExpired) {
            navigate(`/dashboard/trip/${trip?._id}`);
        } else {
            toast("Can't edit trips, as booking is started. Please contact admin!", {
                type: "error",
                theme: "colored",
            });
        }
    };

    const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setShowModal(true); 
    };


    return (
        <div className='ty-card' onClick={handleViewTripDetails}>
            <div className="action-icons">
                <div className="view-card-details" onClick={handleViewTripDetails}>
                    <i className='fas fa-eye'></i>
                </div>
                <div className="delete-trip">
                    <i className="fas fa-share-alt"></i>
                </div>
                <RenderContent authorizedRole={[ADMIN, ORGANIZER]}>
                    <div className="delete-trip" onClick={handleDeleteClick}>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </RenderContent>
                <RenderContent authorizedRole={[ORGANIZER]}>
                    {trip?.isExpired && (
                        <div className="edit-trip" onClick={() => handleEdit(true)}>
                            <i className="fas fa-recycle"></i>
                        </div>
                    )}
                    <div className="edit-trip" onClick={() => handleEdit()}>
                        <i className="fas fa-edit"></i>
                    </div>
                    {trip?.isExpired && (
                        <div className="edit-trip">
                            <span className="expired">EXPIRED</span>
                        </div>
                    )}
                </RenderContent>
            </div>

            <div className="ty-img-block">
                <img className='ty-card-img' src={`${import.meta.env.VITE_BACKEND_URL}${trip?.photos[0]?.path}`} />
            </div>
            <div className='ty-card-content'>
                <h3 className='card-heading'>{typeof trip?.place === "object" ? trip?.place?.join('-') : trip?.place} <span>&#8377; {trip?.price}</span></h3>
                <h3 className='seats-desc'>{trip?.leftSeats} <span>Seats Left</span> </h3>
                <p className='card-description'></p>
                <div className="date-block">
                    <p className='card-date'> Date :</p>
                    <p className='card-date'>
                        <span>{format(trip?.startDate as string, "LLL dd, yyyy")}</span>
                    </p>
                    <p>-</p>
                    <p className='card-date'>
                        <span>{format(trip?.endDate as string, "LLL dd, yyyy")}</span>
                    </p>
                </div>
                <p className='card-date'>Trip By : {trip?.business || "Unknown Organizer"}</p>
            </div>
        </div>
    );
};

export default TripCard;