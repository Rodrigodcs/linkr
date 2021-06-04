import { useContext, useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Trending from "./Trending/Trending"
import Post from './Post'
import useInterval from 'use-interval'
import UserContext from '../contexts/UserContext'
import preloader from '../images/preloader.gif'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import axios from 'axios'

export default function TimeLine(){

    const {userInfo, refresh, lastId, setLastId, morePosts, setMorePosts} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    const [followingList, setFollowingList] = useState({users: []})    

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",config);
        promisse.then(answer=>{
            setLoader(false);
            setPosts(answer.data.posts);
            setMorePosts(answer.data.posts.length);
            setLastId(answer.data.posts[answer.data.posts.length -1])
        });
        promisse.catch(()=>alert("Houve uma falha ao obter os posts, por favor atualize a página"));
        const response = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`, config)
        response.then((data)=>{
            setFollowingList(data.data)
        })
    },[userInfo.token, refresh,setLastId,setMorePosts])

     useInterval(()=>{
        if(followingList.users.length > 0){
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?earlierThan=${posts[0].id}`,config);
        promisse.then(answer=>{
            setPosts([...answer.data.posts, ...posts]);
        });
        promisse.catch(()=>alert("Houve uma falha ao obter os posts, por favor atualize a página"));
     }},15000);

    function loadFunc() {
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${lastId.id}`,config);
        promisse.then((answer)=>{
            setPosts([...posts, ...answer.data.posts]);
            setMorePosts(answer.data.posts.length);
            setLastId(answer.data.posts[answer.data.posts.length-1]);

        })
    }

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
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        threshold={100}
                        loadMore={loadFunc}
                        hasMore={morePosts >= 10}
                        loader={
                            <div className="load-more-posts" key={0}>
                                <div>
                                    <img src={preloader} alt="loading more"/>
                                </div>
                                <p>Loading more posts...</p>
                            </div>
                        }>
                            {followingList.users.length === 0 ? "Você não segue ninguém ainda, procure por perfis na busca" :
                        (posts.length === 0 ? ("Nenhum post encontrado") : posts.map((post)=>(
                            <Post post={post} key={post.repostId ? post.repostId :post.id}/>
                        )))}
                    </InfiniteScroll>

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