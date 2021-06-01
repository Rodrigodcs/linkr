import getYouTubeID from "get-youtube-id"
import YouTube from 'react-youtube';
import styled from 'styled-components'


export default function VideoPLayer({link}){

    const id = getYouTubeID(link);

    const opts = {
        width: '100%',
        height: '250px',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <VideoWrapper>
            <YouTube videoId={id} opts={opts} />
            <a>{link}</a>
        </VideoWrapper>
    )
}

const VideoWrapper = styled.div`
width:100%;
margin-top: 10px;
display:flex;
flex-direction: column;
gap:5px;
a{
    color:white;
    cursor:pointer;
}
`