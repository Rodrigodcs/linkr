import styled from "styled-components"
import {useState, useContext, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [requesting,setRequesting] = useState(false)
    let history=useHistory()
    const {setUserInfo} = useContext(UserContext);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('linkrUserInfo'))!==null){
            setUserInfo(JSON.parse(localStorage.getItem('linkrUserInfo')))
            history.push("/timeline")
        }
	}, [history,setUserInfo]);

    function login(e){
        e.preventDefault()
        if(email===""||password===""){
            alert("Preencha todos os campos")
            return
        }
        setRequesting(true)
        const body={email,password}
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in",body)
        request.then(r=>{
            setUserInfo(r.data)
            console.log(r.data)
            localStorage.setItem('linkrUserInfo', JSON.stringify(r.data));
            history.push("/timeline")
        })
        request.catch(e=>{
            e.response.status===403 ? alert("Incorrect email/password") : alert("Unexpected error")
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
            <Log>
                <form onSubmit={login}>
                    <Input type="email" placeholder="e-mail" value={email} onChange={e=>setEmail(e.target.value)}></Input>
                    <Input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}></Input>
                    {requesting?
                        <div>Loging In...</div>:
                        <Button type="submit">Log In</Button>
                    }
                </form>
                <Link to="/sign-up">
                    <p>First time? Create an account!</p>
                </Link>
            </Log>
        </Wrapper>
    )
}

export const Wrapper = styled.section`
    display:flex;
    position:relative;
    height: 100vh;
`;
export const LogoWrapper = styled.section`
    width:calc(100% - 535px);
    background: #151515;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
    div{
        width:442px;
        margin-top: calc(50vh - 117px - 64px);
        margin-left:144px;
    }
    @media (max-width: 1174px) {
        div{
            margin-left:100px;
            width:353px;
        }
    }
    @media (max-width: 1000px) {
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:175px;

        div{
            position:fixed;
            top:0;
            left:0;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top:0;
            margin-left:0;
            width:100%;
            
        }
    }
`;
export const Log = styled.section`
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
    @media (max-width: 1000px) {
        position:fixed;
        top:175px;
        height: 100%;
        justify-content: flex-start;
        left:0;
        width:auto;
        form{
            margin-top: 40px;
        }
        div{
            width: 330px;
        }
    }
`;
export const Title = styled.h1`
    font-family: 'Passion One', cursive;
    font-weight: bold;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    @media (max-width: 1000px) {
        margin-top: 10px;
        font-size: 76px;
        line-height: 84px;
    }
`;
export const Description = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    @media (max-width: 1000px) {
        margin-top:-10px;
        width: 237px;
        font-size: 23px;
        line-height: 34px;
    }
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
    @media (max-width: 1000px) {
        width: 330px;
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
    @media (max-width: 1000px) {
        width: 330px;
    }
`;



