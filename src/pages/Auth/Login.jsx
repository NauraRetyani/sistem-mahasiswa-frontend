import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export default function Login() {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(evt) {
        evt.preventDefault()

        const res = await axios.post('https://sistem-mahasiswa-new.herokuapp.com/auth/login', {
            username,
            password,
        })

        console.log(res.data.data)

        authCtx.saveUserData(res.data.data)

        navigate('/')
    }

    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="loginInputUsername"
                                                    placeholder="Username"
                                                    required
                                                    value={username}
                                                    onChange={evt => setUsername(evt.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="loginInputPassword"
                                                    placeholder="Password"
                                                    required
                                                    value={password}
                                                    onChange={evt => setPassword(evt.target.value)} />
                                            </div>
                                            <button className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="#/register">Create an Account!</a>
                                            <br></br>
                                            <a className="small" href="/">Skip</a>
                                        </div>

                                        {/* <br /><hr /><br />
                                        <p className="small">userId: {authCtx?.userData?.idUser}</p>
                                        <p className="small">username: {authCtx?.userData?.username}</p>
                                        <p className="small">role: {authCtx?.userData?.role}</p> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}