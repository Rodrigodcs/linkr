import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io"
import { BsTrash, BsPencil } from "react-icons/bs";
import ReactHashtag from "react-hashtag";
import {useContext,useState, useRef} from "react"
import UserContext from "../contexts/UserContext"
import axios from 'axios';
import Modal from 'react-modal';
import preloader from '../images/preloader.gif'

export default function Post({post, timeline}) {
    const {userInfo, refresh, setRefresh} = useContext(UserContext)
    const [editing,setEditing] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [like, setLike] = useState(post.likes.some(like=> timeline ? like.userId === userInfo.user.id : like.id === userInfo.user.id))
    const [likeNum, setLikeNum] = useState(post.likes.length);
    const [postText,setPostText] = useState(post.text)
    const history = useHistory()
    const inputRef = useRef()

    const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}

    function handleLike(){
        setLike(true);
        setLikeNum(likeNum+1);

        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,{},config)
        promisse.then(()=>{});
        promisse.catch(()=>{
            setLike(false);
            setLikeNum(likeNum);
            alert("Houve um problema ao curtir esta publicação!");
        });
    }

    function handleDislike(){
        setLike(false);
        setLikeNum(likeNum-1);

        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,{},config)
        promisse.then(()=>{});
        promisse.catch(()=>{
            setLike(true);
            setLikeNum(likeNum);
            alert("Houve um problema ao descurtir esta publicação!");
        });
    }

    function goToHashtag(hash){
        const str = hash.substr(1);
        if(str.lenght===0)return;
        history.push(`/hashtag/${str}`);
    }

    function goToUser(){
        post.user.username===userInfo.user.username?
        history.push(`/my-posts`):
        history.push(`/user/${post.user.id}`);
    }

    function editPost(){
        setEditing(true)
        setTimeout(()=>inputRef.current.focus(), 200);
    }

    function cancelEdition(e){
        if(e.keyCode===27){
            setPostText(post.text)
            setEditing(false)
        }else if(e.keyCode===13){
            requestPostEdition()
        }
    }

    function requestPostEdition(){
        setDisabled(true)
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`,{text:postText},config)
        request.then(r=> {
            post.text=postText;
            setEditing(false)
            setDisabled(false)
        })
        request.catch(e=>{
            alert("Não foi possivel salvar as alterções")
            setDisabled(false)
        })
    }

    function confirmDelete(){
        setDisabled(true)
        const response = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}`, config)
        response.then(()=>{
            setShowModal(false)
            setRefresh(refresh+1)
        })
        response.catch(()=>{
            setDisabled(false)
            setShowModal(false)
            alert("Não foi possível deletar o post. Tente novamente.")
        })
    }

    return(
        <PostStyles>
            <div className="left-column">
                <div onClick={goToUser} className="profile-picture"> 
                    <img src={post.user.avatar} alt="profile"/>
                </div>
                <div className="like-container">
                    { like ? <IoIosHeart style={{color:"#AC0000", cursor:'pointer'}} onClick={handleDislike}/> : <IoIosHeartEmpty style={{cursor:'pointer'}} onClick={handleLike}/>}
                </div>
                <p>{likeNum+" likes"}</p>
            </div>
            <PostContent>
                <div className="post-header">
                    <p className="post-username" onClick={goToUser} >{post.user.username}</p>
                    {post.user.username===userInfo.user.username && 
                        <div className="post-icons">
                            <BsPencil style={{cursor:'pointer'}} onClick={()=>editPost()}/>
                            <BsTrash  style={{cursor:'pointer'}} onClick={()=> setShowModal(true)}/>
                            <Modal isOpen={showModal}
                                    className="Modal"
                                    overlayClassName="Overlay"
                                    ariaHideApp={false}>
                                <HeaderModal>{disabled ? "Deletando..." : "Tem certeza que deseja excluir essa publicação?" }</HeaderModal>
                                {disabled && 
                                    <Loader>
                                        <img src={preloader} style={{marginTop:20}} alt="loading"></img>
                                    </Loader>
                                }       
                                <Buttons>
                                    <NoButton disabled={disabled} onClick={()=> setShowModal(false)}>
                                        Não, voltar
                                    </NoButton>
                                    <YesButton disabled={disabled} onClick={confirmDelete}>
                                        Sim, excluir
                                    </YesButton>
                                </Buttons>
                            </Modal>
                        </div>
                    }
                </div>
                    {editing?
                        <textarea 
                            ref={inputRef}
                            wrap="soft" 
                            value={postText} 
                            onChange={(e)=>setPostText(e.target.value)} 
                            onKeyDown={(e)=>cancelEdition(e)}
                            disabled={disabled}
                        ></textarea>:
                        <p className="post-description">
                            <ReactHashtag onHashtagClick={(hashtag)=>goToHashtag(hashtag)}>
                                    {post.text!=="" ? post.text : "Hey, check this link i found on Linkr"}
                            </ReactHashtag>
                        </p>
                    }
                <a href={post.link} target="_blank" rel="noreferrer">
                    <LinkSnippet>
                        <div className="link-content">
                            <p>{post.linkTitle ? post.linkTitle : `  Can't find any title for this link  `}</p>
                            <p>{post.linkDescription ? post.linkDescription : `" Can't find any description for this link "`}</p>
                            <p>{post.link}</p>
                        </div>
                        <div className="link-img">
                            <img src={post.linkImage} alt="link preview"/>
                        </div>
                    </LinkSnippet>
                </a>
            </PostContent>
        </PostStyles>
    )
}

const Loader = styled.div`
    width:50px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    img{
        width:100%;
        height:100%;
    }
`

const HeaderModal = styled.h1`
    font-family: 'Lato',sans-serif;
    font-size: 34px;
    font-weight: 700;
    color:#fff;
`

const Buttons = styled.div`
    display: flex;
    margin-top: 30px;
    width:300px;
    justify-content: space-between;
`

const YesButton = styled.button`
    width:134px;
    height:37px;
    border-radius:5px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Lato',sans-serif;
    text-align: center;
    outline:none;
    border:none;
    background:#1877F2;
    color:white;
`
const NoButton = styled.button`
    width:134px;
    height:37px;
    border-radius:5px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Lato',sans-serif;
    text-align: center;
    outline:none;
    border:none;
    background:#FFF;
    color:#1877F2;
`

const LinkSnippet = styled.div`

width: 100%;
display: flex;
justify-content: space-between;
min-height: 155px;
max-width: 503px;
margin-top:10px;
color:#cecece;

.link-content{
    border-radius: 11px 0px 0px 11px;
    border: 1px solid #4d4d4d;
    border-right: 0px;
    width: 70%;
    padding: 20px;
    max-width:350px;

    p:nth-child(1){
        font-size: 16px;
        margin-bottom: 8px;
    }
    p:nth-child(2){
        font-size: 11px;
        color:#9b9595;
        margin-bottom: 15px;
    }
    p:nth-child(3){
        font-size: 11px;
        word-break: break-word;
    }
}

.link-img{
    width:155px;
    height: 155px;
    overflow: hidden;
    border-radius: 0px 11px 11px 0px;

    img{
        width: 100%;
        height:100%;
        overflow:hidden;
    }
}

@media(max-width:414px){
    width: 330px;
    min-height: 95px;
    margin-right:0px;
    
    .link-content{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    width: 255px;

        p:nth-child(1){
            font-size: 11px;
            margin-bottom: 4px;
        }
        p:nth-child(2){
            font-size: 9px;
            color:#9b9595;
            margin-bottom: 6px;
        }
        p:nth-child(3){
            font-size: 9px;
        }
    }

    .link-img{
    min-height: 95px;
    height: auto;

        img{
            overflow:hidden;
        }
    }
}

@media(max-width:375px){
    width: 288px;
    min-height: 75px;
    .link-img{
        max-width: 95px;
        min-height: 95px;
    }
}

`

const PostContent = styled.div`
width:100%;
span{
    color:#fff;
    font-weight: bold;
}

.post-username{
    padding-top:6px;
    font-size: 19px;
    font-weight: 400;
    color:#fff;
    cursor:pointer;
}
.post-description{
    margin-top: 8px;
    font-weight: 400;
    font-size:16px;
    color:#b7b7b7;   
    word-break: break-word;
}
.post-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.post-icons{
    display:flex;
    gap:13px;
    color:white;
    font-size: 23px;
}
textarea{
    outline: none;
    width:100%;
    margin-top: 8px;
    font-weight: 400;
    font-size:16px;
    border-radius: 7px;
    border:none;
    min-height: 44px;
    height:auto;
    word-wrap: break-word;
    word-break: break-all;
    :disabled{
        background-color: #888888;
    }
}

`

const PostStyles = styled.div`

width:611px;
min-height: 276px;
font-family: 'Lato', sans-serif;
background:#171717;
display: flex;
border-radius:16px;
padding: 18px 21px 20px 18px;
margin-bottom:16px;

    .left-column{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 18px;

        .profile-picture{
        width:50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 21px;
        cursor:pointer;
        }

        img{
            height: 50px;
            width: 50px;
        }

        .like-container{
            display: flex;
            justify-content:center;
            color:#fff;
            font-size: 23px;
        }
        
        p{
            margin-top:5px;
            font-weight: 400;
            font-size: 11px;
            color:#fff;
        }

    }
    @media(max-width:611px){
        width:100%;
    }
    @media(max-width:414px){
        width: 100%;
        min-height: 192px;
        border-radius: 0px;
        padding: 10px 15px 15px 15px;

        .left-column{
            margin-right: 12px;

            .profile-picture{
                margin-top: 8px;
                width:40px;
                height: 40px;
            }
        }
    }

`

