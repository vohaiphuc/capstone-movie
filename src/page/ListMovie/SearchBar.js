import { Form, Input } from 'antd'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '../../App'

export default function SearchBar({ defaultValue }) {
    const navigate = useNavigate()

    const handleSearch = (searchKey) => {
        searchKey = typeof searchKey == 'object' ? searchKey.searchKey : searchKey
        navigate(searchKey ? route.movies.search(searchKey) : route.movies.path)
    }

    const handleOnKeyDown = (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            let searchKey = e.target.value
            let pattern = /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i
            if (pattern.test(searchKey) || searchKey == "") {
                handleSearch(searchKey)
            }
        }
    }

    return (
        <Form
            name="basic"
            initialValues={{
                searchKey: defaultValue,
            }}
            autoComplete="off"
            key={defaultValue}
            onFinish={handleSearch}
            wrapperCol={{
                // span: 16,
            }}
            className='flex w-full'
        >
            <Form.Item
                name="searchKey"
                rules={[{
                    pattern: /^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i,
                    message: 'Kí tự không hợp lệ',
                }]}
                className='grow mb-0'
            >
                <Input
                    placeholder='Tìm kiếm...'
                    onKeyDown={handleOnKeyDown}
                />
            </Form.Item>

            <Form.Item className='mb-0'>
                <button className='btn btn-orange' type="submit">Tìm kiếm</button>
            </Form.Item>
        </Form>
    )
}

