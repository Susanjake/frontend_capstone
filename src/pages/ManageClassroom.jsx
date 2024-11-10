import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress, Popover, Drawer, Typography } from 'antd';
import { SendApiRequest } from '../framework/api';
import '../styles/manageclassroom.css';
import Timeline from '../pages/Timeline';

const { Title } = Typography;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [curriculumData, setCurriculumData] = useState({});
  const [open, setOpen] = useState(false);

  // const showDrawer = (record) => {
  //     setCurriculumData(record.modules); 
  //     console.log(record.modules);
  //     setOpen(true);
  //   };
  const showDrawer = (record) => {
    const transformedEvents = record.modules.map((module, index) => ({
      heading: `Module ${index + 1}`,
      subHeading: module.module_name,
      direction: index % 2 === 0 ? "right" : "left"
    }));
    setCurriculumData(transformedEvents);
    console.log(curriculumData);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = (record) => {
    setModalData(record);
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
  },

    [])
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
      render: (_, record) => (
        <Button type="link" onClick={() => showDrawer(record)}>
          Show Curriculum
        </Button>
      )
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
      title: (
        <Popover
          placement="topLeft"
          title="Progress"
          content="Percentage completion with regards to number of expected meetings"
          trigger="hover"
        >
          <span>Progress</span>
        </Popover>
      ),
      key: 'progress',
      dataIndex: 'progress',
      render: (data, record) => (
        <Space size="middle">
          <Progress type="circle" size="small" percent={parseInt(data)} />
          <a onClick={() => {
            showModal(record)
          }}>Learn More</a>
        </Space>
      ),
    },
  ];

  const col2 = [
    {
      title: 'Employee ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Employee Name',
      dataIndex: 'username',
      key: 'username',
    },

  ];



  return (
    <>
      <Divider>
        <Title>
          Classroom Data
        </Title>

      </Divider>
      <Table style={{ padding: '50px' }} columns={columns} dataSource={tableData} />
      <Modal title="Classroom Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table
          columns={col2}
          dataSource={modalData.members}
          bordered
          title={() => (
            <>
              <strong> Trainer : {modalData.trainer_name}</strong>
            </>
          )}

        />
      </Modal>
      <Drawer
        className='MistyDrawer'
        title="Curriculum Details"
        placement='bottom'
        width={400}
        height={400}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            {/* <Button type="primary" onClick={onClose}>
              OK
            </Button> */}
          </Space>
        }
      >
        <Timeline eventData={curriculumData} />
      </Drawer>
    </>
  )
}
export default App;