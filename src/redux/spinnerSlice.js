import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    queueCount: 0,
}

const spinnerSlice = createSlice({
    name: 'SpinnerSlice',
    initialState,
    reducers: {
        setLoadingOn: (state) => {
            state.queueCount++
            state.isLoading = true
        },
        setLoadingOff: (state) => {
            state.queueCount--
            if (state.queueCount == 0) {
                state.isLoading = false
            }
        },
    }
})

export const { setLoadingOn, setLoadingOff } = spinnerSlice.actions
export default spinnerSlice.reducer