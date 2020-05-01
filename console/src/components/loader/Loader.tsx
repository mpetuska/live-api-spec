import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './Loader.scss';
import {BASE_URI} from "../..";
import {useHistory, useParams} from "react-router";

interface LoaderProps {
    onLoaded: (apis: Record<string, string>, dev: boolean) => void;
}

const Loader = ({onLoaded}: LoaderProps) => {
    const [message, setMessage] = useState<string>("Loading API Specifications...");
    const [loaded, setLoaded] = useState<undefined | boolean>(undefined);
    const history = useHistory();
    const {api} = useParams();
    useEffect(() => {
        if (loaded === undefined) {
            setLoaded(false)
            window.fetch(`${BASE_URI}/raml`).then(async response => {
                try {
                    const apis = await response.json();
                    onLoaded(apis, response.headers.get('x-dev') === `${true}`);
                    const keys = Object.keys(apis);
                    if ((api && apis[api]) || keys.length > 0) {
                        history.push(`/_/${(api && apis[api]) ? apis[api] + window.location.hash : keys[0]}`)
                    } else {
                        setMessage("Oh NO! Server returned no APIs");
                        setLoaded(true);
                    }
                } catch (e) {
                    setMessage(`Error parsing API specifications: "${e.message}"`);
                    setLoaded(true);
                }
            }).catch(e => {
                setMessage(`Error fetching API specifications from server: ${e}`);
            });
        }
    }, [loaded, history, onLoaded, api])
    return (
        <div className="Loader">
            <span>{message}</span>
            <img src={logo} className={!loaded ? "Loader-logo-s" : "Loader-logo"} alt="logo"/>
        </div>)
}

export default Loader