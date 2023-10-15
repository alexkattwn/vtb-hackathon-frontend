import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setMode } from "../store/theme/themeSlice"

export const useTheme = () => {

    const mode = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()

    const toggleTheme = () => {
        if (mode === 'dark') {
            localStorage.setItem('mode', JSON.stringify('light'))
            dispatch(setMode({ mode: 'light' }))
        } else {
            localStorage.setItem('mode', JSON.stringify('dark'))
            dispatch(setMode({ mode: 'dark' }))
        }
    }

    useEffect(() => {
        const localTheme = JSON.parse(localStorage.getItem('mode') as string)

        if (localTheme) {
            dispatch(setMode({ mode: localTheme }))
        }
    }, [])

    return { toggleTheme }
}

export const useMode = (): string => {
    const mode = useAppSelector((state) => state.theme.mode)
    return mode
}
