import {React,useState} from 'react';
import { Button,Layout,Input } from 'antd';


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
  <MdCircleNotifications 
  style={{
    width: 35,
    height:35,
  }}/>
</Header>
      </div>
    );
  }
  export default HeaderStudent
  
