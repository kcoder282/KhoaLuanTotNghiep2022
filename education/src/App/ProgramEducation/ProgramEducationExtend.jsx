import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Modal, Transfer } from 'antd'
import React from 'react'

export default function ProgramEducationExtend({ visible }) {
    const [show, setShow] = visible;
    return (
        <Modal visible={show} onCancel={() => setShow(false)} footer={false}
            title={<><SettingOutlined className='mr-1' />Setting Manager</>} closeIcon={<CloseCircleOutlined />}>
            
        </Modal>
    )
}
