import { React, useState } from 'react';
import { Avatar, Layout, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { MdCircleNotifications } from "react-icons/md";
import { useSelector } from 'react-redux';
import { borderRadiusLG, colorBgContainer } from '../app/theme';
const { Header } = Layout;

const { Search } = Input

function HeaderStudent() {
  const userInfo = useSelector((state) => state.userInfo);
  
  return (
    <div>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          height:"4vw",
        }}
      >
        {/* <Search
    placeholder="Search Courses"
    onSearch={(value) => console.log(value)}
    enterButton
    style={{ maxWidth: '40vw',
    }} 
  /> */}

        <div style={{
            maxWidth: '40vw',
          }}
        />

        <Space size={16} wrap >
          {userInfo.authenticated ? <Avatar icon={<UserOutlined style={{ color: 'red' }} />} />: ''}

        </Space>
      </Header>
    </div>
  );
}
export default HeaderStudent

