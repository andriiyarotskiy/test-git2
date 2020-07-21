import React from 'react'

type ButtonType = {
    name: string
}

const Button = (props: ButtonType) => {
    return (
        <>
            <button>{props.name}</button>
        </>
    )
}

export default Button