import { Button, Form, Input, Modal, Select, Table, Tooltip, message, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea';
import { format } from '../../../App';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import { host } from '../../../App'

export default function CoursesTypeCreate({ show, setShow, classIndex }) {
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
            <h5 className='text-center'>Danh s??ch kh???i ki???n th???c</h5>
            <div className='m-2 d-flex'>
            <Switch onChange={setViewList} defaultChecked={viewList} className='mr-2'></Switch> Kh???i ki???n th???c <b className='mx-1'>{classIndex.name}</b> (t???ng {dataList?.length??0})
            </div>
            {viewList?
                <Table className='my-2' bordered size='small' loading={dataList === undefined} dataSource={dataList}>
                    <Column title='#' dataIndex='index' align='center' />
                    <Column title='T??n kh???i ki???n th???c' align='center' render={(data) =>
                        <Tooltip title={data.des}>
                            <div style={{ borderLeft: '5px solid ' + data.color }}>
                                {data.name}
                            </div>
                        </Tooltip>} />
                    <Column title='T???ng s??? m??n' align='center' dataIndex='countData' />
                    <Column title='S???a' align='center'
                        render={(data) =>
                            <Button onClick={() => { form.setFieldsValue(data); setNewData(false) }}
                                type='primary' shape='circle' icon={<EditOutlined />} />} />
                    <Column title='X??a' align='center' render={(data) =>
                        <Tooltip title='X??a kh???i ki???n th???c khi kh??ng c?? kh??a h???c n??o'>
                            <Button onClick={() => Modal.confirm({
                                title: <>B???n th???t s??? mu???n x??a kh???i ki???n th???c <b>{data.name}</b></>,
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
                    label='T??n'
                    rules={[{ required: true, message: 'T??n kh??ng ???????c r???ng' }]}
                    name='name'
                    required>
                    <Input placeholder='T??n kh???i ki???n th???c' maxLength={100} showCount />
                </Form.Item>
                <Form.Item
                    label='M??u ch??? ?????'
                    rules={[{ required: true, message: 'M??u kh??ng ???????c r???ng' }]}
                    name='color'
                    required>
                    <Input type='color'/>
                </Form.Item>
                <Form.Item
                    label='M?? t???'
                    name='des'>
                    <TextArea placeholder="M?? t??? Kh???i ki???n th???c" autoSize showCount maxLength={200} />
                </Form.Item>
                <div className='text-right'>
                    <Button htmlType='reset' type='dashed' className='mr-2' shape='round'>L??m r???ng</Button>
                    <Button htmlType='submit' icon={<PlusOutlined />} type='primary' shape='round'>{newData ?'Th??m m???i':'C???p nh???t'}</Button>
                </div>
            </Form>
        </Modal>
    )
}
