import { CloseCircleOutlined, EditOutlined, PlusOutlined, ReadOutlined, SaveOutlined } from '@ant-design/icons/lib/icons';
import { Button, DatePicker, Form, Input, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { host } from '../../Static/Static';
import moment from 'moment';

export default function ClassIndexCreate({ visible, value }) {
    const [formAdd, setFormAdd] = visible;
    const [form] = Form.useForm();
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (value !== undefined) {
            value.year = [moment(value.beginYear, 'YYYY'), moment(value.endYear, 'YYYY')]
            form.setFieldsValue(value)
        } 
        return () =>{
            form.resetFields()
        }
    }, [form, value])

    const Update = () => {
        setLoad(true);
        form.validateFields()
        .then((result) => {
            axios.post(host('class_index'), result)
            .then((result) => {
                var type = result.data.status;
                message[type](result.data.message);
                if(type === 'success') 
                setFormAdd(false);
            }).catch((err) => {
                message.error(err);
            });
        }).finally(() => setLoad(false));
    }
    return (
        <Modal forceRender closeIcon={<CloseCircleOutlined />} visible={formAdd} onCancel={() => setFormAdd(false)}
            title={value === undefined ?
                <span className='text-primary'><ReadOutlined className='mr-1' />Create educatuin program</span> :
                <span className='text-primary'><EditOutlined className='mr-1' />Edit educatuin program</span>
            }
            footer={<>
                <Button shape='round' onClick={() => setFormAdd(false)}>Cancel</Button>
                <Button shape='round' loading={load} onClick={Update} type='primary'>{value === undefined ?
                    <><PlusOutlined className='mr-1' /> Create</> :
                    <><SaveOutlined className='mr-1' /> Update</>}</Button>
            </>}>
            <Form form={form} labelAlign='left' labelCol={{ span: 6, }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }}>
                {value !== undefined ? 
                    <Form.Item name='id' hidden>
                        <Input />
                    </Form.Item>
                :''}
                <Form.Item
                    label="Name class"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            pattern: /^[A-Z]{2,3}\d{2}[A-Z]{2,3}$/g,
                            message: <>Name class as <i>DH19TH</i></>,
                        }
                    ]}>
                    <Input maxLength={8} showCount placeholder='Please input name' onInput={(e)=>e.target.value = (e.target.value+'').toUpperCase()}/>
                </Form.Item>
                <Form.Item
                    rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
                    required name='year' label="Year">
                    <DatePicker.RangePicker picker='year' style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Description'
                    name='description'>
                    <TextArea autoSize maxLength='200' showCount placeholder='Enter a description' />
                </Form.Item>
            </Form>
        </Modal>
    )
}
