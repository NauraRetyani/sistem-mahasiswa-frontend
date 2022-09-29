import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import NilaiList from './pages/Nilai/NilaiList'
import NilaiForm from './pages/Nilai/NilaiForm'
import UjianList from './pages/Ujian/UjianList'
import UjianForm from './pages/Ujian/UjianForm'
import JurusanList from './pages/Jurusan/JurusanList'
import JurusanForm from './pages/Jurusan/JurusanForm'
import MatkulList from './pages/Matkul/MatkulList'
import MatkulForm from './pages/Matkul/MatkulForm'
import Profile from './pages/User/Profile'
import Settings from './pages/User/Settings'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route path="login" index element={<Login />} />
          <Route path="register" index element={<Register />} />
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="nilai" element={<NilaiList />} />
            <Route path="nilai/form" element={<NilaiForm />} />
            <Route path="nilai/form/:nilaiId" element={<NilaiForm />} />

            <Route path="ujian" element={<UjianList />} />
            <Route path="ujian/form" element={<UjianForm />} />
            <Route path="ujian/form/:ujianId" element={<UjianForm />} />

            <Route path="jurusan" element={<JurusanList />} />
            <Route path="jurusan/form" element={<JurusanForm />} />
            <Route path="jurusan/form/:jurusanId" element={<JurusanForm />} />

            <Route path="matkul" element={<MatkulList />} />
            <Route path="matkul/form" element={<MatkulForm />} />
            <Route path="matkul/form/:matkulId" element={<MatkulForm />} />

            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
