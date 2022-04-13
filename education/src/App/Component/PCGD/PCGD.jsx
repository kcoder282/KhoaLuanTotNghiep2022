import { Button, Select, Space, Table, Tabs, message, Modal, Form, Input, Switch, DatePicker, InputNumber } from 'antd'
import Column from 'antd/lib/table/Column';
import { useParams, Link } from 'react-router-dom';
import { EditOutlined, UnorderedListOutlined, FileExcelOutlined, ReconciliationOutlined, UserOutlined, UploadOutlined, DeleteOutlined, SaveOutlined, HomeOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { host, format } from './../../App';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

export default function PCGD() {
  const { id, name } = useParams();
  const [listClass, setListClass] = useState([])
  const [selectClassName, setSelectClassName] = useState();
  const [selectTab, setSelectTab] = useState(1)
  const [groupList, setGroupList] = useState([])
  const [giangvien, setGiangvien] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [formData] = Form.useForm();
  const [showSetData, setShowSetData] = useState(false);
  const [selectInfo, setSelectInfo] = useState();

  useEffect(() => {
    axios.get(host('group_course', { 'ClassIndexId': id }))
      .then((result) => {
        setGroupList(result.data)
      })
    axios.get(host('lecturers'))
      .then(e => {
        setGiangvien(e.data);
      })
    axios.get(host('className', { ClassIndexId: id }))
      .then((result) => {
        setListClass(result.data)
      }).catch((err) => {
        message.error('Server Error');
      });
    if (selectClassName !== undefined && selectTab !== 0) {
      axios.get(host('assignment', { ClassIndexId: id, sem: selectTab, classNameId: selectClassName }))
        .then((result) => {
          setData(format(result.data));
        }).catch((err) => {
          message.error('Server Error');
        });
    }
  }, [id, selectClassName, selectTab])
  const Assignment = (data) => {
    console.log(data);
    axios.post(host('assignment'), data)
      .then((result) => {
        if (result.data.type === 'success') {
          setShowSetData(false);
          axios.get(host('assignment', { ClassIndexId: id, sem: selectTab, classNameId: selectClassName }))
            .then((result) => {
              setData(format(result.data));
            }).catch((err) => {
              message.error('Server Error');
            });
        }
        console.log(result.data);
      }).catch((err) => {

      });
  }
  const action = (dataForm) => {
    axios.post(host('lecturers'), dataForm)
      .then(e => {
        if (e.data.type === 'success') {
          axios.get(host('lecturers'))
            .then(e => {
              setGiangvien(e.data);
              form.resetFields();
            })
        } else message.error('Server Error');
      })
  }
  const delete_lec = (id) => {
    axios.delete(host('lecturers/' + id))
      .then((result) => {
        if (result.data.type === 'success') {
          axios.get(host('lecturers'))
            .then(e => {
              setGiangvien(e.data);
              form.resetFields();
            })
        } else message.error('Server Error');
      })
  }

  return (
    <div className='h-100 d-flex flex-column'>
      <h4 className='text-uppercase text-primary'>Phân Công Giảng Dạy</h4>
      <Space size='small' className='my-2'>
        <Link to='/'>
          <Button type='primary' shape='circle' icon={<HomeOutlined />}></Button>
        </Link>
        <Link to={'/program/' + name + '/' + id}>
          <Button type='primary' shape='round' icon={<ReconciliationOutlined />}>Thiết kế CTĐT</Button>
        </Link>
        {/* <Button type='primary' shape='round' icon={<FileExcelOutlined />}>Xuất file Excel</Button> */}
      </Space>
      <div className='d-flex align-items-center'>
        <div className='mr-2' >Phân công cho lớp:</div>
        <Select allowClear placeholder='Chọn lớp học PCGD' className='my-2 flex-fill' onChange={e => setSelectClassName(e)}>
          {listClass?.map(e =>
            <Select.Option key={e.id} value={e.id}>{e.name}</Select.Option>
          )}
        </Select>
        <Button onClick={() => setShow(true)} className='ml-2' type='primary' shape='round' icon={<UnorderedListOutlined />}>Giảng viên</Button>
      </div>
      {selectClassName === undefined ?
        <div>

        </div>
        : <Tabs type='card' onChange={(e) => { setSelectTab(e) }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(e =>
            <Tabs.TabPane key={e} tab={'Học kỳ ' + e}>
              <Table bordered size='small'
                scroll={{ y: 500 }} dataSource={data}
                pagination={{ position: ['none', 'none'] }}>
                <Column align='center' width={1.5} title={<div className='text-primary'> Mã </div>} dataIndex='code' />
                <Column
                  width={5} title={<div className='text-primary'> Tên môn học</div>} dataIndex='name' />
                <Column align='center' width={1} title={<div className='text-primary'> TC</div>} dataIndex='credits' />
                <Column align='center' width={1} title={<div className='text-primary'> Tự Chọn</div>}
                  onCell={
                    (e, i) => {
                      if (e.groupCourseId) {
                        if (i === 0 || data[i - 1]?.groupCourseId !== e.groupCourseId) {
                          const rowSpan = data.filter(h => h.groupCourseId === e.groupCourseId).length;
                          return { rowSpan: rowSpan }
                        } else if (data[i - 1]?.groupCourseId !== null) {
                          return { rowSpan: 0 };
                        }
                      }
                    }
                  } render={e => {
                    if (e.groupCourseId !== null) {
                      var obj = groupList?.find(k => k.id === e.groupCourseId);
                      return obj?.store ? obj?.sumCredit : <span className='text-danger'>{obj?.sumCredit}*</span>
                    }
                  }} />
                <Column align='center' width={1} title={<div className='text-primary'> LT</div>} dataIndex='theory' />
                <Column align='center' width={1} title={<div className='text-primary'> TH</div>} dataIndex='practice' />
                {/* <Column align='center' width={1} title={<div className='text-primary'> TH/TN</div>} dataIndex='computer' render={e=>e===1?'MT': ''}/> */}
                <Column align='center' width={3} title={<div className='text-primary'> GV phụ trách</div>} render={k =>
                {
                  if (k.leactuerId !== null) {
                    return giangvien.find(e=>e.id === k.leactuerId).name;
                  } else return <div className="text-danger">{k.assignment}</div>
                }
                } />
                <Column align='center' width={2} title={<div className='text-primary'> Yêu cầu xếp TKB</div>} dataIndex='re' />
                <Column align='center' width={2} title={<div className='text-primary'> Ghi chú </div>} dataIndex='note' />
                <Column align='center' width={1} title={<div className='text-primary'> Sỉ số</div>} dataIndex='classSize' />
                <Column align='center' width={1} title={<div className='text-primary'> LT</div>} dataIndex='theory_info' />
                <Column align='center' width={1} title={<div className='text-primary'> TH</div>} dataIndex='practice_info' />
                {/* <Column align='center' width={1} title={<div className='text-primary'> SP</div>} dataIndex='SP' /> */}
                <Column align='center' width={1} title={<div className='text-primary'> Thay đổi</div>}
                  render={e => <Button type='primary' onClick={() => { formData.setFieldsValue(e); setSelectInfo(e); setShowSetData(true) }} shape='circle' icon={<EditOutlined />} />} />
              </Table>
            </Tabs.TabPane>
          )}
        </Tabs>}
      <Modal title={<div className='text-primary'><UserOutlined /> Quản lý Giảng viên</div>} onCancel={() => setShow(false)} footer={false} visible={show}>
        <Table size='small' dataSource={giangvien}>
          <Column title='Mã GV' dataIndex='code' />
          <Column title='Tên GV' dataIndex='name' />
          <Column title='Sửa' align='center' render={e => <Button type='primary' onClick={() => form.setFieldsValue(e)} shape='circle' icon={<EditOutlined />} />} />
          <Column title='Xóa' align='center' render={e => <Button type='primary' onClick={() => delete_lec(e.id)} shape='circle' danger icon={<DeleteOutlined />} />} />
        </Table>
        <Form
          form={form}
          onFinish={action}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <Form.Item hidden name='id'>
            <Input />
          </Form.Item>
          <Form.Item
            name='code'
            required
            label='Mã GV'>
            <Input placeholder='Mã giảng viên' />
          </Form.Item>
          <Form.Item
            name='name'
            required
            label='Tên GV'>
            <Input placeholder='Tên giảng viên' />
          </Form.Item>
          <Form.Item
            name='isIT'
            label='Thuộc CNTT'>
            <Switch defaultChecked={true} />
          </Form.Item>
          <div className='text-right'>
            <Button htmlType='submit' type='primary' shape='round'>
              <UploadOutlined /> Tải lên
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal title={<div className='text-primary'>Điều chỉnh phân công</div>} onCancel={() => setShowSetData(false)} footer={false} visible={showSetData}>
        <h5 className='text-primary text-center'>PCGD môn học: <br />{selectInfo?.name}</h5>
        <Form onFinish={Assignment}
          form={formData}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <Form.Item hidden name='id'>
            <Input />
          </Form.Item>
          <Form.Item hidden name='id_info'>
            <Input />
          </Form.Item>
          <Form.Item label='Chọn GV' name='leactuerId'>
            <Select allowClear showSearch placeholder='Chọn giảng viên'>
              {giangvien?.map(e =>
                <Select.Option key={e.id} value={e.id}><b className='text-primary'>{e.code}</b> - {e.name}</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item label='Phân Công' name='assignment'>
            <Input maxLength={128} showCount placeholder='Phân công giảng dạy cho' />
          </Form.Item>
          <Form.Item label='Yêu Cầu TKB' name='re'>
            <TextArea maxLength={128} showCount autoSize placeholder='Yêu cầu khi xếp TKB' />
          </Form.Item>
          <Form.Item label='Ghi Chú' name='note'>
            <TextArea maxLength={128} showCount autoSize placeholder='Ghi chú' />
          </Form.Item>
          <Form.Item label='Sỉ số lớp' name='classSize'>
            <InputNumber />
          </Form.Item>
          <Form.Item label='Nhóm LT' name='theory_info'>
            <InputNumber />
          </Form.Item>
          <Form.Item label='Nhóm TH' name='practice_info'>
            <InputNumber />
          </Form.Item>
          <div className="text-right">
            <Button icon={<SaveOutlined />} type='primary' shape='round' htmlType='submit'>Xác nhận</Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
