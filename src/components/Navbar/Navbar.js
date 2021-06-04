import styled from "styled-components"
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons'
import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useContext} from "react"
import {DebounceInput} from "react-debounce-input"
import UserContext from "../../contexts/UserContext"
import axios from "axios"

export default function Navbar(){
    const [show, setShow] = useState(false)
    const [showList, setShowList] = useState(false)
    const [followList, setFollowList] = useState()
    const [doesNotFollowList, setDoesNotFollowList] = useState()
    const {userInfo, setUserInfo} = useContext(UserContext)
    const history = useHistory()
    const config = {headers: {"Authorization": `Bearer ${userInfo.token}`}}
    
    function hideElement(){
        setShow(false)
        setShowList(false)
    }

    function goToFirstResult(event){
        event.preventDefault()
        if(followList.length > 0){
            history.push(`/user/${followList[0].id}`)
            setShowList(false)
        } else if(doesNotFollowList.length > 0){
            history.push(`/user/${doesNotFollowList[0].id}`)
            setShowList(false)
        }
    }

    function getUserList(e){
        setShowList(true)
        if(e.target.value.length >=3){
            const response = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${e.target.value}`, config)
            response.then((data)=>{
                setFollowList(data.data.users.filter(i=> i.isFollowingLoggedUser === true ))
                setDoesNotFollowList(data.data.users.filter(i=> i.isFollowingLoggedUser === false))
            })
            response.catch(()=>{
                alert("Oops, parece que algo deu errado. Tente novamente!")
            })
        } else{
            setShowList(false)
        }
    }
    
    return(
        <Container>
            <Link to="/timeline">
                <h1>
                    linkr
                </h1>
            </Link>
            <UserList>
                <form onSubmit={goToFirstResult}>
                    <DebounceInput debounceTimeout={300} element={Search} placeholder="Search for people and friends" onChange={(e) => {
                        getUserList(e)
                        } }>
                    </DebounceInput> 
                </form>
                <List showList={showList}>
                    {(followList && showList) &&
                        followList.map((user, index)=>(
                            <Link key={index} to={`/user/${user.id}`} onClick={()=>setShowList(false)}>
                                <SearchedUser showList={showList}>
                                    <img src={user.avatar} alt="user"></img>
                                    <h1>{user.username}</h1>
                                    <p> • following</p> 
                                </SearchedUser>
                            </Link>
                        )) 
                    }
                    {(doesNotFollowList && showList) &&
                        doesNotFollowList.map((user,index)=>(
                            <Link key={index} to={`/user/${user.id}`} onClick={()=>setShowList(false)}>
                                <SearchedUser showList={showList}>
                                    <img src={user.avatar} alt="user"></img>
                                    <h1>{user.username}</h1>
                                </SearchedUser>
                            </Link>
                        )) 
                    }
                </List>
            </UserList>
            <DropDown>
                {!show ? 
                        <ChevronDownOutline onClick={()=>setShow(true)}
                            title="drop"
                        />
                        :
                        <ChevronUpOutline onClick={hideElement}
                            title="drop"
                        />
                }
                <img src={userInfo.user.avatar} alt="user" onClick={()=>setShow(true)}></img>
                <Drop show={show}>
                    <Link to="/my-posts" onClick={hideElement}>
                        <p>
                            {show && "My posts"}
                        </p>
                    </Link>
                    <Link to="/my-likes" onClick={hideElement}>
                        <p>
                            {show && "My likes"}
                        </p>
                    </Link>
                    <Link to="/" onClick={()=> {hideElement()
                                                setUserInfo("")
                                                localStorage.removeItem('linkrUserInfo')}}>
                        <p>
                        {show && "Logout"}
                        </p>
                    </Link>
                </Drop>
                {(show || showList) && <ResetDropDownArea onClick={hideElement}/>}
            </DropDown>
        </Container>
    )
}


const SearchedUser = styled.div`
    width:100%;
    height: 39px;
    display:flex;
    align-items: center;
    margin-bottom:16px;
    font-family: 'Lato', sans-serif;
    transition: 0.5s;
    h1{
        margin: 0 10px;
        color:#515151 !important;
        font-size:19px !important;
    }
    p{
        font-size:19px;
        color:#c5c5c5;
    }
    img{
        width:39px;
        height:39px;
        border-radius: 50%;
    }
`

const List = styled.div`
    display: ${props=> props.showList? "flex" : "none" };
    flex-direction: column;
    position:absolute;
    z-index: 2;
    top:0;
    max-width:563px;
    width:100%;
    height:auto;
    max-height:300px;
    background:#e7e7e7;
    border-radius:7px;
    padding: 0 17px;
    overflow:scroll;
    &::-webkit-scrollbar{
        display:none;
    }
    a:first-child{  
        margin-top: 50px;
    }
    @media(max-width:414px){
        position: fixed;
        width: calc(100% - 20px);
        top:100px;
        left: 10px;
        right: 10px;
    }
    a:first-child{  
        margin-top: 55px;
    }
`

const Search = styled.input`
    width:100%;
    height:45px;
    border-radius:8px;
    padding: 0 17px;
    border:none;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    color: #515151;
    outline:none;
    z-index: 1;
    
    &::placeholder{
        color: #C6C6C6;
    }
`

const UserList = styled.div`
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    width:563px;
    border-radius:8px;
    margin: 0 15px;
    height:20px;

    @media(max-width:414px){
        position: fixed;
        width:100%;
        margin: 0;
        padding: 0 10px;
        top:100px;
        right:0;    
    }
`

const Container = styled.div`
    height: 72px;
    z-index: 2;
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
    form{
        width:100%;
        max-width:563px;
        margin: 0 20px;
        z-index:3;
    }
    @media(max-width:950px){
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
    z-index:-1;
`