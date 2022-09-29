import { Outlet } from 'react-router-dom'
import AuthProvider from "./contexts/AuthProvider";
import LoginProvider from "./contexts/LoginProvider";
import Footer from "./partials/Footer"
import Sidebar from "./partials/Sidebar"
import Topbar from "./partials/Topbar"

function App() {
  return <>
    <LoginProvider>
      <AuthProvider>
        <div id="wrapper">
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
      </AuthProvider>
    </LoginProvider>
  </>
}

export default App
