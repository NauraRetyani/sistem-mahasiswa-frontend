import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UjianForm() {

    const navigate = useNavigate()
	const params = useParams()

	const isEditing = params.id

	const [jurusan, setJurusan] = useState([])
	const [formInput, setFormInput] = useState({
		judul_ujian: '',
		stat_ujian: '',
		jurusanId: ''
	})

	function handleInput (evt, propName) {
		const copyFormInput = {...formInput}
		copyFormInput[propName] = evt.target.value
		setFormInput(copyFormInput)
	}

	async function getJurusan () {
		const res = await axios.get('')
		setJurusan(res.data)
	}

	async function getFormInput () {
		const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/ujian' + params.id)
		setFormInput(res.data)
	}

	async function submitData (evt) {
		evt.preventDefault()

		if (isEditing) {
			await axios.put('https://sistem-mahasiswa-new.herokuapp.com/ujian' + params.id, formInput)
		} else {
			await axios.post('https://sistem-mahasiswa-new.herokuapp.com/ujian', formInput)
		}

		navigate('/ujan')
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
						<label>Judul Ujian</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.title}
							onChange={evt => handleInput(evt, 'title')} />
					</div>

                    <div className="form-group mb-4">
						<label>Jurusan</label>
						<select
							className="form-control"
							required
							value={formInput.jurusanId}
							onChange={evt => handleInput(evt, 'jurusanId')} >
							<option value="" disabled></option>
							{jurusan.map(item =>
								<option value={item.id}>
									{item.name}
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
							value={formInput.title}
							onChange={evt => handleInput(evt, 'title')} />
					</div>

                    <div className="form-group mb-4">
						<label>Status Ujian</label>
						<input
							type="text"
							className="form-control"
							required
							value={formInput.title}
							onChange={evt => handleInput(evt, 'title')} />
					</div>

                    <button className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
}