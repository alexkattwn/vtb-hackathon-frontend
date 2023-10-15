import { FC, useEffect, useState } from 'react'
import { Step, Stepper } from 'react-form-stepper'
import { AnimatePresence, motion } from 'framer-motion'

import { ServicesService } from '@/services/services.service'
import { DatabBankService } from '@/services/dataBank.service'
import { IService } from '@/types/services'
import { IDataBank } from '@/types/dataBank'

import styles from '@/components/modules/Map/Sidebar/sidebar.module.scss'

const countStep = 2

interface ISidebarProps {
    dataBanks: IDataBank[]
    setDataBanks: (arg0: IDataBank[]) => void
    setEndPoint: (arg0: [number, number]) => void
}

const Sidebar: FC<ISidebarProps> = ({
    dataBanks,
    setDataBanks,
    setEndPoint
}) => {

    const [activeStep, setActiveStep] = useState<number>(1)

    const [services, setServices] = useState<IService[]>([])

    const fetchServices = async () => {
        const data = await ServicesService.getAllServices()
        setServices(data as IService[])
    }

    const fetchDataBanks = async () => {
        const data = await DatabBankService.getAllDataBanks()
        setDataBanks(data as IDataBank[])
    }

    useEffect(() => {
        fetchServices()
    }, [])

    const nextStep = (service: IService) => {
        if (activeStep <= countStep - 1) {
            setActiveStep(activeStep + 1)
            setDataBanks([...dataBanks.filter((bank) => {
                if (+bank.id_service === +service.id_service) {
                    return bank
                }
            })])
            return
        }
        return
    }

    const prevStep = () => {
        if (activeStep >= 2) {
            setActiveStep(activeStep - 1)
            return
        }
        return
    }

    return (
        <div className={styles.sidebar}>
            <Stepper
                activeStep={activeStep}
                className={styles.sidebar__stepper}
            >
                <Step
                    className={styles.sidebar__stepper__step}
                    onClick={() => {
                        setActiveStep(1)
                        fetchDataBanks()
                    }}
                />
                <Step
                    className={styles.sidebar__stepper__step}
                    onClick={() => setActiveStep(2)}
                />
            </Stepper>
            <div className={styles.sidebar__btns}>
                <button onClick={prevStep}>
                    Назад
                </button>
                <button onClick={nextStep}>
                    Вперед
                </button>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.sidebar__services}
            >
                <h3 className={styles.sidebar__services__title}>
                    {activeStep === 1 ? 'Список услуг' : 'Список банков'}
                </h3>
                {activeStep === 1 && services.map((service: IService) => (
                    <AnimatePresence key={service.id_service}>
                        <div
                            className={styles.sidebar__services__item}
                            onClick={() => nextStep(service)}
                        >
                            <span>{service.name_service}</span>
                        </div>
                    </AnimatePresence>
                ))}
                {activeStep === 2 && dataBanks.map((bank: IDataBank) => (
                    <AnimatePresence key={bank.id_data_offices}>
                        <div
                            className={styles.sidebar__services__item}
                            onClick={() => setEndPoint([+bank.latitude, +bank.longitude])}
                        >
                            <span>{bank.sale_point_name}</span>
                            <span>{bank.address}</span>
                        </div>
                    </AnimatePresence>
                ))}
            </motion.div>
        </div>
    )
}

export default Sidebar