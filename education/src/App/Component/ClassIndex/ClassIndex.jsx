import { DeleteOutlined, EditOutlined, PlusOutlined, ReconciliationOutlined, SolutionOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { format, host } from '../../App'
import ClassIndexCreate from './ClassIndexCreate';
import ClassIndexRestore from './ClassIndexRestore';

export default function ClassIndex() {
    const [dataTable, setDataTable] = useState();
    const [show, setShow] = useState(false);
    const [showRestore, setShowRestore] = useState(false);
    const [data, setData] = useState({id:0});
    useEffect(() => {
        if(show === false && showRestore === false)
            getClassIndex();    
    }, [show, showRestore])
    
    const getClassIndex = () => {
        axios.get(host('class_index', {del: 0}))
            .then((result) => {
                setDataTable(format(result.data));
            }).catch((err) => {
                message.error('Error: Server error');
            });
    }
    const hiddenCTDT = ({id})=>{
        return axios.put(host('class_index/'+id),{del: true})
        .then((result) => {
            const type = result.data.type;
            message[type](result.data.message);
        }).catch((err) => {
            message.error("Server error");
        }).finally(() => getClassIndex());
    }
    return (
        <div className='container'>
            <h4><UnorderedListOutlined /> Danh sách chương trình đào tạo</h4>
            <Space size='small'>
                <Button type='primary' shape='round' icon={<PlusOutlined />} 
                    onClick={() => {setData({ id: 0 }); setShow(true);}}>Thêm CTĐT</Button>
                <Button type='dashed' shape='round' icon={<DeleteOutlined />}
                    onClick={() => { setShowRestore(true); }}>Phục hồi CTĐT</Button>
            </Space>
            <div className='overflow-auto mt-3'>
                <Table loading={dataTable===undefined} dataSource={dataTable}>
                    <Column title='#' dataIndex='index'  align='center'/>
                    <Column title='Tên Lớp' sorter={(a, b) => a.name > b.name ? -1 : 1}  align='center' 
                    render={(data)=>
                        <Tooltip title={data.des}>
                            <div>
                                {data.name}
                            </div>
                        </Tooltip>
                    }/>
                    <Column title='Niên khóa'  align='center' render={(data)=>
                        <div>{data.beginYear} - {data.endYear}</div>
                    } />
                    <Column title='Thông tin' align='center' render={(data)=>
                        <Tooltip title='Chỉnh sửa thông tin CTĐT'>
                            <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={() => {setData(data); setShow(true);}} />
                        </Tooltip>
                    } />
                    <Column title='Xóa' align='center' render={(data) =>
                        <Tooltip title='Xóa CTĐT'>
                            <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} onClick={()=>
                            Modal.confirm({
                                onOk: ()=>hiddenCTDT(data),
                                title:'Chuyển CTĐT vào thùng rác',
                                content: <>Bạn thực sự muốn chuyển CTĐT <b>{data.name}</b> vào thùng rác. Sau khi chuyển vào thùng rác bạn có thể khôi phục bất cứ lúc nào!</>
                            })} />
                        </Tooltip>
                    }/>
                    <Column title='CTĐT' align='center' render={(data) =>
                        <Tooltip title='Chỉnh sửa CTĐT'>
                            <Link to={`/program/${data.name}/${data.id}`}>
                                <Button type='primary' shape='circle' icon={<ReconciliationOutlined />}></Button>
                            </Link>
                        </Tooltip>
                    }/>
                    <Column title='PCGD' align='center' render={(data) =>
                        <Tooltip title='Phân công giảng dạy'>
                            <Button type='primary' shape='circle' icon={<SolutionOutlined />} />
                        </Tooltip>
                    }/>
                </Table>
            </div>
            <ClassIndexCreate show={show} setShow={setShow} data={data} list={dataTable}/>
            <ClassIndexRestore show={showRestore} setShow={setShowRestore}/>
        </div>
    )
}
