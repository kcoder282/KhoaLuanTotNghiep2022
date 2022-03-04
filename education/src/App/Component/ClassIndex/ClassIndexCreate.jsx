import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Modal, Select } from 'antd'
import { Form } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { host } from '../../App';

export default function ClassIndexCreate({ show, setShow, data, list=[] }) {
    const [form] = Form.useForm();
    const [load, setLoad] = useState(false);
    const action = (value) =>{
        setLoad(true);
        axios.post(host('class_index'),value)
        .then((result) => {
            const type = result.data.type;
            message[type](result.data.message);
            setShow(false);
        }).catch((err) => {
            message.error('Server Error')
        }).finally(()=>setLoad(false));
    }
    useEffect(() => {
      if(show && data.id!==0){
        data.year = [moment(data.beginYear, "YYYY"), moment(data.endYear, "YYYY")]
        form.setFieldsValue(data);
      }
    }, [data, form, show])
    
    return (
        <Modal title={data.id === 0 ? 'Tạo CTĐT mới' : ('Chỉnh sửa CTĐT: ' + data.name)} onCancel={() => setShow(false)} footer={false} visible={show}>
            <Form form={form} 
                onFinish={action}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <Form.Item hidden name='id'>
                    <Input/>
                </Form.Item> 
                <Form.Item
                    required={true}
                    label='Tên CTĐT'
                    name='name'
                    rules={[
                        { required: true, message: 'Tên CTĐT không để trống' },
                        { pattern: /^[A-Z]{2,3}[0-9]{2}[A-Z]{2,3}$/g, message: 'Cần nhập đúng dạng tương tự: DH19TH' }
                    ]}
                >
                    <Input maxLength={8} showCount placeholder='Tên CTĐT...'/>
                </Form.Item>
                <Form.Item
                    required={true}
                    label='Niên khóa'
                    name='year'
                    rules={[{
                        required:true,
                        message:'Hãy chọn niên khóa cho CTĐT'
                    }]}>
                    <DatePicker.RangePicker picker='year' style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    label='Kế tiếp CTĐT'
                    name='srcClassIndex'>
                    <Select 
                    showSearch
                    placeholder="Chọn CTĐT">
                    {list.map((e)=>
                        <Select.Option key={e.key} value={e.id}>{e.name}({e.beginYear} - {e.endYear})</Select.Option>
                    )}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Mô tả'
                    name='des'>
                    <TextArea placeholder="Mô tả CTĐT" autoSize showCount maxLength={200}/>
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <Button loading={load} htmlType="submit" type='primary' shape='round' icon={<PlusCircleOutlined />} >{
                        data.id === 0? "Khởi tạo": "Lưu thay đổi"
                    }</Button>
                </div>
            </Form>
        </Modal>
    )
}
