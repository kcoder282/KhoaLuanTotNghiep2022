import { SaveOutlined } from '@ant-design/icons';
import { Form, Modal, Switch, InputNumber, Button, message } from 'antd'
import axios from 'axios';
import React, { useEffect } from 'react'
import { host } from '../../App';

export default function ProgramSetting({ show, setShow, data, tab }) {
    const [form] = Form.useForm();

    useEffect(() => {
        data.semThree = data.semThree===1?true:false
        form.setFieldsValue(data);
    }, [data, form])

    const action = (dataForm)=>{
        return axios.put(host('class_index/'+data.id), dataForm)
        .then((result) => {
            const type = result.data.type;
            message[type](result.data.message);
            setShow(false);
        }).catch(() => {
            message.error('Server Error');
        })
    }
    return (
        <Modal title={'Cài đặt khóa học ' + data.name} footer={false} visible={show} onCancel={()=>setShow(false)}>
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
                <div className='text-right'>
                    <Button htmlType='submit' icon={<SaveOutlined/>} shape='round' type='primary'>Lưu thay đổi</Button>
                </div>
            </Form>
        </Modal>
    )
}
