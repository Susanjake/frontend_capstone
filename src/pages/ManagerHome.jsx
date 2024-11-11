import { useEffect, useState } from 'react';
import { Card, Divider, Segmented, Progress, Popover, Layout, Row, Col, Typography, Table } from 'antd';
import Timeline from '../pages/Timeline';
import CardFlip from '../pages/CardFlip';
import { SendApiRequest } from '../framework/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, ChartContainer, } from "@mui/x-charts";
const { Title } = Typography;

export default function Dashboard() {
    const [classroomsData, setClassroomData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState();
    const [statistics, setStatistics] = useState({});
    const [attendanceBardata, setattendenceBarData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);

    const data = [
        { name: "Page A", uv: 4000 },
        { name: "Page B", uv: 3000 },
        { name: "Page C", uv: 2000 },
        { name: "Page D", uv: 2780 },
        { name: "Page E", uv: 1890 },
        { name: "Page F", uv: 2390 },
        { name: "Page G", uv: 3490 },
    ];
    function bargraphGenerator(attendenceBardata) {

        // average_attendance
        // title
        return attendenceBardata.map((item) => {
            return {
                x: item.title,
                attendance: parseInt(item.average_attendance),
            }
        })
    }

    // Fetch classroom data on component mount
    useEffect(() => {
        async function managerDashboardData() {
            const data = await SendApiRequest({
                endpoint: "classroom/get_manager_dashboard_details",
                authenticated: true,
            });
            setStatistics(data);
            setClassroomData(data['classes']);
            setSelectedClassroom(data['classes'][0]);
            setPieChartData([{
                data: [
                    {
                        id: 0,
                        label: "Training",
                        value: data.employees_under_training
                    },
                    {
                        id: 1,
                        label: " Not Training",
                        value: data.employees_not_under_training
                    }
                ]
            }
            ])
            setattendenceBarData(bargraphGenerator(data['classes']));
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
        <Layout >
            <Title>Dashboard</Title>
            <Divider className='dashboardDivider' />
            <Layout style={{ height: "25%" }}>
                <CardFlip statistics={statistics} />
            </Layout>
            <Divider />
            {/* <h1>Course Timelines</h1> */}

            <Layout style={{ margin: "0 16px" }}>
                <Row gutter={30}>

                    {/* Timeline and Progress chart */}
                    <Col span={12}>
                        <Card bordered style={{ width: "100%", borderColor: "black" }}>
                            <div style={{
                                overflow: "auto",
                                scrollbarColor: "rgb(255,255,255,0.2) transparent",
                            }}>
                                <Segmented
                                    //an array of titles
                                    options={classroomsData.map((classroom) => classroom.title)}
                                    onChange={(value) => {
                                        const classroom = classroomsData.find((cls) => cls.title === value);
                                        setSelectedClassroom(classroom);
                                    }}
                                    value={selectedClassroom?.title}
                                    style={{
                                        backgroundColor: "rgb(0,0,0,0.5)",
                                        color: "white"
                                    }}

                                />
                            </div>
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
                        </Card>
                    </Col>
                    {/* Bar Chart */}
                    <Col span={12}>
                        <Divider><Title level={4} style={{ color: '#1e40af' }}>Employee Statistics</Title></Divider>
                        {pieChartData.length !== 0 && <PieChart
                            series={pieChartData}
                            width={400}
                            height={200}
                        />}
                    </Col>
                </Row>
                <Row>
                    <Divider />
                    <Title level={4} style={{ color: '#1e40af',textAlign:'center', width:'100%' }}>
                            Average attendance percentage </Title>
                            
                    <Card style={{ width: "100%", borderColor: "black", height: "100%", }} bordered>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={attendanceBardata}
                                barSize={40}
                                margin={{ right: 4 }}
                            >

                                <XAxis dataKey={"x"}
                                    tick={false}
                                />
                                <YAxis ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
                                <CartesianGrid strokeDasharray="5 5" />
                                <Tooltip/>
                                <Bar dataKey="attendance" fill="#8884d8" animationDuration={5000} animationEasing="ease-in" />
                            </BarChart>
                            <p style={{ fontSize: 12, textAlign: "center" }}>Percentage vs Classroom</p>
                        </ResponsiveContainer>
                    </Card>
                </Row>
            </Layout>
        </Layout>
    );
}
