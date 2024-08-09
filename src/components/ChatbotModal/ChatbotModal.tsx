import {useEffect, useState} from "react";
import styles from "./ChatbotModal.module.less"
import DataLynnIcon from "./assets/DataLynnIcon.png"
import StatusIcon from "./assets/statusIcon.png"
import VectorIcon from "./assets/Vector.png"
import MessageList from "./MessageList/MessageList";
import { postInitModelApi } from "@/services/api/chatbotApi";



function ChatbotModal({visible,  messageList}) {

    const [messages, setMessages] = useState<{ role: string; data:any }[]>([]);
    const [promptText, setPromptText] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(true);
    console.log(messageList)


    useEffect(() => {
        if (visible) {
            setMessages([]);
            console.log("haha")
            handleSendMessage({displayText:"init", modelInput:"/greet"});
        }else {
            setMessages([]);
            setIsInit(true);
        }
    }, [visible])
    

    const handleSendMessage = async (promptObj: {displayText: string, modelInput: string}) => {
        const {displayText, modelInput} = promptObj;
        if (!validateInput(displayText)) {
            return;
        }

        if (displayText != "init") {
            setMessages((messages) => messages.concat([{role: "user", data: {text: displayText, type:"text"}}]))
        }
        setPromptText("");
        setIsGenerating(true);
        
        // Don't send more requests while generating
        if (isGenerating) {
            return;
        }

        const res = await postInitModelApi({message: modelInput});
        setMessages(messages => {
            let return_obj = [{role: "bot", data:{text: "Sorry, I don't understand.", type:"text"}}]
            if (res?.length > 0) {
                const textMessage = res[0].text;
                const buttons = res[0].buttons;
                return_obj = [{role: "bot", data:{text: textMessage, type:"text"}}]
                if (buttons?.length > 0) {
                    return_obj = return_obj.concat(buttons.map(elem => { return {role: "bot", data: {text: elem.title, type:"button", link: elem.payload}}}))
                }
            }
            return messages.concat(return_obj);
        });

        
        setIsGenerating(false);
        setIsInit(false);
    }

    // See if user doesn't enter anything
    const validateInput = (text) => {
        return !!text;
    }   

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setPromptText(inputText);
    }

    return (
        <div className={styles.wrapper}
            >
            <div className={
                [   
                    styles.container,
                    visible && `${styles.open}`
                ]
                .filter(Boolean)
                .join(' ')
                }>
                <div className={styles.topContainer}>
                    <img className={styles.companyImage} src={DataLynnIcon} alt="" />
                    <div className={styles.description}>
                        <div className={styles.topText}>DataLynn Customer Service</div>
                        <div className={styles.statusContainer}>
                            <div className={styles.statusIcon}>
                                <img src={StatusIcon} className={styles.statusIcon} alt=""></img>
                            </div>
                            <div className={styles.statusDescription}>online</div>
                        </div>
                    </div>
                </div>
                <div className={styles.messageContainer}>
                    <MessageList messages={messages} isGenerating={isGenerating} isInit={isInit} handleSendMessage = {handleSendMessage}/>
                </div>
                <div className={styles.promptContainer}>
                    <div className={styles.line}></div>
                    <div className={styles.inputContainer}>
                        <input className={styles.input} value={promptText} 
                        onChange={handleInputChange}
                        onKeyDown={(e)=>{
                            if (e.key == "Enter") {
                                handleSendMessage({displayText: promptText, modelInput: promptText});
                            }
                        }
                        }
                        placeholder={"Ask your question..."}></input>
                        {promptText && <img className={styles.submit} src={VectorIcon} alt=""
                        onClick={()=>{handleSendMessage({displayText: promptText, modelInput: promptText});}}
                        ></img>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChatbotModal;