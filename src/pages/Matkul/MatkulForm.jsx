import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MatkulForm() {
    return <>
       <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Edit Mta Kuliah</h6>

                <Link to="/jurusan">
                    <button className="=btn btn-secondary">
                        Kembali
                    </button>
                </Link>
                </div>
                
                <div className="card-body">
                    <from className="w-50">
					<div className="form-group mb-4">
                        <label>Mata Kuliah</label>
                        <input
                            type="text"
                            className="form-control">
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