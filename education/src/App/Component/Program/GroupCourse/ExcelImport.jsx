import React, { useRef, useState } from 'react'
import {  Modal, Button, Input, Steps } from 'antd';
import { PlusCircleOutlined, UploadOutlined, SyncOutlined, ReadOutlined, SolutionOutlined, SettingOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { host } from '../../../App';
import * as XLSX from "xlsx"

export default function ExcelImport({ show, setShow, idClassIndex }) {

    const [khoiData, setKhoiData] = useState();
    const [monData, setMonData] = useState();
    const [loading, setLoading] = useState(0);
    const [error, setError] = useState(0)
    const [mega, setMega] = useState([]);
    const input = useRef();

    const LoadFile = (e) => {
        try {
            var fileReader = new FileReader();
            fileReader.readAsBinaryString(e);
            fileReader.onload = (event) => {
                let data = event.target.result;
                let workbook = XLSX.read(data, { type: 'binary' });
                var khoi, mon = [];
                workbook.SheetNames.forEach((dataItem, i) => {
                    let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[dataItem])
                    if (i === 1) {
                        setMega(workbook.Sheets[dataItem]['!merges']);
                        khoi = [...new Set(rowObject.map(e => e['Khối kiến thức']))];
                        mon = mon.map((e,i)=>({...e, ...rowObject[i]}))
                    } else {
                        mon = rowObject;
                    }
                });
                setKhoiData(khoi);
                setMonData(mon);
                
            }
        } catch (error) {
            setKhoiData([]);
            setMonData([]);
        }
    }
    const LoadData = () => {
        if(khoiData?.length>0 && monData?.length>0){
            setLoading(1);
            setError(0);
            
        }
        axios.get(host('ResetClassIndex/' + idClassIndex))
            .then((result) => {
                if (result.data.type === 'success')
                {
                    setLoading(2);
                    return axios.post(host('CourseTypeInstall/' + idClassIndex), { 'khoi': khoiData })
                }
                else {
                    setError(2);
                    setLoading(2);
                    return {data: {type: 'error'}}
                }
            }).then((result) => {
                if (result.data.type === 'success')
                {
                    setLoading(3);
                    return axios.post(host('CourseInstall/' + idClassIndex), { 'mon': monData })
                }
                else {
                    setError(3);
                    setLoading(3);
                    return { data: { type: 'error' } }
                }
            }).then((result) => {
                if (result.data.type === 'success')
                {
                    setLoading(4);
                    var buf = [], listBufer = [];
                    for (let i = 0; i < mega.length; i++) {
                        var buffer = mega[i];

                        for (let j = 0; j < monData.length; j++) {
                            if (monData[j].TT >= buffer.s.r && monData[j].TT <= buffer.e.r) {
                                buf.push(monData[j]);
                            }
                        }
                        listBufer.push({ code: buf.map(e => e['MÃ MH']), sumCredit: Math.max(...buf.map(e => e['TC'] ?? 0)) });
                        buf = [];
                    }
                    return axios.post(host('CourseIntallDetail/' + idClassIndex), { 'mon': monData, 'mega': listBufer })
                }
                else {
                    setError(4);
                    setLoading(4);
                    return { data: { type: 'error' } }
                }
                
            }).then((result) => {
                if (result.data.type === 'success')
                    setLoading(5);
                else {
                    setError(5);
                    setLoading(5);
                }
            }).finally(e=>{
                if(error === 0)
                    setLoading(6)
            })
    }
    
    return (
        <Modal title={<div className='text-primary text-uppercase'><PlusCircleOutlined /> Thêm dữ liệu từ file Excel </div>}
            footer={false} visible={show} onCancel={() => 
            {
                setShow(false);
                setError(0);
                setLoading(0);
            }}>
            <Input ref={input} type='file' id='file' allowClear onChange={e => {
                LoadFile(e.target.files[0]);
            }}>

            </Input>

            {loading > 0 ?
                <Steps className='p-3' size='small' direction='vertical'>
                    <Steps.Step status={error === 1 ? 'error' : loading < 1 ? 'wait' : loading === 1 ? 'process' : 'finish'} 
                        title='Cài đặt lại khóa học' icon={loading === 1 ? <LoadingOutlined /> : <SettingOutlined />} />
                    <Steps.Step status={error === 2 ? 'error' : loading < 2 ? 'wait' : loading === 2 ? 'process' : 'finish'} 
                        title='Cài đặt khối môn học' icon={loading === 2 ? <LoadingOutlined /> : <SyncOutlined />} />
                    <Steps.Step status={error === 3 ? 'error' : loading < 3 ? 'wait' : loading === 3 ? 'process' : 'finish'} 
                        title='Cài đặt môn học' icon={loading === 3 ? <LoadingOutlined /> : <ReadOutlined />} />
                    <Steps.Step status={error === 4 ? 'error' : loading < 4 ? 'wait' : loading === 4 ? 'process' : 'finish'} 
                        title='Cài đặt thông tin môn học' icon={loading === 4 ? <LoadingOutlined /> : <SolutionOutlined />} />
                    <Steps.Step status={error === 5 ? 'error' : loading < 5 ? 'wait' : loading === 5 ? 'process' : 'finish'} 
                        title='Hoàn thành' icon={loading === 5 ? <LoadingOutlined /> : <CheckCircleOutlined />} />
                </Steps>
                : ''}
            <div className='py-2'>
                <Button type='primary' shape='round' onClick={LoadData} icon={<UploadOutlined />}>LoadData</Button>
            </div>
        </Modal>
    )
}
