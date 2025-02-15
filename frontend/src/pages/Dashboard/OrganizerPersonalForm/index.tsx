import { FormikProvider, useFormik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Input from "../../../components/common/FormElements/Input";
import ImageInput from "../../../components/common/FormElements/ImageInput";
import { useOrganizerFormMutation } from "../../../redux/services/organizer";
// import { useState } from "react"

import "./style.scss";
import classNames from "classnames";
import { useUserContext } from "../../../context/User";
import CustomError from "../../../components/common/FormElements/CustomError";
import { toast } from "react-toastify";

const OrganizerPersonalForm = () => {
  const { user } = useUserContext();
  const underVerification = user?.isVerificationSubmitted;
  const [organizerForm] = useOrganizerFormMutation();

  const validationSchema = Yup.object().shape({
    business: Yup.string().required("Business name is required").trim(),
    agencyName: Yup.string().required("Agency name is required").trim(),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required")
      .trim(),
    address: Yup.string().required("Address is required").trim(),
    // website: Yup.string().required("Website is required").trim(),
    contactNumber: Yup.string()
      .matches(/^\d+$/, "Invalid contact number")
      .required("Contact number is required")
      .length(10, "Contact number must be exactly 10 digits"),
    // dialCode: Yup.string().required("Dial code is required"),
    aadhaarNumber: Yup.string()
      .matches(/^\d{12}$/, "Aadhaar number must be exactly 12 digits")
      .length(12, "Aadhaar number must be exactly 12 digits")
      .required("Aadhaar number is required"),
    panNumber: Yup.string()
      .required("Pancard is required")
      .length(10, "Invalid Pancard number."),
    // gstNumber: Yup.string().required("GST number is required"),
    description: Yup.string().required("Description is required"),
    adhaarImage: Yup.object({
      path: Yup.string(),
      id: Yup.string(),
    }).test(
      "adhar-check",
      "Aadhaar Image required",
      (value) => !!value && !!value.path && !!value.id
    ),
    panImage: Yup.object({
      path: Yup.string(),
      id: Yup.string(),
    }).test(
      "pan-check",
      "Pancard Image required",
      (value) => !!value && !!value.path && !!value.id
    ),
  });

  const formik = useFormik({
    initialValues: {
      business:"",
      agencyName: "",
      email: "",
      address: "",
      website: "",
      contactNumber: "",
      dialCode: "",
      aadhaarNumber: "",
      panNumber: "",
      gstNumber: "",
      adhaarImage: { path: "", id: "" },
      panImage: { path: "", id: "" },
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      organizerForm({
        ...values,
        adhaarImage: values?.adhaarImage?.id,
        panImage: values?.panImage?.id,
      })
        .unwrap()
        .then((res) => {
          resetForm();

          toast(res.message ?? "Organizer detailed successfully.", {
            type: "success",
            theme: "colored",
          });
          // setUnderVerification(true)
        })
        .catch((err) => {
          toast(err?.message ?? "Something went wrong.", {
            type: "error",
            theme: "colored",
          });
        });
    },
  });

  return (
    <>
      <div
        className={classNames("register-as-page ", {
          "organizer-verification": underVerification,
        })}
      >
        {underVerification ? (
          <>
            <div className="under-verification">
              <h1>Please wait some time</h1>
              <p>
                Your application is under review once admin approves you can
                start your travel yatris journey as an organizer.
              </p>
            </div>
          </>
        ) : (
          <FormikProvider value={formik}>
            <FormikForm onSubmit={formik.handleSubmit}>
              <div className="form-box">
              <div>
                  <Input name="business" label="Business Name *" type="text" />
                  <CustomError name="business" />
                </div>
                <div>
                  <Input name="agencyName" label="Agency Name *" type="text" />
                  <CustomError name="agencyName" />
                </div>
                <div>
                  <Input name="email" label="Email *" type="text" />
                  <CustomError name="email" />
                </div>
                <div>
                  <Input name="address" label="Address *" type="text" />
                  <CustomError name="address" />
                </div>
                <div>
                  <Input name="website" label="Website" type="text" />
                  <CustomError name="website" />
                </div>
                {/* <div>
                                <Input name="dialCode" label="Dial Code *" type="text" />
                                <CustomError name="dialCode" />
                            </div> */}
                <div>
                  <Input
                    name="contactNumber"
                    label="Contact Number *"
                    type="text"
                  />
                  <CustomError name="contactNumber" />
                </div>
                <div>
                  <Input
                    name="aadhaarNumber"
                    label="Aadhaar Number *"
                    type="text"
                  />
                  <CustomError name="aadhaarNumber" />
                </div>
                <div>
                  <Input name="panNumber" label="Pan Number *" type="text" />
                  <CustomError name="panNumber" />
                </div>
                <div>
                  <Input name="gstNumber" label="GST Number" type="text" />
                  <CustomError name="gstNumber" />
                </div>
                <div>
                  <ImageInput name="adhaarImage" inputLabel="upload Aadhaar" />
                  <CustomError name="adhaarImage" />
                </div>
                <div>
                  <ImageInput name="panImage" inputLabel="upload Pan card" />
                  <CustomError name="panImage" />
                </div>
                <div>
                  <Input name="description" label="Description *" type="text" />
                  <CustomError name="description" />
                </div>
              </div>
              <div className="submit-box">
                <button type="submit" className="btn btn-primary">
                  Submit For Verification
                </button>
              </div>
            </FormikForm>
          </FormikProvider>
        )}
      </div>
    </>
  );
};

export default OrganizerPersonalForm;
