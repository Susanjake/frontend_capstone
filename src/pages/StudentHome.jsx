import React from 'react';
import { Layout, Card, Col, Row, Calendar } from 'antd';
const { Content,Header } = Layout;
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
    <>
      <>

        <div>
          <h2>Upcoming Events</h2>
        </div>
        <div>

        </div>
      </>
    </>
  )
}


const StudentHome = () => (
  <Layout>
    <Header>
      <h1>Overview</h1>
    </Header>
    <Content>
      <StudentCards />
      <UpcomingClasses />
    </Content>
  </Layout>
);


export default StudentHome;
