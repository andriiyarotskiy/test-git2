import React from 'react'

type ButtonType = {
    name: string
    funcOnClick?: () => void
    disableAction: boolean
}

const Button = (props: ButtonType) => {
    return (
        <>
            <button
                disabled={props.disableAction}
                onClick={props.funcOnClick}>{props.name}</button>
        </>
    )
}

export default Button