import { Button, message, Spin, Table, Tabs, Tooltip, Modal, Badge, Col } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format, host } from '../../App'
import { useParams } from "react-router-dom";
import {
    ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined,
    ReadOutlined, SettingOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined, FileSyncOutlined, OrderedListOutlined, UnorderedListOutlined
}
    from '@ant-design/icons';
import ProgramSetting from './ProgramSetting';
import Column from 'antd/lib/table/Column';
import CoursesCreate from './Courses/CoursesCreate';
import CoursesTypeCreate from './CoursesType/CoursesTypeCreate';
import CoursesDelete from './Courses/CoursesDelete';

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
    const [showDel, setShowDel] = useState(false);
    const [dataCoursesSem, setDataCoursesSem] = useState([]);
    const [dataGroup, setDataGroup] = useState([]);
    const getCoursesSem = (tabData) => {
        axios.get(host('course/1', { ClassIndexId: id, sem: tabData ?? tab.key }))
            .then((result) => {
                setDataCoursesSem(format(result.data));
            }).catch((err) => {
                message.error('Server Error');
            });
    }
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
                return axios.get(host('course/1', { ClassIndexId: id, sem: data[0].key }))
                    .then((result) => {
                        setDataCoursesSem(format(result.data));
                    })

            }).catch((err) => {
                message.error("Server error");
            });
        if (showCourse === false) {
            axios.get(host('course', { ClassIndexId: id }))
                .then((result) => {
                    setCoursesList(format(result.data))
                    
                });
        }

        axios.get(host('courses_type', { 'classIndexId': id }))
            .then((result) => {
                setListCourses(format(result.data))
            });

    }, [id, showSetting, showCourse])

    const ChangeSem = (data, i, check) => {
        setIdData(i);
        axios.put(host(`course/${data.id}`), { 'sem': check ? tab.key : null })
            .then((result) => {
                if (result.data.type === 'error')
                    message.error('Không thể chuyển khóa học')
                else {
                    getCoursesSem(tab.key)
                    return axios.get(host('course', { ClassIndexId: id }))
                        .then((result) => {
                            setCoursesList(format(result.data))
                        });
                }
            }).catch((err) => {
                message.error("Server error");
            }).finally(setIdData)
    }

    const Delete = ({ id }) => axios.delete(host('course/' + id))
        .then(e => {
            if (e.data.type === 'success') {
                message.success('Chuyển vào thùng rác thành công');
                setCoursesList(coursesList?.filter(e => e.id !== id));
                getCoursesSem(tab.key)
            }
        }).catch(() => message.error('Server Error'))


    const setTabChange = (ta) => {
        getCoursesSem(ta.key);
        setTab(ta);
    }
    return (
        <div className='h-100 d-flex flex-column'>
            <h4 className='text-uppercase text-primary'>Thiết Kế CTĐT: {dataClassIndex?.name}</h4>
            <div className='my-2'>
                <Button type='primary' shape='round' icon={<SettingOutlined />} onClick={() => setShowSetting(true)}>Cài đặt</Button>

            </div>
            <div className='row flex-fill bg-light shadow rounded'>
                <div className='col-12 col-sm-7'>

                    {sem === undefined ? <div className='text-center p-5'>
                        <Spin size='large' />
                    </div> : <Tabs className='mt-2 mt-sm-4' tabPosition='left' defaultActiveKey='1' onChange={(e) => { setTabChange(sem?.find(i => i.key === parseInt(e))) }}>
                        {sem.map((e) =>
                            <Tabs.TabPane {...e}>
                                <h5 className='text-primary text-uppercase my-2'><ReadOutlined className='mr-2' />{e.title}</h5>
                                {dataGroup?.length === 0 ? <></> :
                                    <Tooltip title={'Thêm nhóm môn học'}>
                                        <Button className='my-2' type='dashed' shape='round' icon={<UnorderedListOutlined />}>Môn Tự Chọn</Button>
                                    </Tooltip>}
                                <Table dataSource={dataCoursesSem} bordered
                                    scroll={{ y: 300 }}
                                    pagination={{ position: ['none', 'none'] }}
                                    rowSelection={{
                                        type: 'checkbox',
                                        onChange: (_, value) => {
                                            setDataGroup(value);
                                            console.log(value);
                                        }
                                    }}>
                                    <Column sorter={(a, b) => a?.code > b?.code ? 1 : -1}
                                        title={
                                            <Tooltip title='Mã môn học'>
                                                <span>Mã</span>
                                            </Tooltip>} align='center' render={e =>
                                                <div>{e.code}</div>
                                            } />

                                    <Column title='Khối' align='center' render={e=>{
                                        let obj = listCourses?.find(i => i.id === e.coursesType);
                                        return <div className='p-1 ' style={{border:'1px solid '+ obj.color, borderRadius: '.25rem'}}>
                                            {obj.name}
                                        </div>
                                    }}>
                                    </Column>
                                    <Column align='center' sorter={(a, b) => a?.name > b?.name ? 1 : -1}
                                        title={<Tooltip title='Tên môn học'><span>Tên môn học</span></Tooltip>} render={e => {
                                            return <>
                                                <Tooltip title={e.des ?? e.name}>
                                                    <div>{e.name}</div>
                                                </Tooltip>
                                                {/* <small> TC: {e.credits} - LT: {e.theory} - TH: {e.practice} <br />
                                            </small> */}
                                            </>
                                        }
                                        } />
                                    <Column title={<Tooltip title='Số Tín chỉ'><span>TC</span></Tooltip>}
                                        sorter={(a, b) => a.credits - b.credits }
                                        align='center' render={e=>
                                            e.store?
                                            <Tooltip title='Môn học không được tích lũy'>
                                                <div className="text-danger">{e.credits}*</div>
                                            </Tooltip> : <div>{e.credits}</div>
                                        } />
                                    <Column title={<Tooltip title='Loại Học Phần'>Loại HP</Tooltip>} >
                                        <Column sorter={(a,b)=> {
                                            a = a.groupCourseId === null ? a.credits : 0;
                                            b = b.groupCourseId === null ? b.credits : 0;
                                            return a - b;
                                        } } render={e =>
                                           e.groupCourseId===null? e.credits: ''
                                        }
                                        title={<Tooltip title='Học phần bắt buộc'>BB</Tooltip>}></Column>
                                        <Column sorter={(a, b) => 1}
                                        title={<Tooltip title='Học phần tự chọn'>TC</Tooltip>}></Column>
                                    </Column>
                                    <Column title={<Tooltip title='Số Tiết Lý THuyết'><span>LT</span></Tooltip>}
                                        sorter={(a, b) => a.theory - b.theory}
                                        align='center' dataIndex='theory' />
                                    <Column title={<Tooltip title='Số Tiết Thực Hành'><span>TH</span></Tooltip>}
                                        sorter={(a, b) => a.practice - b.practice}
                                        align='center' dataIndex='practice' />
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
                    <div className='d-flex'>
                        <Button type='primary' shape='round' icon={<PlusOutlined />}
                            onClick={() => setShowCourse(true)}>Thêm môn học</Button>
                        <Button className='mx-2' type='dashed' shape='round' icon={<FileSyncOutlined />}
                            onClick={() => setShowDel(true)}>Khôi phục</Button>
                    </div>
                    <div>
                        <Table scroll={{ y: 300 }} pagination={{ position: ['none', 'none'] }}
                            dataSource={coursesList} loading={coursesList === undefined}>
                            <Column width={2} title='Chuyển' align='center' render={(...e) =>
                                <Tooltip title={e[0].sem === null ?
                                    <>Thêm khóa học vào <b>{tab.tab}</b></> :
                                    <>Bỏ khóa học khỏi <b>{sem?.find(k => k.key === e[0].sem)?.tab}</b></>}>
                                    <Button shape='round' loading={e[2] === idData} onClick={() => ChangeSem(e[0], e[2], (e[0].sem == null))}
                                        type={e[0].sem != null ? 'dashed' : 'primary'} icon={e[0].sem != null ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}></Button>
                                </Tooltip>
                            } />
                            <Column width={2} title='Mã' sorter={(a, b) => a.code > b.code ? 1 : -1} align='center' ellipsis render={(e) =>
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
                            <Column sorter={(a, b) => a.coursesType - b.coursesType}
                                width={1.5} align='center' title='Khối' render={e => {
                                    let obj = listCourses?.find(i => i.id === e.coursesType);
                                    return (<div>
                                        <Tooltip title={<span>{obj?.name} <Button onClick={() => setShowCourseType(true)}
                                            type='primary' shape='circle' icon={<AppstoreOutlined />} title='Quản Lý Khối kiến thức' /></span>}>
                                            <div style={{ margin: '0 auto', borderRadius: '.5rem', width: '1.5rem', height: '1.5rem', background: obj?.color ?? '#000' }}></div>
                                        </Tooltip>
                                    </div>)
                                }} />
                            <Column width={3} title='Tên môn' ellipsis align='left' render={(e) =>
                                <Tooltip title={e.des ?? e.name} placement='topLeft'>
                                    <b>{e.name}</b><br />
                                    <small> TC: {e.credits} - LT: {e.theory} - TH: {e.practice} <br />
                                    </small>
                                </Tooltip>
                            } />
                        </Table>
                    </div>
                    <div className='p-2'>
                        <div className='p-2 my-2 shadow rounded' style={{ height: 100, overflow: 'auto' }}>
                            {listCourses?.map(e =>
                                <div className='d-flex my-1' key={e.id}>
                                    <div style={{ marginRight: '.5rem', borderRadius: '.5rem', width: '1.5rem', height: '1.5rem', background: e?.color ?? '#000' }}></div>
                                    <div>{e?.name}</div>
                                </div>
                            )}
                        </div>
                        <Button icon={<AppstoreOutlined />} type='primary' onClick={() => setShowCourseType(true)} shape='round'>Quản lý khối học tập</Button>
                    </div>
                    <div className="p-2">
                        Tổng số môn học: 0 <br />
                    </div>
                </div>
            </div>
            <CoursesCreate show={showCourse} setShow={setShowCourse}
                classIndex={dataClassIndex}
                showType={showCourseType}
                setShowType={setShowCourseType} />
            <CoursesDelete setList={setCoursesList} show={showDel} setShow={setShowDel} id={dataClassIndex.id} />
            <CoursesTypeCreate show={showCourseType} setShow={setShowCourseType} classIndex={dataClassIndex} />
            <ProgramSetting show={showSetting} setShow={setShowSetting} data={dataClassIndex} tab={tab} />

        </div>
    )
}
