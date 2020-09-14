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
        <div className='tablo'>
            {props.error
                ? <h2 style={{color: 'red'}}>{props.errorMessage}</h2>
                : props.message
                    ? <h2>{props.enterValueMessage}</h2>
                    : <h2 className={props.incError ? 'redCount': 'blueCount'}>{props.count}</h2>}
            <div className='buttomWrap'>
                <div className='tablo__btn incBtn'>
                    <Button
                        funcOnClick={props.incValue}
                        disableAction={props.incError}
                        name={'INC'}/>
                </div>
                <div className='tablo__btn resBtn'>
                    <Button
                        funcOnClick={props.resetValue}
                        disableAction={props.resetError}
                        name={'RESET'}/>
                </div>


            </div>
        </div>
    )
}

export default Tablo