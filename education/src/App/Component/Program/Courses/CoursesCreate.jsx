import { AppstoreAddOutlined, PlusCircleOutlined } from '@ant-design/icons'; 
import { Button, Form, Input, InputNumber, message, Modal, Select, Switch, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format, host } from '../../../App'

export default function CoursesCreate({ show, setShow, classIndex, setShowType, showType, dataDefault, setDataDefault }){
  const [tuchon, setTuchon] = useState(false);
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [coursesType, setCoursesType] = useState([]);
  const [load, setLoad] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    
    if (showType === false && classIndex){
      axios.get(host('courses_type', { 'classIndexId': classIndex.id }))
        .then((result) => {
          setCoursesType(format(result.data));
        }).catch((err) => {
          message.error('Server error')
        }).finally(()=>{
          if (dataDefault !== undefined) {
            form.setFieldsValue(dataDefault);
            form.setFieldsValue({ 'ClassIndexId': classIndex.id })
          }
        });
      axios.get(host('course', { ClassIndexId: classIndex.id, all: true}))
        .then((result) => {
          setCourses(format(result.data.filter(e=>e.id!==dataDefault?.id)))
        })
    }
    
    return ()=>{
      
      setTuchon(false);
      setCourses([]);
    }
  }, [classIndex, dataDefault, form, showType])
  
  const changeTinChi = (e) =>{
    if (!check)
    form.setFieldsValue({theory: e*15, practice: 0})
    else form.setFieldsValue({ theory: 0, practice: 0 })
  }
  const changeLyThuyet = (e) =>{
    form.setFieldsValue({ practice: (parseInt(form.getFieldValue('credits') * 15 - e) * 2) })
  }
  const changeThucHanh = (e) => {
    form.setFieldsValue({ theory: (parseInt(form.getFieldValue('credits') * 30 - e) / 2) })
  }
  const actionAdd =(data)=>{
    setLoad(true);
    if (data.prerequisite === data.learnFirst && data.prerequisite !== undefined){
      message.error(<>Chọn môn <b>Học trước</b> trùng với môn học <b>Tiên quyết</b></>)
      setLoad(false);
      return;
    } if (data.learnFirst === data.parallel && data.learnFirst !== undefined) {
      message.error(<>Chọn môn <b>Song hành</b> trùng với môn học <b>Học trước</b></>)
      setLoad(false);
      return;
    } if (data.parallel === data.prerequisite && data.parallel !== undefined) {
      message.error(<>Chọn môn <b>Song hành</b> trùng với môn học <b>Tiên quyết</b></>)
      setLoad(false);
      return;
    } else{
      data.ClassIndexId = classIndex.id;
      axios.post(host('course'), data)
        .then((result) => {
          const type = result.data.type;
          message[type](result.data.message);
          if (type === 'success') {
            form.resetFields();
            form.setFieldsValue({ 'ClassIndexId': classIndex.id })
            setTuchon(false);
          }
        }).catch(() => {
          message.error('Server error')
        }).finally(() => {
          setLoad(false);
          if(dataDefault !== undefined){
            setShow(false);
            setDataDefault(undefined)
          }
        });
    }
  }
  const [check, setCheck] = useState(false)
  return (
    <Modal title={<div className='text-primary text-uppercase'><PlusCircleOutlined /> {dataDefault === undefined ? 'Thêm khóa học mới' : 'Thay đổi khóa học'} {classIndex.name}</div>} 
    footer={false} visible={show} onCancel={() => {
      setShow(false);
      form.resetFields();
      form.setFieldsValue({ 'ClassIndexId': classIndex.id })
      }}>
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
        <Form.Item name='check_theory_practice' label='Không chia tiết'>
          <Switch defaultChecked={check} onChange={setCheck}/>
        </Form.Item>
        {!check?
        <Form.Item
          required
          label='Số tiết' >
          <div className='d-flex'>
            <Form.Item name='theory' required className='w-100 pr-1' rules={[{ required: true, message: 'Không được trống' }]}>
              <InputNumber disabled={check} max={130} min={0} placeholder='Lý thuyết' onInput={changeLyThuyet} className='w-100' />
            </Form.Item>
            <Form.Item name='practice' required className='w-100 pl-1' rules={[{ required: true, message: 'Không được trống' }]}>
              <InputNumber disabled={check} max={250} min={0} placeholder='Thực hành' onInput={changeThucHanh} className='w-100' />
            </Form.Item>
          </div>
        </Form.Item>:''}
       
        <Form.Item
          required
          rules={[{ required: true, message: 'Hãy chọn một khối kiến thức' }]}
          name='coursesType' 
          label='Khối kiến thức'>
          <Select placeholder='Lựa chọn khối kiến thức' showSearch
            filterOption={(input, option) =>{
              formAdd.setFieldsValue({name: input});           
              return (option.children.props.title + '').toLowerCase().includes(input.toLowerCase())
            }}
            defaultValue={dataDefault?.coursesType}
            dropdownRender={menu => <>
            {menu}
            <div className='m-2'>
              <Button className='w-100' type='primary' shape='round' onClick={()=>{setShowType(true)}}
                  icon={<AppstoreAddOutlined />}>Quản lý khối kiến thức mới</Button>
            </div>
          </>}>
            {coursesType.map((e)=>
              <Select.Option key={e.id} value={e.id}>
                <Tooltip title={e.des??e.name}>
                  <div style={{borderLeft:'5px solid '+ e.color, paddingLeft:'5px'}}>{e.name}</div>
                </Tooltip>
              </Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item required
          name='store'
          label='Tích lũy'>
          <Switch defaultChecked={true}/>
        </Form.Item>
        <Form.Item
          label='Nâng cao' >
          <Switch onChange={(e)=>setTuchon(e)} checked={tuchon}/>
        </Form.Item>

        {tuchon?
        <>
        <Form.Item
          name='prerequisite'
          label='Môn tiên quyết' >
              <Select placeholder='Lựa chọn môn tiên quyết' defaultValue={dataDefault?.prerequisite} showSearch allowClear>
                {courses.map(e =>
                  <Select.Option key={e.id} value={e.id}>
                    <b className='text-primary'>{e.code}</b> - <Tooltip title={`TC: ${e.credits} - LT: ${e.theory} - TH: ${e.practice}`}>{e.name}</Tooltip>
                  </Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name='learnFirst'
          label='Môn học trước' >
              <Select placeholder='Lựa chon môn học trước' defaultValue={dataDefault?.learnFirst} showSearch allowClear>
                {courses.map(e =>
                  <Select.Option key={e.id} value={e.id}>
                    <b className='text-primary'>{e.code}</b> - <Tooltip title={`TC: ${e.credits} - LT: ${e.theory} - TH: ${e.practice}`}>{e.name}</Tooltip>
                  </Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name='parallel'
          label='Môn song hành' >
              <Select placeholder='Lựa chon song hành' defaultValue={dataDefault?.parallel} showSearch allowClear>
              {courses.map(e =>
                <Select.Option key={e.id} value={e.id}>
                  <b className='text-primary'>{e.code}</b> - <Tooltip title={`TC: ${e.credits} - LT: ${e.theory} - TH: ${e.practice}`}>{e.name}</Tooltip>
                </Select.Option>)}
          </Select>
        </Form.Item>
        </> : ''
        }
        <div className='text-right'>
          <Button htmlType='submit' loading={load} type='primary' shape='round' icon={<PlusCircleOutlined />}>{dataDefault === undefined ? 'Tạo khóa học mới' : 'Cập nhật khóa học'}</Button>
        </div>
      </Form>
    </Modal>
   )
}