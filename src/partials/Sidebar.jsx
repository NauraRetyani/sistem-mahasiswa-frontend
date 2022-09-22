import { Link } from 'react-router-dom'

const menuList = [
    {
        title: 'Nilai',
        icon: 'fa-file',
        link: '/nilai'
    },
    {
        title: 'Ujian',
        icon: 'fa-file',
        link: '/ujian'
    },
    {
        title: 'Jurusan',
        icon: 'fa-file',
        link: '/jurusan'
    },
    {
        title: 'Matkul',
        icon: 'fa-file',
        link: '/matkul'
    },
]

export default function Sidebar () {
	return <>
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-book"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Kampus</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Dashboard --> */}

            {menuList.map(menu =>
                <li className="nav-item">
                    <Link className="nav-link" to={menu.link}>
                        <i className={"fas fa-fw " + menu.icon}></i>
                        <span>{menu.title}</span>
                    </Link>
                </li>
            )}


            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />


        </ul>
	</>
}