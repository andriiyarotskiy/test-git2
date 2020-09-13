import React from 'react'
import Button from "./Button";

export type TabloType = {
    incValue: () => void
    resetValue: () => void
    count: number
    maxValue: number
    error: boolean
    errorMessage: string

    incError: boolean
    setIncError: () => void
    resetError: boolean
    setResetError: () => void
}

const Tablo = (props: TabloType) => {

    // function disableAction() {
    //     if (props.count) {
    //         return true
    //     }
    // }

    return (
        <div>
            {props.error
                ? <h2>{props.errorMessage}</h2>
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