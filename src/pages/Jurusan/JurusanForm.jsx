import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function JurusanForm() {
    return <>
       <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Jurusan Form</h6>

                <Link to="/jurusan">
                    <button className="=btn btn-secondary">
                        Cancel
                    </button>
                </Link>
                </div>
                
                <div className="card-body">
                    <from className="w-50">

                        <div className="from-group mb-4">
                            <label> Nama Fakultas </label>
                            <input type = "text"
                                    className="from-control">
                                    </input>
                        </div>

                        <div className="from-group mb-4">
                            <label> Nama Jurusan </label>
                            <input type = "text"
                                    className="from-control">
                                    </input>
                        </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                    
                    </from>
                </div>
        </div>
    </>
}