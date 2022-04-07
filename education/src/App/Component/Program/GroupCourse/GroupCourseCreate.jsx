import React, { useEffect } from 'react'
import { Form, Modal, InputNumber, Button, Switch, message } from 'antd';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { host } from '../../../App';

export default function GroupCourseCreate({ show, setShow, idClassIndex, group, setGroup, dataSem }) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (show === true) {
            form.setFieldsValue({sumCredit: Math.max(...group?.map(e => dataSem?.find(k=>k.id===e)?.credits))})
        }
    }, [dataSem, form, group, show])

    const finish = (data) => {
        data.list = group;
        return axios.post(host('group_course'), { ...data, ClassIndexId: idClassIndex })
            .then((result) => {
                if (result.data.type === 'success') {
                    message.success('Tạo nhóm thành công');
                    setGroup([]);
                    setShow(false);
                } else {
                    message.error('Tạo nhóm thất bại');
                }
            }).catch(() => {
                message.error('Server error');
            });
    }

    return (
        <Modal title={<div className='text-primary text-uppercase'><PlusCircleOutlined /> Thêm nhóm môn học </div>}
            footer={false} visible={show} onCancel={() => setShow(false)}>
            <Form form={form}
                onFinish={finish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item name='sumCredit'
                required label='Tổng tín chỉ'
                    rules={[{ required: true, message: 'Cần nhập tổng tín chỉ lớn hơn bằng ' + Math.max(...group?.map(e => dataSem?.find(k => k.id === e)?.credits))}]}>
                    <InputNumber placeholder='Tổng tín chỉ' className='w-100'
                        min={Math.max(...group?.map(e => dataSem?.find(k=>k.id===e)?.credits))}
                        max={128} />
                </Form.Item>
                <Form.Item name='store' label='Tích lũy' >
                    <Switch defaultChecked={true} />
                </Form.Item>
                <div className="text-right">
                    <Button htmlType='submit' type='primary' shape='round' icon={<PlusOutlined />}>Thêm</Button>
                </div>
            </Form>
        </Modal>
    )
}
