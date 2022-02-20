import { DownOutlined, ExportOutlined, FileExcelOutlined, ImportOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Space } from 'antd'
import React, { useState } from 'react'
import ProgramEducationExtend from './ProgramEducationExtend'

export default function ProgramEducationManager({id}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <Space>
                <Button shape='round' type='primary' icon={<SettingOutlined />} onClick={()=>setShow(true)}>Manager</Button>
                <Dropdown overlay={
                <Menu>
                    <Menu.Item>
                        <Button type='text' icon={<ExportOutlined />}>Export Excel</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button type='text' icon={<ImportOutlined />}>Import Excel</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button shape='round' type='dashed' icon={<FileExcelOutlined />} >Excel API <DownOutlined /></Button>
                </Dropdown>
            </Space>
            <ProgramEducationExtend visible={[show, setShow]}/>
        </>
    )
}
