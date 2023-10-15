import { FC } from 'react'

import styles from '@/components/elements/ChatMessage/chat-message.module.scss'

interface Props {
    message: string,
    typeMessage: string
}

const ChatMessage: FC<Props> = ({ message, typeMessage }) => {

    return (

        <div className={`${typeMessage === "ai" ? styles.chatContainerAI : styles.chatContainerUser}`}>
            <p className={`${styles.chatContainer__message} `}>
                {message}
            </p>
        </div>

    )
}

export default ChatMessage