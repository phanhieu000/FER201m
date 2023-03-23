import { useContext, useRef, useState } from "react";

import { MoviesContext } from "../../App";

function Register() {
    const { accounts, setAccounts } = useContext(MoviesContext)

    const [gender, setGender] = useState(true)

    const isBlank = (param) => {
        if (typeof param === 'undefined' || param.toString() === '')
            return true
        return false
    }

    const localAccounts = JSON.parse(localStorage.getItem('accounts'))


    const checkExist = (userName) => {
        const account = localAccounts.find(e => e.userName == userName)

        if (account)
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
                    if (!checkExist(userName)) {
                        setMessageFullName('')
                        const newData = {
                            id: accounts[accounts.length - 1].id + 1,
                            userName: userName,
                            password: password,
                            fullName: fullName,
                            isPrimeum: false,
                            active: true,
                            gender: gender,
                            role: 'user'
                        }
                        const newAccounts = [...accounts, newData];

                        localStorage.setItem('accounts', JSON.stringify(newAccounts))
                        setAccounts(newAccounts)
                        setMessage('Đăng Ký Thành Công !')

                        userNameField.current.value = ''
                        passwordField.current.value = ''
                        fullNameField.current.value = ''

                    } else {
                        setMessage('Tài Khoản Đã Tồn Tại !')
                    }

                } else {
                    setMessageFullName('FullName không được để trống !')
                    fullNameField.current.focus()

                }
            } else {
                setMessagePassword('Password không được để trống !')
                passwordField.current.focus()

            }
        } else {
            setMessageUserName('UserName không được để trống !')
            userNameField.current.focus()

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
                                <div className="form-group mt-3">
                                    <label forhtml="password">Password: </label>
                                    <input type="password" ref={passwordField} name="password" id="password" className="form-control mt-2" />
                                    {
                                        messagePassword !== '' ? <p className="text-danger">{messagePassword}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    <label forhtml="fullName">Full Name: </label>
                                    <input type="text" ref={fullNameField} name="fullName" id="fullName" className="form-control mt-2" />
                                    {
                                        messageFullName !== '' ? <p className="text-danger">{messageFullName}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-3 d-flex">
                                    <label forhtml="fullName">Gender: </label>
                                    <div className="form-check mx-4">
                                        <input class="form-check-input" type="radio" name="gender" id="male" value="true" defaultChecked onClick={() => setGender(true)} />
                                        <label class="form-check-label" forhtml="male">Male</label>
                                    </div>
                                    <div className="form-check">
                                        <input class="form-check-input" type="radio" name="gender" id="female" value="" onClick={() => setGender(false)} />
                                        <label class="form-check-label" forhtml="female">Female</label>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    {
                                        message === 'Tài Khoản Đã Tồn Tại !' ? <p className="text-danger">{message}</p> : <p className="text-success">{message}</p>
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