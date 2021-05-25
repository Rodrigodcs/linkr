import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import useState from "react"
import UserContext from "./contexts/UserContext"
import Login from "./components/Login"
import Register from "./components/Registration"

export default function App(){
    const [userInfo, setUserInfo]=useState("")

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            <Router>
                <Switch>
                    <GlobalStyle/>
                    <Route path="/" exact>
                        <Login/>
                    </Route>
                    <Route path="/sign-up" exact>
                        <Registration/>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    )
}