import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import React from 'react'
import { host, setKey } from '../App';

export default function Login({ user }) {

    const onFinish = (values) => {
        axios.post(host('login'),{username: values.username, password: values.password})
        .then((result) => {
            user[1](result.data);
            setKey(result.data.token, 3600);
            message.success('Đăng nhập thành công');
            
        }).catch((err) => {
            
        });
    };

    return (
        <div className='mx-auto mt-5' style={{ maxWidth: '400px' }}>
            <div className='px-4 py-2 shadow'>
                <h4 className='p-2 text-uppercase text-center'>Login system</h4>
                <Form 
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Hãy nhập password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" shape='round' htmlType="submit" icon={<UserOutlined />}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
