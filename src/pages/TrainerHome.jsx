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
  return (
    <>

      <Row gutter={16} style={{ margin: '0 16px' }}>
        <Col span={8}>
          <FlipCard title="Classroom" subTitle={"View More"} backText={data?.classroom?.title} />
        </Col>

        <Col span={8}>
          <FlipCard title="Average Attendance" subTitle={"View More"} backText={`${parseInt(data?.average_attendance)}%`} />
        </Col>
        <Col span={8}>
          <FlipCard title="Meetings Conducted" subTitle={"View More"} backText={parseInt(data?.meetings_conducted)} buttonText={"Schedule New Meeting"} />
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
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },

  ];
  return (
    <>
      <Title style={{ textAlign: "center" }}>Absentees Today</Title>
      {errormsg === '' ?
        <Table dataSource={absentees} columns={columns} /> :
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

          <Row align="middle">
            <Col span={12}>
              <Title>Training Progress</Title>
              <Progress type="circle" percent={dashboardData?.percent_progress} />
            </Col>
            <Col span={12}>
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
