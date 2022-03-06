import { Button, message, Table, Tabs, Tooltip } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { host } from '../../App'
import { useParams } from "react-router-dom";
import { PlusOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import ProgramSetting from './ProgramSetting';
import Column from 'antd/lib/table/Column';

export default function Program() {
    const { id } = useParams();
    const [dataClassIndex, setDataClassIndex] = useState({})
    const [sem, setSem] = useState([]);
    const [showSetting, setShowSetting] = useState(false);
    const [tab, setTab] = useState(1);
    useEffect(() => {
        axios.get(host('class_index/' + id))
            .then((result) => {
                const data = [];
                for (let i = 0; i < result.data.sem; i++) {
                    for (let j = 1; j <= (result.data.semThree === 1 ? 3 : 2); j++) {
                        data.push({
                            key: JSON.stringify({i: i, j: j - 1}),
                            tab: (j === 3 ? `HK hè năm ${i + 1}` : `Học Kỳ ${i * 2 + j}`),
                            title: (j === 3 ? `HK hè năm ${i + 1}` : `Học Kỳ ${j} năm ${i + 1}`)
                        });
                    }
                }
                setSem(data);
                setDataClassIndex(result.data);
            }).catch((err) => {
                message.error("Server error");
            });
    }, [id])

    return (
        <div className='container h-100 d-flex flex-column'>
            <h4 className='text-uppercase'>Thiết Kế CTĐT: {dataClassIndex?.name}</h4>
            <div className='my-2'>
                <Button type='primary' shape='round' icon={<SettingOutlined />} onClick={()=>setShowSetting(true)}>Cài đặt</Button>
            </div>

            <div className='row flex-fill'>
                <div className='col-12 col-sm-8'>
                    <Tabs tabPosition='left' defaultActiveKey='1' onChange={(e)=>setTab(JSON.parse(e))}>
                        {sem.map((e) =>
                            <Tabs.TabPane {...e}>
                                <strong><ReadOutlined className='mr-2' />{e.title}</strong>
                                <Table>
                                    <Column title='#' align='center'/>
                                    <Column title={<Tooltip title='Mã môn học'><span>Mã</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Tên môn học'><span>Tên môn học</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Số Tín Chỉ'><span>T.Chỉ</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Thay đổi thông tin'><span>T.Tin</span></Tooltip>}/>
                                    <Column title={<Tooltip title='Loại bỏ môn học khỏi học kì'><span>Bỏ</span></Tooltip>}/>
                                </Table>
                            </Tabs.TabPane>)}
                    </Tabs>
                </div>
                <div className='col-12 col-sm-4 bg-light shadow rounded pt-3'>
                    <h5 className='text-center'>Các Môn học</h5>
                    <div className='text-right'><Button type='primary' shape='round' icon={<PlusOutlined/>}>Thêm môn học</Button></div>
                    <Table scroll={{y:200}}>
                        <Column title='#' dataIndex='index'/>
                        <Column title='Mã' dataIndex='code'/>
                        <Column title='Tên' dataIndex='name'/>
                        <Column title='Chuyển'/>
                    </Table>
                </div>
            </div>
            <ProgramSetting show={showSetting} setShow={setShowSetting} data={dataClassIndex}/>
        </div>
    )
}
