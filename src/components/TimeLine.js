import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import CreatePost from './CreatePost'
import Post from './Post'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import preloader from '../images/preloader.gif'

export default function TimeLine(){

    const {userInfo} = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const config = {headers:{Authorization:`Bearer ${userInfo.token}`}}
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",config);
        promisse.then(answer=>{
            setLoader(false);
            console.log(answer.data);
            setPosts(answer.data.posts);
        });
        promisse.catch((answer)=>{
            console.log(answer.response);
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        });
    },[])

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
                    <CreatePost/>
                    {posts.length === 0 ? ("Nenhum post encontrado") : posts.map((post, i)=>(
                        <Post post={post} key={i}/>
                    ))}
                    
                </div>
            </TimelineStyles>
            <div className="hashtag-container">sidebar aqui</div>
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
    
@media(max-width:414px){
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

