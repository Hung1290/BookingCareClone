import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import './ModalUser.scss'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmYourPassword: '',
            firstName: '',
            lastName: '',
            address: '',

            isShowPassword: false,
        }

        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                confirmYourPassword: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'confirmYourPassword']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                toast.error('Missing parameter: ' + arrInput[i])
                break
            }
        }
        if (this.state.password !== this.state.confirmYourPassword) {
            isValid = false
            toast.error('The entered passwords do not match. Try again.')
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group mb-3'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                    value={this.state.email}
                                />
                            </div>
                            <div className='col-6 form-group mb-3'>
                                <label>Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                    value={this.state.address}
                                />
                            </div>
                            <div className='col-6 form-group mb-3'>
                                <label>First name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='col-6 form-group mb-3'>
                                <label>Last name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className='col-6 form-group mb-3'>
                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                        value={this.state.password}
                                    />
                                    <span
                                        onClick={() => { this.handleShowHidePassword() }}
                                    ><i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                                </div>
                            </div>
                            <div className='col-6 form-group mb-3'>
                                <label>Confirm your password</label>
                                <div className='custom-input-password'>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeInput(event, "confirmYourPassword") }}
                                        value={this.state.confirmYourPassword}
                                    />
                                    <span
                                        onClick={() => { this.handleShowHidePassword() }}
                                    ><i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color='primary'
                        onClick={() => { this.handleAddNewUser() }}
                    >Register</Button>
                    <Button
                        className='px-3'
                        color='secondary'
                        onClick={() => { this.toggle() }}
                    >Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

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
