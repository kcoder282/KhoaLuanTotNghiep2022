import { UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='mx-auto mt-5' style={{maxWidth: '400px'}}>
          <div className='px-4 py-2 shadow'>
            <h4 className='p-2 text-uppercase text-center'>Login system</h4>
            <Form
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
                      <Link to='/'>
                          <Button type="primary" shape='round' htmlType="submit" icon={<UserOutlined />}>
                              Đăng nhập
                          </Button>
                      </Link>
                  </Form.Item>
            </Form>
        </div>
    </div>
  )
}
