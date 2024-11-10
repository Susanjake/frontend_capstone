import { useEffect, useState } from 'react';
import { Card, Divider, Segmented, Progress, Popover, Layout, Row, Col } from 'antd';
import Timeline from '../pages/Timeline';
import CardFlip from '../pages/CardFlip';
import { SendApiRequest } from '../framework/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Dashboard() {
    const [classroomsData, setClassroomData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState();
    const [statistics, setStatistics] = useState({});

    const data = [
        { name: "Page A", uv: 4000 },
        { name: "Page B", uv: 3000 },
        { name: "Page C", uv: 2000 },
        { name: "Page D", uv: 2780 },
        { name: "Page E", uv: 1890 },
        { name: "Page F", uv: 2390 },
        { name: "Page G", uv: 3490 },
    ];

    // Fetch classroom data on component mount
    useEffect(() => {
        async function managerDashboardData() {
            const data = await SendApiRequest({
                endpoint: "classroom/get_manager_dashboard_details",
                authenticated: true,
            });
            setStatistics(data);
            setClassroomData(data['classes']);
            setSelectedClassroom(data['classes'][0])
        }
        managerDashboardData();
    }, []);

    // Generate timeline data whenever classroomsData is updated
    useEffect(() => {
        if (selectedClassroom && classroomsData.length > 0) {
            const newTimelineData = [
                {
                    heading: 'Start Date',
                    subHeading: selectedClassroom.start_date,
                    direction: 'left'
                },
                {
                    heading: 'End Date',
                    subHeading: selectedClassroom.eod,
                    direction: 'right'
                }
            ];
            setTimelineData(newTimelineData);
        }
    }, [selectedClassroom]);

    return (
        <>
            <h1 className='dashboardHeader'>Dashboard</h1>
            <Divider className='dashboardDivider' />

            <CardFlip statistics={statistics} />
            <Divider />
            {/* <h1>Course Timelines</h1> */}
            <Layout>
                <Row>

                    {/* Timeline and Progress chart */}
                    <Col span={12}>
                        <div>
                            <Segmented
                                //an array of titles
                                options={classroomsData.map((classroom) => classroom.title)}
                                onChange={(value) => {
                                    const classroom = classroomsData.find((cls) => cls.title === value);
                                    setSelectedClassroom(classroom);
                                }}
                                value={selectedClassroom?.title}
                        
                            />
                            <Row>
                                <Col span={18}>
                                    <Timeline eventData={timelineData} />
                                </Col>
                                <Col span={6}>
                                    <Popover content={<p>Completion percentage with respect to the deadline</p>} title="Completion percentage">
                                        <Progress
                                            type="dashboard"
                                            steps={5}
                                            percent={parseInt(selectedClassroom?.completion_timeline)}
                                            trailColor="rgba(234, 85, 85, 0.8)"
                                            strokeWidth={20}
                                            size="small"

                                        />
                                    </Popover>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                    {/* Bar Chart */}
                    <Col span={12}>
                        <div className='BarchartDiv' style={{ flex: '1', backgroundColor: '' }}>
                            <BarChart
                                width={500}
                                height={400}
                                data={data}
                                barSize={40}
                                margin={{ right: 4 }}
                            >
                                <XAxis />
                                <YAxis />
                                <CartesianGrid strokeDasharray="5 5" />
                                <Tooltip />
                                <Bar dataKey="uv" fill="#8884d8" animationDuration={5000} animationEasing="ease-in" />
                            </BarChart>
                        </div>
                    </Col>
                </Row>
            </Layout>
        </>
    );
}
