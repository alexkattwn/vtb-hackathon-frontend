import { RouterProvider } from "react-router-dom"
import { useEffect } from "react"

import { useAppDispatch } from "@/store/hooks"
import { router } from "@/router/router"
import { getTokenFromLocalStorage } from "@/helpers/localstorage.helper"
import { AuthService } from "./services/auth.service"
import { loginFunc, logoutFunc } from "./store/user/userSlice"

function App() {
    const dispatch = useAppDispatch()

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage()
        try {
            if (token) {
                const data = await AuthService.getProfile()
                if (data) {
                    dispatch(loginFunc(data))
                } else {
                    dispatch(logoutFunc())
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return <RouterProvider router={router} />
}

export default App