import React, {useEffect, useRef} from 'react';
import "../../wc/api-selector.js"

interface ApiSelectorProps {
    opened?: boolean
    apis: Record<string, string>
    onSelectionChange?: (selectedApi: string) => void
    onOpenedChanged?: (opened: boolean) => void
}

const ApiSelector = ({opened = true, onSelectionChange = () => undefined, onOpenedChanged = () => undefined, apis}: ApiSelectorProps) => {
    const apiSelectorRef = useRef<any>()
    useEffect(() => {
        apiSelectorRef.current.addEventListener('opened-changed', (e: any) => {
            onOpenedChanged(e.detail.value);
        })
        apiSelectorRef.current.addEventListener('select', (e: any) => {
            onSelectionChange(e.target.selectedItem.dataset.src)
        })
    }, [apiSelectorRef, onSelectionChange, onOpenedChanged])
    return <api-selector
        ref={apiSelectorRef}
        opened={opened ? true : undefined}
        allowUpload={false}
    >
        {Object.keys(apis).map(it => (<anypoint-item key={it} data-src={it}>{apis[it]}</anypoint-item>))}
    </api-selector>
}

export default ApiSelector