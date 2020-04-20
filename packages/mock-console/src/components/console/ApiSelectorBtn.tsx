import React, {useEffect, useRef} from 'react';
import 'api-console/api-console-app';

const More = () => (<svg
    viewBox={"0 0 24 24"}
    preserveAspectRatio={"xMidYMid meet"}
    focusable={false}
    style={{
        pointerEvents: "none",
        display: "block",
        width: "100%",
        height: "100%"
    }}
>
    <path
        d={"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}/>
</svg>);

interface ApiSelectorBtnProps {
    onClick: () => void
}

const ApiSelectorBtn = ({onClick}: ApiSelectorBtnProps) => {
    const moreIconRef = useRef<any>()
    useEffect(() => {
        moreIconRef.current.addEventListener('click', () => {
            onClick()
        })
    }, [moreIconRef, onClick])
    return <anypoint-icon-button
        ref={moreIconRef}
        slot={"toolbar"}
        aria-label={"Activate to open API selection menu"}
        title={"Open API selection menu"}
    >
            <span className="icon">
                <More/>
            </span>
    </anypoint-icon-button>
}

export default ApiSelectorBtn