import { CloseCircleOutlined, RetweetOutlined } from '@ant-design/icons'
import { Button, Modal, Table, message, Tooltip } from 'antd'
import Column from 'antd/lib/table/Column'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { host, format } from '../../App';

export default function ClassIndexRestore({ show, setShow }) {
    const [dataTable, setDataTable] = useState();
    useEffect(() => {
        if (show === true) getClassIndexDel();
    }, [show])

    const getClassIndexDel = () => {
        axios.get(host('class_index', { del: 1 }))
            .then((result) => {
                setDataTable(format(result.data));
            }).catch((err) => {
                message.error('Error: Server error');
            });
    }
    const Restore = ({ id }) => {
        return axios.put(host('class_index/' + id, { del: 0 }))
            .then((result) => {
                const type = result.data.type;
                message[type](result.data.message);
                if (type === 'success') {
                    setDataTable();
                    getClassIndexDel();
                }
            }).catch((err) => {
                message.error('Error: Server error');
            });
    }
    const Delete = ({ id }) => {
        return axios.delete(host('class_index/' + id))
            .then((result) => {
                const type = result.data.type;
                message[type](result.data.message);
                if (type === 'success') {
                    setDataTable();
                    getClassIndexDel();
                }
            }).catch((err) => {
                message.error('Error: Server error');
            });
    }
    return (
        <Modal visible={show} onCancel={() => setShow(false)} footer={false}
            title="Phục hồi các CTĐT đã bị xóa">
            <Table dataSource={dataTable} loading={dataTable === undefined}>
                <Column title='#' dataIndex='index' />
                <Column title='Tên CTĐT' align='center' render={((data) =>
                    <div>
                        {data.name} <br />({data.beginYear} - {data.endYear})
                    </div>
                )} />
                <Column title='Thời gian xóa' dataIndex='updated_at' align='center' render={(time) => moment(time).format('HH:mm:ss DD/MM/YYYY')} />
                <Column title='Phục hồi' align='center' render={(data) =>
                    <Tooltip title='Khôi phục CTĐT'>
                        <Button type='primary' onClick={() => Modal.info({
                            title: 'Xác nhận khôi phục CTĐT',
                            context: <>Bạn có thực sự muốn khôi phục CTĐT <b>{data.name}</b></>,
                            onOk: () => Restore(data)
                        })} shape='circle' icon={<RetweetOutlined />} />
                    </Tooltip>} />
                <Column title='Xóa' align='center' render={(data) =>
                    <Tooltip title='Xóa CTĐT vĩnh viễn' >
                        <Button danger type='primary' shape='circle' icon={<CloseCircleOutlined />} onClick={() => Modal.info({
                            title: 'Xác nhận khôi phục CTĐT',
                            context: <>Bạn có thực sự muốn khôi phục CTĐT <b>{data.name}</b></>,
                            onOk: () => Delete(data)
                        })} />
                    </Tooltip>} />
            </Table>
        </Modal>
    )
}
