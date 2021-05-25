import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import useState from "react"
import useContext from "react"

export default function App(){
    return (
        <>
            <GlobalStyle/>
            <Login/>
            <Registration/>

        </>
    )
}