import { FC } from 'react'

import { useMode } from '@/hooks/useTheme'

import styles from '@/pages/Home/home-page.module.scss'

const HomePage: FC = () => {

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={styles.homepage}>
            <header className={darkModeClass}>
                <h1 className={darkModeClass}>
                    Добро пожаловать в навигацию ВТБ
                </h1>
            </header>
            <section className={`${styles.features}`}>
                <div className={`${styles.feature} ${darkModeClass}`}>
                    <img
                        src="nearby.png"
                        alt="Money Icon"
                        className={darkModeClass}
                    />
                    <h2 className={darkModeClass}>
                        Всегда рядом
                    </h2>
                    <p>
                        Вы всегда сможете найти ближайший и наиболее свободный филиал ВТБ!
                    </p>
                </div>
                <div className={`${styles.feature} ${darkModeClass}`}>
                    <img
                        src="heart.png"
                        alt="Security Icon"
                        className={darkModeClass}
                    />
                    <h2 className={darkModeClass}>
                        Всегда под рукой
                    </h2>
                    <p>
                        Удобная и продуманная адаптация под ваше мобильное устройство.
                    </p>
                </div>
                <div className={`${styles.feature} ${darkModeClass}`}>
                    <img
                        className={`${styles}`}
                        src="./img/animeVTB.png"
                        alt="Customer Support Icon"
                    />
                    <h2 className={darkModeClass}>
                        Голосовой помощник
                    </h2>
                    <p>
                        ВТБ-тян, поможет вам в решении ваших финансовых вопросов.
                    </p>
                </div>
            </section>
            <div className="overlay" />
        </div>
    )
}

export default HomePage