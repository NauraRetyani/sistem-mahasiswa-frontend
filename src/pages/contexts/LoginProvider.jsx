import { createContext, useState } from "react";

export const LoginContext = createContext()

export default function LoginProvider (props) {
	const [udahLogin, setUdahLogin] = useState('iya udah login')

	const contextValue = {
		udahLogin,
		setUdahLogin
	}

	return <LoginContext.Provider value={contextValue}>
		{props.children}
	</LoginContext.Provider>
}