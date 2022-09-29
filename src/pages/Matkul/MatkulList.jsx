import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function MatkulList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/matkul/1')
            setData(res.data)
        } catch (err) {
            alert('Terjadi kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <>
        <div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Daftar Mata Kuliah</h6>
                    <Link to="/matkul/form">
                        <button className="btn btn-primary">
                            Tambah Data
                        </button>
                    </Link>
                </div>
                <div class="card-body">

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Mata Kuliah</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.matkulId}</td>
                                    <td>{item.namaMatkul}</td>
                                    <td>
                                    <a href="/matkul/form" class="btn btn-info btn-circle">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                        &nbsp;
                                        <a href="#" class="btn btn-danger btn-circle">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            )} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}