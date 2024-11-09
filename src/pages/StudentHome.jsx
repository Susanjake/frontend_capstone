import React from 'react';
import { Layout, Card, Col, Row, Calendar } from 'antd';
const { Content } = Layout;
import '../styles/StudentCards.css'



function StudentCards() {
  return (
    <>
      <Row gutter={16} style={{ margin: '0 16px' }}>
        <Col span={6}>
          <Card title="Courses in progress" bordered={true} className="glass-card">
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Completed Courses" bordered={true} className="glass-card">

          </Card>
        </Col>
        <Col span={6}>
          <Card title="Watching Time" bordered={true} className="glass-card">

          </Card>
        </Col>
        <Col span={6}>
          <Card title="Certificates Achieved" bordered={true} className="glass-card">

          </Card>
        </Col>
      </Row>
    </>
  )
}

function UpcomingClasses() {


  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <Layout>
      <div
        style={{
          padding: '50px',
        }}
      >
        <h2>Upcoming Events</h2>
      </div>
      <div>

      </div>
    </Layout>
  )
}


const StudentHome = () => (
  <div>
    <Content
      style={{
        margin: '0 16px',
      }}
    >

      <h1>Overview</h1>
      <StudentCards />
    </Content>
    <UpcomingClasses />
  </div>
);


export default StudentHome;
