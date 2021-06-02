import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import styled from 'styled-components';
import Modal from 'react-modal';

export default function LinkWindow({link, showLinkWindow, setShowLinkWindow}){

    return(
        <Modal 
            style={style}
            isOpen={showLinkWindow} 
            ariaHideApp={false}
        >
            <Content>
                <div>
                    <a href={link}>Open in new tab</a>
                    <AiOutlineClose onClick={() => setShowLinkWindow(false)}/>
                </div>
                <iframe title="iframe" src={link} width="100%" height="580px"></iframe>
            </Content>
        </Modal>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
    a{
        display:flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 138px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
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

