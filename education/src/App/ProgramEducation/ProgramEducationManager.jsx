import { DownOutlined, ExportOutlined, FileExcelOutlined, ImportOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, message, Space, Tabs, Spin, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import ProgramEducationExtend from './ProgramEducationExtend'
import axios from 'axios';
import { host } from '../../Static/Static';

export default function ProgramEducationManager({id}) {
    const [show, setShow] = useState(false);
    const [semester, setSemester] = useState();
    const [semesterIII, setSemesterIII] = useState(false);
    useEffect(() => {
        axios.get(host('semester', { semesterIII: semesterIII }))
        .then((result) => {
            var { data } = result;
            data = data.map((e, i) => ({
                key: i,
                name: e.semester !== 3 ?
                    <>Học kỳ {(e.schoolYear - 1) * 2 + e.semester}</> :
                    <>Học kỳ hè {e.schoolYear}</>
                ,
                ...e
            }));
            setSemester(data);
        }).catch((err) => {
            message.error('Error: Server error');
        });
    }, [semesterIII])
    return (
        <>
            <Space>
                <Button shape='round' type='primary' icon={<SettingOutlined />} onClick={()=>setShow(true)}>Manager</Button>
                <Dropdown overlay={
                <Menu>
                    <Menu.Item>
                        <Button type='text' icon={<ExportOutlined />}>Export Excel</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button type='text' icon={<ImportOutlined />}>Import Excel</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button shape='round' type='dashed' icon={<FileExcelOutlined />} >Excel API <DownOutlined /></Button>
                </Dropdown>
            </Space>
            <ProgramEducationExtend visible={[show, setShow]}/>
            <div className='mt-3'>
                <Switch onChange={e => setSemesterIII(e)}/> 
                <span className='ml-1'>{semesterIII ? 'Chỉ học kỳ chính' : 'Học kỳ chính và học kì hè'}</span>
                {semester === undefined ?
                    <div className='d-flex pt-5 '>
                        <Spin className='mx-auto' />
                    </div> :
                    <Tabs onChange={(...e) => { console.log(e) }}>
                        {semester.map((e) => (
                            <Tabs.TabPane key={e.key} tab={e.name}>

                            </Tabs.TabPane>
                        ))}
                    </Tabs>}
            </div>
        </>
    )
}
