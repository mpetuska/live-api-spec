import React from "react";
import logo from './logo.svg';
import './Loader.scss';

interface LoaderProps {
    text?: string;
    spin?: boolean;
}

const Loader = ({text = "Loading API Specifications...", spin = true}: LoaderProps) => (
    <div className="Loader">
        <span>{text}</span>
        <img src={logo} className={spin ? "Loader-logo-s" : "Loader-logo"} alt="logo"/>
    </div>
)

export default Loader