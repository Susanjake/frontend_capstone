import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress } from 'antd';
import { SendApiRequest } from '../framework/api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function load_data() {
      let data = await SendApiRequest({
        endpoint: "classroom/get_manager_dashboard_details",
        authenticated: true,
      });

      setTableData(data['classes'])

    }
    load_data()
  }, [])
  const columns = [
    {
      title: 'Classroom',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Curriculum',
      dataIndex: 'curriculum',
      key: 'curriculum',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'eod',
      key: 'eod',
    },
    {
      title: 'Number of Employees',
      key: 'employee_count',
      dataIndex: 'employee_count',
    },
    {
      title: 'Progress',
      key: 'progress',
      dataIndex: 'progress',
      render: (data, record) => (
        <Space size="middle">
          <Progress type="circle" size="small" percent={parseInt(data)} />
          <a onClick={showModal}>Learn More</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const col2 = [
    {
      title: 'Employeeid',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Employeename',
      dataIndex: 'name',
      key: 'name',
    },

  ];
  const data2 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <>
      <Divider>Classroom Data</Divider>
      <Table style={{ padding: '50px' }} columns={columns} dataSource={tableData} />
      <Modal title="Classroom Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table
          columns={col2}
          dataSource={data2}
          bordered
          title={() => 'Class number : no Trainer name: trainer_name'}
        />
      </Modal>
    </>
  )
}
export default App;