import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UjianForm() {

    const navigate = useNavigate()
	const params = useParams()

	const isEditing = params.ujianId

	const [ujian, setUjian] = useState([])
	const [formInput, setFormInput] = useState({
		
		judulUjian: '',
		statUjian: ''

	})

	function handleInput (evt, propName) {
		const copyFormInput = {...formInput}
		copyFormInput[propName] = evt.target.value
		setFormInput(copyFormInput)
	}

	async function getUjian (){
		const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/ujian/listujian')
		setUjian(res.data)

	}

	async function getFormInput () {
		const res = await axios.get('https://sistem-mahasiswa-be.herokuapp.com/ujian/getujian/' + params.ujianId)
		setFormInput({
			...res.data, 
			ujianId : res.data.ujianId
		})
	}

	async function submitData (evt) {
		evt.preventDefault()

		const payload =  {
			...formInput, 
			ujianId : formInput.ujianId
		}

		if (isEditing) {
			await axios.put('https://sistem-mahasiswa-be.herokuapp.com/ujian/update/' + params.ujianId,payload)
		} else {
			await axios.post('https://sistem-mahasiswa-be.herokuapp.com/ujian/saveujian' , payload)
			
		}

		navigate('/ujian')
	}

	useEffect(() => {
		getUjian()
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