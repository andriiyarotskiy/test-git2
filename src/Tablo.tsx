import React from 'react'
import Button from "./Button";

export type TabloType = {
    incValue: () => void
    resetValue: () => void
    count: number
    error: boolean
    errorMessage: string
    message: boolean
    enterValueMessage: string
    incError: boolean
    resetError: boolean
}

const Tablo = (props: TabloType) => {

    return (
        <div>
            {props.error
                ? <h2>{props.errorMessage}</h2>
                : props.message
                    ? <h2>{props.enterValueMessage}</h2>
                    : <h2>{props.count}</h2>}
            <Button
                funcOnClick={props.incValue}
                // disableAction={props.error || props.count >= props.maxValue}
                disableAction={props.incError}
                name={'INC'}/>
            <Button
                funcOnClick={props.resetValue}
                disableAction={props.resetError}
                name={'RESET'}/>
        </div>
    )
}

export default Tablo