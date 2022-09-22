import React from "react";

export default function Register() {
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
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" id="registerInputUsername" placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id="registerInputPassword" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="registerInputRole">
                                                    <option value="s" disabled selected>Role</option>
                                                    <option value="mahasiswa">Mahasiswa</option>
                                                    <option value="dosen">Dosen</option>
                                                </select>
                                            </div>
                                            <a href="/login" className="btn btn-primary btn-user btn-block">
                                                Register Account
                                            </a>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="/login">Already have an account? Login!</a>
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