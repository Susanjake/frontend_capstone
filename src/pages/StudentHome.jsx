import React from 'react';
import { Layout,Card,Col,Row } from 'antd';
const { Content } = Layout;
import '../styles/StudentCards.css'



function StudentCards(){
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
    </div>
  );


export default StudentHome;
