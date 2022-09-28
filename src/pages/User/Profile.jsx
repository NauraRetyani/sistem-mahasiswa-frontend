import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
    return <>

        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Profile</h6>

                    <Link to="/settings">
                        <button className="btn btn-secondary">
                            Settings
                        </button>
                    </Link>
                </div>
                <div className="card-body">
                    <tr>
                        <td>Username</td>
                        &nbsp;&nbsp;&nbsp;
                        <td>johndoe123</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        &nbsp;
                        <td>John Doe</td>
                    </tr>
                    <tr>
                        <td>Jurusan</td>
                        &nbsp;
                        <td>Teknik Informatika</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        &nbsp;
                        <td>Dosen</td>
                    </tr>
                </div>
            </div>
        </div>
    </>
}