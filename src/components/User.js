import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Trending from "./Trending/Trending"
import Post from './Post'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import preloader from '../images/preloader.gif'

export default function User(){
    const { id } = useParams()
    const {userInfo, refresh} = useContext(UserContext);
    const [selectedUserPosts, setSelectedUserPosts] = useState([]);
    const [selectedUserInfo, setSelectedUserInfo] = useState([]);
    const [loader, setLoader] = useState(true);
    

    

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const userInfoPromisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`, config )
        userInfoPromisse.then(response =>{
            setSelectedUserInfo(response.data)
            getUserInfo()
        })
        userInfoPromisse.catch(() =>{
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        })
        function getUserInfo(){
            const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
            const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,config);
            promisse.then(answer=>{
                setSelectedUserPosts(answer.data.posts);
                setLoader(false);
            });
            promisse.catch((answer)=>{
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
            });
        }
    },[userInfo.token, id, refresh])

    return(
        <PageContainer>
            {loader ?
                <Loading>  
                    <img src={preloader} alt="preloader"/> 
                    <p>Loading</p>
                </Loading>
            :
                <>
                    <TimelineStyles>
                        <div className="content">
                            <header>
                                {selectedUserInfo.user.username}'s posts
                            </header>
                            {selectedUserPosts.length === 0 ? ("Nenhum post encontrado") : selectedUserPosts.map((post)=>(
                                <Post post={post} timeline={true} key={post.id}/>
                            ))}
                        </div>
                    </TimelineStyles>
                    <div className="hashtag-container">
                        <Trending/>
                    </div>
                </>
            }
        </PageContainer>
    )
}

const Loading=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12%;
    align-items: center;
    p{
        font-size:38px;
    }
`

const PageContainer = styled.div`

display:flex;
justify-content:center;
background: #333;
min-height: calc(100vh - 72px);
margin: 72px 0px 0px 0px;
font-family: 'Oswald', sans-serif;

    .hashtag-container{
    width:301px;
    min-height: 406px;
    border-radius: 16px;
    margin-top:162px;
    }
    
@media(max-width:950px){
    width: 100%;
    .hashtag-container{
        display:none;
    }
}

`

const TimelineStyles=styled.div`

display: flex;
flex-direction: column;
width:611px;
justify-content: space-between;
margin-right: 25px;
margin-top:58px;

    header{
        margin-bottom:46px;
        font-weight: 700;
        font-size:43px;
        color: #fff;
    }

    &>div{
        justify-content: flex-start;
    }
    @media(max-width:950px){
        margin-right:0;
    }
    @media(max-width:611px){
        width:100%;
    }

@media(max-width:414px){
    width:100%;
    margin: 40px 0 0 0;

    header{
        margin-left:17px;
        margin-top:25px;
        margin-bottom:22px;
    }
}

@media(max-width:375px){
    width: 100%;
}

`