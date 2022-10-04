import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
        role: ''
    })

    function handleInput(event, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function submitData(event) {
        event.preventDefault()
        await axios.post('https://sistem-mahasiswa-be.herokuapp.com/auth/register', formInput)
        navigate('/login')
    }

    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-register-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <form className="user" onSubmit={submitData}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="registerInputUsername"
                                                    placeholder="Username"
                                                    required
                                                    value={formInput.username}
                                                    onChange={event => handleInput(event, 'username')} />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="registerInputPassword"
                                                    placeholder="Password"
                                                    required
                                                    value={formInput.password}
                                                    onChange={event => handleInput(event, 'password')} />
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="registerInputRole"
                                                    required
                                                    value={formInput.role}
                                                    onChange={event => handleInput(event, 'role')} >
                                                    <option value="" disabled selected hidden>Role</option>
                                                    <option value="mahasiswa">Mahasiswa</option>
                                                    <option value="dosen">Dosen</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-primary btn-user btn-block">
                                                Register Account
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="#/login">Already have an account? Login!</a>
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