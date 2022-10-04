import React from "react";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function MatkulList() {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getDataList() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/matkul/listmatkul')
            setDataList(res.data)
        } catch (err) {
            alert('Terjadi Kesalahan')
        } finally {
            setIsLoading(false)
        }
    }


    async function deleteData(idMatkul) {
        try {
            setIsLoading(true)
            const res = await axios.delete('https://sistem-mahasiswa-be.herokuapp.com/matkul/' + idMatkul)
            getDataList(res.data)
        } catch (err) {
            alert('Terjadi Kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getDataList()
    }, [])

    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">LIST MATKUL</h6>
                <Link to="/matkul/form">
                    <button className="btn btn-primary">
                        Tambah
                    </button>
                </Link>

            </div>
            <div className="card-body">

                {isLoading
                    ? <Spinner />
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Matkul</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.namaMatkul}</td>
                                    <td>
                                        <Link to={'/matkul/form/' + item.idMatkul}>
                                            <button className="button" class="btn btn-success">
                                                Edit
                                            </button>
                                        </Link>
                                        &nbsp; &nbsp;

                                        <button className="button" class="btn btn-danger"
                                            onClick={() => deleteData(item.idMatkul)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
}