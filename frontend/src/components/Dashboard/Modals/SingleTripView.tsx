import { Carousel } from "react-responsive-carousel";
import * as Yup from "yup";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import RenderContent from "../../Authentication/RenderContent";
import { ORGANIZER, ADMIN, USER } from "../../../contracts/constants/roleConstant";
import { toast } from "react-toastify";
import React, { useMemo, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Input from "../../common/FormElements/Input";
import CustomError from "../../common/FormElements/CustomError";
import classNames from "classnames";
import { useCreateReviewMutation } from "../../../redux/services/review";
import {
  ICanCreateReviewResponse,
  IReview,
} from "../../../contracts/ICanCreateReviewResponse";
import { IGetReviewOfTripResponse } from "../../../contracts/IGetReviewOfTripResponse";
import { format } from "date-fns";
import FullViewTripImage from "./FullViewTripImage";

const RatingValue: { [key: number]: string } = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

const getCircleStyle = (index: number, score: number) => {
  if (index + 1 <= Math.floor(score)) {
    return "filled"; // Fully filled
  } else if (index < score) {
    return "partially"; // Partially filled
  }

  return "";
};

const SingleTripView = ({
  trip,
  handleShowBooking,
  handleClose,
  canCreateReview,
  reviewData,
}: {
  trip: IGetTripResponse;
  canCreateReview: ICanCreateReviewResponse | undefined;
  reviewData: IGetReviewOfTripResponse | undefined;
  handleShowBooking: any;
  handleClose: any;
}) => {

  const [initialValues, _setInitialValues] = useState({
    rating: 1,
    title: "",
    comment: "",
  });
  const [fullImageView, setFullImageView] = useState(false);

  const [createReview] = useCreateReviewMutation();

  const [selectedSharingPrice, setSelectedSharingPrice] = useState<number | null>(null);
  const [roomSharing, setRoomSharingType] = useState<string | null>(null)
  console.log(selectedSharingPrice, ">>>>>>>>> selected sharing price")

  const handleSharingTypeChange = (type: string, price: number) => {
    setSelectedSharingPrice(price);
    setRoomSharingType(type)
    console.log(`Selected sharing type: ${type} with price: ${price}`);
  };

  const handleBookTrip = () => {
    if (trip.leftSeats == 0) {
      toast("No seats left", {
        type: "error",
        theme: "colored",
      });
      return;
    }

    handleShowBooking(selectedSharingPrice, roomSharing);
    handleClose();
  };

  const review = useMemo(() => {
    return canCreateReview?.data?.review as IReview;
  }, [canCreateReview]);

  const stats = useMemo(() => {
    const ratingDistribution = Object.keys(RatingValue).map((key) => {
      return {
        title: RatingValue[+key],
        count:
          canCreateReview?.data?.stats?.ratingDistribution.find(
            (dist) => dist.rating == +key
          )?.count ?? 0,
      };
    });

    console.log(ratingDistribution, ">>>>>>>");
    return { ...(canCreateReview?.data?.stats ?? {}), ratingDistribution };
  }, [canCreateReview]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, "Minimum 10 characters")
        .required("Title is required"),
      comment: Yup.string()
        .min(20, "Minimum 20 characters")
        .required("Comment is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      createReview({
        ...values,
        tripId: trip._id,
      })
        .unwrap()
        .then((response) => {
          toast(response.message ?? "Trip updated successfully .", {
            type: "success",
            theme: "colored",
          });
          resetForm();
        })
        .catch((error) => {
          toast(error?.message ?? "Something went  wrong ..", {
            type: "error",
            theme: "colored",
          });
        });
    },
  });

  const { setFieldValue, values, handleChange, handleBlur } = formik;
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Image Gallery",
      content: (
        <div className="image-carousel">
          <Carousel showThumbs={false} dynamicHeight={false}>
            {trip?.photos?.map((photo, index) => (
              <div key={index} onClick={() => setFullImageView(true)}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${photo?.path}`}
                  alt="trip"
                />
              </div>
            ))}
          </Carousel>
        </div>
      ),
    },
    {
      title: "Trip details",
      content: (
        <div>
          <div className="trip-card-details">
            <h1 className="trip-heading exclusion-heading">Trip details</h1>
            <div className="trip-description">
              <div>
                <h6>Pick up place :</h6>
                <p>{trip.pickUp}</p>
              </div>
              <div>
                <h6>Pick up time :</h6>
                <p>{trip.pickUpTime}</p>
              </div>

              <div>
                <h6>Total seats :</h6>
                <p>{trip.totalSeats}</p>
              </div>
              <div>
                <h6>Price :</h6>
                <p>₹ {trip.price}</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    ...(trip?.hotels
      ? [
        {
          title: "Hotel Stays",
          content: (
            <>
              <div className="itinerary-c" id="hotel-stays">
                <h1 className="trip-heading exclusion-heading">
                  Hotel stays
                </h1>
                <div className="inclusions">
                  <ul>
                    {trip?.hotels?.map((hotels, index) => (
                      <li key={index}>{hotels}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ),
        },
      ]
      : []),
    {
      title: "Itinerary",
      content: (
        <div className="itinerary-road-map">
          <h1 className="trip-heading exclusion-heading">Itinerary</h1>
          {trip?.itinerary?.map((itiner, index) => (
            <div className="itinerary-map-item" key={index}>

              <div className="left-item">Day {itiner?.day}</div>

              <div className="right-item">{itiner?.description?.[0]}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "BriefItinerary",
      content: (
        <div className="itinerary-road-map">
          <h1 className="trip-heading exclusion-heading">Brief Itinerary</h1>
          {trip?.itinerary?.map((itiner, index) => (
            <div className="itinerary-map-item" key={index}>
              <div className="left-item">Day {itiner?.day}</div>
              <div className="right-item">{itiner?.description?.[0]}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Day Details",
      content: (
        <div className="day-page-detail">
          <h1 className="trip-heading exclusion-heading">Day Details</h1>
          {trip?.itinerary?.map((itiner, index) => (
            <div key={index}>
              <h1 className="exclusion-heading trip-heading">
                Day {itiner?.day}
              </h1>
              <div className="inclusions">
                <ul>
                  {itiner?.description?.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Inclusions and Exclusions",
      content: (
        <div className="itinerary-c" id="i-e">
          <h1 className="trip-heading exclusion-heading">Inclusions</h1>
          <div className="inclusions">
            <ul>
              {trip?.inclusions?.map((inclusion, index) => (
                <li key={index}>{inclusion}</li>
              ))}
            </ul>
          </div>

          <h1 className="exclusion-heading trip-heading">Exclusions</h1>
          <div className="exclusions">
            <ul>
              {trip?.exclusions?.map((exclusion, index) => (
                <li key={index}>{exclusion}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Sharing Types",
      content: (
        <div className="review" id="s-t">
          <h1 className="heading">Room Sharing</h1>
          <RenderContent authorizedRole={[USER]}>
            <div className="review-details">
              <div className="sharing-container-left">
                {/* Review stats and submission */}
                <div className="sharing-box">
                  {trip.roomSharing && Object.keys(trip.roomSharing).filter((key) => key !== '_id').length > 0 ? (
                    // Filter out the _id field before mapping
                    Object.entries(trip.roomSharing)
                      .filter(([key]) => key !== '_id')
                      .map(([type, price], index) => (
                        <div key={index} className="sharing-type">
                          <div className="sharing-left">
                            <p>Rooms : {type && type[0].toUpperCase() + type.slice(1).toLowerCase()} Sharing</p>
                            <p>Price : ₹ {price}</p>
                          </div>
                          <div className="sharing-radio">
                            <input
                              type="radio"
                              id={`sharing-${index}`}
                              name="sharingType"
                              value={type}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleSharingTypeChange(type, price);
                                }
                              }}
                            />
                            <label className="select-input" htmlFor={`sharing-${index}`}>
                              Select
                            </label>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No Room sharing available</p>
                  )}
                </div>
              </div>
            </div>
          </RenderContent>
          <RenderContent authorizedRole={[ADMIN, ORGANIZER]}>
            <div className="review-details">
              <div className="sharing-container-left">
                {/* Review stats and submission */}
                <div className="sharing-box">
                  {trip.roomSharing && Object.keys(trip.roomSharing).filter((key) => key !== '_id').length > 0 ? (
                    // Filter out the _id field before mapping
                    Object.entries(trip.roomSharing)
                      .filter(([key]) => key !== '_id')
                      .map(([type, price], index) => (
                        <div key={index} className="sharing-type">
                          <div className="sharing-left">
                            <p>Rooms : {type && type[0].toUpperCase() + type.slice(1).toLowerCase()} Sharing</p>
                            <p>Price : ₹ {price}</p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No Room sharing available</p>
                  )}
                </div>
              </div>
            </div>
          </RenderContent>
        </div>
      ),
    },

    {
      title: "Cancellation Policy",
      content: (
        <div className="itinerary-c" id="c-p">
          <h1 className="trip-heading exclusion-heading">
            Cancellation Policy
          </h1>
          <div className="terms-conditions">
            {trip?.cancellationPolicy?.length ? (
              <ul>
                {trip.cancellationPolicy.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            ) : (
              <p>No cancellation policy</p>
            )}
          </div>
        </div>
      ),
    },

    {
      title: "Terms and Conditions",
      content: (
        <div className="itinerary-c" id="t-n-c">
          <h1 className="trip-heading exclusion-heading">
            Terms and conditions
          </h1>
          <div className="terms-conditions">
            <ul>
              {trip?.termsAndConditions?.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Reviews",
      content: (
        <div className="review">
          <RenderContent authorizedRole={[ADMIN]}>
            <div className="book-trip-block">
              {trip.agencyInfo.map((info) => (
                <div className="agency-info">
                  <h5>Agency details:</h5>
                  <h6>Email: {info.email}</h6>
                  <h6>Full name: {info.fullName}</h6>
                </div>
              ))}
            </div>
          </RenderContent>
          <h1 className="heading">Reviews</h1>
          <div className="review-details">
            <div className="review-container-left">
              {/* Review stats and submission */}
              <div className="review-circle">
                {(reviewData?.data?.length ||
                  canCreateReview?.data?.review) && (
                    <>
                      <span className="score">{stats?.averageRating}</span>
                      <div>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`empty ${getCircleStyle(
                              index,
                              stats?.averageRating ?? 0
                            )}`}
                          ></span>
                        ))}
                      </div>
                    </>
                  )}
                <span>{stats?.totalReviews} reviews</span>
              </div>
              <div className="review-bars">
                {stats?.ratingDistribution?.reverse()?.map((review, index) => (
                  <div key={index}>
                    <span className="review-text">{review?.title}</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(review?.count / (stats?.totalReviews ?? 1)) * 100
                            }%`,
                        }}
                      ></div>
                    </div>
                    <span className="review-number">{review?.count}</span>
                  </div>
                ))}
              </div>
              {/* Review submission form */}
              {canCreateReview &&
                canCreateReview?.data?.canCreate &&
                !canCreateReview?.data?.review && (
                  <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="write-review">
                        <h5>Write a review</h5>
                        <div className="write-box">
                          <div className="ty-input">
                            <label>How would you rate your experience?</label>
                            <div className="rating-input ">
                              {[1, 2, 3, 4, 5].map((circle, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() =>
                                      setFieldValue("rating", circle)
                                    }
                                    className={classNames("empty", {
                                      filled: circle <= values.rating,
                                    })}
                                  ></div>
                                </React.Fragment>
                              ))}
                              <span>{RatingValue?.[values?.rating]}</span>
                            </div>
                          </div>
                          <div>
                            <Input
                              name="title"
                              label="Title *"
                              type="text"
                              placeholder="Review title"
                            />
                            <CustomError name="title" />
                          </div>
                          <div>
                            <div className="ty-input">
                              <label>Description *</label>
                              <textarea
                                name="comment"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Review description"
                              ></textarea>
                              <CustomError name="comment" />
                            </div>
                          </div>
                          <div className="review-submit">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </FormikProvider>
                )}
            </div>
            <div className="review-container-right">
              {canCreateReview?.data?.review && (
                <div className="review-content">
                  <div className="review-header">
                    <div className="symbol">
                      {review.user?.fullName?.charAt(0)}
                    </div>
                    <div className="user-detail">
                      <span>{review.user?.fullName}</span>
                      <span>
                        {format(review?.createdAt as string, "LLL dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="rating-circle">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={getCircleStyle(index, review?.rating)}
                      ></span>
                    ))}
                  </div>
                  <p className="review-title">{review?.title}</p>
                  <p className="review-comment">{review?.comment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <>
      <div className="single-trip-view-modal">
        <h1 className="trip-title">
          {trip?.place
            .join(" - ")
            .replace(/([A-Z])/g, "$1")
            .trim()}
        </h1>
        <div className="itinerary-c">{sections[currentSection].content}</div>
        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="btn navigation-btn"
          >
            Previous
          </button>
          <RenderContent authorizedRole={[USER]}>
            <div className="book-trip-block">
              <button
                className="btn book-trip-btn"
                onClick={handleBookTrip}
                disabled={sections[currentSection]?.title !== "Terms and Conditions"}
              >
                Book Trip
              </button>
            </div>
          </RenderContent>

          <button
            onClick={handleNext}
            disabled={currentSection === sections.length - 1}
            className="btn navigation-btn"
          >
            Next
          </button>
        </div>
      </div>
      <FullViewTripImage
        show={fullImageView}
        handleClose={() => setFullImageView(false)}
        trip={trip}
      />
    </>
  );
};

export default SingleTripView;