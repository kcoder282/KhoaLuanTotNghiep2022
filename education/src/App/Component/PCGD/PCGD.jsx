import { Button, Select, Space, Table, Tabs } from 'antd'
import Column from 'antd/lib/table/Column';
import React from 'react'
import { useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

export default function PCGD() {
  const { id, name } = useParams();
  const data = [
    {
      key: 1,
      code: 'MOR303',
      name: 'Phương pháp nghiên cứu khoa học - TH',
      tinchi: 2,
      TC: '',
      rowSpan: 1,
      LT: 20,
      TH: 20,
      THTN: 'MT',
      GV: 'Nguyễn Văn Hòa',
      TKB: '',
      GC: '1LT - 2TH',
      SS: 60,
      LThuyet: 1,
      THanh: 2,
      SP: 42,
    },
    {
      key: 2,
      code: 'SEE518',
      name: 'Công nghệ Web và ứng dụng - PHP',
      tinchi: 3,
      BB: 0,
      TC: 3,
      rowSpan: 2,
      LT: 15,
      TH: 0,
      THTN: 'MT',
      GV: 'BM KTPM',
      TKB: '',
      GC: '',
      SS: '',
      LThuyet: 1,
      THanh: 2,
      SP: 0,
    }, {
      key: 3,
      code: 'SEE517',
      name: 'Công nghệ Web và ứng dụng - ASP.NET',
      tinchi: 3,
      BB: 1,
      TC: 3,
      rowSpan: 0,
      LT: 25,
      TH: 40,
      THTN: 'MT',
      GV: 'BM KTPM',
      TKB: '',
      GC: '',
      SS: '',
      LThuyet: 1,
      THanh: 2,
      SP: 0,
    }, {
      key: 4,
      code: 'CON511',
      name: 'An toàn hệ thống và an ninh mạng',
      tinchi: 3,
      TC: 3,
      rowSpan: 1,
      LT: 30,
      TH: 30,
      THTN: 'MT',
      GV: 'Trương Minh Tuyền',
      TKB: '',
      GC: '1 LT + 2 TH',
      SS: 65,
      LThuyet: 1,
      THanh: 2,
      SP: 63,
    },
    {
      key: 5,
      code: 'CON511',
      name: 'Xây dựng dịch vụ mạng',
      tinchi: 3,
      TC: 3,
      rowSpan: 1,
      LT: 30,
      TH: 30,
      THTN: 'MT',
      GV: 'Huỳnh Cao Thế Cường',
      TKB: `- LT 4 tiết/buổi
- Các buổi TH  xếp liên tục. `,
      GC: '1 LT + 2 TH',
      SS: 64,
      LThuyet: 1,
      THanh: 2,
      SP: 63,
    },
    {
      key: 6,
      code: 'CON915',
      name: 'Thiết kế và cài đặt mạng',
      tinchi: 2,
      TC: 2,
      rowSpan: 1,
      LT: 20,
      TH: 20,
      THTN: 'MT',
      GV: 'Huỳnh Cao Thế Cường',
      TKB: ``,
      GC: '1 LT + 2 TH',
      SS: 64,
      LThuyet: 1,
      THanh: 2,
      SP: 63,
    }, {
      key: 7,
      code: 'COS508',
      name: 'Xử lý ảnh',
      tinchi: 3,
      TC: 3,
      rowSpan: 3,
      LT: 30,
      TH: 30,
      THTN: 'MT',
      GV: 'Lê Việt Phương',
      TKB: `Thỉnh giảng; Sáng thứ sáu, 4 tiết/buổi`,
      GC: '',
      SS: '',
      LThuyet: '',
      THanh: '',
      SP: 0,
    }, {
      key: 8,
      code: 'CON502',
      name: 'Lập trình cho các thiết bị di động ',
      tinchi: 3,
      TC: 3,
      rowSpan: 0,
      LT: 25,
      TH: 40,
      THTN: 'MT',
      GV: 'Huỳnh Cao Thế Cường',
      TKB: ``,
      GC: '',
      SS: '',
      LThuyet: '',
      THanh: '',
      SP: 0,
    }, {
      key: 9,
      code: 'IMS505',
      name: 'Thiết kế đồ họa',
      tinchi: 3,
      TC: 3,
      rowSpan: 0,
      LT: 25,
      TH: 40,
      THTN: 'MT',
      GV: 'BM KTPM',
      TKB: ``,
      GC: '',
      SS: '',
      LThuyet: '',
      THanh: '',
      SP: 0,
    },
  ]
  return (
    <div className='h-100 d-flex flex-column'>
      <h4 className='text-uppercase text-primary'>Thiết Kế CTĐT: {name}</h4>
      <Space size='small' className='my-2'>
        
      </Space>
        <div className='d-flex align-items-center'>
          <div className='mr-2' >Phân công cho lớp:</div>
          <Select defaultValue='DH19TH1' className='my-2'>
            <Select.Option>DH19TH1</Select.Option>
          </Select>
        </div>
      <Tabs type='card'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(e =>
          <Tabs.TabPane key={e} tab={'Học kỳ ' + e}>
            <Table bordered size='small' 
              scroll={{ y: 500 }} dataSource={data}
              pagination={{ position: ['none', 'none'] }}>
              <Column align='center' width={1.5} title={<div className='text-primary'> Mã </div>} dataIndex='code'/>
              <Column
               width={5} title={<div className='text-primary'> Tên môn học</div>} dataIndex='name'/>
              <Column align='center' width={1} title={<div className='text-primary'> TC</div>} dataIndex='tinchi'/>
              <Column align='center' width={1} title={<div className='text-primary'> Tự Chọn</div>} onCell={(e)=>({rowSpan: e.rowSpan})} render={e=>e.TC}  />
              <Column align='center' width={1} title={<div className='text-primary'> LT</div>} dataIndex='LT'/>
              <Column align='center' width={1} title={<div className='text-primary'> TH</div>} dataIndex='TH'/>
              <Column align='center' width={1} title={<div className='text-primary'> TH/TN</div>} dataIndex='THTN'/>
              <Column align='center' width={3} title={<div className='text-primary'> GV phụ trách</div>} dataIndex='GV'
                render={e => <Select defaultValue={e}><Select.Option key='1'>{e}</Select.Option></Select>}/>
              <Column align='center' width={2} title={<div className='text-primary'> Yêu cầu xếp TKB</div>} dataIndex='TKB'/>
              <Column align='center' width={2} title={<div className='text-primary'> Ghi chú </div>} dataIndex='GC'/>
              <Column align='center' width={1} title={<div className='text-primary'> Sỉ số</div>} dataIndex='SS'/>
              <Column align='center' width={1} title={<div className='text-primary'> LT</div>} dataIndex='LThuyet'/>
              <Column align='center' width={1} title={<div className='text-primary'> TH</div>} dataIndex='THanh'/>
              <Column align='center' width={1} title={<div className='text-primary'> SP</div>} dataIndex='SP'/>
              <Column align='center' width={1} title={<div className='text-primary'> Thay đổi</div>} render={e => <Button type='primary' shape='circle' icon={<EditOutlined />}/>} />
            </Table>
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  )
}
