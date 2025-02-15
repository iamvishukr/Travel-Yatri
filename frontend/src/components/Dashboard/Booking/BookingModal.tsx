import React from "react";
import * as Yup from 'yup';

import { Modal } from "react-bootstrap"
import "./style.scss"
import { FieldArray, FormikProvider, useFormik, Form as FormikForm } from "formik";
import Input from "../../common/FormElements/Input";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import { useCreateBookingMutation, useEvaluateBookingMutation } from "../../../redux/services/booking";
import CustomError from "../../common/FormElements/CustomError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface IBookingModal {
    show: boolean,
    handleClose: () => void,
    trip: IGetTripResponse,
    price?: { price: number, roomSharing: string } | null;
}

function loadScript(src: any) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const BookingModal: React.FC<IBookingModal> = ({ show, handleClose, trip, price }) => {

    const [createBooking, { isLoading }] = useCreateBookingMutation()
    const [evaluateBooking] = useEvaluateBookingMutation()
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        note: Yup.string(),
        users: Yup.array(
            Yup.object().shape({
                name: Yup.string().required("Name is required."),
                email: Yup.string().required("email is required"),
                contactNumber: Yup.string().required("contact is required"),
                age: Yup.string().required("age is required")
            })
        ).min(1, "One user is minimum required.")
    })

    const formik = useFormik({
        initialValues: {
            users: [
                {
                    name: '',
                    email: '',
                    contactNumber: '',
                    age: '',
                }
            ],
            note: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            try {

                const res = await loadScript(
                    "https://checkout.razorpay.com/v1/checkout.js"
                );

                if (!res) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    return;
                }

                const { data: { booking, order } } = await createBooking({ ...values, organizerId: trip.organizerId, tripId: trip._id, ...(price?.roomSharing ? { roomSharing: price?.roomSharing } : {}) }).unwrap()
                const { amount, id: order_id, currency } = order;
                const options = {
                    key: import.meta.env.VITE_RAZOR_KEY,
                    amount: amount,
                    currency: currency,
                    name: "TRAVEL YATRI",
                    order_id: order_id,
                    "handler": async function (response: any) {
                        const data = {
                            orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            bookingId: booking._id
                        }
                        evaluateBooking(data).unwrap().then((res) => {
                            toast(res.message ?? "Trip booked successfully.", {
                                type: "success",
                                theme: "colored"
                            })
                            handleClose();
                            formik.resetForm()
                            navigate("/dashboard/bookings")
                        }).catch((error) => {
                            toast(error.message ?? "Something went wrong.", {
                                type: "error",
                                theme: "colored"
                            })
                            handleClose();
                            formik.resetForm()
                        });
                    },
                }
                const paymentObject = new window.Razorpay(options);

                paymentObject.open();
            } catch (error) {
                toast((error as any)?.message ?? "Something went wrong.", {
                    type: "error",
                    theme: "colored"
                })
            }
        }
    })

    const { values } = formik;

    return (
        <Modal className="booking-modal pickup-place-modal" size="lg" show={show} onHide={() => { formik.resetForm(); handleClose() }} centered>
            <div className="modal-outer">
                <FormikProvider value={formik} >
                    <FormikForm onSubmit={formik.handleSubmit}>
                        <FieldArray name="users"
                            render={arrayHelpers => (<div>
                                {values.users.map((_user, index) => {
                                    return <div key={index}>
                                        {index === 0 && <div className='user-label'><label >Add users</label>
                                            <div>

                                                <button
                                                    className="btn btn-outline-primary remove-btn-user
                                                    
                                                    "
                                                    type="button"
                                                    onClick={() => {
                                                        if (values.users.length <= trip.leftSeats) {
                                                            arrayHelpers.push({ name: "", email: "", contactNumber: "", age: "" })
                                                        } else {
                                                            toast("zero seats left", {
                                                                type: "error",
                                                                theme: "colored"
                                                            })
                                                        }
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>}


                                        <div className="user-details-fields">
                                            {index !== 0 && <div className='remove-user'>
                                                <button
                                                    type="button"
                                                    className="btn remove-btn"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                >
                                                    X
                                                </button></div>}
                                            <div>
                                                <Input name={`users.${index}.name`} type="text" label="Name" />
                                                <CustomError name={`users.${index}.name`} />
                                            </div>
                                            <div>
                                                <Input name={`users.${index}.email`} type="text" label="Email" />
                                                <CustomError name={`users.${index}.email`} />
                                            </div>
                                            <div>
                                                <Input name={`users.${index}.contactNumber`} type="text" label="Contact Number" />
                                                <CustomError name={`users.${index}.contactNumber`} />
                                            </div>
                                            <div>
                                                <Input name={`users.${index}.age`} type="text" label="Age" />
                                                <CustomError name={`users.${index}.age`} />
                                            </div>
                                        </div>

                                    </div>
                                })}

                            </div>)}
                        />
                        <div className="seats-available">
                            <h5>Only {trip?.leftSeats} seats left*</h5>
                        </div>
                        <div className="booking-input">
                            <Input name="note" type="text" label="Notes (optional)" />
                            <CustomError name="note" />
                        </div>


                        <div className="seprator"></div>

                        <div className="pricing-block">
                            <div className="pricing-detail">
                                <div>
                                    <label>No. of users </label>
                                    <h5>{values.users.length}</h5>
                                </div>
                                <div>
                                    <label>Cost per user</label>
                                    <h5>&#8377; {price?.price || trip?.price}</h5>
                                </div>

                                <div className="pricing-total">
                                    <label>Total: </label>
                                    <h5>&#8377; {(price?.price || trip?.price) * values.users.length}</h5>
                                </div>

                            </div>
                        </div>
                        <div className='book-trip-block'>
                            <button
                                type="submit"
                                className={classNames('btn btn-primary ', {
                                    "button--loading": isLoading
                                })}
                                disabled={isLoading}
                            >

                                <span className="button__text">Checkout</span>


                            </button>
                        </div>

                    </FormikForm>
                </FormikProvider>

            </div>
        </Modal >
    )
}

export default BookingModal