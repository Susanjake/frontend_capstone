import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress } from 'antd';
import { SendApiRequest } from '../framework/api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState([]);

  const showModal = (record) => {
    setModalData(record.meetings);
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
        endpoint: "classroom/get_trainer_details_for_manager",
        authenticated: true,
      });

      setTableData(data['trainers'])

    }
    load_data()
  }, [])
  const columns = [
    {
      title: 'Trainer ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Trainer Name',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Allocated Class",
      dataIndex: "classroom",
      key: 'classroom',
      render: (data, record) => <Button  color="primary" variant="outlined" onClick={() => showModal(record)}>Meetings Detail</Button>,
    }
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
      render: (data, record) => data ? <Tag color="green">Conducted</Tag> : <Tag color="yellow">Scheduled</Tag>
    }
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
      <Modal width={"50%"} title="Meeting Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <Table
          pagination={{ pageSize: 5 }}
          columns={col2}
          dataSource={modalData}
          bordered
        />
      </Modal>
    </>
  )
}
export default App;