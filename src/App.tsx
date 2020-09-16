import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Button from "./Button";
import Tablo from "./Tablo";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    incrementAC,
    setMinValueAC,
    disableType,
    buttonLockAC,
    setMessageAC,
    ERROR_MESSAGE, PLEASE_ENTER_VALUE_MESSAGE, setErrorAC
} from "./state/countReducer";

function App() {
    // Пока вводим сообщение должны быть задизейблены кнопки INC и Reset и сообщение нажать кнопку Set
    // Если Старт и Макс равны или Макс меньше Старт все кнопки задизейблены и сообщение об ошибке,
    //подсветка инпутов во время ошибки
    // После нажатия Set она дизейблится до начала ввода нового значение

    const count = useSelector<AppRootStateType, number>(state => state.count.countValue)
    const disableBtn = useSelector<AppRootStateType, disableType>(state => state.count.disable)
    const error = useSelector<AppRootStateType, boolean>(state => state.count.error)
    const message = useSelector<AppRootStateType, boolean>(state => state.count.messageToggle)

    const dispatch = useDispatch()

    let [maxValue, setMaxValue] = useState(0) // inputMax handler
    let [startValue, setStartValue] = useState(0) // inputMin handler


    const incValue = () => {
        if (count < maxValue) {
            dispatch(incrementAC())
        }
        if ((maxValue - 1) === count) {
            dispatch(buttonLockAC(true, true, false))
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.currentTarget.value))) { // check оn isNan
            let start = +(e.currentTarget.value)
            setStartValue(start)
            if (start >= maxValue || start < 0) {
                dispatch(setErrorAC(true))
                dispatch(buttonLockAC(true, true, true))
                dispatch(setMessageAC(false))
            } else {
                dispatch(setMessageAC(true))
                dispatch(buttonLockAC(false, false, false))
                dispatch(setErrorAC(false))
            }
        }
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.currentTarget.value))) { // check оn isNan
            let max = +(e.currentTarget.value)
            setMaxValue(max)
            if (max <= startValue || startValue < 0) {
                dispatch(setErrorAC(true))
                dispatch(buttonLockAC(true, true, true))
                dispatch(setMessageAC(false))
            } else {
                dispatch(setMessageAC(true))
                dispatch(setErrorAC(false))
                dispatch(buttonLockAC(false, false, false))
            }
        }
    }

    const resetValue = () => {
        dispatch(buttonLockAC(false, true, false))
        dispatch(setMessageAC(false))
        dispatch(setMinValueAC(startValue))
    }

    return (
        <div className="App">
            <div className='Container'>
                <h1>Counter</h1>
                <div className="inputContainer">
                    <div className='input_minValue'>
                        <h2>Min</h2>
                        <input
                            className='input'
                            type="text"
                            inputMode="numeric"
                            pattern="[-+]?[0-9]*[.,]?[0-9]+"
                            value={startValue}
                            onChange={changeStartValue}
                        />
                    </div>
                    <div className='input_maxValue'>
                        <h2>Max</h2>
                        <input
                            className='input'
                            type="text"
                            inputMode="numeric"
                            pattern="[-+]?[0-9]*[.,]?[0-9]+"
                            value={maxValue}
                            onChange={changeMaxValue}
                        />
                    </div>
                </div>
                <div className='setBtnContainer'>
                    <Button
                        funcOnClick={resetValue}
                        disableAction={disableBtn.disSetBtn}
                        name={'SET'}
                    />
                </div>
                <Tablo
                    incValue={incValue}
                    resetValue={resetValue}
                    count={count}
                    error={error}
                    errorMessage={ERROR_MESSAGE}
                    message={message}
                    enterValueMessage={PLEASE_ENTER_VALUE_MESSAGE}
                    incError={disableBtn.disIncBtn}
                    resetError={disableBtn.disResBtn}
                />
            </div>
        </div>
    );
}

export default App;

