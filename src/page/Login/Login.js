import React, { useState } from 'react'
import FormLogin from './FormLogin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import "./style.scss"
import FormRegister from './FormRegister'
import { formLogin, formRegister, setFormLogin } from '../../redux/loginFormSlice'

export default function Login() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => { return state.userSlice })
    let form = useSelector((state) => { return state.loginFormSlice.form })
    // const [form, setForm] = useState(defaultForm)
    const navigate = useNavigate()
    useEffect(() => {
        if (user) { // loged in
            navigate("/user")
        }
    }, [])

    return (
        <div className="form">
            <div className='flex items-center justify-center space-x-10 select-form py-10'>
                <h2 className={form == formLogin ? 'text-2xl active' : 'text-2xl'} onClick={() => { dispatch(setFormLogin(formLogin)) }}>Đăng nhập</h2>
                <h2 className={form == formRegister ? 'text-2xl active' : 'text-2xl'} onClick={() => { dispatch(setFormLogin(formRegister)) }}>Đăng ký</h2>
            </div>
            <div className='px-3 md:px-0'>
                {form == formLogin ? <FormLogin /> : <FormRegister />}
            </div>
        </div>
    )
}
