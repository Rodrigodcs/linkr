import styled from 'styled-components'
import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import { MdLocationOn } from "react-icons/md";

export default function CreatePost({setPosts}){

    const {userInfo} = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);
    const [link , setLink] = useState("");
    const [text , setText] = useState("");
    const [location, setLocation]= useState({})

    function submitPost(e){
        e.preventDefault();
        setSubmitting(true);
        
        const config = {headers: {"Authorization": `Bearer ${userInfo.token}`}}
        const body = {"text": text,"link": link,"geolocation":{"latitude":location.latitude,"longitude":location.longitude}} 
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", body, config)
        promisse.then((answer)=>{
            setSubmitting(false);
            setLink("");
            setText("");
            const consecutivePromisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);
            consecutivePromisse.then(answer=>setPosts(answer.data.posts));
            consecutivePromisse.catch(()=>alert("Houve uma falha ao obter os posts, por favor atualize a página"));
        });
        promisse.catch(()=>{
            alert("Houve um erro ao publicar seu link");
            setSubmitting(false);
        })
    }

    function getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(p=>{
                setLocation({
                    latitude:p.coords.latitude,
                    longitude:p.coords.longitude
                })
        });
        } else {
            alert("Não foi possivel obter a localização")
        }
    }

    function disableLocation(){
        setLocation({})
    }

    return(
        <CreatePostStyles>
            <div className="create-left-column">
                <div className="profile-picture"> 
                    <img src={userInfo.user.avatar} alt="profile"/>
                </div>
            </div>
            <div className="create-post-content">
                <h2>O que você tem pra favoritar hoje?</h2>
                <form onSubmit={submitPost}>
                    <textarea value={link} onChange={(e)=>setLink(e.target.value)} required placeholder="http://..."></textarea>
                    <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Muito irado esse link falando de #javascript"></textarea>
                    <div>
                        {location.latitude?
                            <Location selected onClick={()=>disableLocation()}><MdLocationOn/><p>Localização ativada</p></Location>:
                            <Location onClick={()=>getLocation()}><MdLocationOn/><p>Localização ativada</p></Location>
                        }
                        <button disabled={submitting} type="submit">{ submitting ? "Publishing..." : "Publish" }</button>
                    </div>
                </form>
            </div>
        </CreatePostStyles>
    )
}

const CreatePostStyles= styled.div`

width: 611px;
min-height: 209px;
background: #fff;
border-radius: 16px;
box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
padding: 16px 22px 16px 18px;
margin-bottom:29px;
display:flex;

.profile-picture{
    width:50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    img{
        width: 50px;
        height: 50px;
    }
}

.create-post-content{
    margin-left:18px;
    width: 100%;

    h2{
        padding-top: 6px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 24px;
        color:#707070;
        margin-bottom: 10px;
    }
    div{
        display:flex;
        align-items: center;
        justify-content: space-between;
        svg{
            cursor: pointer;
            font-size: 20px;
        }
    }

    textarea{
        height:auto;
        width:503px;
        resize:none;
        outline-style: none;
        border:none;
        border-radius:5px;
        background:#efefef;
        padding-top:6px;
        padding-left: 12px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 15px;

        &:nth-child(2){
            height: 66px;
        }
    }

    button{
        background: #1877F2;
        
        width: 112px;
        height: 31px;
        color:#fff;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 14px;
        border-radius:5px;
        border:none;
        outline-style: none;
        cursor:pointer;
    }

}
@media(max-width:611px){
    position:relative;
    width:100%;
    .create-post-content{
        width:100%;
        margin-bottom: 30px;
        textarea{
            width:100%;
        }
        button{
            margin:0;
            position:absolute;
            bottom: 15px;
            right:23px;
        }
    }
}
@media(max-width:414px){
    width: 100%;
    min-height: 164px;
    border-radius: 0px;
    padding: 10px 15px 12px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .create-left-column{
        display: none;
    }

    .create-post-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin:0 0 28px 0;
        width:100%;
        form{
            width:100%;
        }
        p{
            padding:0px;
            font-size: 17px;
            margin-bottom: 8px;
        }

        textarea{
            width:100%;
            padding-top:7px;
            font-size:13px;
            &:nth-child(2){
                height: 47px;
                padding-top:12px;
            }
        }

        button{
            right: 15px;
            font-size: 13px;
            width:112px;
            height: 22px;
        }

    }
}

@media(max-width:375px){
    padding-right:13px;
    .create-post-content{
        button{
            margin-left:235px;
        }

    }
}

`

const Location= styled.div`
    display:flex;
    gap:5px;
    align-items: center;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    color: ${props=>props.selected?"#238700":"#949494"};
    cursor:pointer;
    .teste{
        color:red;
    }
`