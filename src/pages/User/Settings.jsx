import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Settings() {
    const navigate = useNavigate()

    const savedData = localStorage.getItem('userData')
    const parsedData = JSON.parse(savedData)
    const idUser = parsedData.idUser

    const [mhsData, setMhsData] = useState(getMhsData)
    const [jurusan, setJurusan] = useState([])
    const [formInput, setFormInput] = useState({
        name: '',
        idJurusan: '',
        idUser: idUser
    })

    function handleInput(event, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = event.target.value
        setFormInput(copyFormInput)
    }

    async function getJurusan() {
        const res = await axios.get(
            'https://sistem-mahasiswa-new.herokuapp.com/jurusan/listjurusan'
        );
        setJurusan(res.data)
    }

    // async function getFormInput() {
    //     setFormInput(JSON.parse(params.idMhs));
    // }

    async function submitData(event) {
        event.preventDefault()
        const res = await axios.post('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/save', formInput);

        console.log(res.data.data)
        const formattedResponse = JSON.stringify(res.data.data)
        localStorage.setItem('profileData', formattedResponse)
        setMhsData(res.data.data)

        navigate('/profile')
    }

    function getMhsData() {
        const savedData = localStorage.getItem('profileData')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return parsedData
        } else {
            return {}
        }
    }

    useEffect(() => {
        getJurusan()
        // if (isEditing) {
        //     getFormInput()
        // }
    }, [])

    return <>

        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Settings</h6>

                <Link to="/profile">
                    <button className="btn btn-secondary">
                        Cancel
                    </button>
                </Link>
            </div>
            <div className="card-body">
                <form className="w-50" onSubmit={(event) => submitData(event)}>
                    <div className="form-group mb-4">
                        <label>Nama</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.name}
                            onChange={(event) => handleInput(event, 'name')} >
                        </input>
                    </div>

                    {/* <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <select
                            className="form-control"
                            value={formInput.idJurusan}
                            onChange={(event) => handleInput(event, 'idJurusan')} >
                            <option value="" disabled></option>
                            {jurusan.map(item =>
                                <option
                                    key={item.id}
                                    value={item.id}>
                                    {item.namaJurusan}
                                </option>
                            )}
                        </select>
                    </div> */}

                    <div className="form-group mb-4">
                        <label>jurusan (test)</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.idJurusan}
                            onChange={event => handleInput(event, 'idJurusan')} >
                        </input>
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}