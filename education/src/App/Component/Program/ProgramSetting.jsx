import { CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Modal, Switch, InputNumber, Button } from 'antd'
import React, { useEffect } from 'react'

export default function ProgramSetting({ show, setShow, data }) {
    const [form] = Form.useForm();
    useEffect(() => {
        data.semThree = data.semThree===1?true:false
        form.setFieldsValue(data);
        console.log(data);
    }, [data, form])
    const action = (dataForm)=>{
        console.log(dataForm);
    }
    return (
        <Modal title={"Cài đặt khóa học "+data.name} footer={false} visible={show} onCancel={()=>setShow(false)}>
            <Form form={form}
                onFinish={action}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <Form.Item name='id' hidden>
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    name='sem'
                    label='Số năm học'>
                    <InputNumber min={3} max={8}/>
                </Form.Item>
                <Form.Item 
                    valuePropName="checked"
                    name='semThree'
                    label='Học Kỳ hè'>
                    <Switch/>
                </Form.Item>
                <div className='text-right'>
                    <Button htmlType='submit' icon={<SaveOutlined/>} shape='round' type='primary'>Lưu thay đổi</Button>
                </div>
            </Form>
        </Modal>
    )
}
