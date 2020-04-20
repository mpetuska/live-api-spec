import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";

export const BASE_URI = process.env.REACT_APP_BASE_URI || window.location.origin
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);