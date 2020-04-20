import {HTMLProps} from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "api-console-app": ApiConsoleAppAttrs;
            "api-selector": ApiSelectorAttrs;
            "anypoint-icon-button": HTMLProps<any>;
            "anypoint-item": HTMLProps<any>;
        }

        interface ApiConsoleAppAttrs extends HTMLProps<any> {
            app?: boolean
            rearrangeEndpoints?: boolean
            baseuri?: string
        }

        interface ApiSelectorAttrs extends HTMLProps<any> {
            opened?: boolean
            allowUpload?: boolean
        }
    }
}