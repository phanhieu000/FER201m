import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MoviesContext } from '../../App'

function Login({ setToken, setTokens }) {

    const { accounts, setAccounts } = useContext(MoviesContext)

    const [messageUserNane, setMessageUserNane] = useState('')
    const [messagePassword, setMessagePassword] = useState('')
    const [message, setMessage] = useState('')


    const navigate = useNavigate();

    const userNameRef = useRef();
    const passwordRef = useRef();

    const check = param => {
        if (typeof param === 'undefined' || param.toString() === '')
            return false
        return true
    }

    const handleLogin = () => {

        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;

        if (check(userName)) {
            setMessageUserNane('')
            if (check(password)) {
                setMessagePassword('')
                const process = [...accounts].find(e => e?.userName === userName && e?.password === password);

                if (!process) {
                    setMessage('UserName or Password Không đúng !')
                } else {
                    if(process?.active === false){
                        setMessage('Tài khoản của bạn đã bị khóa !')
                        return
                    }else {
                        setMessage('')
                        const user = { ...process }
                        sessionStorage.setItem('user', JSON.stringify(user))
                        setTokens(user)
                        setToken(user)
                        navigate(-1)
                    }
                    
                }
            } else {
                setMessagePassword('Chưa Nhập Password !');
            }
        } else {
            setMessageUserNane('Chưa Nhập UserName !');

        }
    }


    return (
        <div className="container" style={{ paddingTop: '12rem' }}>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card w-100">
                        <div className="card-header">Đăng Nhập</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label forhtml="email">User Name: </label>
                                    <input type="email" ref={userNameRef} name="email" id="email" className="form-control mt-2" />
                                    {
                                        messageUserNane ? <p className="text-danger">{messageUserNane}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-2">
                                    <label forhtml="password">Password: </label>
                                    <input type="password" ref={passwordRef} name="password" id="password" className="form-control mt-2" />
                                    {
                                        messagePassword ? <p className="text-danger">{messagePassword}</p> : ''
                                    }
                                </div>
                                <div className="form-group mt-3">
                                    {
                                        message ? <p className="text-danger">{message}</p> : ''
                                    }
                                    <button type="button" className="btn btn-primary" onClick={handleLogin}>Đăng Nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;