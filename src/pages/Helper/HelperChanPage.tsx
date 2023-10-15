import { FC, useState } from "react"
import distance from "jaro-winkler"
import { AnimatePresence, motion } from "framer-motion"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import ChatMessage from "@/components/elements/ChatMessage/ChatMessage"
import useSpeechRecognition from '@/hooks/useSpeechRecognition'
import { MAP_ROUTE } from "@/constants"
import anime from '@/assets/animeVTB.png'

import styles from "@/pages/Helper/helper-chan-page.module.scss"

const HelperChanPage: FC = () => {

    const [chatList, setchatList] = useState<string[][]>([])
    const [RecordStart, setRecordStart] = useState(true)

    const navigate = useNavigate()

    const notification = (answer: string) => {
        toast((t) => (
            <span className={styles.message}>
                <img
                    className={styles.message__img}
                    src={anime}
                    alt="anime girl"
                />
                <span>
                    {answer}
                </span>
            </span>
        ))
        navigate(MAP_ROUTE)
    }

    const handleClick = () => {
        const userMessage = (document.querySelector("#input") as HTMLInputElement)
            ?.value

        var questionList = [
            "банк",
            "деньги",
            "банкомат",
            "оформить кредит",
            "оформить карту"
        ]

        let score: number[] = []

        questionList.forEach((question) => {
            const count = distance(userMessage, question)
            score.push(count)
        })

        let maxIndex = 0
        let minIndex = 0

        for (let i = 1; i < score.length; i++) {
            if (score[i] > score[maxIndex]) {
                maxIndex = i
            }

            if (score[i] < score[minIndex]) {
                minIndex = i
            }
        }

        const command = questionList[maxIndex]

        let answer: string
        switch (command) {

            case 'банк':
                answer = 'Хорошо, отображаю на карте ближайшие отделения банка'
                notification(answer)
                break;
            case 'банкомат':
                answer = 'Хорошо, отображаю на карте ближайшие банкоматы'
                notification(answer)
                break;
            case 'оформить кредит':
                answer = 'Нажмите на вкладку с верху экрана'
                break;
            case 'оформить карту':
                answer = 'Нажмите на вкладку с верху экрана'
                break;
            case 'деньги':
                answer = 'Нашла для вас ближайшие банкоматы'
                notification(answer)
                break;
        }
        setchatList([...chatList, [userMessage, "user"], [answer, "ai"]])
    }

    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition()

    if (RecordStart == true && isListening == true) {
        setRecordStart(false)
    }

    if (RecordStart == false && isListening == false) {
        console.log("text: " + text + ' isListening: ' + isListening)
        setRecordStart(true)
        var inpuuut = (document.querySelector("#input") as HTMLInputElement)
        inpuuut.value = text
        handleClick()
    }

    const btnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        var text = event.target.innerText
        var inpuuut = (document.querySelector("#input") as HTMLInputElement)
        inpuuut.value = text
        handleClick()
    }

    return (
        <div className={`${styles.MainContainer} `}>
            <div className={`${styles.MainContainer__animeVTB} `} />
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ul className={`${styles.MainContainer__chat} `}>
                        {chatList.map((item, index) => (
                            <AnimatePresence>
                                <li
                                    className={styles.MainContainer__chat__item}
                                    key={index}
                                >
                                    <ChatMessage
                                        message={item[0]}
                                        typeMessage={item[1]}
                                    />
                                </li>
                            </AnimatePresence>
                        ))}
                    </ul>
                </motion.div>
                <div className={`${styles.MainContainer__BottomContainer} `}>
                    <div className={`${styles.MainContainer__rowContainer} `}>
                        <input
                            type="text"
                            id="input"
                            name="name"
                            placeholder="Искать здесь..."
                        />
                        <div
                            className={`${styles.MainContainer__btnSearch} `}
                            onClick={handleClick}
                        />
                        <div className={`${styles.MainContainer__startListening}`} onClick={startListening}></div>
                        {/* <button onClick={stopListening} className={`${styles.MainContainer__stopListening}`}>Stop listening</button> */}
                        {/* {isListening ? <div>Your browser listening</div> : null} */}

                    </div>
                    <div className={`${styles.MainContainer__rowContainer} `}>
                        <button className={`${styles.btnQuestion}`} onClick={btnClick}>
                            Ближайший банкомат
                        </button>
                        <button className={`${styles.btnQuestion} `} onClick={btnClick}>
                            Ближайщее отделение банка
                        </button>
                        <button className={`${styles.btnQuestion} `} onClick={btnClick}>
                            Снять наличку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelperChanPage