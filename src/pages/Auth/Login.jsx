import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export let responses = [];

export default function Login() {
    const [userData, setUserData] = useState(getUserData)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    // const authCtx = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(evt) {
        try {
            evt.preventDefault()
            setIsLoading(true)
            const res = await axios.post('https://sistem-mahasiswa-new.herokuapp.com/auth/login', {
                username,
                password,
            })

            const formattedResponse = JSON.stringify(res.data.data)
            localStorage.setItem('userData', formattedResponse)
            setUserData(res.data.data)

            console.log(localStorage.userData)

            if (res.data.data == null) {
                alert('Username atau Password Salah')
            } else {
                navigate('/')
            }
        } catch (err) {
            alert('Terjadi Kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    function getUserData() {
        const savedData = localStorage.getItem('userData')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData
        } else {
            return {}
        }
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
                                            {/* <a className="small" href="/">Skip</a> */}
                                        </div>
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