import { Form, InputGroup } from "react-bootstrap"
import "./style.scss"
import { useAdminLoginMutation } from "../../redux/services"
import { FormikProvider, Form as FormikForm, useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/User"

const AdminLogin = () => {
    const [adminLoginMutation] = useAdminLoginMutation()
    const {setUser} = useUserContext()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, { resetForm }) => {
            adminLoginMutation(values).unwrap().then((response) => {
                resetForm();
                navigate('/dashboard/admin-organizer')
                console.log(response, ">>>> response")
                setUser(response.data)
            }).catch(() => {


            })
        }
    })

    const { handleChange, handleBlur } = formik




    return <>
        <div className="admin-login">
            <FormikProvider value={formik}>
                <FormikForm onSubmit={formik.handleSubmit}>

                    <div className="admin-login-box">
                        <h3 className='text-primary'>Admin Login </h3>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-envelope"></i></InputGroup.Text>
                            <Form.Control
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2"><i className="fas fa-lock"></i></InputGroup.Text>
                            <Form.Control
                                name="password"
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>

                        <button type="submit" className='btn btn-primary w-100'>Log in</button>

                    </div>
                </FormikForm>

            </FormikProvider>

        </div>

    </>
}

export default AdminLogin