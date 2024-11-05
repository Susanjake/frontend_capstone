import React from 'react'
import { Layout,Card,Col,Row,Calendar,Table, Flex } from 'antd';
const { Content } = Layout;
import { LineChart } from '@mui/x-charts/LineChart';




function TrainerCards(){
  return (
  <>
  
  <Row gutter={16} style={{ margin: '0 16px' }}>
  <Col span={12}>
    <Card title="Syllabus" bordered={true} className="glass-card">
      
    </Card>
  </Col>

  <Col span={12}>
    <Card title="Assignments" bordered={true} className="glass-card">
      
    </Card>
  </Col>
  
</Row>
</>
  )
}

function AttendenceGraph(){
  return (
    <>
    <h4>Attendence Analysis
    </h4>
    <LineChart style={{width:'100%'}}
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

function TableAbsentees(){
  
  const dataSource = [
    {
      key: '1',
      rollno:'1',
      name: 'Mike',
      
    },
    {
      key: '2',
      rollno:'2',
      name: 'Mike',
      
    },
  ];
  
  const columns = [
    {
      title: 'Rollnumber',
      dataIndex: 'rollno',
      key: 'rollno',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
 
  ];
  return(
    <>
    <h4>Absentees Today</h4>
  <Table dataSource={dataSource} columns={columns} />
  </>
  )

}
function TrainerHome() {
  return (

    <div>
    <Layout>
      <Content style={{marginTop:'20px'}}>
      <TrainerCards/>
      <div className='bigdiv' style={{display: 'flex', padding:'50px'}}>

        <div className='attendence-div'
        style={{flex:1}}
        >
        <AttendenceGraph />
        </div>

        <div className='absent-div'
        style={{flex:1}}>
        <TableAbsentees/>
        </div>
      </div>
      </Content>
    </Layout>
    </div>
  )
}

export default TrainerHome
