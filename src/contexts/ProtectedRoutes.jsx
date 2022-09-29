import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export default function ProtectedRoute () {
	const { isLogin } = useContext(AuthContext)

	if (!isLogin) {
		return <Navigate to="/login" />
	}

	return <Outlet />
}