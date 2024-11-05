import {React,useState} from 'react';
import { Avatar,Layout,Input,Space } from 'antd';
import {UserOutlined} from '@ant-design/icons';

import { MdCircleNotifications } from "react-icons/md";
const {Header} = Layout;

const { Search } = Input

function HeaderStudent() {
    const [collapsed, setCollapsed] = useState(false);
    const colorBgContainer = '#fff'; 
     const borderRadiusLG = '8px'; 
    return (
      <div>
        <Header
    style={{
        display: 'flex', 
        alignItems: 'center',
        justifyContent:'space-between', 
        padding: '0 16px', 
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        
    }}
    >
  
  
  <Search
    placeholder="Search Courses"
    onSearch={(value) => console.log(value)}
    enterButton
    style={{ maxWidth: '40vw',
    }} 
  />
  
  <Space size={16} wrap >
  <Avatar icon={<UserOutlined style={{color:'red'}}/>} />

  </Space>
</Header>
      </div>
    );
  }
  export default HeaderStudent
  
