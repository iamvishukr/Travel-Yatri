import { useState, forwardRef, useImperativeHandle, MutableRefObject, useCallback } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Modal } from 'react-bootstrap';
import "./style.css"
import { IChildRef } from '../../landingPage/Header';
import { useLoginWithGoogleMutation } from '../../../redux/services';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/User';

const RegisterModal = forwardRef((props: { loginRef: MutableRefObject<IChildRef | undefined>, isLogin: boolean }, ref) => {
    const [show, setShow] = useState(false);
    const [loginWithGoogle] = useLoginWithGoogleMutation();
    const navigate = useNavigate()
    const { setUser } = useUserContext();
    const { isLogin } = props

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (props.loginRef.current) {
            props.loginRef.current.handleClose();
        }
        setShow(true)
    };

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow
    }))



    const handleLogin = useCallback((credentialResponse: CredentialResponse) => {
        loginWithGoogle({ id_token: credentialResponse.credential as string }).unwrap().then((response) => {
            console.log(response, "of user login")
            // navigate('/welcome')
            if (props.loginRef.current && !response.data.role) {
                props.loginRef.current.handleShow()
            } else {
                setUser(response?.data)

                // just a hack 
                setTimeout(() => {
                    if (response?.data?.role == "user") {
                        navigate('/dashboard/trip')
                    } else {
                        navigate('/dashboard/all-trip')
                    }
                }, 10)
            }
        }).catch((error) => {
            console.error(error, "Error while logging")
        })
    }, [])



    return (
        <Modal centered dialogClassName="yatri-model" show={show} onHide={handleClose}>
            <div className='m-4 mx-8 auth-model text-center'>

                <h3 className='text-primary'>{isLogin ? "Login " : "Join Travel Yatris"} </h3>
                <p className='sub-heading'>{isLogin ? "Login to enjoy special tours and offers." : "Become a member to enjoy special tours and offers."}</p>

                <div>
                    <img src="/img/login-model.jpeg" width="100%" height="100%" alt="image_login" />
                    {/* <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-envelope"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2"><i className="fas fa-lock"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><i className="fas fa-lock"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Confirm your password"
                            aria-label="confirm your password"
                            aria-describedby="basic-addon3"
                        />
                    </InputGroup> */}

                    {/* <button className='btn btn-primary w-100'>Create My Account</button>

                    <p className='sub-heading continue'>or continue with</p> */}

                    {/* <button className='btn btn-primary w-100 google-login-btn' onClick={() => handleLogin}>Login with Google</button> */}
                    <GoogleLogin
                        width="100%"
                        onSuccess={credentialResponse => {
                            handleLogin(credentialResponse)
                        }}
                        onError={() => {
                            console.log("Login failed");
                        }}
                    />
                    {/* <p className='already-registered'>Already have an account? <a href="#" className='text-primary' onClick={() => {
                        if (props.loginRef.current) {
                            props.loginRef.current.handleShow()
                        }
                    }} >Login</a></p> */}

                    <p className='privacy-text'>Your privacy matters. we keep your data secure and never share it.</p>

                </div>
            </div>
        </Modal>
    )
})

export default RegisterModal