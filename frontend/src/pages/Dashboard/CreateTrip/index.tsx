import {
  useFormik,
  FormikProvider,
  Form as FormikForm,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import "./style.scss";
import {
  useCreateTripMutation,
  useEditTripMutation,
  useGetTripByIdQuery,
  useRenewTripMutation,
} from "../../../redux/services/trip";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/FormElements/Input";
import { Iitinerary } from "../../../contracts/ICreateTripRequest";
import ImageInput from "../../../components/common/FormElements/ImageInput";
import { IFileResponse } from "../../../contracts/IFileResponse";
import CustomError from "../../../components/common/FormElements/CustomError";
// import MapTest from './MapTest';

import SelectPickup from "./SelectPickup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const today = new Date().toISOString().split("T")[0];

const CreateTrip = () => {
  const { id, status } = useParams();

  // console.log(id, ">>>>>>1234>>>", status)

  const skip = id == null;
  const { data } = useGetTripByIdQuery({ id: id as string }, { skip });
  const [initialValues, setInitialValues] = useState({
    place: [""],
    hotels: [""],
    startDate: "",
    endDate: "",
    pickUp: "",
    pickUpTime: "",
    termsAndConditions: [""],
    briefitinary: [""],
    price: 0,
    sharingType: "",
    inclusions: [""],
    exclusions: [""],
    cancellationPolicy: [""],
    // enquiryNumber: "",
    itinerary: [{ day: 1, description: [""] }],
    photos: [],
    pickUpPointLong: "",
    pickUpPointLat: "",
    totalSeats: "",
    price_Single: "",
    price_Double: "",
    price_Triple: "",
    price_Quad: "",
  });

  const [createTrip] = useCreateTripMutation();
  const [editTrip] = useEditTripMutation();
  const [renewTrip] = useRenewTripMutation();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    // place: Yup.string()
    //   .min(3, "Minimum 3 characters")
    //   .required("Place is required")
    //   .trim(),
    place: Yup.array(
      Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Place can't be empty")
    )
      .min(1, "Minimum 1 place is required.")
      .required("Place is required"),
    hotels: Yup.array(
      Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Hotel can't be empty")
    )
      .min(1, "Minimum 1 hotel is required.")
      .required("Hotel is required"),

    pickUpTime: Yup.string().required("Pick up time is required"),
    pickUpPointLat: Yup.string()
      .matches(/^-?\d*\.?\d+$/, "Invalid Latitude")
      .required("Latitude is required"),
    pickUpPointLong: Yup.string()
      .matches(/^-?\d*\.?\d+$/, "Invalid Longitude")
      .required("Longitude is required"),
    totalSeats: Yup.string()
      .matches(/^\d+$/, "Invalid total seats")
      .required("Total seats is required"),
    // leftSeats: Yup.string()
    //     .matches(/^\d+$/, 'Invalid left seats').required("Left seats is required"),
    // pickUpPointLat: Yup.number()
    //     .typeError('Latitude must be a number')
    //     .required('Latitude is required'),
    // pickUpPointLong: Yup.number()
    //     .typeError('Longitude must be a number')
    //     .required('Longitude is required'),
    startDate: Yup.string().required("Start date is required."),
    endDate: Yup.string().required("End date is required."),
    pickUp: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Pickup is required")
      .trim(),
    price: Yup.number()
      .integer("Price must be number")
      .min(700, "Minimum Amount is 700")
      .required("Price is required"),
    // enquiryNumber: Yup.number().required("Enquiry number is required"),
    //sharingType: Yup.string().required("Sharing type is required"),
    inclusions: Yup.array(
      Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Inclusion can't be empty")
    )
      .min(1, "Minimum 1 inclusion is required.")
      .required("Inclusion is required"),
    exclusions: Yup.array(
      Yup.string().required("Exclusion can't be empty")
    ).min(1, "Minimum 1 exclusion is required."),
    termsAndConditions: Yup.array(
      Yup.string().required("Terms and condition can't be empty")
    ).min(1, "Minimum 1 term and condition is required."),
    briefitinary: Yup.array(
      Yup.string()
        .required("Brief Itinary can't be empty")
    ).min(1, "Minimum 1 brief Itinary is required."),

    photos: Yup.array()
      .min(1, "Minimum 1 Photo is required.")
      .max(6, "Maximum 6 photos can be uploaded"),
    itinerary: Yup.array(
      Yup.object().shape({
        day: Yup.string().required("Day can't be empty"),
        description: Yup.array(
          Yup.string().required("Itinerary description is required.")
        ).min(1, "Minimum 1 itinerary description is required."),
      })
    ).min(1, "One itinerary is required."),
    price_Single: Yup.number().nullable(),
  price_Double: Yup.number().nullable(),
  price_Triple: Yup.number().nullable(),
  price_Quad: Yup.number().nullable(),
  });

  console.log(data, ">>>>> data");

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const roomSharing = {
        single: values.price_Single ? parseFloat(values.price_Single) : null,
        double: values.price_Double ? parseFloat(values.price_Double) : null,
        triple: values.price_Triple ? parseFloat(values.price_Triple) : null,
        quad: values.price_Quad ? parseFloat(values.price_Quad) : null,
      };
    
      const cleanedRoomSharing = Object.fromEntries(
        Object.entries(roomSharing).filter(([_, value]) => value !== null)
      );
      if (id) {
        if (status) {
          renewTrip({
            ...values,
            _id: id,
            totalSeats: +values.totalSeats,
            price: values.price as number,
            pickUpTime: values.pickUpTime,
            pickUpPointLat: +values.pickUpPointLat,
            pickUpPointLong: +values.pickUpPointLong,
            photos: values?.photos?.map((item: IFileResponse) => item.id),
            roomSharing: cleanedRoomSharing,
          })
            .unwrap()
            .then((response) => {
              toast(response.message ?? "Trip updated successfully .", {
                type: "success",
                theme: "colored",
              });
              resetForm();
              navigate("/dashboard/all-trip");
            })
            .catch((error) => {
              toast(error?.message ?? "Something went  wrong ..", {
                type: "error",
                theme: "colored",
              });
            });
        } else {
          editTrip({
            ...values,
            _id: id,
            totalSeats: +values.totalSeats,
            price: values.price as number,
            pickUpTime: values.pickUpTime,
            pickUpPointLat: +values.pickUpPointLat,
            pickUpPointLong: +values.pickUpPointLong,
            photos: values?.photos?.map((item: IFileResponse) => item.id),
            roomSharing: cleanedRoomSharing,
          })
            .unwrap()
            .then((response) => {
              toast(response.message ?? "Trip updated successfully .", {
                type: "success",
                theme: "colored",
              });
              resetForm();
              navigate("/dashboard/all-trip");
            })
            .catch((error) => {
              toast(error?.message ?? "Something went  wrong ..", {
                type: "error",
                theme: "colored",
              });
            });
        }
      } else {
        createTrip({
          ...values,
          totalSeats: +values.totalSeats,
          price: values.price as number,
          pickUpTime: values.pickUpTime,
          pickUpPointLat: +values.pickUpPointLat,
          pickUpPointLong: +values.pickUpPointLong,
          photos: values?.photos?.map((item: IFileResponse) => item.id),
          roomSharing: cleanedRoomSharing,
        })
          .unwrap()
          .then((response) => {
            toast(response.message ?? "Trip created successfully .", {
              type: "success",
              theme: "colored",
            });
            console.log(response, ">>>>>>>>>>");
            resetForm();
            navigate("/dashboard/all-trip");
          })
          .catch((error) => {
            console.log(error, ">>>>>>>>>>>>>");
            toast(error?.data?.error?.message ?? "Something went  wrong ..", {
              type: "error",
              theme: "colored",
            });
          });
      }

      console.log(values, "...... valuess");
    },
  });

  useEffect(() => {
    if (data) {
      // debugger
      setInitialValues({
        ...initialValues,
        // @ts-ignore
        place: data.place,
        hotels: data.hotels,
        pickUp: data.pickUp,
        pickUpTime: data.pickUpTime,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        termsAndConditions: data.termsAndConditions,
        price: data.price,
        //sharingType: data.sharingType || "",
        inclusions: data.inclusions,
        exclusions: data.exclusions,
        // enquiryNumber: data.enquiryNumber,
        itinerary: data.itinerary,
        pickUpPointLong: data.pickUpPointLong + "",
        pickUpPointLat: data.pickUpPointLat + "",
        totalSeats: data.totalSeats + "",
        // @ts-ignore
        photos: data?.photos?.map((photo) => ({ ...photo, id: photo._id })),
      });
    }
  }, [data]);

  const { values, handleChange } = formik;
  //const { values } = formik;
  return (
    <div className="register-as-page">
      <FormikProvider value={formik}>
        <FormikForm onSubmit={formik.handleSubmit}>
          <div className="form-box grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="left-column space-y-4">
              <div>
                <FieldArray
                  name="place"
                  render={(arrayHelpers) => (
                    <div>
                      {values.place && values.place.length > 0 ? (
                        <>
                          {values.place.map((place, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  disabled={status ? true : false}
                                  value={place}
                                  name={`place.${index}`}
                                  type="text"
                                  {...(index === 0 ? { label: "Places" } : {})}
                                />
                                <CustomError name={`place.${index}`} />
                              </div>
                              <button
                                type="button"
                                disabled={status ? true : false}
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                disabled={status ? true : false}
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          disabled={status ? true : false}
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Place
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <SelectPickup />
                <CustomError name="pickUp" />
              </div>

              <div>
                <FieldArray
                  name="hotels"
                  render={(arrayHelpers) => (
                    <div>
                      {values.hotels && values.hotels.length > 0 ? (
                        <>
                          {values.hotels.map((hotel, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={hotel}
                                  name={`hotels.${index}`}
                                  type="text"
                                  {...(index === 0 ? { label: "Hotels" } : {})}
                                />
                                <CustomError name={`hotels.${index}`} />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Hotels
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Input name="totalSeats" label="Total Seats *" type="text" />
                <CustomError name="totalSeats" />
              </div>

              <div>
                <Input name="pickUpTime" label="Pick Up time *" type="time" />
                <CustomError name="pickUpTime" />
              </div>

              <div>
                <Input
                  name="startDate"
                  label="Start Date *"
                  type="date"
                  min={today}
                />
                <CustomError name="startDate" />
              </div>

              <div>
                <Input
                  name="endDate"
                  label="End Date *"
                  type="date"
                  min={today}
                />
                <CustomError name="endDate" />
              </div>

              <div>
                <Input name="price" label="Price *" type="text" />
                <CustomError name="price" />
              </div>

              {/* <div className="form-group">
                <label className="sharing-types" htmlFor="sharingType">Sharing Type</label>
                <select
                  id="sharingType"
                  name="sharingType"
                  value={values.sharingType}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select an option</option>
                  <option value="single">Single Sharing -- (highest price)</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                  <option value="quad">Quad Sharing -- (lowest price)</option>
                </select>
                <CustomError name="sharingType" />
              </div> */}

              <div className="form-group">
                <label className="sharing-types" htmlFor="sharingType">
                  Room Sharing{" "}
                </label>
                <div className="space-y-4">
                  {["Single", "Double", "Triple", "Quad"].map((type) => (
                    <div key={type} className="flex items-center space-x-4">
                      <label className="w-40 font-semibold capitalize">
                        {type} Sharing
                      </label>
                      <input
                        type="number"
                        name={`price_${type}`}
                        value={
                          (values as Record<string, any>)[`price_${type}`] ?? ""
                        } // Assert as Record
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="form-control border p-2 rounded-4 w-40"
                      />
                    </div>
                  ))}
                </div>

                {!values.sharingType ? null : (
                  <CustomError name="sharingType" />
                )}
              </div>

              <div>
                <FieldArray
                  name="inclusions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.inclusions && values.inclusions.length > 0 ? (
                        <>
                          {values.inclusions.map((inclusion, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={inclusion}
                                  name={`inclusions.${index}`}
                                  type="text"
                                  {...(index === 0
                                    ? { label: "Inclusions" }
                                    : {})}
                                />
                                <CustomError name={`inclusions.${index}`} />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add an Inclusion
                        </button>
                      )}
                    </div>
                  )}
                />
                <CustomError
                  name="inclusions"
                  showError={!values.inclusions.length}
                />
              </div>

              <div>
                <FieldArray
                  name="exclusions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.exclusions && values.exclusions.length > 0 ? (
                        <>
                          {values.exclusions.map((exclusion, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={exclusion}
                                  name={`exclusions.${index}`}
                                  type="text"
                                  {...(index === 0
                                    ? { label: "Exclusions" }
                                    : {})}
                                />
                                <CustomError name={`exclusions.${index}`} />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add an Exclusion
                        </button>
                      )}
                    </div>
                  )}
                />
                <CustomError
                  name="exclusions"
                  showError={!values.exclusions.length}
                />
              </div>
              <div>
                <FieldArray
                  name="cancellationPolicy"
                  render={(arrayHelpers) => (
                    <div>
                      {values.cancellationPolicy &&
                      values.cancellationPolicy.length > 0 ? (
                        <>
                          {values.cancellationPolicy.map((policy, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={policy}
                                  name={`cancellationPolicy.${index}`}
                                  type="text"
                                  {...(index === 0
                                    ? { label: "Cancellation Policy" }
                                    : {})}
                                />
                                <CustomError
                                  name={`cancellationPolicy.${index}`}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Cancellation Policy
                        </button>
                      )}
                    </div>
                  )}
                />
                <CustomError name="cancellationPolicy" showError={false} />
              </div>

              <div>
                <ImageInput
                  name="photos"
                  inputLabel="Upload photos"
                  multiple={true}
                />
                <CustomError name="photos" />
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column space-y-4">
              <div>
                <FieldArray
                  name="termsAndConditions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.termsAndConditions &&
                      values.termsAndConditions.length > 0 ? (
                        <>
                          {values.termsAndConditions.map((terms, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={terms}
                                  name={`termsAndConditions.${index}`}
                                  type="text"
                                  {...(index === 0
                                    ? { label: "Terms and Conditions" }
                                    : {})}
                                />
                                <CustomError
                                  name={`termsAndConditions.${index}`}
                                />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Term & Condition
                        </button>
                      )}
                    </div>
                  )}
                />
                <CustomError
                  name="termsAndConditions"
                  showError={!values.termsAndConditions.length}
                />
              </div>
              <div>
                <FieldArray
                  name="briefitinary"
                  render={(arrayHelpers) => (
                    <div>
                      {values.briefitinary && values.briefitinary.length > 0 ? (
                        <>
                          {values.briefitinary.map((item, index) => (
                            <div key={index} className="mb-3 dynamic-no-input">
                              <div className="w-70">
                                <Input
                                  value={item}
                                  name={`briefitinary.${index}`}
                                  type="text"
                                  {...(index === 0 ? { label: "Brief Itinerary" } : {})}
                                />
                                <CustomError name={`briefitinary.${index}`} />
                              </div>
                              <button
                                type="button"
                                className="btn btn-outline-primary add-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                className="btn btn-outline-primary remove-btn"
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          disabled={status ? true : false}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Brief Itinerary
                        </button>
                      )}
                    </div>
                  )}
                />
                <CustomError
                  name="briefitinary"
                  showError={!values.briefitinary?.length}
                />
              </div>

              <div>
                <FieldArray name="itinerary">
                  {({ push, form, remove }) => (
                    <>
                      {form.values.itinerary?.map(
                        (itinar: Iitinerary, index: number) => (
                          <div key={index} className="itinerary-block">
                            {index === 0 && (
                              <div className="itinerary-label">
                                <label>Itinerary</label>
                                <div>
                                  <button
                                    className="btn btn-outline-primary remove-btn"
                                    type="button"
                                    onClick={() =>
                                      push({ day: 1, description: [""] })
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                            <div className="itinerary-inner">
                              {index !== 0 && (
                                <div className="remove-itinerary">
                                  <button
                                    type="button"
                                    className="btn add-btn"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </button>
                                </div>
                              )}
                              <Input
                                disabled={status ? true : false}
                                type="text"
                                value={itinar.day}
                                name={`itinerary.${index}.day`}
                                label="Day"
                              />
                              <CustomError name={`itinerary.${index}.day`} />

                              <div>
                                <FieldArray
                                  name={`itinerary.${index}.description`}
                                  render={(arrayHelpers) => (
                                    <div>
                                      {form?.values?.itinerary?.[index]
                                        ?.description &&
                                      form?.values?.itinerary?.[index]
                                        ?.description.length > 0 ? (
                                        <>
                                          {form?.values?.itinerary?.[
                                            index
                                          ]?.description.map(
                                            (
                                              desc: string,
                                              descIndex: number
                                            ) => (
                                              <div
                                                key={descIndex}
                                                className="mb-3 dynamic-no-input"
                                              >
                                                <div className="w-70">
                                                  <Input
                                                    disabled={
                                                      status ? true : false
                                                    }
                                                    value={desc}
                                                    type="text"
                                                    name={`itinerary.${index}.description.${descIndex}`}
                                                    {...(descIndex === 0
                                                      ? { label: "Description" }
                                                      : {})}
                                                  />
                                                  <CustomError
                                                    name={`itinerary.${index}.description.${descIndex}`}
                                                  />
                                                </div>
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-primary add-btn"
                                                  disabled={
                                                    status ? true : false
                                                  }
                                                  onClick={() =>
                                                    arrayHelpers.remove(
                                                      descIndex
                                                    )
                                                  }
                                                >
                                                  -
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-primary remove-btn"
                                                  disabled={
                                                    status ? true : false
                                                  }
                                                  onClick={() =>
                                                    arrayHelpers.push("")
                                                  }
                                                >
                                                  +
                                                </button>
                                              </div>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        <button
                                          className="btn btn-outline-primary"
                                          type="button"
                                          disabled={status ? true : false}
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          Add a Description
                                        </button>
                                      )}
                                    </div>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  )}
                </FieldArray>
                <CustomError
                  name="itinerary"
                  showError={!values.itinerary.length}
                />
              </div>
            </div>
          </div>

          <div className="submit-box mt-6">
            <button type="submit" className="btn btn-primary">
              {id ? "Update Trip" : "Create trip"}
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default CreateTrip;
