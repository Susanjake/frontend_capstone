import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress,Typography } from 'antd';
import { SendApiRequest } from '../framework/api';

const {Title} = Typography;

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
      render: (text) => <a>{text.capitalize()}</a>,
    },
    {
      title: "Allocated Class",
      dataIndex: "classroom",
      key: 'classroom',
      render: (data, record) => <Button style={{borderRadius:"20px"}} color="primary" variant="outlined" onClick={() => showModal(record)}>Meetings Detail</Button>,
    }
  ];
  

  const col2 = [
    {
      title: 'Title',
      dataIndex: 'meeting_name',
      key: 'meeting_name',
      render: (text) => <a>{text}</a>,
      align:'center',
    },
    {
      title: 'Meeting Date',
      dataIndex: 'meeting_date',
      key: 'meeting_date',
      align:'center',
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      align:'center',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      align:'center',
    },
    {
      title: 'Status',
      dataIndex: 'conducted',
      key: 'conducted',
      render: (data, record) => data ? <Tag color="green">Conducted</Tag> : <Tag color="yellow">Scheduled</Tag>,
      align:'center',
    }
  ];
  
  return (
    <>
      <Divider>
        <Title style={{fontSize: "30px", fontWeight: 500, color:'#1e40af',padding:'10px'}}>Trainers</Title>
      </Divider>
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