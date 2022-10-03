import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function NilaiList() {
    const [dataList, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    async function getDataList() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/nilai/listnilai')
            setData(res.data)
            console.log(res.data)
        } catch (err) {
            alert('Terjadi kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteData(id) {
        await axios.delete('https://sistem-mahasiswa-new.herokuapp.com/nilai/delete/' + id)
        getDataList()
    }

    useEffect(() => {
        getDataList()
    }, [])

    return <>
        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Nilai</h6>
                    <Link to="/nilai/form">
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
                                <th scope="col">Nama</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Ujian</th>
                                <th scope="col">Mata Kuliah</th>
                                <th scope="col">Nilai</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.jurusan?.namaJurusan}</td>
                                    <td>{item.judulUjian}</td>
                                    <td>{item.matkul?.namaMatkul}</td>
                                    <td>{item.nilai}</td>
                                    <td>
                                        <Link to={'/nilai/form/' + item.idNilai}>
                                            <button className="btn btn-info btn-circle">
                                                <i className="fas fa-pen"></i>
                                            </button>
                                        </Link>

                                        &nbsp;

                                        <button
                                            className="btn btn-danger btn-circle"
                                            onClick={() => deleteData(item.idNilai)}>
                                            <i className="fas fa-trash"></i>
                                        </button>

                                    </td>
                                </tr>)}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    </>
}