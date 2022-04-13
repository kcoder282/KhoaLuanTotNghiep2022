import { CarryOutOutlined, CopyrightOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { Footer, Header } from 'antd/lib/layout/layout'
import React from 'react'
import { setKey } from '../App'
import { Link } from 'react-router-dom';

export default function Layout({ children, user, setUser }) {
    const logout = () => {
        setKey('', 3600);
        setUser({});
    }
    return (
        <div className='d-flex flex-column' style={{ height: '100vh' }}>
            <Header className="shadow py-2 px-3 position-sticky bg-light" style={{ top: 0, zIndex: 1024 }}>
                <div className="text-uppercase h3 text-primary m-0 d-flex align-items-center justify-content-between">
                    <div><CarryOutOutlined /> Quản lý ctđt - pcgd</div>
                    <Dropdown overlay={user?.username !== undefined ?
                        <Menu>
                            <Menu.Item>
                                <div><KeyOutlined /> Thay đổi mật khẩu </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div><LogoutOutlined onClick={logout} /> Đăng xuất</div>
                            </Menu.Item>
                        </Menu>
                        : ''}>
                        <Button type='primary' shape='round' icon={<UserOutlined />}>{user?.username ?? 'Login'}</Button>
                    </Dropdown>
                </div>
            </Header>
            <div className='px-3 pt-3 shadow bg-light mx-0 m-sm-3 flex-fill'>
                {children}
            </div>
            <Footer><div className='text-center'>Copyright <CopyrightOutlined /> - Thanh Khan 2021 - 2022</div></Footer>
        </div>
    )
}
