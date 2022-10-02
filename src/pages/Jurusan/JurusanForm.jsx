import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function JurusanForm() {
    
    const navigate = useNavigate()
    const params = useParams()

    const isEditing = params.idJurusan

    const [option, setOption] = useState([])
    const [formInput, setFormInput] = useState({
        idJurusan: '',
        namaJurusan: ''
    })

    function handleInput(evt, propName) {
        const copyFormInput = { ...formInput }
        copyFormInput[propName] = evt.target.value
        setFormInput(copyFormInput)
    }

    async function getOption() {
        const res = await axios.get('https://sistem-mahasiswa-new.herokuapp.com/jurusan/listjurusan')
        setOption(res.data)
    }

    async function getFormInput () {
        axios.get('https://sistem-mahasiswa-new.herokuapp.com/jurusan/' + params.idJurusan)
        setFormInput({
			...res.data, 
			idJurusan : res.data.idJurusan
		})
    }

    async function submitData(evt) {
        evt.preventDefault()
        
        const payload =  {
			...formInput, 
			idJurusan : formInput.idJurusan
		}

        if (isEditing) {
            await axios.put('https://sistem-mahasiswa-new.herokuapp.com/jurusan/up/' + params.idJurusan, payload)
        } else {
            await axios.post('https://sistem-mahasiswa-new.herokuapp.com/jurusan/savejurusan', payload)
        }
        navigate('/jurusan')
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
						<select
							className="form-control"
							required
							value={formInput.idJurusan}
							onChange={evt => handleInput(evt, 'idJurusan')} >
							<option value="" disabled></option>
							{option.map(item =>
								<option value={item.idJurusan}>
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