import { useCustomizeTripMutation } from "../../redux/services/trip";
import * as Yup from "yup";
import { useFormik, FormikProvider, Form as FormikForm } from "formik";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [customizeTrip] = useCustomizeTripMutation();
  const today = new Date().toISOString().split('T')[0];
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: "",
      destination: "",
      customDestination: "",
      specialRequest: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Name is required")
        .trim(),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
        .trim(),
      date: Yup.date().required("Date is required"),
      destination: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Destination is required")
        .trim(),
      customDestination: Yup.string().when("destination", (destination, schema) => {
        if (destination as any == "other") {
          return schema.required("Destination must be at least 3 characters")
        }
        return schema
      }),
      // customDestination: Yup.string().when("destination", {
      //   is: "other",
      //   then: Yup.string()
      //     .required("Please specify your destination")
      //     .min(3, "Destination must be at least 3 characters"),
      //   otherwise: Yup.string().nullable(),
      // }),
      specialRequest: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      customizeTrip({ values, destination: values.destination != "other" ? values.destination : values.customDestination })
        .unwrap()
        .then((response) => {
          toast(response.message ?? "Form submitted successfully.", {
            type: "success",
            theme: "colored",
          });
          resetForm();
        })
        .catch((error) => {
          toast(error?.data?.error?.message ?? "Something went wrong.", {
            type: "error",
            theme: "colored",
          });
        });
    },
  });

  return (
    <FormikProvider value={formik}>
      <FormikForm onSubmit={formik.handleSubmit}>
        <div
          className="container-xxl py-5 wow fadeInUp"
          id="yatri-contact-us"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="booking p-5">
              <div className="row g-5 align-items-center">
                <div className="col-md-6 text-white">
                  <h1 className="text-white mb-4">Contact Us</h1>
                  <p className="mb-4">
                    At travelYatri, we know that every traveler is unique. That’s why we offer the option to design your own tour package tailored to your preferences.
                  </p>
                </div>

                <div className="col-md-6">
                  <h1 className="text-white mb-4">Customize your trip</h1>
                  <div className="text-white row g-3">
                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control text-white bg-transparent"
                          id="name"
                          placeholder="Your Name"
                          {...formik.getFieldProps("name")}
                          onChange={(e) => {
                            const input = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(input)) {
                              formik.setFieldValue("name", input);
                            }
                          }}
                        />
                        <label htmlFor="name">Your Name</label>
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-danger">{formik.errors.name}</div>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control text-white bg-transparent"
                          id="email"
                          placeholder="Your Email"
                          {...formik.getFieldProps("email")}
                        />
                        <label htmlFor="email">Your Email</label>
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">{formik.errors.email}</div>
                        )}
                      </div>
                    </div>

                    {/* Date Field */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control text-white bg-transparent"
                          id="date"
                          placeholder="DD-MM-YYYY"
                          {...formik.getFieldProps("date")}
                          min={today}
                          onFocus={(e) => (e.target.type = "date")} // Show date picker on focus
                          onBlur={(e) => (e.target.type = "text")} // Restore text placeholder when unfocused
                        />
                        <label htmlFor="date">Date</label> {/* Label inside the input */}
                      </div>
                      {formik.touched.date && formik.errors.date && (
                        <div className="text-danger">{formik.errors.date}</div>
                      )}
                    </div>
                    {/* Destination Field */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control text-white bg-transparent"
                          id="destination"
                          placeholder="Destination"
                          {...formik.getFieldProps("destination")}
                        />
                        <label htmlFor="Destination">Destination</label>
                        {formik.touched.destination && formik.errors.destination && (
                          <div className="text-danger">{formik.errors.destination}</div>
                        )}
                      </div>
                    </div>

                    {/* Special Request Field */}
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control text-white bg-transparent"
                          placeholder="Special Request"
                          id="specialRequest"
                          style={{ height: "100px" }}
                          {...formik.getFieldProps("specialRequest")}
                        ></textarea>
                        <label htmlFor="specialRequest">Special Request</label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button className="btn btn-outline-light w-100 py-3" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </FormikForm>
    </FormikProvider>

  );
};

export default ContactUs;
