import {GlobalStyle} from "./GlobalStyle"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./components/Login"
import Registration from "./components/Registration"
import TimeLine from "./components/TimeLine"
import Navbar from "./components/Navbar/Navbar"
import MyPosts from "./components/MyPosts"
import Hashtag from "./components/Hashtag/Hashtag"
import User from './components/User'
import MyLikes from "./components/MyLikes"
import UserContext from "./contexts/UserContext"
import {useState} from "react"

export default function App(){
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('linkrUserInfo'))!==null?JSON.parse(localStorage.getItem('linkrUserInfo')):"");
    const [refresh, setRefresh] = useState(0);
    const [lastId, setLastId] = useState("");
    const [morePosts, setMorePosts] = useState(0);

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, refresh, setRefresh, lastId, setLastId, morePosts, setMorePosts}}>
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
                    <Route path="/my-posts" exact>
                        <Navbar/>
                        <MyPosts/>
                    </Route>
                    <Route path="/user/:id" exact>
                        <Navbar/>
                        <User/>
                    </Route>
                    <Route path="/hashtag/:hashtag" exact>
                        <Navbar/>
                        <Hashtag/>
                    </Route>
                    <Route path="/my-likes" exact>
                        <Navbar/>
                        <MyLikes/>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    )
}
