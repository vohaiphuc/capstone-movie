import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}

const filmSlice = createSlice({
    name: 'filmSlice',
    initialState,
    reducers: {
        setFilmList: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { setFilmList } = filmSlice.actions
export default filmSlice.reducer