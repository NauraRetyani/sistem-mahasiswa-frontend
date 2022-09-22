import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NilaiForm() {
    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Edit Nilai</h6>

                <Link to="/nilai">
                    <button className="btn btn-secondary">
                        Kembali
                    </button>
                </Link>
            </div>
            <div className="card-body">
                <form className="w-50">

                    <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <select
                            type="text"
                            className="form-control">
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label>Judul Ujian</label>
                        <select
                            type="text"
                            className="form-control">
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label>Nama Mahasiswa</label>
                        <input
                            type="text"
                            className="form-control" >
                        </input>
                    </div>

                    <div className="form-group mb-4">
                        <label>Nilai</label>
                        <input
                            type="number"
                            max="100"
                            className="form-control" >
                        </input>
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}