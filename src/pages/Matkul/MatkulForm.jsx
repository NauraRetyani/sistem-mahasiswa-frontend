import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MatkulForm() {
    
    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.idMatkul

    const [matkuls, setMatkuls] = useState([])
    const [formInput, setFormInput] = useState({
        idMatkul: '',
        namaMatkul: ''
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getMatkuls() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/matkul/listmatkul')
        setMatkuls(res.data)
    }

    async function getFormInput () {
        axios.get('https://sistem-mahasiswa-new.herokuapp.com/matkul/' + params.idMatkul)
        setFormInput({
			...res.data, 
			IdMatkul : res.data.idMatkul
		})
    }

    async function submitData(evt) {
        evt.preventDefault()

        const payload =  {
			...formInput, 
			idMatkul : formInput.IdMatkul
		}

        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-new.herokuapp.com/matkul/up/' + params.idMatkul, payload)
        } else {
            await axios.post('https://sistem-mahasiswa-new.herokuapp.com/matkul/savematkul', payload)
        }
        navigate('/matkul')
    }

    useEffect(() => {
        getMatkuls()
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
						<select
							className="form-control"
							required
							value={formInput.idMatkul}
							onChange={evt => handleInput(evt, 'idMatkul')} >
							<option value="" disabled></option>
							{matkuls.map(item =>
								<option value={item.idMatkul}>
									{item.namaMatkul}
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