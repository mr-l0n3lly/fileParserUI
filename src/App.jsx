import React from "react"
import "./App.scss"

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import useUser from './components/App/useUser'

import Home from "./components/Home/Home.component";
import Login from "./components/Login/Login.components";
import Profile from './components/Profile/Profile.component'

const App = () => {
    const { user, setUser } = useUser()

    if (!user) {
        return (
            <Login setUser={setUser} />
        )
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/">
                        <Home />
                    </Route>
                    <Route exact={true} path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
