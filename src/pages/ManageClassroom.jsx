import React,{useState} from 'react';
import { Space, Table, Tag, Divider, Modal, Button,Progress} from 'antd';

function App(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const columns = [
        {
          title: 'Classroom',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Curriculum',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Start Date',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'End Date',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Number of Employees',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Progress',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Progress type="circle" size="small" percent={75} />
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
    
    const col2=[
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
       
    ]
    const data2=[
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

    ]
return(
    <>
    <Divider>Classroom Data</Divider>
    <Table style={{ padding: '50px' }} columns={columns} dataSource={data} />

    <Modal title="Classroom Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Table
    columns={col2}
    dataSource={data2}
    bordered
    title={() => 'Class number : no Trainer name: trainer_name' }
  />
    </Modal>
  </>
)
}
export default App;