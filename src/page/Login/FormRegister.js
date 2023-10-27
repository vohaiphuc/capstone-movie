import React, { useState } from 'react'
import {
    Checkbox,
    Form,
    Input,
    Select,
    message,
} from 'antd'
import { formLogin } from "../../redux/loginFormSlice"
import { useDispatch } from 'react-redux'
import { setFormLogin } from '../../redux/loginFormSlice'
import { userServ } from '../../api/api'
const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            // span: 24,
        },
        sm: {
            // span: 16,
        },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}
const FormRegister = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const onFinish = (registerInfo) => {
        // console.log('Received registerInfo of form: ', registerInfo)
        const configInfo = {
            taiKhoan: registerInfo.taiKhoan,
            matKhau: registerInfo.matKhau,
            email: registerInfo.email,
            soDt: "",
            maNhom: "",
            hoTen: registerInfo.hoTen,
        }
        userServ.register(configInfo)
            .then((res) => {
                message.success("Đăng ký thành công!")
                dispatch(setFormLogin(formLogin))
            })
            .catch((err) => {
                console.log("🚀 ~ file: FormRegister.js:55 ~ onFinish ~ err:", err)
                message.error("Đăng ký thất bại!")
            })
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            size='large'
            layout='vertical'
            name="register"
            onFinish={onFinish}
            initialValues={{

            }}
            scrollToFirstError
        >
            <Form.Item
                name="taiKhoan"
                label="Tài khoản"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền tài khoản: 8-20 ký tự, chỉ số và chữ, không có ký tự đặc biệt.',
                        whitespace: true,
                        pattern: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="hoTen"
                label="Họ và tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Email không hợp lệ!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng điền!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="matKhau"
                label="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={['matKhau']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('matKhau') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'))
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chọn')),
                    },
                ]}
            >
                <Checkbox>Bằng việc đánh dấu này, bạn đồng ý với tất cả <a href="#">chính sách</a> của chúng tôi.</Checkbox>
            </Form.Item>

            <Form.Item>
                <button type='submit' className='submit-btn'>Đăng ký</button>
            </Form.Item>

            <Form.Item>
                <p>Đã có tài khoản, <a href="#" onClick={() => { dispatch(setFormLogin(formLogin)) }}>đăng nhập</a>!</p>
            </Form.Item>

        </Form>
    )
}
export default FormRegister