import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Trending from "./Trending/Trending"
import Post from './Post'
import UserContext from '../contexts/UserContext'
import InfiniteScroll from 'react-infinite-scroller'
import preloader from '../images/preloader.gif'
import axios from 'axios'

export default function User(){
    
    const { id } = useParams()
    const {userInfo, refresh, lastId, setLastId, morePosts, setMorePosts} = useContext(UserContext);
    const [selectedUserPosts, setSelectedUserPosts] = useState([]);
    const [selectedUserInfo, setSelectedUserInfo] = useState([]);
    const [loader, setLoader] = useState(true);
    const [requestingFollow,setRequestingFollow]=useState(false)
    const [followedUser,setFollowedUser] = useState(false)

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        axios.all([
            axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,config),
            axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,config),
            axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,config)
        ]).then(axios.spread((...responses)=>{
            setSelectedUserInfo(responses[0].data)
            setSelectedUserPosts(responses[1].data.posts);
            setFollowedUser(responses[2].data.users.map(u=>u.id).includes(parseInt(id)))
            
            setSelectedUserPosts(responses[1].data.posts);
            setMorePosts(responses[1].data.posts.length);
            setLastId(responses[1].data.posts[responses[1].data.posts.length -1])

            setLoader(false)
        })).catch(() =>{
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        })
    },[userInfo.token, id, refresh,setLastId,setMorePosts])

    function loadFunc() {
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts?olderThan=${lastId.id}`,config);
        promisse.then((answer)=>{
            setSelectedUserPosts([...selectedUserPosts, ...answer.data.posts]);
            setMorePosts(answer.data.posts.length);
            setLastId(answer.data.posts[answer.data.posts.length-1]);
        })
    }

    function followUser(id){
        setRequestingFollow(true)
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/follow`,{},config);
        request.then(r=>{
            setRequestingFollow(false)
            setFollowedUser(true)
        });
        request.catch((e)=>{
            alert("Houve uma falha ao seguir o usuário, por favor tente novamente")
            setRequestingFollow(false)
        });
    }

    function unfollowUser(id){
        setRequestingFollow(true)
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/unfollow`,{},config);
        request.then(r=>{
            setRequestingFollow(false)
            setFollowedUser(false)
        });
        request.catch((e)=>{
            alert("Houve uma falha ao deixar de seguir o usuário, por favor tente novamente")
            setRequestingFollow(false)
        });
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
                                <Username>{selectedUserInfo.user.username}'s posts</Username>
                                {followedUser?
                                    requestingFollow?
                                        <FollowButton disable>Unfollow</FollowButton>:
                                        <FollowButton onClick={()=>unfollowUser(id)}>Unfollow</FollowButton>
                                    :requestingFollow?
                                        <FollowButton followed disable>Follow</FollowButton>:
                                        <FollowButton followed onClick={()=>followUser(id)}>Follow</FollowButton>
                                }
                            </header>
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
                                }
                            >
                                {selectedUserPosts.length === 0 ? ("Nenhum post encontrado") : selectedUserPosts.map((post)=>(
                                    <Post post={post} key={post.repostId ? post.repostId :post.id}/>
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
        display:flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
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

const FollowButton = styled.button`
    width: 112px;
    height: 31px;
    background: ${props => props.followed ? "#1877F2" : "white"};
    border-radius: 5px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: ${props => props.followed ? "white" : "#1877F2"};
    border:none;
    position:absolute;
    right:-320px;
    cursor: pointer;
    opacity:${props => props.disable ? "0.3" : "1"};
    @media(max-width:950px){
        position:static;
    }
`
const Username = styled.h1`
    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`