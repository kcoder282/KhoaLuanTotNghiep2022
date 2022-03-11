import { AppstoreAddOutlined, CloseCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'; 
import { Button, Form, Input, InputNumber, message, Modal, Select, Switch, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format, host } from '../../../App'

export default function CoursesCreate({ show, setShow, classIndex, setShowType, showType }) {
  const [tuchon, setTuchon] = useState(false);
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [coursesType, setCoursesType] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    form.setFieldsValue({'ClassIndexId': classIndex.id})
    if(showType===false){
      axios.get(host('courses_type', { 'classIndexId': classIndex.id }))
        .then((result) => {
          setCoursesType(format(result.data));
        }).catch((err) => {
          message.error('Server error')
        });
    }
  }, [classIndex.id, form, showType])
  
  const changeTinChi = (e) =>{
    form.setFieldsValue({theory: e*15, practice: 0})
  }
  const changeLyThuyet = (e) =>{
    form.setFieldsValue({ practice: (parseInt(form.getFieldValue('credits') * 15 - e) * 2) })
  }
  const changeThucHanh = (e) => {
    form.setFieldsValue({ theory: (parseInt(form.getFieldValue('credits') * 30 - e) / 2) })
  }
  const actionAdd =(data)=>{
    setLoad(true);
    axios.post(host('course'),data)
    .then((result) => {
      const type = result.data.type;
      message[type](result.data.message);
      form.resetFields();
      form.setFieldsValue({ 'ClassIndexId': classIndex.id })
    }).catch((err) => {
      message.error('Server error')
    }).finally(()=>setLoad(false));
  }
  
  return (
    <Modal title={<div className='text-primary text-uppercase'><PlusCircleOutlined/> Thêm môn học mới {classIndex.name}</div>} footer={false} visible={show} onCancel={() => setShow(false)}>
      <Form onFinish={actionAdd}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='ClassIndexId' hidden>
          <Input/>
        </Form.Item>
        <Form.Item
          required
          name='code'
          rules={[{
            required: true,
            message: 'Yêu cầu nhập mã môn',
          },{
            pattern: /^[A-Za-z]{3}[0-9]{3}$/,
            message: 'Yêu cầu mã theo định dạng COS103'
          }]}
          label='Mã môn'>
          <Input maxLength='6' showCount placeholder='Mã môn học'/>
        </Form.Item>

        <Form.Item
          required
          name='name'
          rules={[{
                  required: true,
                  message: 'Yêu cầu nhập tên môn',
                }]}
          label='Tên môn' >
              <Input maxLength='100' showCount placeholder='Tên môn học'/>
        </Form.Item>
        
        <Form.Item
          required
          name='credits'
          rules={[{
            required: true,
            message: 'Cần số tín chỉ cụ thể',
          }]}
          label='Số tín chỉ' >
          <InputNumber max={130} min={1} placeholder='Số tín chỉ' className='w-100' onInput={changeTinChi}/>
        </Form.Item>
        <Form.Item
          required
          name='coursesType'
          label='Khối kiến thức'>
          <Select placeholder='Lựa chọn khối kiến thức' showSearch
            filterOption={(input, option) =>{
              formAdd.setFieldsValue({name: input});           
              return (option.children.props.title + '').toLowerCase().includes(input.toLowerCase())
            }}
            
            dropdownRender={menu => <>
            {menu}
            <div className='m-2'>
              <Button className='w-100' type='primary' shape='round' onClick={()=>{setShowType(true)}}
                  icon={<AppstoreAddOutlined />}>Quản lý khối kiến thức mới</Button>
            </div>
          </>}>
            {coursesType.map((e,i)=>
              <Select.Option key={i}>
                <Tooltip title={e.name}>
                  <div style={{borderLeft:'5px solid '+ e.color, paddingLeft:'5px'}}>{e.name}</div>
                </Tooltip>
              </Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          required
          label='Số tiết' >
          <div className='d-flex'>
            <Form.Item name='theory' required className='w-100 pr-1' rules={[{required: true, message: 'Không được trống'}]}>
              <InputNumber  max={130} min={0} placeholder='Lý thuyết' onInput={changeLyThuyet} className='w-100'/>
            </Form.Item>
            <Form.Item name='practice' required className='w-100 pl-1' rules={[{required: true, message: 'Không được trống'}]}>
              <InputNumber max={250} min={0} placeholder='Thực hành' onInput={changeThucHanh} className='w-100'/>          
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label='Nâng cao' >
          <Switch onChange={(e)=>setTuchon(e)} defaultChecked={tuchon}/>
        </Form.Item>
        {tuchon?
        <> 
        <Form.Item
            required
            name='groupCourseId'
            label='Nhóm tự chọn' >
            <Select placeholder='Lựa chọn nhóm môn học' showSearch>

            </Select>
          </Form.Item>
        <Form.Item
          name='prerequisite'
          label='Môn tiên quyết' >
          <Select placeholder='Lựa chọn môn tiên quyết' showSearch>

          </Select>
        </Form.Item>

        <Form.Item
          name='learnFirst'
          label='Môn học trước' >
          <Select placeholder='Lựa chon môn học trước' showSearch>

          </Select>
        </Form.Item>

        <Form.Item
          name='parallel'
          label='Môn song hành' >
          <Select placeholder='Lựa chon song hành' showSearch>

          </Select>
        </Form.Item>
        </> : ''
        }
        <div className='text-right'>
          <Button htmlType='submit' loading={load} type='primary' shape='round' icon={<PlusCircleOutlined/>}>Tạo môn học mới</Button>
        </div>
      </Form>
    </Modal>
   )
}