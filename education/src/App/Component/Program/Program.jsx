import { Button, message, Spin, Table, Tabs, Tooltip, Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format, host } from '../../App'
import { useParams } from "react-router-dom";
import {
    ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined,
    ReadOutlined, SettingOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined
}
    from '@ant-design/icons';
import ProgramSetting from './ProgramSetting';
import Column from 'antd/lib/table/Column';
import CoursesCreate from './Courses/CoursesCreate';
import CoursesTypeCreate from './CoursesType/CoursesTypeCreate';

export default function Program() {
    const { id } = useParams();
    const [dataClassIndex, setDataClassIndex] = useState({})
    const [sem, setSem] = useState();
    const [listCourses, setListCourses] = useState();
    const [showSetting, setShowSetting] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showCourseType, setShowCourseType] = useState(false);
    const [tab, setTab] = useState({});
    const [coursesList, setCoursesList] = useState();
    const [idData, setIdData] = useState();

    useEffect(() => {
        axios.get(host('class_index/' + id))
            .then((result) => {
                const data = [];
                for (let i = 0; i < result.data.sem; i++) {
                    for (let j = 1; j <= (result.data.semThree === 1 ? 3 : 2); j++) {
                        data.push({
                            key: i * 3 + j,
                            tab: (j === 3 ? `HK hè năm ${i + 1}` : `Học Kỳ ${i * 2 + j}`),
                            title: (j === 3 ? `Năm ${i + 1}, học kỳ hè` : `Năm ${i + 1}, học Kỳ ${j}`)
                        });
                    }
                }
                setSem(data);
                setDataClassIndex(result.data);
                setTab(data[0]);

            }).catch((err) => {
                message.error("Server error");
            });

        axios.get(host('course', { ClassIndexId: id }))
            .then((result) => {
                setCoursesList(format(result.data))
            });

        axios.get(host('courses_type', { 'classIndexId': id }))
            .then((result) => {
                setListCourses(format(result.data))
            });
    }, [id, showSetting])
    const ChangeSem = (data, index, check) => {
        setIdData(index);
        axios.put(host(`course/${data.id}`), { 'sem': check ? tab.key : null })
            .then((result) => {
                if (result.data.type === 'error')
                    message.error('Không thể chuyển khóa học')
                else {
                    coursesList[index].sem = check ? tab.key : null;
                    setCoursesList([...coursesList]);
                }
            }).catch((err) => {
                message.error("Server error");
            }).finally(setIdData)
    }

    const Delete = ({ id }) => axios.delete(host('course/' + id))
        .then(e => {
            if (e.data.type === 'success')
                loadDataCouses();
        }).catch(() => message.error('Server Error'))

    const loadDataCouses = () => {
        axios.get(host('course', { ClassIndexId: id }))
            .then((result) => {
                setCoursesList(format(result.data))
            });
    }
    return (
        <div className='container h-100 d-flex flex-column'>
            <h4 className='text-uppercase text-primary'>Thiết Kế CTĐT: {dataClassIndex?.name}</h4>
            <div className='my-2'>
                <Button type='primary' shape='round' icon={<SettingOutlined />} onClick={() => setShowSetting(true)}>Cài đặt</Button>
            </div>
            <div className='row flex-fill bg-light shadow rounded'>
                <div className='col-12 col-sm-7'>
                    {sem === undefined ? <div className='text-center p-5'>
                        <Spin size='large' />
                    </div> : <Tabs className='mt-2 mt-sm-4' tabPosition='left' defaultActiveKey='1' onChange={(e) => { setTab(sem.find(i => i.key === parseInt(e))) }}>
                        {sem.map((e) =>
                            <Tabs.TabPane {...e}>
                                <h5 className='text-primary text-uppercase'><ReadOutlined className='mr-2' />{e.title}</h5>
                                <div>
                                    <Button type='primary' shape='round' icon={<PlusOutlined />}>Thêm</Button>
                                </div>
                                <Table>
                                    <Column title='#' align='center' />
                                    <Column title={<Tooltip title='Mã môn học'><span>Mã</span></Tooltip>} align='center' />
                                    <Column title={<Tooltip title='Tên môn học'><span>Tên môn học</span></Tooltip>} align='center' />
                                    <Column title={<Tooltip title='Số Tín Chỉ'><span>T.Chỉ</span></Tooltip>} align='center' />
                                    <Column title={<Tooltip title='Thay đổi thông tin'><span>T.Tin</span></Tooltip>} />
                                    <Column title={<Tooltip title='Loại bỏ môn học khỏi học kì'><span>Bỏ</span></Tooltip>} />
                                </Table>
                                <div className='text-right p-2'>
                                    Tổng số môn học: <b>0</b><br />
                                    Tổng số tín chỉ: <b>0</b>
                                </div>
                            </Tabs.TabPane>)}
                    </Tabs>}
                </div>
                <div className='d-flex flex-column col-12 col-sm-5 bg-light shadow rounded py-2 py-sm-4'>
                    <h5 className='text-center'>Các môn học</h5>
                    <div>
                        <Button type='primary' shape='round' icon={<PlusOutlined />} onClick={() => setShowCourse(true)}>Thêm môn học</Button>
                    </div>
                    <div>
                        <Table scroll={{ y: 300 }} pagination={{ position: ['none', 'none'] }}
                            dataSource={coursesList} loading={coursesList === undefined}>
                            <Column width={2} title='Chuyển' align='center' render={(...e) =>
                                <Tooltip title={e[0].sem === null ?
                                    <>Thêm khóa học vào <b>{tab.tab}</b></> :
                                    <>Bỏ khóa học khỏi <b>{sem.find(k => k.key === e[0].sem)?.tab}</b></>}>
                                    <Button shape='round' loading={e[2] === idData} onClick={() => ChangeSem(e[0], e[2], (e[0].sem == null))}
                                        type={e[0].sem != null ? 'dashed' : 'primary'} icon={e[0].sem != null ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}></Button>
                                </Tooltip>
                            } />
                            <Column width={2} title='Mã' align='center' ellipsis render={(e) =>
                                <Tooltip title={<>
                                    <Button title='Thay đổi Thông tin' className='mr-2' shape='circle' type='primary' icon={<EditOutlined />} />
                                    <Button title='Xóa Môn Học' shape='circle' type='primary' onClick={() => Modal.error({
                                            title: 'Xóa Môn Học',
                                            onOk: () => Delete(e),
                                            content: 'Bạn thật sự muốn xóa khóa học khỏi danh sách môn học - bạn có thể thêm nó vào bất cứ khi nào!',
                                        })} danger icon={<DeleteOutlined />} /></>}>
                                    <div>{e.code}</div>
                                </Tooltip>
                            } />
                            <Column width={1.5} align='center' title='Khối' sorter='' render={e => {
                                let obj = listCourses?.find(i => i.id === e.coursesType);
                                return (<div>
                                    <Tooltip title={<span>{obj?.name} <Button onClick={() => setShowCourseType(true)} type='primary' shape='circle' icon={<AppstoreOutlined />} title='Quản Lý Khối kiến thức' /></span>}>
                                        <div style={{margin: '0 auto',borderRadius: '.5rem', width: '1.5rem', height: '1.5rem', background: obj?.color ?? '#000' }}></div>
                                    </Tooltip>
                                </div>)
                            }} />
                            <Column width={3} title='Tên môn' ellipsis align='left' render={(e) =>
                                <span title={e.name}>
                                    <b>{e.name}</b><br />
                                    <small> TC: {e.credits} - LT: {e.theory} - TH: {e.practice} <br />
                                    </small>
                                </span>
                            } />
                        </Table>
                    </div>
                    <div className='p-2'>
                        <div className='p-2 my-2 shadow rounded' style={{height: 200, overflow: 'auto'}}>
                            {listCourses?.map(e=>
                                <div className='d-flex'>
                                    <div style={{marginRight: '.5rem', borderRadius: '.5rem', width: '1.5rem', height: '1.5rem', background: e?.color ?? '#000' }}></div>
                                    <div>{e?.name}</div>
                                </div>    
                            )}
                        </div>
                        <Button icon={<AppstoreOutlined/>} type='primary' shape='round'>Quản lý khối học tập</Button>
                    </div>
                    <div className="p-2">
                        Tổng số môn học: 0<br />
                    </div>
                </div>
            </div>
            <CoursesCreate show={showCourse} setShow={setShowCourse}
                classIndex={dataClassIndex}
                showType={showCourseType}
                setShowType={setShowCourseType} />
            <CoursesTypeCreate show={showCourseType} setShow={setShowCourseType} classIndex={dataClassIndex} />
            <ProgramSetting show={showSetting} setShow={setShowSetting} data={dataClassIndex} tab={tab} />
        </div>
    )
}
