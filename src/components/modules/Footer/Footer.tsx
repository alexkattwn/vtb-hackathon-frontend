import { FC } from 'react'

import { useMode } from '@/hooks/useTheme'

import styles from '@/components/modules/Footer/footer.module.scss'

const Footer: FC = () => {

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={`${styles.footer} ${darkModeClass}`} />
    )
}

export default Footer