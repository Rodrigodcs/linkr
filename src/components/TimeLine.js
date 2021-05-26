import styled from 'styled-components'
import CreatePost from './CreatePost'
import Post from './Post'

export default function TimeLine(){
    return(
        <PageContainer>
            <TimelineStyles>
                <div className="content">
                    <header>timeline</header>
                    <CreatePost/>
                    <Post/>
                </div>
            </TimelineStyles>
            <div className="hashtag-container">sidebar aqui</div>
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

    .hashtag-container{
    width:301px;
    min-height: 406px;
    border-radius: 16px;
    margin-top:162px;
    }
    
`

const TimelineStyles=styled.div`

display: flex;
flex-direction: column;
width:611px;
justify-content: space-between;
margin-right: 25px;

    header{
        margin-top:58px;
        margin-bottom:46px;
        font-weight: 700;
        font-size:43px;
        color: #fff;
    }

    &>div{
    justify-content: flex-start;
    }


`

