import { Button, message, Spin, Table, Tabs, Tooltip, Modal, Badge, Col, Switch, Space } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format, host } from '../../App'
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeftOutlined, ArrowRightOutlined, PlusOutlined,
    ReadOutlined, SettingOutlined, EditOutlined, DeleteOutlined,
    AppstoreOutlined, FileSyncOutlined, OrderedListOutlined, 
    UnorderedListOutlined, FileExcelOutlined, InfoCircleOutlined, SolutionOutlined, HomeOutlined
}
    from '@ant-design/icons';
import ProgramSetting from './ProgramSetting';
import Column from 'antd/lib/table/Column';
import CoursesCreate from './Courses/CoursesCreate';
import CoursesTypeCreate from './CoursesType/CoursesTypeCreate';
import CoursesDelete from './Courses/CoursesDelete';
import GroupCourseCreate from './GroupCourse/GroupCourseCreate';
import ExcelImport from './GroupCourse/ExcelImport';

export default function Program() {
    const { id, name } = useParams();
    const [dataClassIndex, setDataClassIndex] = useState({})
    const [sem, setSem] = useState();
    const [listCourses, setListCourses] = useState();
    const [showSetting, setShowSetting] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showCourseType, setShowCourseType] = useState(false);
    const [tab, setTab] = useState({ key: 1, tab: 'Năm 1,Học Kỳ 1'});
    const [coursesList, setCoursesList] = useState();
    const [idData, setIdData] = useState();
    const [showDel, setShowDel] = useState(false);
    const [dataCoursesSem, setDataCoursesSem] = useState([]);
    const [dataGroup, setDataGroup] = useState([]);
    const [groupCourse, setGroupCourse] = useState(false)
    const [dataDefault, setDataDefault] = useState();
    const [groupList, setGroupList] = useState([]);
    const [showExcel, setShowExcel] = useState(false);
    const [showListCourse, setShowListCourse] = useState(true);
    
    const getCoursesSem = (tabData) => {
        if (id !== undefined)
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
                            key: i * 2 + j,
                            tab: (j === 3 ? `HK hè năm ${i + 1}` : `Học Kỳ ${i * 2 + j}`),
                            title: (j === 3 ? `Năm ${i + 1}, học kỳ hè` : `Năm ${i + 1}, học Kỳ ${j}`)
                        });
                    }
                }
                setSem(data);
                setDataClassIndex(result.data);
                if (id !== undefined)
                    return axios.get(host('course/1', { ClassIndexId: id, sem: tab?.key ?? data[0].key }))
                        .then((result) => {
                            setDataCoursesSem(format(result.data));
                        })

            })
        if (showCourse === false) {
            if (id !== undefined)
                axios.get(host('course', { ClassIndexId: id }))
                    .then((result) => {
                        setCoursesList(format(result.data))
                    });
        }
        if (id !== undefined)
            axios.get(host('courses_type', { 'classIndexId': id }))
                .then((result) => {
                    setListCourses(format(result.data))
                });
        if (id !== undefined)
            axios.get(host('group_course', { 'ClassIndexId': id }))
                .then((result) => {
                    setGroupList(result.data)
                })
        
    }, [id, showSetting, showCourse, groupCourse, tab?.key, showExcel])

    const ChangeSem = (data, i, check) => {
        setIdData(i);
        if (id !== undefined)
            axios.put(host(`course/${data.id}`), { 'sem': check ? tab.key : null })
                .then((result) => {
                    if (result.data.type === 'error')
                        message.error('Không thể chuyển khóa học')
                    else {
                        getCoursesSem(tab.key)
                        axios.get(host('group_course', { 'ClassIndexId': id }))
                            .then((result) => {
                                setGroupList(result.data)
                            })
                        axios.get(host('course', { ClassIndexId: id }))
                            .then((result) => {
                                setCoursesList(format(result.data))
                            });
                    }
                }).catch((err) => {
                }).finally(setIdData)
    }
    const RemoveCoures = (data) => {
        setIdData(data.id);
        if (id !== undefined)
            axios.put(host(`course/${data.id}`), { 'sem': null })
                .then((result) => {
                    if (result.data.type === 'error')
                        message.error('Không thể loại bỏ khóa học')
                    else {
                        getCoursesSem(tab.key)
                        axios.get(host('group_course', { 'ClassIndexId': id }))
                            .then((result) => {
                                setGroupList(result.data)
                            })
                        axios.get(host('course', { ClassIndexId: id }))
                            .then((result) => {
                                setCoursesList(format(result.data))
                            });
                    }
                }).catch((err) => {
                }).finally(setIdData)
    }
    const Delete = ({ id }) => axios.delete(host('course/' + id))
        .then(e => {
            if (e.data.type === 'success') {
                message.success('Chuyển vào thùng rác thành công');
                setCoursesList(coursesList?.filter(e => e.id !== id));
                getCoursesSem(tab.key)
            }
        }).catch(() => { })
    const setTabChange = (ta) => {
        getCoursesSem(ta.key);
        setTab(ta);
    }

    return (
        <div className='h-100 d-flex flex-column'>
            <h4 className='text-uppercase text-primary'>Thiết Kế CTĐT: {name}</h4>
            <Space size='small' className='my-2'>
                <Link to='/'>
                    <Button type='primary' shape='circle' icon={<HomeOutlined />}></Button>
                </Link>
                <Button type='primary' shape='round' icon={<FileExcelOutlined />} onClick={() => setShowExcel(true)}>Nhập từ Excel</Button>
                {/* <Button type='primary' shape='round' icon={<FileExcelOutlined />} onClick={() => setShowExcel(true)}>Xuất file Excel</Button> */}
                <Link to={`/PCGD/${name}/${id}`}>
                    <Button type='primary' shape='round' icon={<SolutionOutlined />}>Phân công giảng dạy</Button>
                </Link>
                <Button type='primary' shape='round' icon={<SettingOutlined />} onClick={() => setShowSetting(true)}>Cài đặt</Button>
                {/* <Button type='primary' shape='round' icon={<InfoCircleOutlined />}>Thông tin</Button> */}
                <Button type={showListCourse ? 'primary' : 'default'} onClick={() => setShowListCourse(!showListCourse)}
                    shape='round' icon={<OrderedListOutlined />}>Danh sách môn</Button>
            </Space>
            <div className='row flex-fill bg-light shadow rounded'>
                <div className={showListCourse ? 'col-12 col-sm-7' : 'col-12 col-sm-12'}>
                    {sem === undefined ? <div className='text-center p-5'>
                        <Spin size='large' />
                    </div> : <Tabs className='mt-2 mt-sm-4' tabPosition='left' defaultActiveKey='1' onChange={(e) => { setTabChange(sem?.find(i => i.key === parseInt(e))) }}>
                        {sem.map((e) =>
                            <Tabs.TabPane {...e}>
                                <h5 className='text-primary text-uppercase'><ReadOutlined className='mr-2' />{e.title} </h5>
                                <div>
                                    <>
                                        <Tooltip title={'Thêm nhóm môn học khi có từ 2 môn học được chọn'}>
                                            <Button disabled={dataGroup.length < 2} onClick={() => setGroupCourse(true)}
                                                className='my-2' type='dashed' shape='round' icon={<UnorderedListOutlined />}>Tạo Nhóm</Button>
                                        </Tooltip>
                                        <Tooltip className='ml-2' title={'Xóa môn học khoi nhóm tự chọn'}>
                                            <Button danger onClick={() => Modal.error({
                                                title: 'Bạn Thật sự muốn loại bỏ khóa học',
                                                content: 'Loại bỏ nhóm môn học',
                                                onOk: () => {
                                                    return axios.put(host('group_course/1'), { data: dataGroup })
                                                        .then((result) => {
                                                            if (result.data.type === 'error')
                                                                message.error('Không thể loại bỏ khóa học')
                                                            else {
                                                                getCoursesSem(tab.key)

                                                                axios.get(host('group_course', { 'ClassIndexId': id }))
                                                                    .then((result) => {
                                                                        setGroupList(result.data)
                                                                    })
                                                                axios.get(host('course', { ClassIndexId: id }))
                                                                    .then((result) => {
                                                                        setCoursesList(format(result.data))
                                                                    });
                                                            }
                                                        }).catch((err) => { })
                                                        .finally(() => { setIdData(); setDataGroup([]) });
                                                }
                                            })} className='my-2' disabled={dataGroup.length===0}
                                                type='dashed' shape='round'
                                                icon={<UnorderedListOutlined />}>Bắt buộc</Button>
                                        </Tooltip>
                                    </>
                                </div>
                                <Table dataSource={dataCoursesSem}
                                    bordered size='small'
                                    scroll={{ y: 400 }}
                                    pagination={{ position: ['none', 'none'] }}
                                    rowSelection={{
                                        columnWidth: 1,
                                        selectedRowKeys: dataGroup,
                                        type: 'checkbox',
                                        onChange: (value) => {
                                            setDataGroup(value);
                                        },
                                    }}>
                                    <Column width={2.25} showSorterTooltip={false}
                                        title={
                                            <Tooltip title='Mã môn học'>
                                                <span className='text-primary'>Mã</span>
                                            </Tooltip>} align='center' render={(e) =>
                                                <Tooltip title={
                                                    <>
                                                        <Button type='primary' onClick={() => {
                                                            setDataDefault(e);
                                                            setShowCourse(true);
                                                        }} shape='circle' icon={<EditOutlined />} title='Chỉnh sửa khóa học' />
                                                        <Button className='mx-2' title='Xóa Môn Học' shape='circle' type='primary' onClick={() => Modal.error({
                                                            title: 'Xóa Môn Học',
                                                            onOk: () => Delete(e),
                                                            content: 'Bạn thật sự muốn xóa khóa học khỏi danh sách môn học - bạn có thể thêm nó vào bất cứ khi nào!',
                                                        })} danger icon={<DeleteOutlined />} />
                                                        <Button onClick={() => RemoveCoures(e)} type='primary' danger shape='circle' icon={<ArrowRightOutlined />} title='Loại bỏ khóa học' />
                                                    </>}>
                                                    <div> {idData === e.id ? <Spin /> : e.code} </div>
                                                </Tooltip>} >
                                    </Column>

                                    <Column width={1.5} title={<span className='text-primary'>Khối</span>} align='center' showSorterTooltip={false} render={e => {
                                        let obj = listCourses?.find(i => i.id === e.coursesType);
                                        return <Tooltip title={obj?.name}>
                                            <span className='py-1 px-2' style={{ color: obj?.color ?? '#000', border: '1px solid ' + obj?.color ?? '#000', borderRadius: '.25rem' }}>
                                                <UnorderedListOutlined />
                                            </span>
                                        </Tooltip>
                                    }}>
                                    </Column>
                                    <Column width={4} align='center'
                                        title={<Tooltip title='Tên môn học'><span className='text-primary'>Tên MH</span></Tooltip>} render={e => {
                                            return <>
                                                <Tooltip title={e.des ?? e.name}>
                                                    <div style={{ maxHeight: '3em', overflow: 'hidden' }}>{e.name}</div>
                                                </Tooltip>

                                            </>
                                        }
                                        } />
                                    <Column width={1} title={<Tooltip title='Số Tín chỉ'><span className='text-primary'>TC</span></Tooltip>}

                                        align='center' render={e =>
                                            e.store ? <div>{e.credits}</div> :
                                                <Tooltip title='Môn học không được tích lũy'>
                                                    <div className="text-danger">{e.credits}*</div>
                                                </Tooltip>
                                        } />
                                    <Column width={2} title={<Tooltip title='Loại Học Phần'><span className='text-primary'>Loại HP</span></Tooltip>} >
                                        <Column width={1} align='center' render={e =>
                                            e.groupCourseId === null ? e.store === 1 ? e.credits : <span className='text-danger'>{e.credits + '*'}</span> : ''}
                                            title={<Tooltip title='Học phần bắt buộc'>
                                                <span className='text-primary'>BB</span></Tooltip>}></Column>

                                        <Column width={1} align='center'
                                            title={<Tooltip title='Học phần tự chọn'><span className='text-primary'>TC</span></Tooltip>} onCell={
                                                (e, i) => {
                                                    if (e.groupCourseId) {
                                                        if (i === 0 || dataCoursesSem[i - 1]?.groupCourseId !== e.groupCourseId) {
                                                            const rowSpan = dataCoursesSem.filter(h => h.groupCourseId === e.groupCourseId).length;
                                                            return { rowSpan: rowSpan }
                                                        } else if (dataCoursesSem[i - 1]?.groupCourseId !== null) {
                                                            return { rowSpan: 0 };
                                                        }
                                                    }
                                                }
                                            } render={e => {
                                                if (e.groupCourseId !== null) {
                                                    var obj = groupList?.find(k => k.id === e.groupCourseId);
                                                    return obj?.store ? obj?.sumCredit : <span className='text-danger'>{obj?.sumCredit}*</span>
                                                }
                                            }
                                            }></Column>
                                    </Column>
                                    <Column width={1} title={<Tooltip title='Số Tiết Lý THuyết'><span className='text-primary'>LT</span></Tooltip>}
                                        align='center' dataIndex='theory' />
                                    <Column width={1} title={<Tooltip title='Số Tiết Thực Hành'><span className='text-primary'>TH</span></Tooltip>}
                                        align='center' dataIndex='practice' />
                                </Table>

                                <div className='text-right p-2'>
                                    Tổng số môn học: <b>{dataCoursesSem?.length ?? 0} Môn học </b>
                                     ({((...sum) => { let Sum = 0; sum.forEach(e => Sum += e); return (Sum) })(...dataCoursesSem?.map(e => e.credits))} tín chỉ)<br />
                                    Tổng số tín chỉ tích lũy: <b>{((...sum) => { let Sum = 0; sum.forEach(e => Sum += e); return (Sum) })(...dataCoursesSem?.filter(e => e.store===1).map(e => e.credits))} tín chỉ</b>
                                </div>
                            </Tabs.TabPane>)}
                    </Tabs>}
                </div>
                {showListCourse?
                    <div className='d-flex flex-column col-12 col-sm-5 bg-light shadow rounded py-2 py-sm-4'>
                        <h5 className='text-center w-100'>Danh Sách Học Phần</h5>
                        <div className='d-flex'>
                            <Button type='primary' shape='round' icon={<PlusOutlined />}
                                onClick={() => {
                                    setDataDefault();
                                    setShowCourse(true);
                                }}>Thêm môn học</Button>
                            <Button className='mx-2' type='dashed' shape='round' icon={<FileSyncOutlined />}
                                onClick={() => setShowDel(true)}>Khôi phục</Button>
                        </div>
                        <div>
                            <Table size='small' scroll={{ y: 300 }} pagination={{ position: ['none', 'none'] }}
                                dataSource={coursesList} loading={coursesList === undefined}>
                                <Column width={2} title='Chuyển' align='center' render={(...e) =>
                                    <Tooltip title={e[0].sem === null ?
                                        <>Thêm khóa học vào <b>{tab.tab}</b></> :
                                        <>Bỏ khóa học khỏi <b>{sem?.find(k => k.key === e[0].sem)?.tab}</b></>}>
                                        <Button shape='round' loading={e[0].id === idData} onClick={() => ChangeSem(e[0], e[0].id, (e[0].sem == null))}
                                            type={e[0].sem != null ? 'dashed' : 'primary'} icon={e[0].sem != null ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}></Button>
                                    </Tooltip>
                                } />
                                <Column width={2} title='Mã' sorter={(a, b) => a.code > b.code ? 1 : -1} align='center' ellipsis render={(e) =>
                                    <Tooltip title={<>
                                        <Button title='Thay đổi Thông tin' onClick={() => {
                                            setDataDefault(e);
                                            setShowCourse(true);
                                        }} className='mr-2' shape='circle' type='primary' icon={<EditOutlined />} />
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
                            <Button icon={<AppstoreOutlined />} type='primary' onClick={() => setShowCourseType(true)} shape='round'>Quản lý khối học tập</Button>
                        </div>
                    </div>:<></>
                }
            </div>
            <CoursesCreate show={showCourse} setShow={setShowCourse}
                classIndex={dataClassIndex} dataDefault={dataDefault}
                showType={showCourseType} setDataDefault={setDataDefault}
                setShowType={setShowCourseType} />
            <CoursesDelete setList={setCoursesList} show={showDel} setShow={setShowDel} id={dataClassIndex.id} />
            <CoursesTypeCreate show={showCourseType} setShow={setShowCourseType} classIndex={dataClassIndex} />
            <ProgramSetting show={showSetting} setShow={setShowSetting} data={dataClassIndex} tab={tab} />
            <GroupCourseCreate
                show={groupCourse} setShow={setGroupCourse} group={dataGroup}
                setGroup={setDataGroup} idClassIndex={id} dataSem={dataCoursesSem} />
            <ExcelImport show={showExcel} setShow={setShowExcel} idClassIndex={id} />
        </div>
    )
}
