import React, { useEffect, useState } from 'react'
import { Layout,Card,Col,Row,Calendar,Table, Flex } from 'antd';
const { Content } = Layout;
import { LineChart } from '@mui/x-charts/LineChart';
import { SendApiRequest } from '../framework/api';


async function getAbsentees(){
  try{
    let data = await SendApiRequest({
      endpoint:"classroom/get_absentees_list",
      authenticated:true,
    });
    console.log("Student absentees data",data);
    return data
  }catch (error){
    console.log(error);
  }
}

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
    <h4>Attendance Analysis
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
  const [absentees,setAbsentees] = useState([]);
  const [errormsg,setErrorMsg] = useState('');
  //use effect runs after render
  useEffect(()=>{
    async function fetchAbsentees(){
      let data = await getAbsentees();
      if(data.ok === true){
        setAbsentees(data.absentees);
      }
      else{
        setErrorMsg(data.error);
      }
    }
    fetchAbsentees();
  },[]);

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
  return(
    <>
    <h4>Absentees Today</h4>
  {errormsg === '' ?
  <Table dataSource={absentees} columns={columns} /> :
  <h1>{errormsg}</h1>
}
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
