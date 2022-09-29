import { useState } from "react"
import { createContext } from "react"

export const AuthContext = createContext()

export default function AuthProvider (props) {
	const [userData, setUserData] = useState(getUserData)
	const isLogin = Object.values(userData).length > 0

	function getUserData () {
		const savedData = localStorage.getItem('userData')
		if (savedData) {
			const parsedData = JSON.parse(savedData)
			return parsedData
		} else {
			return {}
		}
	}

	function saveUserData (loginResponse) {
		const formattedResponse = JSON.stringify(loginResponse)
		localStorage.setItem('userData', formattedResponse)
		setUserData(loginResponse)
	}

	function removeUserData () {
		localStorage.removeItem('userData')
	}

	const contextValue = {
		userData,
		setUserData,
		isLogin,
		saveUserData,
		removeUserData
	}

	return <AuthContext.Provider value={contextValue}>
		{props.children}
	</AuthContext.Provider>
}