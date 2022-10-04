import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MatkulForm() {

    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.matkulId
    
    const [formInput, setFormInput] = useState({
        namaMatkul: ''
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getFormInput() {
        axios.get('https://sistem-mahasiswa-be.herokuapp.com/matkul/' + params.idMatkul)
        setFormInput({
            ...res.data,
            matkulId: res.data.matkulId
        })
    }

    async function submitData(evt) {
        evt.preventDefault()

        const payload = {
            ...formInput,
            matkulId: formInput.matkulId
        }

        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-be.herokuapp.com/matkul/up/' + params.matkulId, payload)
        } else {
            await axios.post('https://sistem-mahasiswa-be.herokuapp.com/matkul/savematkul', payload)
        }
        navigate('/matkul')
    }

    useEffect(() => {
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

                <div className="form-group mb-4">
                        <label>Mata Kuliah</label>
                        <input
                        type="text" 
                        className="form-control" 
                        required
                        value={formInput.namaMatkul}
                        onChange={evt => handleInput(evt, 'namaMatkul')} />
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}