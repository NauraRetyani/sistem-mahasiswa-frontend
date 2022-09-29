import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

export default function NilaiList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/nilai/1')
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
                    <h6 class="m-0 font-weight-bold text-primary">Daftar Nilai</h6>
                    <Link to="/nilai/form">
					<button className="btn btn-primary">
						Tambah Data
					</button>
				</Link>
                </div>
                <div class="card-body">
                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Ujian</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Nilai</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{index + 1}</th>
								<td>{item.jurusan.jurusan}</td>
								<td>{item.judul_ujian}</td>
								<td>{item.mahasiswa.name}</td>
								<td>{item.nilai.nilai}</td>
                                <td>
                                    <a href="/nilai/form" class="btn btn-info btn-circle">
                                        <i class="fas fa-pen"></i>
                                    </a>
                                    &nbsp;
                                    <a href="#" class="btn btn-danger btn-circle">
                                        <i class="fas fa-trash"></i>
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