import { createSlice } from "@reduxjs/toolkit"

export const formLogin = 'login'
export const formRegister = 'register'

const initialState = {
    form: formLogin
}

const loginFormSlice = createSlice({
    name: 'loginFormSlice',
    initialState,
    reducers: {
        setFormLogin: (state, action) => {
            state.form = action.payload
        }
    }
})

export const { setFormLogin } = loginFormSlice.actions
export default loginFormSlice.reducer