import React, {useEffect, useState} from 'react';
import ApiConsoleApp from "../console/ApiConsoleApp";
import "./App.scss"
import Loader from "../loader/Loader";
import {BASE_URI} from "../../index";


function App() {
    const [apis, setApis] = useState<Record<string, string>>({})
    const [error, setError] = useState<string | undefined>(undefined)
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!loaded) {
            window.fetch(`${BASE_URI}/raml`).then(async response => {
                try {
                    setApis(await response.json())
                    setLoaded(true);
                } catch (e) {
                    setError(`Error parsing API specifications: "${e.message}"`)
                }
            })
                .catch(e => {
                    setError(`Error fetching API specifications from server: ${e}`)
                }).finally(() => setLoaded(true));

        }
    }, [loaded])
    return loaded && !error ? <ApiConsoleApp apis={apis}/> :
        <Loader text={error || "Loading API Specifications..."} spin={!loaded}/>
}

export default App;
