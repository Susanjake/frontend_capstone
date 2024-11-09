import React, { useState } from 'react';
import { Space, Table, Tag, Divider, Modal, Button, Progress } from 'antd';

function ManageEmployees() {
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Employee Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Attendance Percentage',
      dataIndex: 'age',
      render: (_, record) => (
        <Space size="middle">
          <Progress percent={30} />
        </Space>
      ),
    },
  ];

  const dataSource = [
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
      <Divider>Employee Performance</Divider>
      <div style={{ padding: '50px' }}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
}

export default ManageEmployees;
