import { DeleteOutlined, EditFilled, PlusOutlined, ProfileOutlined, SettingOutlined, ClockCircleOutlined } from '@ant-design/icons/lib/icons';
import { Button, message, Table, Tooltip, Modal } from 'antd';
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ClassIndexCreate from './ClassIndexCreate';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ClassIndexRestore from './ClassIndexRestore';
import { format, host } from '../../Static/Static';

export default function ClassIndexManager() {
    const [dataTable, setDataTable] = useState(null);
    const [load, setLoad] = useState(true);
    const [formAdd, setFormAdd] = useState(false);
    const [formRestore, setFormRestore] = useState(false);
    const [dataEdit, setDataEdit] = useState();

    useEffect(() => {
        if (formAdd === false && formRestore === false)
            LoadData();
    }, [formAdd, formRestore])

    const deleteClassIndex = ({id,name}) => {
        Modal.confirm({
            title: <>Move <b>{name}</b> to the trash?</>,
            icon: <ExclamationCircleOutlined className='text-danger'/>,
            content: 'Move it to trash you can restore or delete it permanently',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return axios.put(host('class_index/'+id),{ status: true})
                .then((result) => {
                    var type = result.data.status;
                    message[type](result.data.message)
                }).catch((err) => {
                    message.error("Error: Server error.");
                }).finally(()=>LoadData());
            },
        })
    }
    function LoadData() {
        axios.get(host('class_index'))
        .then((result) => {
            setDataTable(format(result.data));
        }).catch((err) => {
            message.error("Error: Server error");
        }).finally(() => setLoad(false))
    }
    return (
        <div className='p-lg-3'>
            <div className=''>
                <Tooltip title={<>Tạo mới chương trình đào tạo</>}>
                    <Button onClick={() => {
                        setDataEdit();
                        setFormAdd(true)
                    }} type="primary" shape='round' icon={<PlusOutlined />}>Create P.Education</Button>
                </Tooltip>
                <Tooltip title={<>Khôi phục chương trình đào tạo</>}>
                    <Button className='m-2' type="dashed" shape='round' icon={<DeleteOutlined />}
                        onClick={()=>setFormRestore(true)}
                        >Restore P.Education</Button>
                </Tooltip>
            </div>
            <div className='mt-3 overflow-auto'>
                <Table loading={load} size='middle' dataSource={dataTable} pagination={{ position: ['none', dataTable?.length > 10 ? 'bottomRight' : 'none'], className: 'm-2' }}>
                    <Column width={1} align='center' title='#' dataIndex='index' />
                    <Column width={2.5} title='Name class' sorter={{ compare: (a, b) => a > b ? 1 : -1 }} render={(e, _, index) =>
                        <Tooltip title={<>Chương trình đào tạo cho <b>{e.name}</b></>}>
                            <span>{e.name}</span>
                        </Tooltip>
                    } />
                    <Column width={2} align='center' title='Year' render={(data) =>
                        <Tooltip title={<>Bắt đầu từ <b>{data.beginYear}</b> đến <b>{data.endYear}</b></>}>
                            <span>{data.beginYear} - {data.endYear}</span>
                        </Tooltip>
                    } />
                    <Column width={4} title='Description' ellipsis render={(data) => (
                        <Tooltip placement="topLeft" title={data.description ?? <>Chương trình đào tạo cho <b>{data.name}</b></>}>
                            <div style={{ minWidth: '200px' }}>{data.description ?? '...'}</div>
                        </Tooltip>
                    )} />
                    <Column align='center' width={3} ellipsis title='Date' render={(data) => {
                        var dataTime = moment(data.updated_at).format('DD/MM/YYYY - H:mm:ss');
                        return <Tooltip title={<>Thời gian chỉnh sửa thông tin {dataTime}</>}>
                            <span><ClockCircleOutlined className='mr-1' />{dataTime}</span>
                        </Tooltip>
                    }} />
                    <Column width={1} ellipsis align='center' title='Edit' render={(data) =>
                        <Tooltip title={<>Chỉnh CTĐT <b>{data.name}</b> </>}>
                            <Button type='primary' shape='circle' icon={<EditFilled />} onClick={() => {
                                setDataEdit(data);
                                setFormAdd(true)
                            }} />
                        </Tooltip>
                    } />
                    <Column width={1} ellipsis align='center' title='Delete' render={(data) =>
                        <Tooltip title={<>Xóa CTĐT <b>{data.name}</b> </>}>
                            <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} onClick={()=>deleteClassIndex(data)} />
                        </Tooltip>
                    } />
                    <Column width={5} fixed='right' align='center' title="Tools" render={(data) =>
                        <>
                            <Button className='m-1' type='primary' shape='round' icon={<ProfileOutlined />}>Phân Công</Button>
                            <Button type='primary' shape='round' icon={<SettingOutlined />}>CTĐT</Button>
                        </>
                    } />
                </Table>
            </div>
            <ClassIndexCreate visible={[formAdd, setFormAdd]} value={dataEdit} />
            <ClassIndexRestore visible={[formRestore, setFormRestore]}/>
        </div >
    )
}
