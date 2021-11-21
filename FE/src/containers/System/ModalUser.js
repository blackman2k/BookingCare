import { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Button } from 'reactstrap';
import { emitter } from "../../utils/emitter"


const initFormData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: ''
}

function ModalUser({ isOpen, createNewUser, toggle }) {
    const [formData, setFormData] = useState(initFormData)

    useEffect(() => {
        listenToEmitter()
        switchInputState()
    }, [])

    const emailElement = useRef()


    const listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            setFormData = initFormData
        })
    }

    const handleToggleModal = () => {
        toggle()
    }

    const handleAddNewUser = () => {
        let isValid = checkValidateInput()
        if (isValid === true) {
            console.log(formData)
        }
        else {
            alert("Missing parameters")
        }
    }

    const checkValidateInput = () => {
        let isValidate = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            console.log(formData[arrInput[i]])
            if (formData[arrInput[i]] === '') isValidate = false
        }
        return isValidate
    }

    const handleChangeInput = (event, field) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        })
    }

    const switchInputState = () => {
        emailElement.current.focus()
        setFormData(initFormData)
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={handleToggleModal}
            size="xl"
            className="modal-user-container"
        >
            <ModalHeader toggle={handleToggleModal}>
                Create a new user
            </ModalHeader>
            <ModalBody>
                <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input
                            ref={emailElement}
                            type="text"
                            onChange={(e) => handleChangeInput(e, "email")}
                            value={formData?.email}
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={(e) => handleChangeInput(e, "password")}
                            value={formData?.password}

                        />
                    </div>
                    <div className="input-container">
                        <label>First name</label>
                        <input
                            type="text"
                            onChange={(e) => handleChangeInput(e, "firstName")}
                            value={formData?.firstName}
                        />
                    </div>
                    <div className="input-container">
                        <label>Last name</label>
                        <input
                            type="text"
                            onChange={(e) => handleChangeInput(e, "lastName")}
                            value={formData?.lastName}
                        />
                    </div>
                    <div className="input-container">
                        <label>Address</label>
                        <input
                            type="text"
                            onChange={(e) => handleChangeInput(e, "address")}
                            value={formData?.address}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    className="px-3"
                    onClick={() => handleAddNewUser()}
                >
                    Add new
                </Button>
                {' '}
                <Button
                    className="px-3"
                    onClick={handleToggleModal}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
