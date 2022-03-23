import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Table } from 'antd'
import { FileSyncOutlined, SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import { format, host } from '../../../App'
import moment from 'moment'
import Column from 'antd/lib/table/Column'

export default function CoursesDelete({ show, setShow, id, setList }) {

    const [coursesList, setCoursesList] = useState();

    useEffect(() => {
        if(show===true)
        axios.get(host('course', { ClassIndexId: id, delete: true }))
            .then((result) => {
                setCoursesList(format(result.data))
            });
    }, [id, show])
    const Delete = (id_del) => axios.delete(host('course/' + id_del))
        .then(e => {
            if (e.data.type === 'success') {
                message.success('Khôi phục thành công');
                setCoursesList(coursesList.filter(data => data.id !== id_del))
                axios.get(host('course', { ClassIndexId: id }))
                .then((result) => {
                    setList(format(result.data))
                });
            }
        }).catch(() => message.error('Server Error'))

    return (
        <Modal title={<div className='text-primary text-uppercase'><FileSyncOutlined /> Khôi phục các khóa học đã xóa</div>} footer={false} visible={show} onCancel={() => setShow(false)}>
            <Table loading={coursesList===undefined} dataSource={coursesList}>
                <Column title='Mã' dataIndex='code'/>
                <Column title='Tên' dataIndex='name' ellipsis/>
                <Column title='Thời Gian Xóa' dataIndex='updated_at' align='center' render={e=>moment(e).format('DD/MM/YYYY \n HH:mm:ss')}/>
                <Column title='Khôi phục' align='center' render={e => <Button shape='circle' onClick={() => Delete(e.id)} icon={<SyncOutlined/>}></Button>}/>
            </Table>
        </Modal>
    )
}
