import React from 'react'
import {useHistory, Link} from 'react-router-dom'
import styled from 'styled-components'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io"
import {AiOutlineComment} from "react-icons/ai"
import {BiRepost} from "react-icons/bi"
import ReactTooltip from 'react-tooltip';
import { BsTrash, BsPencil } from "react-icons/bs";
import {FiSend} from "react-icons/fi"
import ReactHashtag from "react-hashtag";
import {useContext,useState, useRef, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import axios from 'axios';
import Modal from 'react-modal';
import preloader from '../images/preloader.gif'
import defaultSnippet from '../images/defaultSnippet.jpg'
import VideoPlayer from "./VideoPlayer"
import getYouTubeID from "get-youtube-id"
import UserMap from "./UserMap"
import useInterval from 'use-interval'
import LinkWindow from "./LinkWindow"


export default function Post({post}) {
    const {userInfo, refresh, setRefresh} = useContext(UserContext)
    const [editing,setEditing] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const [badImage, setBadImage] = useState(false)
    const [like, setLike] = useState(post.likes.some(like=> like.userId === userInfo.user.id))
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showRepostModal, setShowRepostModal] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [likeNum, setLikeNum] = useState(post.likes.length);
    const [postText,setPostText] = useState(post.text)
    const [postCommentText, setPostCommentText] = useState()
    const [commentList, setCommentList] = useState({comments:[]})
    const [followingList, setFollowingList] = useState([])
    const [showLinkWindow,setShowLinkWindow] = useState(false)
    const history = useHistory()
    const inputRef = useRef()
    
    const location = post.geolocation?post.geolocation:"";
    const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const response = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`, config)
        response.then((data)=>{
            setFollowingList(data.data)
        })
        const answer = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comments`, config)
        answer.then((data)=>{
            setCommentList(data.data)
        })
    }, [userInfo.token,post.id])

    useInterval(()=>{
        getCommentList()
    }, [5000])

    function getCommentList(){
        const response = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comments`, config)
        response.then((data)=>{
            setCommentList(data.data)
        })
    }

    function handleLike(){
        setLike(true);
        setLikeNum(likeNum+1);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,{},config)
        promisse.catch(()=>{
            setLike(false);
            setLikeNum(likeNum);
            setRefresh(refresh+1)
            alert("Houve um problema ao curtir esta publicação!");
        });
    }

    function handleDislike(){
        setLike(false);
        setLikeNum(likeNum-1);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,{},config)
        promisse.then(()=>{
            setRefresh(refresh+1)
        });
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
            setShowDeleteModal(false)
            setRefresh(refresh+1)
        })
        response.catch(()=>{
            setDisabled(false)
            setShowDeleteModal(false)
            alert("Não foi possível deletar o post. Tente novamente.")
        })
    }

    function confirmRepost(){
        setDisabled(true)
        const response = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/share`, {}, config)
        response.then(()=>{
            setDisabled(false)
            setShowRepostModal(false)
            setRefresh(refresh + 1)
        })
        response.catch(()=>{
            setDisabled(false)
            setShowRepostModal(false)
            alert("Não foi possível deletar o post. Tente novamente.")
        })
    }

    function submitComment(e){
        e.preventDefault()
        const response = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comment`, {text:postCommentText}, config)
        response.then(()=>{
            setPostCommentText("")
            getCommentList()
        })

    }

    return(
        <PostWrapper>
            {post.repostedBy &&  
                <RepostedHeader>
                    <BiRepost></BiRepost>
                    <p>Reposted by <strong>{post.repostedBy.username}</strong></p>
                </RepostedHeader>
            }
            <PostStyles>
                <div className="left-column">
                    <div onClick={goToUser} className="profile-picture"> 
                        <img src={post.user.avatar} alt="profile"/>
                    </div>
                    <div className="like-container">
                        { like ? <IoIosHeart style={{color:"#AC0000", cursor:'pointer'}} onClick={handleDislike}/> : <IoIosHeartEmpty style={{cursor:'pointer'}} onClick={handleLike}/>}
                    </div>
                    <ReactTooltip arrowColor={'#fff'} className="tooltip"/>
                    <p data-tip={
                            like?
                                likeNum===1?
                                    `Você`:
                                    likeNum===2?

                                        `Você e ${(post.likes.find(i=> i["user.username"]!==userInfo.user.username))["user.username"]}`:
                                        `Você, ${(post.likes.find(i=> i["user.username"]!==userInfo.user.username))["user.username"]} e outras ${likeNum-2} pessoas`
                            :
                                likeNum===0?
                                    "Ninguém":
                                    likeNum===1?
                                        (post.likes.find(i=> i["user.username"]!==userInfo.user.username))["user.username"]:
                                        likeNum===2?
                                            `${(post.likes.find(i=> i["user.username"]!==userInfo.user.username))["user.username"]} e ${(post.likes.reverse().find(i=> i["user.username"]!==userInfo.user.username))["user.username"]}`:
                                            `${(post.likes.find(i=> i["user.username"]!==userInfo.user.username))["user.username"]}, ${(post.likes.reverse().find(i=> i["user.username"]!==userInfo.user.username))["user.username"]} e outras ${likeNum-2} pessoas`
                    }>{`${likeNum} likes`}</p>

                    <div className="like-container">
                        <AiOutlineComment style={{cursor:'pointer'}} onClick={()=> setShowComments(!showComments)}></AiOutlineComment>
                    </div>
                    <p>{post.commentCount} comments</p>
                    <div className="like-container">
                        <BiRepost onClick={()=> setShowRepostModal(true)} style={{cursor:'pointer'}}></BiRepost>
                    </div>
                    <p>{post.repostCount} re-post</p>
                    <Modal isOpen={showRepostModal}
                                        className="Modal"
                                        overlayClassName="Overlay"
                                        ariaHideApp={false}>
                        <HeaderModal>
                            { disabled ? "Reposting..." : "Do you want to re-post this link?" }
                        </HeaderModal>
                        {disabled && 
                            <Loader>
                                <img src={preloader} style={{marginTop:20}} alt="loading"></img>
                            </Loader>
                        }       
                        <Buttons>
                            <NoButton disabled={disabled} onClick={()=> setShowRepostModal(false)}>
                                No, cancel
                            </NoButton>
                            <YesButton disabled={disabled} onClick={confirmRepost}>
                                Yes, share!
                            </YesButton>
                        </Buttons>
                    </Modal>
                </div>
                <PostContent>
                    <div className="post-header">
                        <div className="user-info">
                            <p className="post-username" onClick={goToUser} >{post.user.username}</p>
                            {location?<UserMap username={post.user.username} location={location}/>:""}
                        </div>
                        {post.user.username===userInfo.user.username && 
                            <div className="post-icons">
                                <BsPencil style={{cursor:'pointer'}} onClick={()=>editPost()}/>
                                <BsTrash  style={{cursor:'pointer'}} onClick={()=> setShowDeleteModal(true)}/>
                                <Modal isOpen={showDeleteModal}
                                        className="Modal"
                                        overlayClassName="Overlay"
                                        ariaHideApp={false}>
                                    <HeaderModal>{ disabled ? "Deletando..." : "Tem certeza que deseja excluir essa publicação?" }</HeaderModal>
                                    {disabled && 
                                        <Loader>
                                            <img src={preloader} style={{marginTop:20}} alt="loading"></img>
                                        </Loader>
                                    }       
                                    <Buttons>
                                        <NoButton disabled={disabled} onClick={()=> setShowDeleteModal(false)}>
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
                {getYouTubeID(post.link)!==null?
                    <VideoPlayer link={post.link}/>:
                    <>
                        <LinkSnippet onClick={()=>setShowLinkWindow(true)}>
                            <div className="link-content">
                                <p>{post.linkTitle ? post.linkTitle : `  Can't find any title for this link  `}</p>
                                <p>{post.linkDescription ? post.linkDescription.substring(0,100) +  "..." : `" Can't find any description for this link "`}</p>
                                <p>{post.link.substring(0,55)}  ... </p>
                            </div>
                            <div className="link-img">
                                <img src={badImage ? defaultSnippet : post.linkImage || defaultSnippet} onError={()=>setBadImage(true)} alt="link preview"/>
                            </div>
                        </LinkSnippet>
                        <LinkWindow link={post.link} showLinkWindow={showLinkWindow} setShowLinkWindow={setShowLinkWindow}/>
                    </>
                }
            </PostContent>
        </PostStyles>
            {showComments &&
                <CommentSection show={showComments}>
                    { commentList.comments.length > 0 ? commentList.comments.map((c, i) => (
                        <Comment key={i}>
                            <Link to={`/user/${c.user.id}`}>
                                <img src={c.user.avatar} alt="user"></img>
                            </Link>
                                <Description>
                                    <Link to={`/user/${c.user.id}`}>
                                        <UsernameWrapper>
                                            <h1>{c.user.username}</h1>
                                            {c.user.id === post.user.id ? <p>• post's author</p> : (
                                                followingList.users.some(f => c.user.id === f.id) ? <p>• following</p>: ""
                                            ) }
                                        </UsernameWrapper>
                                    </Link>
                                    <p>
                                        <ReactHashtag onHashtagClick={(hashtag)=>goToHashtag(hashtag)}>
                                            {c.text}
                                        </ReactHashtag>
                                    </p>
                            </Description>
                        </Comment>
                    )) : <p>Nenhum comentario ainda, seja o primeiro a comentar!</p>
                    }
                    <PostNewComment>
                        <img src={userInfo.user.avatar} alt="user"></img>
                        <form onSubmit={submitComment}>
                            <Input value={postCommentText} placeholder="write a comment ..." onChange={(e)=>setPostCommentText(e.target.value)}></Input>
                            <SendButton style={{cursor:'pointer'}} onClick={submitComment}>
                                <FiSend ></FiSend>
                            </SendButton>
                        </form>
                    </PostNewComment>
                </CommentSection>
            }
        </PostWrapper>
    )
}
const PostNewComment = styled.div`
    display:flex;
    padding-top:15px;
    form{
        margin-left:10px;
        width:100%;
        display:flex;
        justify-content: space-between;
        align-items: center;
        background:#252525;
        border-radius:8px;
    }
    img{
        width:39px;
        height:39px;
        border-radius:50%;
    }
`

const Input = styled.input`
    width:100%;
    height:100%;
    background:none;
    border:none;
    outline:none;
    color:#acacac;
    padding:5px 15px;
    font-family: 'Lato',sans-serif;
    &::placeholder{
        color:#575757;
        font-style:italic;
        
    }

`

const SendButton = styled.button`
    background:none;
    border:none;
    outline:none;
    color: #f3f3f3;
    height:100%;
    width:20px;
    font-size: 15px;
    margin-right:12px;

`

const Description = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    margin-left: 20px;
    h1{
        font-family: 'Lato',sans-serif;
        font-size:14px;
        font-weight: 700;
        color:#f3f3f3;
        margin-bottom:3px;
    }
    p{
        font-family: 'Lato',sans-serif;
        font-size:14px;
        font-weight: 400;
        color:#ACACAC;
        span{
            font-weight: 700;
            color:white;
        }
    }

`
const UsernameWrapper = styled.div`
    display:flex;
    p{
        margin-left: 5px;
        color:#565656;
    }
`

const Comment = styled.div`
    border-bottom: 1px solid #353535 ;
    display:flex;
    padding: 15px 0;
    img{
        width:39px;
        height:39px;
        border-radius:50%;
    }
`

const CommentSection = styled.div`
    padding: 0 25px 25px 25px;
    &>p{
        color:white;
        margin-top:10px;
    }
`
const PostWrapper = styled.div`
    background:#1e1e1e;
    border-radius:16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom:44px;
`
const RepostedHeader = styled.div`
    
    left:0;
    right:0;
    height:30px;
    top:0; 
    display:flex;
    align-items: center;
    margin: 0 10px;
    font-size:11px;
    svg{
        color:white;
        font-size:25px;
    }
    p{  
        margin-left:6px;
        color:white;
        font-family: 'Lato', sans-serif;
    }
    strong{
        font-weight: 700;
    }

`

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
cursor: pointer;

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
        word-break: break-all;
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
    width: 100%;
    min-height: 95px;
    margin-right:0px;
    
    .link-content{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    width: 100%;

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
    width: 100%;
    min-height: 75px;
    .link-img{
        max-width: 95px;
        min-height: 95px;
    }
}

`

const PostContent = styled.div`
width:100%;
height:100%;

span{
    color:#fff;
    font-weight: bold;
}
.user-info{
    display:flex;
    align-items: center;
    gap:10px;
}

.post-username{
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
    span{
       color:white;
       cursor: pointer; 
    }
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
    font-family: 'Lato', sans-serif;
    background:#171717;
    display: flex;
    border-radius:16px;
    padding: 18px 21px 20px 10px;
    z-index:0;

    .left-column{
        display: flex;
        width:87px;
        flex-direction: column;
        align-items: center;
        margin-right: 8px;
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
            margin-bottom:10px;
            font-weight: 400;
            font-size: 11px;
            color:#fff;
            cursor:default;
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
            margin-right: 6px;
            .profile-picture{
                margin-top: 8px;
                width:40px;
                height: 40px;
            }
        }
    }
`