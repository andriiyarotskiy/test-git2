import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Button from "./Button";
import Tablo from "./Tablo";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {incrementAC, setMinValueAC} from "./state/countReducer";

function App() {
    // Пока вводим сообщение должны быть задизейблены кнопки INC и Reset и сообщение нажать кнопку Set
    // Если Старт и Макс равны или Макс меньше Старт все кнопки задизейблены и сообщение об ошибке,
    //подсветка инпутов во время ошибки
    // После нажатия Set она дизейблится до начала ввода нового значение

    const count = useSelector<AppRootStateType, number>(state => state.count.countValue)
    const dispatch = useDispatch()

    let [disSetBtn, setDisSetBtn] = useState<boolean>(true) // Дизайбл кнопки SET
    let [disIncBtn, setIncError] = useState<boolean>(true) // Дизайбл кнопки INC
    let [disResBtn, setDisResBtn] = useState<boolean>(true) // Дизайбл кнопки RESET

    let [error, setError] = useState<boolean>(false)
    let [errorMessage, setErrorMessage] = useState<string>('') // Error Message
    let [message, setMessage] = useState<boolean>(false)
    let [enterValueMessage, setEnterValueMessage] = useState<string>('')

    let [maxValue, setMaxValue] = useState(0) // inputMax handler
    let [startValue, setStartValue] = useState(0) // inputMin handler


    const incValue = () => {
        if (count < maxValue) {
            dispatch(incrementAC())
        }
        if ((maxValue - 1) === count) {
            setIncError(true)
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        let start = Number(e.currentTarget.value)
        if (start >= maxValue || start < 0) {
            setError(true)
            setErrorMessage('Incorrect value')

            setIncError(true) // disable INC
            setDisSetBtn(true) // disable SET
            setDisResBtn(true) // disable RESET
            setMessage(false)
        } else {
            setMessage(true)
            setEnterValueMessage("enter values and press 'set'")

            setIncError(false)
            setDisSetBtn(false)
            setDisResBtn(false)

            setError(false)
        }
        setStartValue(start)
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        let max = Number(e.currentTarget.value)
        if (max <= startValue || startValue < 0) {
            setError(true)
            setIncError(true)
            setDisSetBtn(true)
            setDisResBtn(true)
            setErrorMessage('Incorrect value')
            setMessage(false)
        } else {
            setMessage(true)
            setEnterValueMessage("enter values and press 'set'")
            setError(false)
            setIncError(false)
            setDisSetBtn(false)
            setDisResBtn(false)
        }
        setMaxValue(max)
    }

    const resetValue = () => {
        setDisSetBtn(true)

        setMessage(false)
        setIncError(false)
        setDisResBtn(false)
        dispatch(setMinValueAC(startValue))
    }

    return (
        <div className="App">
            <div>
                <h1>Counter</h1>
                <span>start</span>
                <input type="number"
                       value={startValue}
                       onChange={changeStartValue}
                />
                <span>max</span>
                <input type="number"
                       value={maxValue}
                       onChange={changeMaxValue}
                />
                <Button
                    funcOnClick={resetValue}
                    disableAction={disSetBtn}
                    name={'SET'}
                />
            </div>
            <div>
                <Tablo
                    incValue={incValue}
                    resetValue={resetValue}
                    count={count}
                    error={error}
                    errorMessage={errorMessage}
                    message={message}
                    enterValueMessage={enterValueMessage}
                    incError={disIncBtn}
                    resetError={disResBtn}
                />
            </div>
        </div>
    );
}

export default App;
