type InitialStateType = typeof initialState
type ActionsTypes =
    ReturnType<typeof incrementAC>
    | ReturnType<typeof setMinValueAC>

let initialState = {
    countValue: 0
}

const countReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, countValue: state.countValue+1}
        case 'SET-MIN-VALUE':
            return {...state, countValue: action.minValue}
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

export default countReducer;