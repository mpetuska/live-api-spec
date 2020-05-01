import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import 'api-console/api-console-app';
import {parseRAML} from '../../amf/parser';
import ApiSelector from './ApiSelector';
import ApiSelectorBtn from './ApiSelectorBtn';
import {BASE_URI} from '../../index';
import {useHistory, useParams} from 'react-router';

interface ApiConsoleAppProps {
	apis: Record<string, string>;
	isDev: boolean;
}

const ApiConsoleApp = ({apis, isDev}: ApiConsoleAppProps) => {
	const history = useHistory();
	const {api} = useParams();
	const apiConsole = useRef<any>();
	const [selectorOpened, setSelectorOpened] = useState<boolean>(false);
	useLayoutEffect(() => {
		if (api && apis[api]) {
			(async (apic: any, dev: boolean) => {
				apic.amf = await parseRAML(api, dev);
				setTimeout(
					(it: any) => {
						const match = window.location.hash.match(/#docs\/([A-z]+)\/(#\d+)/) || [];
						it.selectedShapeType = match[1] || 'summary';
						it.selectedShape = match[2] || it.selectedShapeType;
						document.title = api;
					},
					100,
					apic
				);
			})(apiConsole.current, isDev);
		} else {
			history.push(`/__/${api}${window.location.hash}`);
		}
	}, [apis, api, apiConsole, isDev, history]);

	const onSelectorBtnClick = useCallback(() => setSelectorOpened((it) => !it), []);
	const onSelectorOpenedChange = useCallback((it) => setSelectorOpened(it), []);
	const onApiSelectionChange = useCallback(
		(it) => {
			setSelectorOpened(false);
			history.push(`/_/${it}`);
		},
		[history]
	);
	return (
		<div>
			<api-console-app app={true} ref={apiConsole} baseuri={`${BASE_URI}/${api}`}>
				<ApiSelectorBtn onClick={onSelectorBtnClick}/>
			</api-console-app>
			<ApiSelector
				apis={apis}
				opened={selectorOpened}
				onSelectionChange={onApiSelectionChange}
				onOpenedChanged={onSelectorOpenedChange}
			/>
		</div>
	);
};

export default ApiConsoleApp;
