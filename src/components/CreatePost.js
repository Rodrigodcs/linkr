import styled from 'styled-components'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'

export default function CreatePost(){

    const {userInfo} = useContext(UserContext)

    function submitPost(e){
        e.preventDefault();
        alert("posting is underconstruction")

    }

    return(
        <CreatePostStyles>
            <div className="left-column">
                <div className="profile-picture"> 
                    <img src={userInfo.user.avatar} alt="profile"/>
                </div>
            </div>
            <div className="post-content">
                <p>O que você tem pra favoritar hoje?</p>
                <form onSubmit={submitPost}>
                    <textarea required placeholder="http://..."></textarea>
                    <textarea required placeholder="Muito irado esse link falando de #javascript"></textarea>
                    <button type="submit">Publicar</button>
                </form>
            </div>
        </CreatePostStyles>
    )
}

const CreatePostStyles= styled.div`

width: 611px;
min-height: 209px;
background: #fff;
border-radius: 16px;
box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
padding: 16px 22px 16px 18px;
margin-bottom:29px;
display:flex;

.profile-picture{
    width:50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    img{
        width: 50px;
        height: 50px;
    }
}

.post-content{
    margin-left:18px;
    width: 100%;

    p{
        padding-top: 6px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 24px;
        color:#707070;
        margin-bottom: 10px;
    }

    textarea{
        height:30px;
        width:503px;
        resize:none;
        outline-style: none;
        border:none;
        border-radius:5px;
        background:#efefef;
        padding-top:8px;
        padding-left: 12px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;

        &:nth-child(2){
            height: 66px;
        }
    }

    button{
        background: #1877F2;
        margin-left: 392px;
        width: 112px;
        height: 31px;
        color:#fff;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 14px;
        border-radius:5px;
        border:none;
        outline-style: none;
        cursor:pointer;
    }

}

`
