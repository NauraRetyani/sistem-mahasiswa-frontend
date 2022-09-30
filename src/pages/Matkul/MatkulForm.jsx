import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MatkulForm() {
    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.idMatkul

    const [option, setOption] = useState([])
    const [formInput, setFormInput] = useState({
        namaMatkul: ''
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getOption() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/matkul/listmatkul')
        setOption(res.data)
    }

    async function getFormInput () {
        axios.get('https://sistem-mahasiswa-new.herokuapp.com/matkul/' + params.idMatkul)
        setFormInput(res.data)
    }

    async function submitData(evt) {
        evt.preventDefault()

        if (isEditing) {
            await axios.post('https://sistem-mahasiswa-new.herokuapp.com/matkul/savematkul' + params.idMatkul, formInput)
        } else {
            await axios.post('https://sistem-mahasiswa-new.herokuapp.com/matkul/savematkul', formInput)
        }
        navigate('/matkul')
    }

    useEffect(() => {
        getOption()
        if (isEditing) {
            getFormInput()
        }
    }, [])

    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">FORM MATA KULIAH</h6>
                <Link to="/matkul">
                    <button className="btn btn-secondary">
                        Kembali
                    </button>
                </Link>

            </div>
            <div className="card-body">
                <form className="w-25" onSubmit={submitData}>
                    <div className="form-group">
                        <label>Nama Mata Kuliah</label>
                        <select
                            className="form-control"
                            required
                            value={formInput.namaMatkul}
                            onChange={evt => handleInput(evt, 'namaMatkul')} >

                            <option value="" disabled ></option>
                            {option.map(item =>
                                <option value={item.idMatkul}>
                                    item.namaMatkul
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