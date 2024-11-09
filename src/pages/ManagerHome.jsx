import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Divider } from 'antd';
import '../styles/ManagerHome.css';
import { useSpring, animated } from "react-spring";
import { Bar } from 'react-chartjs-2';
import TickPlacementBars from '../charts/BarChart';
import CardFlip from '../pages/CardFlip';

import{
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function BarchartComponent(){
    return (
        <div>
            <Bar></Bar>
        </div>
    )
}


function Number({ n }){
    const { number } = useSpring({
        from: { number: 0},
        number: n,
        delay: 200,
        config: {mass: 1,tension: 20,friction: 20},
    });
    return <animated.div className='animatedNumber'>{number.to((n)=>n.toFixed(0))}</animated.div>;
}
export default function () {
    
    return (
        <>
        <h1 className='dashboardHeader'>Dashboard</h1>
        <Divider className='dashboardDivider'>
        
        </Divider>
            {/* <Row gutter={16} className='toprow'>
                <Col span={8}>
                    <Card bordered={false} className='topcards'>
                    <Divider><h1>Classrooms</h1></Divider>
                        <Number className='animatedNumber' n={10} />
                    </Card>
                </Col>
                <Col span={8} >
                    <Card bordered={false} className='topcards'>
                        <Divider><h1>Trainer</h1></Divider>
                    <Number className='animatedNumber' n={5} />
                    </Card>
                </Col>
                <Col span={8} >
                    <Card bordered={false} className='topcards'>
                        <Divider><h1>Employees</h1></Divider>
                        <Number className='animatedNumber' n={100} />
                       
                    
                    
                    </Card>
                </Col>
            </Row> */}
       
       <CardFlip></CardFlip>
        <Divider></Divider>
        <TickPlacementBars></TickPlacementBars>
        
        </>

    )
}