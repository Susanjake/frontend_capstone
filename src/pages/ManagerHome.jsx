import { useEffect, useState } from 'react';
import { Card, Divider, Segmented } from 'antd';
import Timeline from '../pages/Timeline';
import CardFlip from '../pages/CardFlip';
import { SendApiRequest } from '../framework/api';

export default function Dashboard() {
    const [classroomsData, setClassroomData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [selectedClassroom,setSelectedClassroom] = useState();

    // Fetch classroom data on component mount
    useEffect(() => {
        async function managerDashboardData() {
            const data = await SendApiRequest({
                endpoint: "classroom/get_manager_dashboard_details",
                authenticated: true,
            });
            setClassroomData(data['classes']); // Update classrooms data after fetch
        }
        managerDashboardData();
    }, []);

    // Generate timeline data whenever classroomsData is updated
    useEffect(() => {
        if (selectedClassroom && classroomsData.length > 0) {
            
            if (selectedClassroom) {
                const newTimelineData = [
                    {
                        heading: selectedClassroom.start_date,
                        subheading: '',
                        direction: 'left'
                    },
                    {
                        heading: selectedClassroom.eod,
                        subheading: '',
                        direction: 'right'
                    }
                ];
                setTimelineData(newTimelineData);
            }
        }
    }, [selectedClassroom]);

    return (
        <>
            <h1 className='dashboardHeader'>Dashboard</h1>
            <Divider className='dashboardDivider' />
            
            <CardFlip />
            <Divider />
            <h1>Course Timelines</h1>
            <Card >
                <Segmented
                    options={classroomsData.map((classroom) => classroom.title)}
                    onChange={(value) => {
                        const classroom = classroomsData.find((cls) => cls.title === value);
                        // Handle classroom selection if needed
                        setSelectedClassroom(classroom);
                        console.log("Selected classroom is",selectedClassroom)
                    }}
                />
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'50vw',backgroundColor:'aliceblue'}}>
                    <Timeline eventData={timelineData} />
                </div>
                <div>
                    HELLO
                </div>
            </Card>
        </>
    );
}
