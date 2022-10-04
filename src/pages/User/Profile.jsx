import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner"

export default function Profile() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(getUserData)
    const isLogin = Object.values(userData).length > 0
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        try {
            const savedData = localStorage.getItem('profileData')
            const parsedData = JSON.parse(savedData)
            const idMhs = parsedData.idMhs
            setIsLoading(true)
            const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/' + idMhs)
            setData(res.data)
        } catch (err) {
            alert('Terjadi Kesalahan')
        } finally {
            setIsLoading(false)
        }
    }

    function getUserData() {
        const savedData = localStorage.getItem('userData')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData
        } else {
            return {}
        }
    }

    function toSettings() {
        if (isLogin) {
            navigate('/settings')
        } else {
            alert('Anda Belum Login')
            navigate('/login')
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return <>

        <div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Profile</h6>

                    <button className="btn btn-secondary" onClick={toSettings}>
                        Settings
                    </button>

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