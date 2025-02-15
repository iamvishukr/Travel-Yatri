import { useState, forwardRef, useImperativeHandle, MutableRefObject } from 'react';
import { Form, Modal } from 'react-bootstrap';
import "./../registerModel/style.css"
import { IChildRef } from '../../landingPage/Header';
import { useUpdateMeMutation } from '../../../redux/services/user';
import { useNavigate } from 'react-router-dom';
import { ORGANIZER, USER } from '../../../contracts/constants/roleConstant';



const LoginModal = forwardRef((props: { registerRef: MutableRefObject<IChildRef | undefined> }, ref) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState(ORGANIZER)
    const [updateUser] = useUpdateMeMutation()
    const navigate = useNavigate()
    const handleClose = () => { setShow(false) };
    const handleShow = () => {
        if (props.registerRef.current) {
            props.registerRef.current.handleClose()
        }

        setShow(true)
    };

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow
    }))

    const handleSubmit = () => {
        updateUser({ role }).unwrap().then((response) => {
            if (response?.data?.role === ORGANIZER) {
                navigate('/dashboard')
            }
            if (response?.data?.role === USER) {
                navigate('/dashboard/trip')
            }
        }).catch(() => {

        })
    }

    return (
        <Modal centered dialogClassName="yatri-model" show={show} onHide={handleClose}>
            <div className='m-4 mx-8 auth-model text-center'>

                <h3 className='text-primary'>Join Travel Yatris As </h3>
                <p className='sub-heading'>Become a member to enjoy special tours and offers.</p>

                <div>
                    <Form className='mb-4'>
                        <Form.Check
                            checked={role === ORGANIZER}
                            onChange={() => { setRole(ORGANIZER) }}
                            inline
                            label="Organizer"
                            name="group1"
                            type='radio'
                            id={`inline-radio-1`}
                        />

                        <Form.Check
                            checked={role === USER}
                            onChange={() => { setRole(USER) }}
                            inline
                            label="User"
                            name="group1"
                            type='radio'
                            id={`inline-radio-2`}
                        />
                    </Form>

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
                    </InputGroup> */}

                    <button onClick={handleSubmit} className='btn btn-primary w-100'>Submit</button>
                    {/* 
                    <p className='sub-heading continue'>or continue with</p>

                    <button className='btn btn-primary w-100 google-login-btn'>Login with Google</button>

                    <p className='already-registered'>Don't have an account? <a className='text-primary' href="#" onClick={() => {
                        if (props.registerRef.current) {
                            props.registerRef.current.handleShow()
                        }
                    }}>Register</a></p> */}


                </div>
            </div>
        </Modal>
    )
})

export default LoginModal