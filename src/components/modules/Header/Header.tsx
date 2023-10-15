import { FC, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { usePopup } from '@/hooks/usePopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMode } from '@/hooks/useTheme'
import {
    AUTH_ROUTE,
    CHAT_ROUTE,
    HOME_ROUTE,
    MAP_ROUTE,
    PROFILE_ROUTE
} from '@/constants'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import LoginSvg from '@/components/elements/LoginSvg/LoginSvg'
import logo from '@/assets/vtb-logo.png'
import { useAppDispatch } from '@/store/hooks'
import { logoutFunc } from '@/store/user/userSlice'
import { removeTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import { useAuth, useUser } from '@/hooks/useAuth'

import styles from '@/components/modules/Header/header.module.scss'

const Header: FC = () => {

    const { toggleOpen, open, closePopup } = usePopup()

    const isMedia950 = useMediaQuery(950)

    const dispatch = useAppDispatch()

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const handlePopup = () => {
        if (open) return closePopup()
        return toggleOpen()
    }

    const isAuth = useAuth()
    const user = useUser()

    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logoutFunc())
        removeTokenFromLocalStorage('token')
        toast.success('Выход выполнен')
        navigate(AUTH_ROUTE)
        closePopup()
    }

    return (
        <header className={`${styles.header} ${darkModeClass}`}>
            {isMedia950 && (
                <>
                    <button
                        onClick={handlePopup}
                        className={`${styles.burger_menu} ${open ? styles.open : ''}`}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <NavLink
                        to={HOME_ROUTE}
                        className={`${styles.header__text} ${darkModeClass}`}
                    >
                        <span className={styles.header__title}>
                            <img
                                className={styles.header__title__logo}
                                src={logo}
                                alt="logo vtb"
                            />
                        </span>
                    </NavLink>
                </>
            )}
            <nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
                {!isMedia950 && (
                    <NavLink
                        to={'/'}
                        className={`${styles.header__text} ${darkModeClass}`}
                        onClick={closePopup}
                    >
                        <span className={styles.header__title}>
                            <img
                                className={styles.header__title__logo}
                                src={logo}
                                alt="logo vtb"
                            />
                        </span>
                    </NavLink>
                )}
                <ul className={styles.header__list}>
                    <li className={styles.header__list__item}>
                        <ModeToggler />
                    </li>
                    <li className={styles.header__list__item}>
                        <NavLink
                            className={`${styles.header__text} ${darkModeClass}`}
                            to={MAP_ROUTE}
                            onClick={closePopup}
                        >
                            Карта
                        </NavLink>
                    </li>
                    <li className={styles.header__list__item}>
                        <NavLink
                            className={`${styles.header__text} ${darkModeClass}`}
                            to={CHAT_ROUTE}
                            onClick={closePopup}
                        >
                            Чат
                        </NavLink>
                    </li>
                    {isAuth ? (
                        <>
                            <li className={styles.header__list__item}>
                                <NavLink
                                    className={`${styles.header__text} ${darkModeClass}`}
                                    to={PROFILE_ROUTE}
                                    onClick={closePopup}
                                >
                                    {user?.email}
                                </NavLink>
                            </li>
                            <li className={styles.header__list__item}>
                                <span
                                    className={`${styles.header__list__item__svg} ${darkModeClass}`}
                                    onClick={logoutHandler}
                                >
                                    <LogoutSvg />
                                    <span>
                                        Выйти
                                    </span>
                                </span>
                            </li>
                        </>
                    ) : (
                        <li className={styles.header__list__item}>
                            <span
                                className={`${styles.header__list__item__svg} ${darkModeClass}`}
                                onClick={() => {
                                    navigate(AUTH_ROUTE)
                                    closePopup()
                                }}
                            >
                                <LoginSvg />
                                <span>
                                    Войти
                                </span>
                            </span>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header