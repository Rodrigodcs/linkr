import styled from "styled-components"
import {useState} from "react"
import axios from "axios"
import {Link, useHistory} from "react-router-dom"

export default function Registration(){
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [pictureUrl,setPictureUrl] = useState("")
    let history = useHistory();
    const [requesting,setRequesting] = useState(false)

    function register(e){
        e.preventDefault()
        if(email===""||password===""||username===""||pictureUrl===""){
            alert("Preencha todos os campos")
            return
        }
        
        setRequesting(true)
        const body={email,password,username,pictureUrl}
        console.log(body)
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",body)
        request.then(r=>{
            history.goBack()
        })
        request.catch(e=>{
            alert("Email já cadastrado")
            setRequesting(false)
        })
    }

    return (
        <Wrapper>
            <LogoWrapper>
                <div>
                    <Title>linkr</Title>
                    <Description>save, share and discover the best links on the web</Description>
                </div>
            </LogoWrapper>
            <Logo>
                <form onSubmit={register}>
                    <Input type="email" placeholder={"e-mail"} value={email} onChange={e=>setEmail(e.target.value)}></Input>
                    <Input type="password" placeholder={"password"} value={password} onChange={e=>setPassword(e.target.value)}></Input>
                    <Input type="text" placeholder={"username"} value={username} onChange={e=>setUsername(e.target.value)}></Input>
                    <Input type="url" placeholder={"picture url"} value={pictureUrl} onChange={e=>setPictureUrl(e.target.value)}></Input>
                    {requesting?
                        <div>Signing up...</div>:
                        <Button type="submit">Sign Up</Button>
                    }
                </form>
                
                <Link to="/">
                    <p>Switch back to log in</p>
                </Link>
            </Logo>
        </Wrapper>
    )
}

export const Wrapper = styled.section`
    display:flex;
    position:relative;
    height: 100vh;
    background-color: red;
`;
export const LogoWrapper = styled.section`
    width:calc(100% - 535px);
    background: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    div{
        width:442px;
        margin-top: calc(50vh - 117px - 64px);
        margin-left:144px
    }
`;
export const Logo = styled.section`
    position: absolute;
    right: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:13px;
    width:535px;
    height: 100%;
    background-color: #333333;
    p{
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #FFFFFF;
    }
    form{
        display:flex;
        flex-direction: column;
        gap:13px;
    }
    div{
        display:flex;
        align-items: center;
        justify-content: center;
        width: 429px;
        height: 65px;
        background: #1877F2;
        border-radius: 6px;
        border:none;
        font-family: Oswald;
        font-style: normal;
        font-weight: bold;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
    }
`;
export const Title = styled.h1`
    font-family: 'Passion One', cursive;
    font-weight: bold;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`;
export const Description = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
`;

export const Input = styled.input`
    width: 429px;
    height: 65px;
    background: #FFFFFF;
    border-radius: 6px;
    border:none;
    outline-color:#1877F2;
    padding-left: 17px;
    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    color: black;
    ::placeholder{
        color: #9F9F9F;
    }
`;

export const Button = styled.button`
    width: 429px;
    height: 65px;
    background: #1877F2;
    border-radius: 6px;
    border:none;

    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    
`;
