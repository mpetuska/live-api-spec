import React, {useEffect, useState} from 'react';
import ApiConsoleApp from "../console/ApiConsoleApp";
import "./App.scss"
import Loader from "../loader/Loader";


function App() {
    const [apis, setApis] = useState<Record<string, string> | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const response = await window.fetch(`${window.location.origin}/raml`);
            try {
                if (!response.ok) {
                    setError(`Error fetching API specifications from server: ${response.statusText}`)
                }
                setApis(await response.json())
            } catch (e) {
                setError(`Error parsing API specifications: "${e.message}"`)
            }
        })()
    })
    return apis ? <ApiConsoleApp apis={apis}/> : <Loader text={error} spin={!error}/>
}

export default App;
