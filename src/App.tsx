import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Button from "./Button";
import Tablo from "./Tablo";

function App() {
    // Пока вводим сообщение должны быть задизейблены кнопки INC и Reset и сообщение нажать кнопку Set
    // Если Старт и Макс равны или Макс меньше Старт все кнопки задизейблены и сообщение об ошибке,
    //подсветка инпутов во время ошибки
    // После нажатия Set она дизейблится до начала ввода нового значение

    let [count, setCount] = useState() // Результат щетчика
    let [error, setError] = useState<boolean>(false)

    let [disableBtn, setDisableBtn] = useState<boolean>(false) // Дизайбл кнопки SET
    let [incError, setIncError] = useState<boolean>(true) // Дизайбл кнопки INC
    let [resetError, setResetError] = useState<boolean>(true) // Дизайбл кнопки RESET
    let [errorMessage, setErrorMessage] = useState<string>('')

    let [maxValue, setMaxValue] = useState(5)
    let [startValue, setStartValue] = useState(0)

    const incValue = () => {
        if (startValue < maxValue) {
            setCount(++count)
        }
        if (maxValue === count) {
            setIncError(true)
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        let start = Number(e.currentTarget.value)
        if (start >= maxValue || start < 0) {
            setError(true)
            setIncError(true) // disable INC
            setDisableBtn(true) // disable SET
            setResetError(true) // disable RESET
            setErrorMessage('Incorrect value')
        } else {
            setError(false)
            setIncError(false)
            setDisableBtn(false)
            setResetError(false)
            setCount("enter values and press 'set'")
        }
        setStartValue(start) // Делаю number для инпута старт
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        let max = Number(e.currentTarget.value)
        if (max <= startValue || startValue < 0) {
            setError(true)
            setIncError(true)
            setDisableBtn(true)
            setResetError(true)
            setErrorMessage('Incorrect value')
        } else {
            setError(false)
            setIncError(false)
            setDisableBtn(false)
            setResetError(false)
            setCount("enter values and press 'set'")
        }
        setMaxValue(max)
    }

    const resetValue = () => {
        setDisableBtn(true)
        setIncError(false)
        setResetError(false)
        setCount(startValue)
    }


    const setIncErrorF = () => {

    }
    const setResetErrorF = () => {

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
                    disableAction={disableBtn}
                    name={'SET'}
                />
            </div>
            <div>
                <Tablo
                    incValue={incValue}
                    resetValue={resetValue}
                    count={count}
                    maxValue={maxValue}
                    error={error}
                    errorMessage={errorMessage}
                    incError={incError}
                    setIncError={setIncErrorF}
                    resetError={resetError}
                    setResetError={setResetErrorF}
                />
            </div>
        </div>
    );
}

export default App;
