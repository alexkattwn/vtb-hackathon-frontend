import {
    FC,
    useEffect,
    useState
} from 'react'
import {
    YMaps,
    Map,
    Placemark,
    RoutePanel
} from '@pbe/react-yandex-maps'

import BankSvg from '@/components/elements/BankSvg/BankSvg'
import Loader from '@/components/elements/Loader/Loader'
import Sidebar from '@/components/modules/Map/Sidebar/Sidebar'
import useOptimalPoint from '@/hooks/useOptionalPoint'
import { usePopup } from '@/hooks/usePopup'
import { useMode } from '@/hooks/useTheme'
import { IDataBank } from '@/types/dataBank'
import { DatabBankService } from '@/services/dataBank.service'
import CloseSvg from '@/components/elements/CloseSvg/CloseSvg'

import styles from '@/pages/Map/map-page.module.scss'


export interface IPoint {
    name: string
    weight: number
    coordinate: [number, number]
}

// export const point: IPoint[] = [
//     { name: "ВТБ1", weight: 40, coordinate: [55.634, 62.33945] },
//     { name: "ВТБ2", weight: 35, coordinate: [55.634, 62.33955] },
//     { name: "ВТБ3", weight: 45, coordinate: [55.634, 62.33975] },
//     { name: "ВТБ4", weight: 15, coordinate: [55.634, 62.33915] },
//     { name: "ВТБ5", weight: 5, coordinate: [55.644, 62.33915] },
//     { name: "ВТБ6", weight: 12, coordinate: [55.674, 62.33915] },
// ]

const MapPage: FC = () => {

    const [dataBanks, setDataBanks] = useState<IDataBank[]>([])

    const [filteredBanks, setFilteredBanks] = useState<IPoint[]>([])

    const [endPoint, setEndPoint] = useState<[number, number]>()

    const [responceChat, setResponceChat] = useState<boolean>(false)

    useEffect(() => {
        fetchDataBanks()
    }, [])

    const filter = () => {
        const mass = [...dataBanks.map((bank) => ({
            name: bank.sale_point_name,
            weight: bank.workload,
            coordinate: [+bank.latitude, +bank.longitude]
        }))]

        setFilteredBanks(mass as IPoint[])
        setTimeout(() => {
            setEndPoint(useOptimalPoint(mass, userLocation).coordinate)
        }, 2000)
    }

    useEffect(() => {
        filter()
    }, [dataBanks])

    const fetchDataBanks = async () => {
        const data = await DatabBankService.getAllDataBanks()
        setDataBanks(data as IDataBank[])
    }

    const { toggleOpen, open, closePopup } = usePopup()

    const handlePopup = () => {
        if (open) return closePopup()
        return toggleOpen()
    }

    const mode = useMode()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const [userLocation, setUserLocation] = useState([0, 0])
    const [locationLoaded, setLocationLoaded] = useState(false)

    const [startPoint, setStartPoint] = useState([55.751574, 61.573856])

    const findUser = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setStartPoint([latitude, longitude])
                setUserLocation([latitude, longitude])
                setLocationLoaded(true)
            })
        }
    }

    useEffect(() => {
        findUser()
        setStartPoint(userLocation)
    }, [])

    useEffect(() => {
        const container = document.querySelector('.container')
        container?.classList.add('map')
    }, [])

    return (
        <div className={styles.main}>
            {locationLoaded ? (
                <>
                    <div className={styles.main__line} />
                    <div className={styles.main__container}>
                        <div className={`${styles.main__container__menu} ${open ? styles.open : ''} ${darkModeClass}`}>
                            <button
                                onClick={closePopup}
                                className={styles.main__container__menu__close}
                            >
                                <span>
                                    <CloseSvg />
                                </span>
                            </button>
                            <Sidebar
                                setDataBanks={setDataBanks}
                                dataBanks={dataBanks}
                                setEndPoint={setEndPoint}
                            />
                        </div>
                        <div className={styles.main__container__btns}>
                            <button
                                className={darkModeClass}
                                onClick={handlePopup}
                            >
                                <span>
                                    <a
                                        data-tooltip-id="tooltip"
                                        data-tooltip-content="Меню услуг"
                                        data-tooltip-place="right"
                                    >
                                        <BankSvg />
                                    </a>
                                </span>
                            </button>
                            <button onClick={() => setUserLocation([55.752508, 37.623150])}>
                                Тест
                            </button>
                        </div>
                        <YMaps
                            query={{
                                apikey: 'f0275d0b-9d21-401d-a529-688c348d8327',
                            }}>
                            <Map
                                defaultState={{ center: userLocation, zoom: 15 }}
                                style={{
                                    width: '100%',
                                    height: '100vh',
                                }}
                            >
                                <Placemark geometry={userLocation} properties={{ iconContent: `вы` }} options={{ preset: 'islands#circleIcon' }} />
                                {filteredBanks.map((point: IPoint, index) => (
                                    <Placemark key={index} geometry={point.coordinate} options={{
                                        iconColor: `${point.weight < 40 ? (point.weight < 25 ? 'green' : 'yellow') : 'red'}`,
                                        preset: 'islands#blueLeisureIcon',
                                    }}
                                        properties={
                                            {
                                                iconContent: `${point.weight}`, // пару символов помещается
                                                // создаём пустой элемент с заданными размерами
                                                balloonContent: `<div>
                                            <div>${point.name}</div>
                                            <div>${point.weight}</div>
                                            <div>${point.coordinate}</div>
                                            </div>`,
                                                iconImageHref: '/vtb.png'
                                            }}
                                    />
                                ))}
                                <RoutePanel
                                    options={{
                                        float: 'right',
                                    }}
                                    instanceRef={(ref: any) => {
                                        if (ref) {
                                            ref.routePanel.state.set({
                                                fromEnabled: false,
                                                from: userLocation,
                                                to: endPoint,
                                                tpe: "auto"
                                            });
                                        }
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                </>
            ) : (
                <div className={styles.main__loader}>
                    <Loader />
                </div>
            )}
            <div className="overlay" />
        </div>
    )
}

export default MapPage