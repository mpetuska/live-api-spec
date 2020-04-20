import React, {useCallback, useEffect, useRef, useState} from 'react';
import 'api-console/api-console-app';
import {parseRAML} from "../../amf/parser";
import ApiSelector from "./ApiSelector";
import ApiSelectorBtn from "./ApiSelectorBtn";
import {BASE_URI} from "../../index";


interface ApiConsoleAppProps {
    apis: Record<string, string>
}

const ApiConsoleApp = ({apis}: ApiConsoleAppProps) => {
    const [apic, setApic] = useState<string>(Object.keys(apis)[0])
    const apiConsole = useRef<any>();
    const [selectorOpened, setSelectorOpened] = useState<boolean>(false)
    useEffect(() => {
        (async () => {
            apiConsole.current.amf = await parseRAML(apic);
            apiConsole.current.selectedShape = 'summary';
            apiConsole.current.selectedShapeType = 'summary';
        })();
    }, [apic, apiConsole]);

    const onSelectorBtnClick = useCallback(() => setSelectorOpened(it => !it), [])
    const onSelectorOpenedChange = useCallback(it => setSelectorOpened(it), [])
    const onApiSelectionChange = useCallback(it => {
        setSelectorOpened(false);
        setApic(it);
    }, [])
    return <div>
        <api-console-app
            app={true}
            rearrangeEndpoints={true}
            ref={apiConsole}
            baseuri={`${BASE_URI}/${apic}`}
        >
            <ApiSelectorBtn onClick={onSelectorBtnClick}/>
        </api-console-app>
        <ApiSelector apis={apis}
                     opened={selectorOpened}
                     onSelectionChange={onApiSelectionChange}
                     onOpenedChanged={onSelectorOpenedChange}
        />
    </div>
}

export default ApiConsoleApp