import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import styled from 'styled-components';
import Modal from 'react-modal';


export default function LinkWindow({link, showLinkWindow, setShowLinkWindow}){

    console.log(link)
    return(
            <Modal style={style} isOpen={showLinkWindow} ariaHideApp={false}>
                <Content>
                    <div>
                        <button>Open in new tab</button>
                        <AiOutlineClose onClick={() => setShowLinkWindow(false)} />
                    </div>
                    <iframe title="ifrrameasas" src="https://www.youtube.com/watch?v=B9XGUpQZY38&t=532s"></iframe>
                </Content>
            </Modal>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    button{
        width: 138px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        border:none;
    }
    svg{
        cursor: pointer;
        font-size: 20px;
    }
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
`;

export const style = {
    overlay:{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
    },
    
    content: {
        top:"10%",
        margin: "0 auto",
        backgroundColor: "#333",
        width:"90%",
        height:"85%",
        opacity: "1",
        borderRadius: "10px", 
        color: 'white',
    }
}

