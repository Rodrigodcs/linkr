import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {useState, useContext} from "react"
import TimeLine from './components/TimeLine'

export default function App(){
    return (
        <>
            <GlobalStyle/>
            <TimeLine/>
        </>
    )
}