import { FC } from 'react'

import useSpeechRecognition from '@/hooks/useSpeechRecognition'

const SpeechRecognitionElem: FC = () => {
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition()

    return (
        <div>
            {hasRecognitionSupport ? (
                <>
                    <div>
                        <button onClick={startListening}>Start listening</button>
                    </div>
                    <div>
                        <button onClick={stopListening}>Stop listening</button>
                    </div>
                    {isListening ? <div>Your browser listening</div> : null}
                    {text}
                </>
            ) : (
                <h1>Your browser has no recognition support</h1>
            )}
        </div>
    )
}

export default SpeechRecognitionElem