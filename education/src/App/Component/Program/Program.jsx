import { Button, message, Space, Tabs } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format, host } from '../../App'



export default function Program() {
    
    const [dataTab, setDataTab] = useState();
    const [HKIII, setHKIII] = useState(false);
    useEffect(() => {
        const SLM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
        axios.get(host('semester'))
        .then((result) => {
            let data;
            if (HKIII) data = format(result.data);
            else data = format(result.data).filter((e)=>e.schoolYearIndex!=3);
            setDataTab(data.map((e) => ({ name: e.schoolYearIndex === 3? ("Học kỳ hè năm "+SLM[e.schoolYear-1]):("Học Kỳ "+SLM[(e.schoolYear-1)*2+e.schoolYearIndex-1]), ...e})))
        }).catch((err) => {
            message.error('Error Server');
        });
    }, [HKIII])
    
    return (
        <div>
            <h4>Thiết Kế CTĐT</h4>
            <div>
                <div className='my-2'>
                    <Button type={HKIII ? 'primary' : 'ghost'} shape='round' onClick={() => setHKIII(!HKIII)}>Học kì hè</Button>
                </div>

                <Tabs type='card'>
                    {dataTab?.map((e) =>
                        <Tabs.TabPane tab={e.name} key={e.key}>

                        </Tabs.TabPane>)}
                </Tabs>
            </div>
        </div>
    )
}
