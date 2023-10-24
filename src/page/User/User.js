import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Checkbox,
    ConfigProvider,
    Form,
    Input,
    Progress,
    Select,
    message,
} from 'antd'
import { formLogin } from "../../redux/loginFormSlice"
import { useDispatch } from 'react-redux'
import { setFormLogin } from '../../redux/loginFormSlice'
import { userServ } from '../../api/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./style.scss"
import { setLogin } from '../../redux/userSlice'
import { userLocalStorage } from '../../api/localService'
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
const User = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => { return state.userSlice })
    const [userDetail, setUserDetail] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) { // loged in
            navigate("/login")
        }
        userServ.getDetail()
            .then((res) => {
                console.log(res.data.content)
                setUserDetail(res.data.content)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    const [form] = Form.useForm()
    const onFinish = (userInfo) => {
        // console.log('Received userInfo of form: ', userInfo)
        const configInfo = {
            taiKhoan: userInfo.taiKhoan,
            matKhau: userInfo.matKhau,
            email: userInfo.email,
            soDt: user.soDT,
            maNhom: user.maNhom,
            maLoaiNguoiDung: user.maLoaiNguoiDung,
            hoTen: userInfo.hoTen,
        }
        console.log("🚀 ~ file: User.js:73 ~ onFinish ~ configInfo:", configInfo)
        userServ.update(configInfo)
            .then((res) => {
                message.success("Thay đổi thông tin thành công!")
                const newChange = res.data.content

                // format này là của api DangNhap
                const newUserInfo = {
                    accessToken: user.accessToken,
                    taiKhoan: newChange.taiKhoan,
                    email: newChange.email,
                    soDt: newChange.soDT,
                    maNhom: newChange.maLoaiNguoiDung,
                    maLoaiNguoiDung: newChange.maLoaiNguoiDung,
                    hoTen: newChange.hoTen,
                }

                dispatch(setLogin(newUserInfo)) // để giữ lại accessToken
                userLocalStorage.set(newUserInfo) // để giữ lại accessToken
            })
            .catch((err) => {
                console.log("🚀 ~ file: FormRegister.js:55 ~ onFinish ~ err:", err)
                message.error("Thay đổi thông tin thất bại!")
            })
    }

    const renderProgress = () => {
        const allTicket = userDetail.thongTinDatVe
        let totalPurchase = 0
        if (allTicket) {
            allTicket.forEach(ticket => totalPurchase += ticket.giaVe)
        } else {
            return
        }

        const silverMax = 500000
        const goldMax = 1000000

        let silverPercent = Math.floor(totalPurchase / silverMax * 100)
        let goldPercent = 0

        if (silverPercent > 100) {
            goldPercent = Math.floor((totalPurchase - silverMax) / (goldMax - silverMax) * 100)
        }

        const percent = Math.floor(totalPurchase / goldMax * 100)

        const colorProgress = (goldPercent >= 100) ? "#52c41a" : "#d96c2c"

        return (
            <div className="flex items-center user">
                <ConfigProvider
                    theme={{
                        token: {
                            colorInfo: colorProgress,
                            colorSuccess: colorProgress,
                        },
                    }}
                >
                    <Progress percent={percent} size={["100%", 30]} showInfo={false} style={{ margin: 0 }} />
                </ConfigProvider>
                <div className='membership'>
                    <div className='flex flex-col items-center'>
                        <span className='whitespace-nowrap'>{totalPurchase.toLocaleString()}</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span>Bạc</span>
                        <span>500.000</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span>Vàng</span>
                        <span>1.000.000</span>
                    </div>
                </div>

            </div>
        )
    }

    return <div className="form px-2 md:px-0" >
        <div className='flex flex-col items-center my-5 space-y-2'>
            <Avatar size={128} src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" />
            <h2 className='text-xl font-semibold text-center'>{user?.hoTen}</h2>
        </div>

        {renderProgress()}
        <h2 className='my-5 text-2xl font-bold'>Cập nhật thông tin</h2>
        <Form
            {...formItemLayout}
            form={form}
            size='large'
            layout='vertical'
            name="register"
            onFinish={onFinish}
            initialValues={userDetail}
            scrollToFirstError
            key={userDetail.hoTen}
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
                <Input disabled />
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
                <Input disabled />
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

            <Form.Item>
                <button type='submit' className='submit-btn'>Cập nhật</button>
            </Form.Item>

        </Form>
    </div>
}
export default User