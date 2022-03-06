import { PlusCircleOutlined } from '@ant-design/icons'; 
import { Form, Input, Modal } from 'antd';
import React from 'react'

export default function CoursesCreate({ show, setShow, classIndex }) {
  return (
    <Modal title={<div className='text-primary text-uppercase'><PlusCircleOutlined/> Thêm môn học mới {classIndex.name}</div>} footer={false} visible={show} onCancel={() => setShow(false)}>
      <Form 
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}>
        <Form.Item
          required
          rules={[{
            required: true,
            message: 'Yêu cầu nhập mã môn',
          },{
            pattern: /^[A-Za-z]{3}[0-9]{3}$/,
            
            message: 'Yêu cầu mã theo định dạng COS103'
          }]}
          label='Mã môn'>
          <Input maxLength='6' showCount/>
        </Form.Item>

        <Form.Item
          required
          rules={[{
                  required: true,
                  message: 'Yêu cầu nhập tên môn',
                }]}
          label='Tên môn' >
              <Input maxLength='250' showCount />
        </Form.Item>
      </Form>
    </Modal>
  )
}