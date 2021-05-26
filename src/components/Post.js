import React from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import { IoIosHeartEmpty } from "react-icons/io"


export default function Post({post}) {

    const history = useHistory();
    console.log(post)

    function toggleLike(){
        return
    }

    function goToUser(){
        history.push("/user/"+post.user.id);
    }

    return(
        <PostStyles>
            <div className="left-column">
                <div onClick={goToUser} className="profile-picture"> 
                    <img src={post.user.avatar} alt="profile"/>
                </div>
                <div className="like-container" onClick={toggleLike} >
                    <IoIosHeartEmpty/>
                </div>
                <p>{post.likes.length+" likes"}</p>
            </div>
            <PostContent>
                <p className="post-username" onClick={goToUser} >{post.user.username}</p>
                <p className="post-description">{post.text? post.text : 'Hey, check this Link i found on Linkr'}</p>
                <a href={post.link} target="_blank">
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

const LinkSnippet = styled.div`

display: flex;
justify-content: space-between;
width: 503px;
min-height: 155px;
border-radius: 11px;
margin-top:10px;
border: 1px solid #4d4d4d;
color:#cecece;

.link-content{
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
    }
}

`

const PostContent = styled.div`

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

`