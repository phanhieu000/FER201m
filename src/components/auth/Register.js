import { useContext, useRef, useState } from "react";

import { MoviesContext } from "../../App";

function Register() {
    const { accounts, setAccounts } = useContext(MoviesContext)

    const isBlank = (param) => {
        if (typeof param === 'undefined' || param.toString() === '')
            return true
        return false
    }

    const [message, setMessage] = useState('')
    const [messageUserName, setMessageUserName] = useState('')
    const [messagePassword, setMessagePassword] = useState('')
    const [messageFullName, setMessageFullName] = useState('')

    const userNameField = useRef();
    const passwordField = useRef();
    const fullNameField = useRef();

    const handleRegister = () => {
        const userName = userNameField.current.value;
        const password = passwordField.current.value;
        const fullName = fullNameField.current.value;

        if (!isBlank(userName)) {
            setMessageUserName('')
            if (!isBlank(password)) {
                setMessagePassword('')
                if (!isBlank(fullName)) {
                    setMessageFullName('')
                    const newData = {
                        id: accounts[accounts.length - 1].id + 1,
                        userName: userName,
                        password: password,
                        fullName: fullName
                    }
                    const newAccounts = [...accounts, newData];

                    localStorage.setItem('accounts', JSON.stringify(newAccounts))
                    setAccounts(newAccounts)
                    setMessage('Đăng Ký Thành Công !')
                } else {
                    setMessageFullName('FullName không được để trống !')

                }
            } else {
                setMessagePassword('Password không được để trống !')

            }
        } else {
            setMessageUserName('UserName không được để trống !')

        }

    }

    return (
        <div className="container" style={{ paddingTop: '12rem' }}>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card w-100">
                        <div className="card-header">Đăng Ký Thành Viên</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label forhtml="userName">UserName: </label>
                                    <input type="text" ref={userNameField} name="userName" id="userName" className="form-control mt-2" />
                                    {
                                        messageUserName !== '' ? <p className="text-danger">{messageUserName}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-2">
                                    <label forhtml="password">Password: </label>
                                    <input type="password" ref={passwordField} name="password" id="password" className="form-control mt-2" />
                                    {
                                        messagePassword !== '' ? <p className="text-danger">{messagePassword}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-2">
                                    <label forhtml="fullName">Full Name: </label>
                                    <input type="text" ref={fullNameField} name="fullName" id="fullName" className="form-control mt-2" />
                                    {
                                        messageFullName !== '' ? <p className="text-danger">{messageFullName}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    {
                                        message !== '' ? <p className="text-success">{message}</p> : ''
                                    }
                                    <button type="button" className="btn btn-primary" onClick={handleRegister}>Đăng Ký</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;