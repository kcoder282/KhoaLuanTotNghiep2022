import { QuestionCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons'
import {Button, message, Modal, Table, Tooltip} from 'antd'
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { format, host } from '../../Static/Static';

export default function ClassIndexRestore({visible}) {
    const [show, setShow] = visible;
    const [dataTable, setDataTable] = useState();
    useEffect(() => {
        if(show === true)
            LoadData();
        return () =>{
            setDataTable();
        }
    }, [show])
    const LoadData = () =>{
        axios.get(host('class_index',{status: 1}))
        .then((result) => {
            setDataTable(format(result.data));
        }).catch((err) => {
            message.error('Error: server error ');
        });
    }
    const deleteItem = ({name, id}) => {
        Modal.confirm({
            title: <>Do you want to delete <b>{name}</b>?</>,
            icon: <ExclamationCircleOutlined className='text-danger' />,
            content: 'After deleting can not recover data need to consider before deleting',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                return axios.delete(host('class_index/' + id))
                    .then((result) => {
                        var type = result.data.status;
                        message[type](result.data.message)
                    }).catch((err) => {
                        message.error("Error: Server error.");
                    }).finally(() => LoadData());
            },
        })
    }

    const restoreItem = ({ name, id }) => {
        Modal.confirm({
            title: <>Do you want to restore <b>{name}</b>?</>,
            icon: <QuestionCircleOutlined className='text-primary'/>,
            content: 'Restore data as original',
            okText: 'Restore',
            cancelText: 'Cancel',
            onOk() {
                return axios.put(host('class_index/' + id),{status: 0})
                    .then((result) => {
                        var type = result.data.status;
                        message[type](result.data.message)
                    }).catch((err) => {
                        message.error("Error: Server error.");
                    }).finally(() => LoadData());
            },
        })
    }
    return (
    <Modal visible={show}
        footer={null}
        onCancel={()=>setShow(false)}
        closeIcon={<CloseCircleOutlined/>}
        title={<div className='text-primary'><DeleteOutlined className='mr-2'/> Restore from trash </div>}>
            <Table size='small' bordered loading={dataTable===undefined} dataSource={dataTable}>
                <Column title='#' dataIndex='index' align='center'/>
                <Column title='Name class' render={(data)=>
                    <Tooltip title={<>
                        <b>{data.name}</b> ({data.beginYear} - {data.endYear}) <br />
                        <small>{data.description}</small>
                    </>}>
                        <span>{data.name}</span>
                    </Tooltip>
                }/>
                <Column align='center' title='Date' render={(data) => {
                    var dataTime = moment(data.updated_at).format('DD/MM/YYYY - H:mm:ss');
                    return <Tooltip title={<>Thời gian Xóa CTĐT {dataTime}</>}>
                        <span><ClockCircleOutlined className='mr-1' />{dataTime}</span>
                    </Tooltip>
                }} />
                <Column title='Restore' align='center' render={(data)=>
                    <Tooltip title={<>Restore <b>"{data.name}"</b></>}>
                        <Button type='primary' shape='circle' icon={<RollbackOutlined />} onClick={() => restoreItem(data)} />
                    </Tooltip>
                }/>
                <Column title='Restore' align='center' render={(data) =>
                    <Tooltip title={<>Restore <b>"{data.name}"</b></>}>
                        <Button danger type='primary' shape='circle' icon={<DeleteOutlined />} onClick={()=>deleteItem(data)} />
                    </Tooltip>
                } />
            </Table>
    </Modal>)
}
