import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import Trending from "../Trending/Trending"
import Post from '../Post'
import UserContext from '../../contexts/UserContext'
import axios from 'axios'
import preloader from '../../images/preloader.gif'

export default function Hashtag(){
    const { hashtag } = useParams()
    const {userInfo} = useContext(UserContext);
    const [postsHash, setPostsHash] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,config);
        promisse.then(answer=>{
            setLoader(false);
            setPostsHash(answer.data.posts);
        });
        promisse.catch((answer)=>{
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        });
    },[userInfo.token, hashtag])

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
                                {hashtag}
                            </header>
                            {postsHash.length === 0 ? ("Nenhum post encontrado") : postsHash.map((post)=>(
                                <Post post={post} key={post.id}/>
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
        margin-bottom:42px;
        font-weight: 700;
        font-size:43px;
        color: #fff;
    }
    &>div{
    justify-content: flex-start;
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
