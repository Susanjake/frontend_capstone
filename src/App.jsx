import React, { useState } from 'react';
import './App.css'
import { Layout } from 'antd';
import HeaderStudent from './components/header';
import StudentHome from './pages/StudentHome';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Register from './pages/Register';
const { Content } = Layout;


const App = () => {
  const PageMap = {
    'guest_home':<StudentHome/>,
    'student_home':<StudentHome/>,
    'login':<Login/>,
    'register':<Register/>
  }
  const currentPage = useSelector((state) => state.currentPage);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideBar />
      <Layout>
        <HeaderStudent />
        <Content>
          {PageMap[currentPage]}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;