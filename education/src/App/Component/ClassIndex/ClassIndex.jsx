import { DeleteOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, message, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format, host } from '../../App'
import ClassIndexCreate from './ClassIndexCreate';

export default function ClassIndex() {
    const [dataTable, setDataTable] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
      getClassIndex();    
    }, [])
    
    const getClassIndex = () => {
        axios.get(host('class_index'))
            .then((result) => {
                setDataTable(format(result.data));
            }).catch((err) => {
                message.error('Error: Server error');
            });
    }
    return (
        <div className='container'>
            <h4><UnorderedListOutlined /> Danh sách chương trình đào tạo</h4>
            <Space size='small'>
                <Button type='primary' shape='round' icon={<PlusOutlined />} onClick={()=>setShow(true)}>Thêm CTĐT</Button>
                <Button type='dashed' shape='round' icon={<DeleteOutlined />}>Phục hồi CTĐT</Button>
            </Space>
            <div className='overflow-auto'>
                <Table loading={dataTable===undefined} dataSource={dataTable}>
                    <Column title='#' dataIndex='index' width={1} align='center'/>
                    <Column title='Tên Lớp' dataIndex='name' sorter={(a, b) => a > b ? -1 : 1} width={4} align='center' />
                    <Column title='Niên khóa' width={2} align='center' render={(data)=>{
                        <div>{data.beginYear} - {data.endYear}</div>
                    }} />
                    <Column title='Mô tả' dataIndex='description' ellipsis render={(description) => {
                        <Tooltip title={description} placement="topLeft">
                            <div>{description}</div>
                        </Tooltip>
                    }} width={2} align='center' />

                    <Column title='Thông tin' width={2} align='center' />
                    <Column title='Xóa' width={2} align='center' />
                    <Column title='CTĐT' width={2} align='center' />
                    <Column title='PCGD' width={2} align='center' />
                </Table>
            </div>
            <ClassIndexCreate show={show} setShow={setShow} />
        </div>
    )
}
