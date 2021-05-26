import styled from "styled-components"
import axios from "axios"
import {useState} from "react"
import {Link} from "react-router-dom"
import {useContext, useEffect} from "react"
import UserContext from "../../contexts/UserContext"

export default function Trending(){
    const [hashtags, setHashtags] = useState()
    const {userInfo} = useContext(UserContext)

    useEffect(()=>{
        const response = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", {headers: {"Authorization": `Bearer ${userInfo.token}`}})
        response.then((data)=>{
            setHashtags([...data.data.hashtags])
        })
    }, [userInfo.token])

    return(
        <Container>
            <Title>
                <h1>trending</h1>
            </Title>
            <Hashtags>
                {hashtags && hashtags.map(h=>( 
                    <Link key={h.id} to={`/hashtag/${h.name}`}>
                        <p># {h.name}</p>
                    </Link>
                ))}
            </Hashtags>
        </Container>
    )
}

const Container = styled.div`
    width:301px;
    background:#171717;
    display:flex;
    flex-direction: column;
    border-radius:16px;
    color:white;
`

const Title = styled.div`
    height: 61px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #484848;
    h1{
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        margin-left:16px;
        font-size:27px;   
    }
`

const Hashtags = styled.div`
    padding: 16px;
    font-family: 'Lato', sans-serif;
    font-size:19px;
    letter-spacing: 0.05em;
    line-height: 23px;
    p{
        margin: 6px 0;
    }
    a{
        color:white;
        font-weight: 700;
    }
`