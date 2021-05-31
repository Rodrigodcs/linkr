import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import CreatePost from './CreatePost'
import Trending from "./Trending/Trending"
import Post from './Post'
import useInterval from 'use-interval'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import preloader from '../images/preloader.gif'

export default function TimeLine(){

    const {userInfo, refresh} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);
    
    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",config);
        promisse.then(answer=>{
            setLoader(false);
            setPosts(answer.data.posts);
        });
        promisse.catch(()=>alert("Houve uma falha ao obter os posts, por favor atualize a página"));
    },[userInfo.token, refresh])

    useInterval(()=>{
        console.log("refresh")
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",config);
        promisse.then(answer=>{
            setLoader(false);
            setPosts(answer.data.posts);
        });
        promisse.catch(()=>alert("Houve uma falha ao obter os posts, por favor atualize a página"));
    },15000);
    
    return(
        <PageContainer>
            {loader
            ?<Loading>  
            <img src={preloader} alt="preloader"/> 
            <p>Loading</p>
            </Loading>
            :<>
            <TimelineStyles>
                <div className="content">
                    <header>timeline</header>
                    <CreatePost setPosts={setPosts}/>
                    {posts.length === 0 ? ("Nenhum post encontrado") : posts.map((post)=>(
                        <Post post={post} timeline={true} key={post.id}/>
                    ))}
                    
                </div>
            </TimelineStyles>
                <div className="hashtag-container">
                    <Trending/>
                </div>
            </>}
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
    margin: 0px 0px;

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

