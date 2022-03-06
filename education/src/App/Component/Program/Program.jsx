import { Button, message, Table, Tabs, Tooltip } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { host } from '../../App'
import { useParams } from "react-router-dom";
import { PlusOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import ProgramSetting from './ProgramSetting';
import Column from 'antd/lib/table/Column';
import CoursesCreate from './Courses/CoursesCreate';

export default function Program() {
    const { id } = useParams();
    const [dataClassIndex, setDataClassIndex] = useState({})
    const [sem, setSem] = useState([]);
    const [showSetting, setShowSetting] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
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
                            title: (j === 3 ? `HK hè năm ${i + 1}` : `Học Kỳ ${j}, năm ${i + 1}`)
                        });
                    }
                }
                setSem(data);
                setDataClassIndex(result.data);
            }).catch((err) => {
                message.error("Server error");
            });
    }, [id, showSetting])

    return (
        <div className='container h-100 d-flex flex-column'>
            <h4 className='text-uppercase text-primary'>Thiết Kế CTĐT: {dataClassIndex?.name}</h4>
            <div className='my-2'>
                <Button type='primary' shape='round' icon={<SettingOutlined />} onClick={()=>setShowSetting(true)}>Cài đặt</Button>
            </div>
            <div className='row flex-fill bg-light shadow rounded'>
                <div className='col-12 col-sm-8'>
                    <Tabs className='mt-2 mt-sm-4' tabPosition='left' defaultActiveKey='1' onChange={(e)=>setTab(JSON.parse(e))}>
                        {sem.map((e) =>
                            <Tabs.TabPane {...e}>
                                <h5 className='text-primary text-uppercase'><ReadOutlined className='mr-2' />{e.title}</h5>
                                <div>
                                    <Button type='primary' shape='round' icon={<PlusOutlined />}>Thêm</Button>
                                </div>
                                <Table>
                                    <Column title='#' align='center'/>
                                    <Column title={<Tooltip title='Mã môn học'><span>Mã</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Tên môn học'><span>Tên môn học</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Số Tín Chỉ'><span>T.Chỉ</span></Tooltip>} align='center'/>
                                    <Column title={<Tooltip title='Thay đổi thông tin'><span>T.Tin</span></Tooltip>}/>
                                    <Column title={<Tooltip title='Loại bỏ môn học khỏi học kì'><span>Bỏ</span></Tooltip>}/>
                                </Table>
                                <div className='text-right p-2'>
                                    Tổng số môn học: <b>0</b><br />
                                    Tổng số tín chỉ: <b>0</b>
                                </div>
                            </Tabs.TabPane>)}
                    </Tabs>
                </div>
                <div className='col-12 col-sm-4 bg-light shadow rounded pt-2 pt-sm-4'>
                    <h5 className='text-center'>Các Môn học</h5>
                    <div className='text-right'><Button type='primary' shape='round' icon={<PlusOutlined/>} onClick={()=>setShowCourse(true)}>Thêm môn học</Button></div>
                    <Table  scroll={{ y: 200 }} pagination={{ position: ['none', 'none'] }}>
                        <Column width={1} title='#' dataIndex='index' align='center'/>
                        <Column width={2} title='Mã' dataIndex='code' align='center'/>
                        <Column width={3} title='Tên môn' ellipsis dataIndex='name' align='center'/>
                        <Column width={2} title='Chuyển'/>
                    </Table>
                    <div className='p-2'>
                        Tổng số môn học: <b>0</b><br/>
                    </div>
                </div>
            </div>
            <CoursesCreate show={showCourse} setShow={setShowCourse} classIndex={dataClassIndex}/>
            <ProgramSetting show={showSetting} setShow={setShowSetting} data={dataClassIndex} tab={tab}/>
        </div>
    )
}
