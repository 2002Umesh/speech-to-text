import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import { IoTrashBin } from 'react-icons/io5';

const App = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        setTextToCopy(transcript);
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setTextToCopy(transcript);
    };

    const resetTranscriptAndCopy = () => {
        resetTranscript();
        setTextToCopy("");
    };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br />
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                    <div className="reset-btn" onClick={resetTranscriptAndCopy}>
                        <IoTrashBin />
                    </div>
                </div>

                <div className="btn-style">
                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={stopListening}>Stop Listening</button>
                </div>

            </div>
        </>
    );
};

export default App;
