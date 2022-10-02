import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function UjianList() {
    const [dataList, setDataList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    async function getDataList() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/ujian/listujian')
            setDataList(res.data)
            console.log(res.data)
        } catch (err) {
            alert('Terdapat Kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteData(id) {
        await axios.delete('https://sistem-mahasiswa-new.herokuapp.com/ujian/delete/' + id)
        getDataList()
    }
    useEffect(() => {
        getDataList()
    }, [])


    return <>
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Ujian</h6>
                    <Link to="/ujian/form">
                        <button className="btn btn-primary">
                            Tambah Data
                        </button>
                    </Link>
                </div>
                <div className="card-body">
                    {isLoading
                        ?
                        <div className="d-flex justify-content-center">
                            <Spinner />
                        </div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">NO</th>
                                    <th scope="col">Nama Matkul</th>
                                    <th scope="col">Ujian</th>
                                    <th scope="col">Status Ujian</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList.map((item, index) =>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.matkul?.namaMatkul}</td>
                                        <td>{item.judulUjian}</td>
                                        <td>{item.statUjian}</td>
                                        <td>
                                            <Link to={'/ujian/form/' + item.idUjian}>
                                                <button className="btn btn-info btn-circle">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                            </Link>

                                            &nbsp;

                                            <button
                                                className="btn btn-danger btn-circle"
                                                onClick={() => deleteData(item.idUjian)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    </>
}