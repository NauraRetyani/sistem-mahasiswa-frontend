import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from "react"
import Footer from "./partials/Footer"
import Sidebar from "./partials/Sidebar"
import Topbar from "./partials/Topbar"

function App() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(getUserData)
  const isLogin = Object.values(userData).length > 0

  function getUserData() {
    const savedData = localStorage.getItem('userData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      return parsedData
    } else {
      return {}
    }
  }

  function toMain() {
    if (isLogin) {
      navigate('/')
    } else {
      alert('Anda Belum Login')
      navigate('/login')
    }
  }

  return <>
      <div id="wrapper" onLoad={toMain}>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">

              <Outlet />

            </div>
          </div>
          <Footer />
        </div>
      </div>
  </>
}

export default App
