import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Table } from 'antd'
import { DeleteOutlined, FileSyncOutlined, SyncOutlined } from '@ant-design/icons'
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
    const Restore = (id_del) => axios.delete(host('course/' + id_del))
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
    const Delete = (id_del) => axios.delete(host('course/'+id_del,{delete: true}))
    .then((result) => {
        if (result.data.type === 'success'){
            message.success('Xóa khóa học thành công');
            setCoursesList(coursesList.filter(data => data.id !== id_del))
            axios.get(host('course', { ClassIndexId: id }))
                .then((result) => {
                    setList(format(result.data))
                });
        }
    }).catch((err) => {
        message.error('Server Error')
    });
    const Check_del = (id_del) => Modal.confirm({
        title: 'Bạn thật sự muốn xóa khóa học',
        content: 'Khi xóa khóa học sẽ không thể khôi phục nữa',
        onOk: ()=>Delete(id_del)
    })
    const Check_restore = (id_del) => Modal.confirm({
        title: 'Khôi phục khóa học',
        content: 'Khi khôi phục khóa học lại như trước',
        onOk: ()=>Restore(id_del)
    })
    return (
        <Modal title={<div className='text-primary text-uppercase'><FileSyncOutlined /> Khôi phục các khóa học đã xóa</div>} footer={false} visible={show} onCancel={() => setShow(false)}>
            <Table loading={coursesList===undefined} dataSource={coursesList}>
                <Column title='Mã' dataIndex='code'/>
                <Column title='Tên' dataIndex='name' ellipsis/>
                <Column title='Thời Gian Xóa' dataIndex='updated_at' align='center' render={e=>moment(e).format('DD/MM/YYYY \n HH:mm:ss')}/>
                <Column title='Khôi phục' align='center' render={e => <Button shape='circle' onClick={() => Check_restore(e.id)} icon={<SyncOutlined/>}></Button>}/>
                <Column title='Xóa' align='center' render={e => <Button danger type='primary' shape='circle' onClick={() => Check_del(e.id)} icon={<DeleteOutlined />}></Button>} />
            </Table>
        </Modal>
    )
}
