import styled from 'styled-components'
import CreatePost from './CreatePost'
import Post from './Post'

export default function TimeLine(){
    return(
        <PageContainer>
            <TimelineStyles>
                <header>timeline</header>
                <CreatePost/>
                <Post/>
            </TimelineStyles>
        </PageContainer>
    )
}

const PageContainer = styled.div`

display:flex;
justify-content:center;
background: #333;
min-height: calc(100vh - 72px);
margin: 72px 0px 0px 0px;
font-family: 'Oswald', sans-serif;

`

const TimelineStyles=styled.div`

display: flex;
flex-direction: column;
justify-content: flex-start;
width:937px;
    header{
        margin-top:58px;
        margin-bottom:46px;
        font-weight: 700;
        font-size:43px;
        color: #fff;
    }

`