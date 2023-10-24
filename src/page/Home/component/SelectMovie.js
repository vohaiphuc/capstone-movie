import React, { useRef } from 'react';
import { Select, Space } from 'antd';

const items = [
    {
        value: 'jack',
        label: 'Jack',
    }
]
const App = ({ defaultValue, onChange, options, value, idKey }) => {
    return <Select
        defaultValue={defaultValue}
        style={{
            width: 300,
        }}
        // value=""
        onChange={onChange}
        options={options}
        placeholder="Chọn"
        key={idKey}
    />
}
export default App;