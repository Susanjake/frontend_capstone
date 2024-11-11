import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress, Popover, Flex,Typography, Layout } from 'antd';
import { SendApiRequest } from '../framework/api';
import '../styles/manageemployees.css';

const {Title} = Typography;

function ManageEmployees() {

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function load_data() {
      let data = await SendApiRequest({
        endpoint: "classroom/get_employees_under_manager",
        authenticated: true,
      });
      setTableData(data["employees"]);
    }
    load_data();
  }, [])
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text) => <a>{text}</a>,
      align:'center',
    },
    {
      title: (
        <Popover
          placement="topLeft"
          title="Employee Name"
          content="Here's pop up Text"
          trigger="hover"
        >
          <span>Employee Name</span>
        </Popover>
      ),
      dataIndex: 'username',
      align:'center',
      render: (text) => <a>{text.capitalize()}</a>,
    },
    {
      title: 'Classroom',
      dataIndex: 'classroom',
      render: (text) => <a>{text}</a>,
      align:'center',
    },
    {
      title: 'Attendance Percentage',
      dataIndex: 'attendance_percentage',
      align: 'center',
      render: (_, record) => (
        // <Flex vertical gap="small" style={{ width: "50%" }}>
        <Progress
          percent={record.attendance_percentage}
          percentPosition={{
            align: 'center',
            type: 'inner',
          }}
          size={[40, 10]}
          type="dashboard"
          strokeColor="#B7EB8F"
        />
        // </Flex>
      ),
    },
  ];


  return (
    <Layout style={{margin:"0 16px"}}>
      <Divider>
        <Title>Employee Performance</Title>
      </Divider>
      <div >
      {/* <Table
      rowClassName={() => "rowClassName1"}
      bordered
      columns={columns}
      dataSource={tableData}
    /> */}

        <Table headerBorderRadius={8} pagination={{ pageSize: 5, }} dataSource={tableData} columns={columns } style={{
          backgroundColor: "rgb(255,255,255,0.52)",
          backdropFilter: "blur(5px)"
        }} />
      </div>
    </Layout>
  );
}

export default ManageEmployees;
