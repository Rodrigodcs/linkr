import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./components/Login"
import Registration from "./components/Registration"
import TimeLine from "./components/TimeLine"
import Navbar from "./components/Navbar/Navbar"
import User from './components/User'
import UserContext from "./contexts/UserContext"
import {useState} from "react"

export default function App(){
    const [userInfo, setUserInfo]=useState("")
  
    return (

        <UserContext.Provider value={{userInfo, setUserInfo}}>
            <Router>
                <GlobalStyle/>
                <Switch>
                    <Route path="/" exact>
                        <Login/>
                    </Route>
                    <Route path="/sign-up" exact>
                        <Registration/>
                    </Route>
                    <Route path="/timeline" exact>
                        <Navbar/>
                        <TimeLine/>
                    </Route>
                    <Route path="/user/:id">
                        <User/>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>

    )
}
