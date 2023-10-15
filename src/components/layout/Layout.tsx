import {
    FC,
    useEffect,
    useState
} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

import Header from '@/components/modules/Header/Header'
import Footer from '@/components/modules/Footer/Footer'

const Layout: FC = () => {
    const [progress, setProgress] = useState<boolean>(false)
    const [prevLoc, setPrevLoc] = useState<string>("")

    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if (location.pathname === prevLoc) {
            setPrevLoc('')
        }
    }, [location])

    useEffect(() => {
        setProgress(false)
    }, [prevLoc])

    return (
        <>
            {progress && <TopBarProgress />}

            <Header />

            <section className='container'>
                <Outlet />
            </section>

            <Footer />
        </>
    )
}

export { Layout }