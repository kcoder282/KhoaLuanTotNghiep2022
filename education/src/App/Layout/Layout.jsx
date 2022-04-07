import { CarryOutOutlined, CopyrightOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Footer, Header } from 'antd/lib/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }) {

    return (
        <div className='d-flex flex-column' style={{height:'100vh'}}>
            <Header className="shadow py-2 px-3 position-sticky bg-light" style={{ top: 0, zIndex: 1024 }}>
                <div className="text-uppercase h3 text-primary m-0 d-flex align-items-center justify-content-between">
                    <div><CarryOutOutlined /> Quản lý ctđt - pcgd</div>
                    <div>
                        <Button type='primary' shape='round' icon={<UserOutlined />}>Admin</Button>
                    </div>
                </div>
            </Header>    
            <div className='px-3 pt-3 shadow bg-light mx-0 m-sm-3 flex-fill'>
              {children}
            </div>
            <Footer><div className='text-center'>Copyright <CopyrightOutlined /> - Thanh Khan 2021 - 2022</div></Footer>
        </div>
    )
}
