import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/App";
import {BrowserRouter} from 'react-router-dom';
import 'codemirror/addon/mode/loadmode';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

//@ts-ignore
global.CodeMirror = require('codemirror/lib/codemirror') as any;
//@ts-ignore
window.jsonlint = require("jsonlint-mod");

export const BASE_URI = process.env.REACT_APP_BASE_URI || window.location.origin
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);