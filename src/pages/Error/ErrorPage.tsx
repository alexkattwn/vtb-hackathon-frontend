import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import img from '@/assets/404.jpg'
import { useMode } from '@/hooks/useTheme'
import { HOME_ROUTE } from '@/constants'

import styles from '@/pages/Error/error-page.module.scss'

const ErrorPage: FC = () => {

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const navigate = useNavigate()

    return (
        <div className={`${styles.error} ${darkModeClass}`}>
            <img src={img} alt="Not Found" className={styles.error__img} />
            <button className={`${styles.error__btn} ${darkModeClass}`}>
                <span onClick={() => navigate(HOME_ROUTE, { replace: true })}>
                    Вернуться назад
                </span>
            </button>
        </div>
    )
}

export default ErrorPage