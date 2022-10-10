import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function JurusanForm() {

    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.jurusanId

    const [jurusan, setJurusan] = useState([])
    const [formInput, setFormInput] = useState({
        namaJurusan : '',
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getJurusan (){
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/listjurusan')
        setJurusan(res.data)
    }

    async function getFormInput() {
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/jurusan/byid/' + params.jurusanId)
        setFormInput(res.data)
    }

    async function submitData(evt) {
        evt.preventDefault()

        const payload = {
            ...formInput,
            jurusanId: formInput.jurusanId
        }
        
        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-be.herokuapp.com/jurusan/up/' + params.jurusanId, payload)
        } else {
            await axios.post('https://sistem-mahasiswa-be.herokuapp.com/jurusan/savejurusan', {
                jurusanId: parseInt(formInput.jurusanId),
            }).then((re) => console.log(re))
        }
        navigate('/jurusan')
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
                <h6 className="m-0 font-weight-bold text-primary">FORM JURUSAN</h6>
                <Link to="/jurusan">
                    <button className="btn btn-secondary">
                        Kembali
                    </button>
                </Link>

            </div>
            <div className="card-body">
                <form className="w-25" onSubmit={submitData}>

                <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <input
                        type="text" 
                        className="form-control" 
                        required
                        value={formInput.namaJurusan}
                        onChange={evt => handleInput(evt, 'namaJurusan')} />
                    </div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}