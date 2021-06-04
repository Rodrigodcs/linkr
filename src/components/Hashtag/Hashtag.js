import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Trending from "../Trending/Trending"
import Post from '../Post'
import UserContext from '../../contexts/UserContext'
import InfiniteScroll from 'react-infinite-scroller'
import preloader from '../../images/preloader.gif'
import axios from 'axios'

export default function Hashtag(){
    const { hashtag } = useParams()
    const {userInfo, refresh, lastId, setLastId, morePosts, setMorePosts} = useContext(UserContext);
    const [postsHash, setPostsHash] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,config);
        promisse.then(answer=>{
            setLoader(false);
            setPostsHash(answer.data.posts);
            setMorePosts(answer.data.posts.length);
            setLastId(answer.data.posts[answer.data.posts.length-1]);
        });
        promisse.catch((answer)=>{
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        });
    },[userInfo.token, hashtag, refresh,setMorePosts,setLastId])

    function loadFunc() {
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts?olderThan=${lastId.id}`,config);
        promisse.then((answer)=>{
            setPostsHash([...postsHash, ...answer.data.posts]);
            setMorePosts(answer.data.posts.length);
            setLastId(answer.data.posts[answer.data.posts.length-1]);

        })
    }

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
                                # {hashtag}
                            </header>
                            <InfiniteScroll
                                pageStart={0}
                                initialLoad={false}
                                threshold={100}
                                loadMore={loadFunc}
                                hasMore={morePosts >= 10}
                                loader={
                                    <div className="loader" key={0}>
                                        Loading ...
                                    </div>
                                }
                            >
                                {postsHash.length === 0 ? ("Nenhum post encontrado") : postsHash.map((post)=>(
                                    <Post post={post} key={post.id}/>
                                ))}
                            </InfiniteScroll>
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

