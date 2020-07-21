import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Button from "./Button";

function App() {
    // Пока вводим сообщение должны быть задизейблены кнопки INC и Reset и сообщение нажать кнопку Set
    // Если Старт и Макс равны или Макс меньше Старт все кнопки задизейблены и сообщение об ошибке,
    //подсветка инпутов во время ошибки
    // После нажатия Set она дизейблится до начала ввода нового значение

    let [count, setCount] = useState("enter values and press 'set'") // Результат щетчика
    let [error, setError] = useState<boolean>(true)
    let [errorMessage, setErrorMessage] = useState<string>('')

    let [maxValue, setMaxValue] = useState()
    let [startValue, setStartValue] = useState()

    const incValue = () => {
        if (startValue < maxValue) {
            setCount(count + 1)
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        let start = Number(e.currentTarget.value)
        if (start >= maxValue) {
            setError(true)
            setErrorMessage('Incorrect value')
        } else {
            setError(false)
        }
        setStartValue(start) // Делаю number для инпута старт
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        let max = Number(e.currentTarget.value)
        if (max <= startValue) {
            setError(true)
            setErrorMessage('Incorrect value')
        }
         else {
            setError(false)
        }
        setMaxValue(max)
    }

    const resetValue = () => {
        setCount(startValue)
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
                <button onClick={resetValue}
                        disabled={error}>SET
                </button>
            </div>
            <div>
                {error ? <h2>{errorMessage}</h2> : <h2>{count}</h2>}
                <button
                    onClick={incValue}
                    disabled={count >= maxValue}
                >inc
                </button>
                <button disabled={error}
                        onClick={resetValue}
                >RESET
                </button>
            </div>
        </div>
    );
}

export default App;
