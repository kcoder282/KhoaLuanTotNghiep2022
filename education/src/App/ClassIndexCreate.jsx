import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react'

export default function ClassIndexCreate({visible }) {
    const [formAdd, setFormAdd] = visible;
    const [newEducation, setNewEducation] = useState({});
    return (
        <Modal visible={formAdd} onCancel={() => setFormAdd(false)} title={<>{"Create a Program Education: " + (newEducation.name ?? '')}</>}
            footer={<>
                <Button shape='round' type='primary' icon={<PlusOutlined />}>Create</Button>
                <Button shape='round' onClick={() => setFormAdd(false)}>Cancel</Button>
            </>}>
            <form method='POST'>
                <div className="row">
                    <div className="col-4">Name</div>
                    <Input showCount maxLength={10} className="col-8" value={newEducation.name} placeholder="Enter name..." onInput={(e) => {
                        newEducation.name = e.target.value;
                        setNewEducation({ ...newEducation });
                    }} />
                </div>
                <div className="row mt-2">
                    <div className="col-4">School year</div>
                    <InputNumber showCount className='col-4' onInput={(e) => {
                        newEducation.beginYear = e.target.value;
                        setNewEducation({ ...newEducation });
                    }} value={newEducation.beginYear} min={2010} max={3000} placeholder="Begin Year" />
                    <InputNumber className='col-4' onInput={(e) => {
                        newEducation.beginYear = e.target.value;
                        setNewEducation({ ...newEducation });
                    }} value={newEducation.beginYear} min={2010} max={3000} placeholder="End Year" />
                </div>
                <div className="row mt-2">
                    <div className="col-4">Description</div>
                    <TextArea showCount autoSize maxLength={200} className="col-8 p-0" value={newEducation.description} placeholder="Enter description..." onInput={(e) => {
                        newEducation.description = e.target.value;
                        setNewEducation({ ...newEducation });
                    }} />
                </div>
            </form>
        </Modal>
    )
}
