import { Button, Form, Input, Modal, Select, Table, Tooltip, message, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea';
import { colorList, format } from '../../../App';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import { host } from '../../../App'

export default function CoursesTypeCreate({ show, setShow, classIndex }) {
    const color = colorList;
    const [dataList, setDataList] = useState();
    const [newData, setNewData] = useState(true);
    const [viewList, setViewList] = useState(false);
    const [form] = Form.useForm();

    function LoadData(){
        axios.get(host('courses_type', { 'classIndexId': classIndex.id }))
        .then((result) => {
            setDataList(format(result.data));
        }).catch((err) => {
            message.error('Server error')
        });
    }
    useEffect(() => {
      if(show===true){
          axios.get(host('courses_type', { 'classIndexId': classIndex.id }))
              .then((result) => {
                  setDataList(format(result.data));
              }).catch((err) => {
                  message.error('Server error')
              });
          form.setFieldsValue({ ClassIndexId: classIndex.id })
      }
    }, [classIndex.id, form, show])

    
    const Submit = (data) =>{
        axios.post(host('courses_type'), data)
        .then((result) => {
            const type = result.data.type;
            message[type](result.data.message);
            form.resetFields();
            form.setFieldsValue({ ClassIndexId: classIndex.id })
        }).catch((err) => {
            message.error('Server error')
        }).finally(LoadData);
    }
    
    const DeleteData = ({id})=>{
        return axios.delete(host('courses_type/' + id))
        .then((result) => {
            const type = result.data.type;
            message[type](result.data.message);
        }).catch((err) => {
            message.error('Server error')
        }).finally(LoadData);
    }
    return (
        <Modal zIndex={1001}
            visible={show} onCancel={() => setShow(false)} footer={false}>
            <h5 className='text-center'>Danh sách khối kiến thức</h5>
            <div className='m-2 d-flex'>
            <Switch onChange={setViewList} defaultChecked={viewList} className='mr-2'></Switch> Khối kiến thức <b className='mx-1'>{classIndex.name}</b> (tổng {dataList?.length??0})
            </div>
            {viewList?
                <Table className='my-2' bordered size='small' loading={dataList === undefined} dataSource={dataList}>
                    <Column title='#' dataIndex='index' align='center' />
                    <Column title='Tên khối kiến thức' align='center' render={(data) =>
                        <Tooltip title={data.des}>
                            <div style={{ borderLeft: '5px solid ' + data.color }}>
                                {data.name}
                            </div>
                        </Tooltip>} />
                    <Column title='Tổng số môn' align='center' dataIndex='countData' />
                    <Column title='Sửa' align='center'
                        render={(data) =>
                            <Button onClick={() => { form.setFieldsValue(data); setNewData(false) }}
                                type='primary' shape='circle' icon={<EditOutlined />} />} />
                    <Column title='Xóa' align='center' render={(data) =>
                        <Tooltip title='Xóa khối kiến thức khi không có khóa học nào'>
                            <Button onClick={() => Modal.confirm({
                                title: <>Bạn thật sự muốn xóa khối kiến thức <b>{data.name}</b></>,
                                type: 'error',
                                onOk: () => DeleteData(data),
                                zIndex: 1010
                            })} disabled={data.countData > 0} shape='circle' danger type='primary' icon={<DeleteOutlined />} />
                        </Tooltip>
                    } />
                </Table>:''
            }
            <Form
                form={form}
                onReset={()=>{
                    form.setFieldsValue({ ClassIndexId: classIndex.id });
                    setNewData(true)
                }}
                onFinish={Submit}
                labelAlign='left'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item hidden name='ClassIndexId'>
                    <Input/>
                </Form.Item>
                <Form.Item hidden name='id'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Tên'
                    rules={[{ required: true, message: 'Tên không được rỗng' }]}
                    name='name'
                    required>
                    <Input placeholder='Tên khối kiến thức' maxLength={100} showCount />
                </Form.Item>
                <Form.Item
                    label='Màu chủ đề'
                    rules={[{ required: true, message: 'Màu không được rỗng' }]}
                    name='color'
                    required>
                    <Select placeholder='Chọn màu chủ đạo' showSearch filterOption={(input, option) => 
                        (option.children[2]+'').toLowerCase().includes(input.toLowerCase())
                    }>
                        {color.map((e,i)=>
                        <Select.Option key={i} value={e.code}>
                                <span style={{ color: e.code }}>■</span> {e.name}
                        </Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Mô tả'
                    name='des'>
                    <TextArea placeholder="Mô tả Khối kiến thức" autoSize showCount maxLength={200} />
                </Form.Item>
                <div className='text-right'>
                    <Button htmlType='reset' type='dashed' className='mr-2' shape='round'>Làm rỗng</Button>
                    <Button htmlType='submit' icon={<PlusOutlined />} type='primary' shape='round'>{newData ?'Thêm mới':'Cập nhật'}</Button>
                </div>
            </Form>
        </Modal>
    )
}
