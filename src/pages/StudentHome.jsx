import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, Progress, Typography, Divider, Table, Tag } from 'antd';
const { Content } = Layout;
import '../styles/StudentCards.css'
import { SendApiRequest } from '../framework/api'

const { Title } = Typography;
function StudentCards({ data }) {
  return (
    <>
      <Row gutter={16} style={{ margin: '0 16px', height: "100%" }} align="middle">
        <Col span={12}>
          <Card title="Classroom" bordered={true} style={{
            minHeight: "100%",
            textAlign: "center",
            paddingTop: "10px",
            background:"linear-gradient(to right, #ee9ca7, #ffdde1)"
          }}>
            <p style={{ fontSize: 35 }}>
              {data.classroom?.title}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Attendance" bordered={true} style={{ minHeight: "100%", textAlign: "center",background:"linear-gradient(to right, #2193b0, #6dd5ed)" }}  >
            <div>
              <Progress type="circle" size={70} percent={parseInt(data.attendance)} steps={5} style={{ minHeight: "100%" }} />
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Trainer" bordered={true} style={{ minHeight: "100%", textAlign: "center", fontSize: 20, fontWeight: 900,background:"linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)" }}>
            <div>
              {data.trainer?.capitalize()}
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Manager" bordered={true} style={{ background:"linear-gradient(to right, #1f4037, #99f2c8)", minHeight: "100%", textAlign: "center", fontSize: 20, fontWeight: 900 }}>
            <div>
              {data.manager?.capitalize()}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}


function StudentHome() {

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'meeting_name',
      key: 'meeting_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Meeting Date',
      dataIndex: 'meeting_date',
      key: 'meeting_date',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time'
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time'
    },
    {
      title: 'Status',
      dataIndex: 'conducted',
      key: 'conducted',
      render: (data, record) => {
        console.log("data is", data, "record is", record)
        return data ? <Tag color="green">Conducted</Tag> : <Tag color="red">Expired</Tag>
      },
      filters: [
        {
          text: 'Conducted',
          value: 'Conducted',
        },
      ],
      onFilter: (value, record) => {
        console.log("record is ", record)
        return record.conducted
      },
    }
  ];


  useEffect(() => {
    async function load_data() {
      let data = await SendApiRequest({
        endpoint: "classroom/get_student_details",
        authenticated: true,
      });
      setData(data);
    }
    load_data();
  }, [])

  useEffect(() => {
    async function load_data() {
      let data = await SendApiRequest({
        endpoint: "classroom/get_meetings",
        authenticated: true,
      });

      setTableData(data);

    }
    load_data();
  }, [])
  return (
    <Layout style={{ margin: "0 16px" }}>
      <Layout style={{ height: "40vh" }}>
        <Title level={4}>
          Hey {data?.user?.username.capitalize()}
        </Title>
        <Content>
          <StudentCards data={data} />
        </Content>
      </Layout>
      <Divider />
      <Layout>
        <Title level={4}>
          Upcoming Meetings
        </Title>
        <Content >
          <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={tableData['meetings']} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default StudentHome;
