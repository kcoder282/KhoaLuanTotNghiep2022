import { DeleteOutlined, EditFilled, EyeOutlined, PlusOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons/lib/icons';
import { Button, message, Table, Tooltip } from 'antd';
import Column from 'antd/lib/table/Column';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format, host } from '../Static/Static';
import ClassIndexCreate from './ClassIndexCreate';

export default function ClassIndexManager() {
    const [dataTable, setDataTable] = useState(null);
    const [load, setLoad] = useState(true);
    const [formAdd, setFormAdd] = useState(false)
    useEffect(() => {
        LoadData();
    }, [])

    const LoadData = () => {
        axios.get(host('class_index'))
            .then((result) => {
                setDataTable(format(result.data));
                setLoad(false);
            }).catch((err) => {
                message.error(err);
            });
    }
    return (
        <div className='p-lg-3'>
            <div className=''>
                <Tooltip title={<>Tạo mới chương trình đào tạo</>}>
                    <Button onClick={() => setFormAdd(true)} type="primary" shape='round' icon={<PlusOutlined />}>Create P.Education</Button>
                </Tooltip>
                <Tooltip title={<>Khôi phục chương trình đào tạo</>}>
                    <Button className='m-2' type="dashed" shape='round' icon={<DeleteOutlined />}>Restore P.Education</Button>
                </Tooltip>
            </div>
            <div className='mt-3 overflow-auto'>
                <Table loading={load} size='middle' dataSource={dataTable} pagination={{ position: ['none', 'bottomRight'], className: 'm-2' }}>
                    <Column width={1} align='center' title='#' dataIndex='index' />
                    <Column width={2} title='Name' dataIndex="name" render={(e) =>
                        <Tooltip title={<>Chương trình đào tạo cho <b>{e}</b></>}>
                            <span className="text-primary">{e}</span>
                        </Tooltip>
                    } />
                    <Column width={2} align='center' title='Year' render={(data) =>
                        <Tooltip title={<>Bắt đầu từ <b>{data.beginYear}</b> đến <b>{data.endYear}</b></>}>
                            <span>{data.beginYear} - {data.endYear}</span>
                        </Tooltip>
                    } />
                    <Column width={5} ellipsis title='Description' render={(data) => (
                        <Tooltip title={data.description ?? <>Chương trình đào tạo cho <b>{data.name}</b></>} className='flex-fill'>
                            <i style={{ minWidth: '200px' }}>{data.description ?? <>Chương trình đào tạo cho <b>{data.name}</b></>}</i>
                        </Tooltip>
                    )} />
                    <Column width={1} ellipsis align='center' title='Edit' render={(data) =>
                        <Tooltip title={<>Chỉnh CTĐT <b>{data.name}</b> </>}>
                            <Button type='primary' shape='circle' icon={<EditFilled />} />
                        </Tooltip>
                    } />
                    <Column width={1} ellipsis align='center' title='Delete' render={(data) =>
                        <Tooltip title={<>Xóa CTĐT <b>{data.name}</b> </>}>
                            <Button type='primary' danger shape='circle' icon={<DeleteOutlined />} />
                        </Tooltip>
                    } />
                    <Column width={5} fixed='right' align='center' title="Tools" render={(data) =>
                        <>
                            <Button className='m-1' type='primary' shape='round' icon={<ProfileOutlined />}>Phân Công</Button>
                            <Button type='primary' shape='round' icon={<SettingOutlined />}>Edit</Button>
                            <Button className='m-1' type='primary' shape='round' icon={<EyeOutlined />}>View</Button>
                        </>
                    } />
                </Table>
            </div>
            <ClassIndexCreate visible={[formAdd, setFormAdd]}/>
        </div >
    )
}
