import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { useMode } from '@/hooks/useTheme'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import styles from '@/pages/Auth/auth.module.scss'
import { AuthService } from '@/services/auth.service'
import { useAppDispatch } from '@/store/hooks'
import { loginFunc } from '@/store/user/userSlice'
import { MAP_ROUTE } from '@/constants'

const AuthPage: FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [role, setRole] = useState<string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({ login, password, email, name_role: role })
            if (data) {
                toast.success('Аккаунт зарегистрирован')
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({ login, password })
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(loginFunc(data))
                toast.success('Вход выполнен')
                navigate(MAP_ROUTE)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div className={`${styles.main} ${darkModeClass}`}>
            <input
                type="checkbox"
                className={styles.chk}
                id='chk'
            />
            <div className={styles.signup}>
                <form onSubmit={registrationHandler}>
                    <label
                        htmlFor="chk"
                        className={`${styles.label} ${darkModeClass}`}
                    >
                        Регистрация
                    </label>
                    <input
                        className={`${styles.input} ${darkModeClass}`}
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input
                        className={`${styles.input} ${darkModeClass}`}
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className={`${styles.input} ${darkModeClass}`}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                        className={`${styles.input} ${darkModeClass}`}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Выбрать из списка</option>
                        <option value="Юридическое лицо">Юридическое лицо</option>
                        <option value="Физическое лицо">Физическое лицо</option>
                    </select>
                    <button className={styles.button}>
                        Регистрация
                    </button>
                </form>
            </div>
            <div className={`${styles.login} ${darkModeClass}`}>
                <form onSubmit={loginHandler}>
                    <label
                        htmlFor="chk"
                        className={`${styles.label} ${darkModeClass}`}
                    >
                        Войти
                    </label>
                    <input
                        className={`${styles.input} ${darkModeClass}`}
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required />
                    <input
                        className={`${styles.input} ${darkModeClass}`}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className={styles.button}>
                        Войти
                    </button>
                </form>
            </div>
            <div className="overlay" />
        </div>
    )
}

export default AuthPage