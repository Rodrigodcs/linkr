import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import useState from "react"
import useContext from "react"

import Navbar from "./Navbar/Navbar"
import Login from "./Login/Login"
import Registration from "./Registration/Registration"

export default function App(){
    return (
        <Router>
            <GlobalStyle/>
                <Login/>
                <Registration/>
                <Navbar/>

        </Router>
    )
}