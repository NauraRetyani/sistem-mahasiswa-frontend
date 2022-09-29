import React from "react";
import { Link } from "react-router-dom";

export default function JurusanList() {
    return <>
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Jurusan</h6>

                    <Link to="/jurusan/form">
                        <button className="btn btn-secondary">
                            +
                        </button>
                    </Link>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Fakultas</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Fakultas Ilmu Komputer</td>
                                <td>Teknik Informatika</td>
                                <td>
                                    <a href="#/jurusan/form" className="btn btn-info btn-circle">
                                        <i className="fas fa-pen"></i>
                                    </a>
                                    &nbsp;
                                    <a href="#" className="btn btn-danger btn-circle">
                                        <i className="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">2</th>
                                <td>Fakultas Ilmu Komputer</td>
                                <td>Teknik Komputer</td>
                                <td>
                                    <a href="#/jurusan/form" className="btn btn-info btn-circle">
                                        <i className="fas fa-pen"></i>
                                    </a>
                                    &nbsp;
                                    <a href="#" className="btn btn-danger btn-circle">
                                        <i className="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">3</th>
                                <td>Fakultas Ilmu Komputer</td>
                                <td>Sistem Komputer</td>
                                <td>
                                    <a href="#/jurusan/form" className="btn btn-info btn-circle">
                                        <i className="fas fa-pen"></i>
                                    </a>
                                    &nbsp;
                                    <a href="#" className="btn btn-danger btn-circle">
                                        <i className="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}