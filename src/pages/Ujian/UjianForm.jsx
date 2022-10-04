import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UjianForm() {

    const navigate = useNavigate()
	const params = useParams()

	const isEditing = params.ujianId

	const [matkuls, setMatkuls] = useState([])
	const [formInput, setFormInput] = useState({
		
		IdMatkul: '',
		judulUjian: '',
		statUjian: ''
		

	})

	function handleInput (evt, propName) {
		const copyFormInput = {...formInput}
		copyFormInput[propName] = evt.target.value
		setFormInput(copyFormInput)
	}

	async function getMatkuls () {
		const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/matkul/listmatkul')
		setMatkuls(res.data)
	}

	async function getFormInput () {
		const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/ujian/getujian/' + params.ujianId)
		setFormInput({
			...res.data, 
			IdMatkul : res.data.idMatkul
		})
	}

	async function submitData (evt) {
		evt.preventDefault()

		const payload =  {
			...formInput, 
			idMatkul : formInput.IdMatkul
		}

		if (isEditing) {
			await axios.put('https://sistem-mahasiswa-be.herokuapp.com/ujian/update/' + params.ujianId,payload)
		} else {
			await axios.post('https://sistem-mahasiswa-be.herokuapp.com/ujian/saveujian', payload)
		}

		navigate('/ujian')
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
                <h6 className="m-0 font-weight-bold text-primary">Edit Ujian</h6>

                <Link to="/ujian">
                    <button className="btn btn-secondary">
                        Kembali
                    </button>
                </Link>
            </div>
            
			
			<div className="card-body">
				<form className="w-50" onSubmit={submitData}>
					
				<div className="form-group mb-4">
						<label>Mata Kuliah</label>
						<select
							className="form-control"
							required
							value={formInput.IdMatkul}
							onChange={evt => handleInput(evt, 'IdMatkul')} >
							<option value="" disabled></option>
							{matkuls.map(item =>
								<option value={item.idMatkul}>
									{item.namaMatkul}
								</option>
							)}
						</select>
					</div>

					<div className="form-group mb-4">
						<label>Judul Ujian</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.judulUjian}
							onChange={evt => handleInput(evt, 'judulUjian')} />
					</div>

                    <div className="form-group mb-4">
						<label>Status Ujian</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.statUjian}
							onChange={evt => handleInput(evt, 'statUjian')} />
					</div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}