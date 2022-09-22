import { Link } from 'react-router-dom'

const menuList = [
    {
        title: 'Nilai',
        icon: 'fa-list',
        link: '/nilai'
    },
    {
        title: 'Ujian',
        icon: 'fa-file-alt',
        link: '/ujian'
    },
    {
        title: 'Jurusan',
        icon: 'fa-school',
        link: '/jurusan'
    },
    {
        title: 'Matkul',
        icon: 'fa-chalkboard',
        link: '/matkul'
    },
]
export default function Sidebar () {
	return <>
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Kampus</div>
            </a>

            <hr className="sidebar-divider my-0" />
            {menuList.map(menu =>
                <li className="nav-item">
                    <Link className="nav-link" to={menu.link}>
                        <i className={"fas fa-fw " + menu.icon}></i>
                        <span>{menu.title}</span>
                    </Link>
                </li>
            )}
            <hr className="sidebar-divider d-none d-md-block" />

        </ul>
	</>
}