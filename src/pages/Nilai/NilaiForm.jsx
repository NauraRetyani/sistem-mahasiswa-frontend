import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NilaiForm() {

    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.nilaiId

    const [departments, setDepartments] = useState([])
    const [exams, setExams] = useState([])
    const [matkuls, setMatkuls] = useState([])

    const [formInput, setFormInput] = useState({

        name: '',
        idJurusan: '',
        judulUjian: '',
        IdMatkul: '',
        nilai: ''

    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getDepartments() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/jurusan/listjurusan')
        setDepartments(res.data)
    }

    async function getFormInput() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/nilai/getnilai/' + params.ujianId)
        setFormInput({
            ...res.data,
            IdMhs: res.data.idMhs
        })
        setFormInput({
            ...res.data,
            IdMhs: res.data.idMhs
        })
    }

    useEffect(() => {
        getNames()
        if (isEditing) {
            getFormInput()
        }
    }, [])

    return <>
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Edit Nilai</h6>

                <Link to="/nilai">
                    <button className="btn btn-secondary">
                        Kembali
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
                            onChange={evt => handleInput(evt, 'name')} />
                    </div>

                    <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.idJurusan}
                            onChange={evt => handleInput(evt, 'idJurusan')} />
                    </div>

                    <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.idJurusan}
                            onChange={evt => handleInput(evt, 'idJurusan')} />
                    </div>

                    <div className="form-group mb-4">
                        <label>Ujian</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.judulUjian}
                            onChange={evt => handleInput(evt, 'judulUjian')} />
                    </div>

                    <div className="form-group mb-4">
                        <label>Mata Kuliah</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.IdMatkul}
                            onChange={evt => handleInput(evt, 'idMatkul')} />
                            <option value="" disabled></option>
							{matkuls.map(item =>
								<option value={item.idMatkul}>
									{item.namaMatkul}
								</option>
							)}
                    </div>

                    <div className="form-group mb-4">
                        <label>Nilai</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={formInput.nilai}
                            onChange={evt => handleInput(evt, 'nilai')} />
                    </div>

                    
                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

        </div>
    </>
}