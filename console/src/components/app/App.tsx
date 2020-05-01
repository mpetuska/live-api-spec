import React, {useCallback, useEffect, useState} from 'react';
import ApiConsoleApp from "../console/ApiConsoleApp";
import "./App.scss"
import Loader from "../loader/Loader";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';


function App() {
    const [apis, setApis] = useState<Record<string, string>>({})
    const [isDev, setDev] = useState(false)
    const history = useHistory();
    useEffect(() => {
        if (!apis) {
            history.push("/")
        }
    }, [apis, history])
    const onLoaded = useCallback((a, dev) => {
        setApis(a)
        setDev(dev)
    }, [])
    return (
        <Switch>
            <Route path="/_/:api" exact={true}>
                <ApiConsoleApp apis={apis} isDev={isDev}/>
            </Route>
            <Route path="/__/:api">
                <Loader onLoaded={onLoaded}/>
            </Route>
            <Route>
                <Redirect to={`/__/raml${window.location.hash}`}/>
            </Route>
        </Switch>)
}

export default App;
