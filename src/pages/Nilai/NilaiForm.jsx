import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NilaiForm() {

    const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true);


    const isEditing = params.nilaiId

    const [students, setStudents] = useState([])
    const [majors, setMajors] = useState([])
    const [exams, setExams] = useState([])
    const [lessons, setLessons] = useState([])

    const [formInput, setFormInput] = useState({

        IdMhs: '',
        IdJurusan: '',
        IdUjian: '',
        IdMatkul: '',
        nilai: ''

    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getStudents() {
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/mahasiswa/list')
        setStudents(res.data)
    }
    async function getMajors() {
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/jurusan/listjurusan')
        setMajors(res.data)
    }
    async function getExams() {
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/ujian/listujian')
        setExams(res.data)
    }

    async function getLessons() {
        const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/matkul/listmatkul')
        setLessons(res.data)
    }

    async function getFormInput() {
       
            const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/nilai/getnilai/' + params.nilaiId)
            setFormInput({
                ...res.data,
                IdMhs: res.data.idMhs,

                ...res.data,
                IdMatkul: res.data.idMatkul

            })
    }
    async function submitData(evt) {
       try{
        setIsLoading(true)
        evt.preventDefault()

        const payload = {
            ...formInput,
            IdMhs: formInput.IdMhs
        }

        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-be.herokuapp.com/nilai/update/' + params.nilaiId, payload)
        } else {
            await axios.post('https://sistem-mahasiswa-be.herokuapp.com/nilai/savenilai', {
                idMhs: parseInt(formInput.IdMhs),
                idJurusan: parseInt(formInput.IdJurusan),
                idUjian: parseInt(formInput.IdUjian),
                idMatkul: parseInt(formInput.IdMatkul),
                nilai: parseInt(formInput.nilai),
            }).then((re) => console.log(re))
        }

        navigate('/nilai')
       
    } catch (err) {
        alert("Tidak Bisa di Submit, Mahasiswa Sudah Terdaftar di Jurusan dan Ujian yang Berbeda !")
    }finally{
        setIsLoading(false)
    }
    }

    useEffect(() => {
        getStudents()
        if (isEditing) {
            getFormInput()
        }
        getMajors()
        if (isEditing) {
            getFormInput()
        }
        getExams()
        if (isEditing) {
            getFormInput()
        }
        getLessons()
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
                        <select
                            className="form-control"
                            required
                            value={formInput.IdMhs}
                            onChange={evt => handleInput(evt, 'IdMhs')} >
                            <option value="" disabled></option>
                            {students.map(item =>
                                <option value={item.idMhs}>
                                    {item.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label>Jurusan</label>
                        <select
                            className="form-control"
                            required
                            value={formInput.IdJurusan}
                            onChange={evt => handleInput(evt, 'IdJurusan')} >
                            <option value="" disabled></option>
                            {majors.map(item =>
                                <option value={item.idJurusan}>
                                    {item.namaJurusan}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label>Ujian</label>
                        <select
                            className="form-control"
                            required
                            value={formInput.IdUjian}
                            onChange={evt => handleInput(evt, 'IdUjian')} >
                            <option value="" disabled></option>
                            {exams.map(item =>
                                <option value={item.idUjian}>
                                    {item.judulUjian}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label>Mata Kuliah</label>
                        <select
                            className="form-control"
                            required
                            value={formInput.IdMatkul}
                            onChange={evt => handleInput(evt, 'IdMatkul')} >
                            <option value="" disabled></option>
                            {lessons.map(item =>
                                <option value={item.idMatkul}>
                                    {item.namaMatkul}
                                </option>
                            )}
                        </select>
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

        </div >
    </>
}