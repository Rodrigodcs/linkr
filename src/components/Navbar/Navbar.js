import styled from "styled-components"
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons'
import {useState} from "react"
import {Link} from "react-router-dom"
import {useContext} from "react"
import UserContext from "../../contexts/UserContext"

export default function Navbar(){
    const [show, setShow] = useState(false)
    const {userInfo, setUserInfo} = useContext(UserContext)
    function showDropDown(){
        setShow(!show)
    }
    
    return(
        <Container>
            <Link to="/timeline">
                <h1>
                    linkr
                </h1>
            </Link>
            <DropDown>
                {!show ? 
                        <ChevronDownOutline onClick={showDropDown}
                            title="drop"
                        />
                        :
                        <ChevronUpOutline onClick={showDropDown}
                            title="drop"
                        />
                }
                <img src={userInfo.user.avatar} alt="user" onClick={showDropDown}></img>
                <Drop show={show}>
                    <Link to="/my-posts" onClick={showDropDown}>
                        <p>
                            {show && "My posts"}
                        </p>
                    </Link>
                    <Link to="/my-likes" onClick={showDropDown}>
                        <p>
                            {show && "My likes"}
                        </p>
                    </Link>
                    <Link to="/" onClick={()=> {showDropDown()
                                                setUserInfo("")
                                                localStorage.removeItem('linkrUserInfo')}}>
                        <p>
                        {show && "Logout"}
                        </p>
                    </Link>
                </Drop>
                {show && <ResetDropDownArea onClick={showDropDown}/>}
            </DropDown>
        </Container>
    )
}

const Container = styled.div`
    height: 72px;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 28px;
    position:fixed;
    left:0;
    right:0%;
    top:0;
    h1{
        font-family: 'Passion One', cursive;
        font-size: 49px;
        color: #fff;
        letter-spacing: 0.05em;
    }
    @media(max-width:950px){
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}
`

const DropDown = styled.div`
    width:90px;
    height: 72px;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        height:50px;
        width:50px;
        border-radius:50px;
    }
    svg{
        color:#ffffff;
        height:30px;
        width:30px;
    }
`

const Drop = styled.div`
    background: #151515;
    z-index: 2;
    height:${props=> props.show? "109px" : "0" };
    width:120px;
    position:fixed;
    top:72px;
    right: 0;
    border-radius:0 0 0 15px;
    display: flex;
    transition: height 0.2s;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center ;
    p{
        font-family: 'Lato', sans-serif;
        color:white;
        font-size:17px;
    }
`

const ResetDropDownArea = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    z-index:0;
`