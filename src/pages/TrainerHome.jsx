import React, { useEffect, useState } from 'react'
import { Layout, Card, Col, Row, Calendar, Table, Flex, Progress, Divider, Tag } from 'antd';
const { Content } = Layout;
import { LineChart } from '@mui/x-charts/LineChart';
import { SendApiRequest } from '../framework/api';
import { Typography } from "antd";
import FlipCard from '../components/FlipCard';
const { Title } = Typography;
import SchoolIcon from '@mui/icons-material/School';
import StudentDashboardCard from './StudentDashboardCard';
import '../styles/studentattendancecard.css';
import { useDispatch } from 'react-redux';
import { setPage } from '../app/actions';

async function getAbsentees() {
  try {
    console.log("calling")
    let data = await SendApiRequest({
      endpoint: "classroom/get_absentees_list",
      authenticated: true,
    });
    return data
  } catch (error) {
    console.log(error);
  }
}



function TrainerCards({ data }) {
  console.log(data)
  const dispatch = useDispatch();
  return (
    <>

      <Row gutter={16} style={{ margin: '0 16px' }}>
        <Col span={8}>
          <FlipCard title="Classroom" backText={data?.classroom?.title} />
        </Col>

        <Col span={8}>
          <FlipCard title="Average Attendance" backText={`${parseInt(data?.average_attendance)}%`} />
        </Col>
        <Col span={8}>
          <FlipCard title="Meetings Conducted"
           backText={parseInt(data?.meetings_conducted)} 
           buttonText={"Schedule New Meeting"}
           onClick={()=>{dispatch(setPage("trainer_schedule"))}}/>
        </Col>
      </Row>
    </>
  )
}

function AttendenceGraph() {
  return (
    <>
      <h4>Attendance Analysis
      </h4>
      <LineChart style={{ width: '100%' }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );

}

function TableAbsentees() {
  const [absentees, setAbsentees] = useState([]);
  const [errormsg, setErrorMsg] = useState('');
  //use effect runs after render
  useEffect(() => {
    async function fetchAbsentees() {
      let data = await getAbsentees();
      if (data.ok === true) {
        setAbsentees(data.absentees);
      }
      else {
        setErrorMsg(data.error);
      }
    }
    fetchAbsentees();
  }, []);

  const columns = [
    {
      title: 'EmpId',
      dataIndex: 'user_id',
      key: 'user_id',
      align:'center'
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text.capitalize()}</a>,
      align:'center'
    },

  ];
  return (
    <>
      {errormsg === '' ?
        <div class="lightwork-card" style={{ boxShadow: '2px 2px 5px #60a5fa, -20px -20px 60px #ffffff', }}>
          <div class="bg"></div>
          <div class="blob"></div>

          <Table dataSource={absentees} pagination={{pageSize:4}} columns={columns} style={{ width: '80%' }} /> </div> :

        <h1 style={{ textAlign: "center" }}>{errormsg}</h1>
      }
    </>
  )

}
function TrainerHome() {
  const [dashboardData, setDashboardData] = useState('');

  useEffect(() => {
    async function getDashboardDetails() {
      try {
        let data = await SendApiRequest({
          endpoint: "classroom/get_trainer_dashboard_details",
          authenticated: true,
        });
        setDashboardData(data)
      } catch (error) {

      }
    }
    getDashboardDetails();
  }, []);

  return (

    <div>
      <Layout>
        <div>
          {/* <Title level={4}>Welcome <span style={{ color: "grey" }}>{dashboardData?.user?.username.capitalize()}</span></Title> */}
          <StudentDashboardCard studentname={`Welcome ${dashboardData?.user?.username.capitalize()}`} />

        </div>
        <Content style={{ marginTop: '20px' }}>
          <TrainerCards data={dashboardData} />

          <Divider />

          <Row align="middle" gutter={18}>
            <Col span={8}>
              <Title level={4} style={{ textAlign: 'center', width: '100%', color: '#1e40af' }}>
                Curriculum Progress
              </Title>
              <div class="lightwork-card" style={{ boxShadow: '2px 2px 5px #60a5fa, -20px -20px 60px #ffffff', paddingBottom: '50px' }} >

                <div class="bg"></div>
                <div class="blob"></div>
                <Title>Training Progress</Title>
                <Progress type="circle" percent={dashboardData?.percent_progress} />
              </div>


            </Col>
            <Col span={16}>
              <Title level={4} style={{ textAlign: 'center', width: '100%', color: '#1e40af' }}>
                Absentee Information
              </Title>
              <TableAbsentees />

            </Col>
          </Row>

          <div className='absent-div'
            style={{ flex: 1 }}>

          </div>

        </Content>
      </Layout>
    </div>
  )
}

export default TrainerHome
