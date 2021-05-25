import styled from "styled-components"
import { ChevronDownOutline, ChevronUpOutline } from 'react-ionicons'
import {useState} from "react"

export default function Navbar(){
    const [show, setShow] = useState(false)

    function showDropDown(){
        setShow(!show)
    }
    
    return(
        <Container>
            <h1>
                linkr
            </h1>
            <DropDown>
                {!show ? <ChevronDownOutline onClick={showDropDown}
                color={'#ffffff'} 
                title={'drop'}
                height="30px"
                width="30px"
                />:<ChevronUpOutline onClick={showDropDown}
                color={'#ffffff'} 
                title={'drop'}
                height="30px"
                width="30px"
                />}
                <Image onClick={showDropDown}></Image>
                <Drop show={show}>
                    <p>
                        My posts
                    </p>
                    <p>
                        My likes
                    </p>
                    <p>
                        Logout
                    </p>
                </Drop>
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
`

const DropDown = styled.div`
    width:90px;
    height: 72px;
    background: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Image = styled.div`
    height:50px;
    width:50px;
    border-radius:50px;
    background:red;
`
const Drop = styled.div`
    background: #151515;
    height:109px;
    width:120px;
    position:fixed;
    top:72px;
    right: 0;
    border-radius:0 0 0 15px;
    display: ${props=> props.show? "flex" : "none" };
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center ;
    p{
        font-family: 'Lato', sans-serif;
        color:white;
        font-size:17px;
    }
`