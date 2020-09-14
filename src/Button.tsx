import React from 'react'

type ButtonType = {
    name: string
    funcOnClick?: () => void
    disableAction: boolean
}

const Button = (props: ButtonType) => {
    return (
        <>
            <div className="button">
                <div className={props.disableAction ? "center disableSVG" : "center"}>
                    <button className={props.disableAction ? "btn disabledBtn" : "btn"}
                            disabled={props.disableAction}
                            onClick={props.funcOnClick}>
                        <svg width="180px" height="60px" viewBox="0 0 180 60"
                             className="border">
                            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>
                            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>
                        </svg>
                        <span>{props.name}</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Button