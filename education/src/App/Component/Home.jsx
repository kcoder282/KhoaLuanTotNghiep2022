import { CloudSyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import './cube.css';

export default function Home() {
  return (
    <div className='container'>
        <h1 className='text-primary text-center'>Quản lý CTĐT và PCGD</h1>
        <p> Quản lý chương trình đạo cho khoa <i>Công nghệ thông tin</i> và <i>Kỹ thuật phần mềm </i>. 
        Chương trình phát triển rút ngắn thời gian sử dụng
        thiết kế và hỗ trợ phân công chính xác giảm thiểu sai sót.
        Ứng dụng công nghệ hiện đại cho phép người dùng sử dụng phần mềm có trải nghiệm tuyệt vời hàng loạt các chức năng ấn tượng và tốc độ load cao mang đến trải nghiệp tuyệt vời </p>
        <div className="my-5">
            <div className="scene animate__animated animate__fadeInUp animate__slower">
                <div className="cube">
                    <div className="cube__face cube__face--front d-flex justify-content-center align-items-center fs-1">
                        <i className="fi fi-rr-physics mr-2"></i> <span>Quản lý</span>
                    </div>
                    <div className="cube__face cube__face--back">
                        <div className="text-center">
                            <i className="fi fi-rr-cloud"></i> Tự động hóa
                        </div>
                    </div>
                    <div className="cube__face cube__face--right">
                        <div className="text-center">CTĐT</div>
                    </div>
                    <div className="cube__face cube__face--left">
                        <div className="text-center">PCGD</div>
                    </div>
                    <div className="cube__face cube__face--top"></div>
                    <div className="cube__face cube__face--bottom"></div>
                </div>
            </div>
        </div>
        <hr className='mt-5'/>
        <div className="text-center">
            <Link to='/ClassIndex'>
                <Button className='mt-5' size='large' shape='round' type='primary' icon={<CloudSyncOutlined />}>Bắt đầu sử dụng</Button>
            </Link>
        </div>
    </div>
  )
}
