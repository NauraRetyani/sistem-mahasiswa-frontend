import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";

export default function UjianList() {
    const [dataList, setDataList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    async function getDataList() {
        try {
            setIsLoading (true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/ujian/listujian')
            setDataList(res.data)
        } catch (err) {
            alert('Terdapat Kesalahan')
        }finally{
            setIsLoading(false)
        } 
    }

    async function deleteData (id){
        await axios.delete('https://sistem-mahasiswa-new.herokuapp.com/ujian/id' + id)
        getDataList()
    }
    useEffect(() => {
        getDataList()
    }, [])


    return <>
        <div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Daftar Ujian</h6>
                </div>
                <div class="card-body">
                    {isLoading
                    ?
                    <div className="d-flex justify-content-center">
                        <Spinner />
                    </div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Ujian</th>
                                <th scope="col">Status Ujian</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examList.map((item, index) =>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.jurusanId}</td>
                                    <td>{item.judul_ujian}</td>
                                    <td>{item.stat_ujian}</td>
                                    <td>
                                        <button className="btn btn-info btn-circle">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        &nbsp;
                                        <a href="#" class="btn btn-danger btn-circle">
                                            <i class="fas fa-trash"></i>
                                        </a>
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