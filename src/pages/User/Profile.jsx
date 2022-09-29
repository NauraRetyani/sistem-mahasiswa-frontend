import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner"
import { LoginContext } from "../../contexts/LoginProvider"

export default function Profile() {
	const loginCtx = useContext(LoginContext)

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        try {
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/5')
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
		{/* <p>{loginCtx.udahLogin}</p> */}

        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Profile</h6>

                    <Link to="/settings">
                        <button className="btn btn-secondary">
                            Settings
                        </button>
                    </Link>
                </div>
                <div className="card-body">
                    {isLoading

                        ? <div className="d-flex justify-content-center">
                            <Spinner />
                        </div>

                        : <div>
                            <table>
                                <tbody>
                                    <tr >
                                        <td className="font-weight-bold">Username: </td>
                                        <td> </td>
                                        <td>{data.username}</td>
                                    </tr>
                                    <tr >
                                        <td className="font-weight-bold">Nama: </td>
                                        <td> </td>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr >
                                        <td className="font-weight-bold">Jurusan: </td>
                                        <td> </td>
                                        <td>{data.namaJurusan}</td>
                                    </tr>
                                    <tr >
                                        <td className="font-weight-bold">Role: </td>
                                        <td> </td>
                                        <td>{data.role}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
}