import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { userServ } from "../../api/api";
import { userLocalStorage } from "../../api/localService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../redux/userSlice";
import { formRegister, setFormLogin } from "../../redux/loginFormSlice";
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
const FormLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = (loginInfo) => {
        console.log("Success:", loginInfo)
        userServ.login(loginInfo)
            .then((res) => {
                message.success("Đăng nhập thành công")
                const user = res.data.content
                // save local
                userLocalStorage.set(user)
                console.log(userLocalStorage.get())
                // save redux
                dispatch(setLogin(user))
                // navigate
                // navigate("/")
                window.location.href = "/"
            })
            .catch((err) => {
                message.error("Đăng nhập thất bại")
                console.log(err);
            })
    }
    return <Form
        name="basic"
        size='large'
        layout="vertical"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            // span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
                {
                    required: true,
                    message: 'Vui lòng điền tài khoản: 8-20 ký tự, chỉ số và chữ, không có ký tự đặc biệt.',
                    pattern: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
                {
                    required: true,
                    message: "Vui lòng điền!",
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item>
            <button type='submit' className='submit-btn'>Đăng nhập</button>
        </Form.Item>

        <Form.Item>
            <p>Chưa có tài khoản, <a href="#" onClick={() => { dispatch(setFormLogin(formRegister)) }}>đăng ký</a>!</p>
        </Form.Item>
    </Form>
};
export default FormLogin;
