import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Settings() {

    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.id

    const [users, setUsers] = useState([])
    const [formInput, setFormInput] = useState({
        name: '',
        idJurusan: ''
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getJurusan() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/jurusan/listjurusan')
        setUsers(res.data)
    }

    async function getFormInput() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/' + params.id)
        setFormInput(res.data)
    }

    async function submitData(evt) {
        evt.preventDefault()

        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/' + params.id, formInput)
        } else {
            await axios.post('https://sistem-mahasiswa-new.herokuapp.com/mahasiswa/save', formInput)
        }

        navigate('/profile')
    }

    useEffect(() => {
        getJurusan()
        if (isEditing) {
            getFormInput()
        }
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
                <form className="w-50" onSubmit={submitData}>
                    <div className="form-group mb-4">
                        <label>Nama</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.name}
                            onChange={evt => handleInput(evt, 'name')} >
                        </input>
                    </div>

                    <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <select
                            className="form-control"
                            value={formInput.idJurusan}
                            onChange={evt => handleInput(evt, 'idJurusan')} >
                            <option value="" disabled></option>
                            {users.map(item =>
                                <option key={item.id} value={item.id}>
                                    {item.namaJurusan}
                                </option>
                            )}
                        </select>
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}