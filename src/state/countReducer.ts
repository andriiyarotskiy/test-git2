type InitialStateType = typeof initialState
export type disableType = typeof initialState.disable
type ActionsTypes =
    ReturnType<typeof incrementAC>
    | ReturnType<typeof setMinValueAC>
    | ReturnType<typeof buttonLockAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setMessageAC>

export const ERROR_MESSAGE = 'Incorrect value'
export const PLEASE_ENTER_VALUE_MESSAGE = "enter values and press 'set'"

let initialState = {
    countValue: 0,
    disable: {
        disIncBtn: true, // disable INC
        disSetBtn: true, // disable SET
        disResBtn: true, // disable RESET
    },
    error: false,
    errorMessage: ERROR_MESSAGE,
    messageToggle: false,
    message: PLEASE_ENTER_VALUE_MESSAGE
}

const countReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, countValue: state.countValue + 1}
        case 'SET-MIN-VALUE':
            return {...state, countValue: action.minValue}
        case 'BUTTON-LOCK-SWITCH':
            return {
                ...state,
                disable: {disIncBtn: action.disIncBtn, disSetBtn: action.disSetBtn, disResBtn: action.disResBtn}
            }
        case "SET-ERROR":
            return {...state, error: action.error, errorMessage: state.errorMessage}
        case "SET-MESSAGE":
            return {...state, messageToggle: action.messageToggle, message: state.message}
        default :
            return state
    }
}

export const incrementAC = () => ({
    type: 'INCREMENT'
} as const)
export const setMinValueAC = (minValue: number) => ({
    type: 'SET-MIN-VALUE', minValue
} as const)
export const buttonLockAC = (disIncBtn: boolean, disSetBtn: boolean, disResBtn: boolean) => ({
    type: 'BUTTON-LOCK-SWITCH', disIncBtn: disIncBtn, disSetBtn: disSetBtn, disResBtn: disResBtn
} as const)
export const setErrorAC = (error: boolean) => ({
    type: 'SET-ERROR', error
} as const)
export const setMessageAC = (messageToggle: boolean) => ({
    type: 'SET-MESSAGE', messageToggle
} as const)

export default countReducer;