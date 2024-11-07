import React, { useEffect, useState } from 'react';
import './App.css'
import { Layout } from 'antd';
import HeaderStudent from './components/header';
import StudentHome from './pages/StudentHome';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import Register from './pages/Register';
import CreateClassroom from './pages/CreateClassroom';
import { setAuthenticated } from './app/actions';
import TrainerHome from './pages/TrainerHome';
import TrainerStudent from './pages/TrainerStudent';
import TrainerSchedule from './pages/TrainerSchedule';
import TrainerAttendance from './pages/TrainerAttendance';
import ManagerHome from './pages/ManagerHome';
const { Content } = Layout;

const App = () => {
  const PageMap = {
    'guest_home': <StudentHome />,
    'trainer_schedule': <TrainerSchedule />,
    'student_home': <StudentHome />,
    'trainer_home': <TrainerHome />,
    'trainer_student': <TrainerStudent />,
    'login': <Login />,
    'register': <Register />,
    'create_classroom': <CreateClassroom />,
    'trainer_attendance': <TrainerAttendance />,
    'manager_home': <ManagerHome />
  }
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setAuthenticated({ authenticated: true, role: localStorage.getItem('role') }))
    }
  }, [])
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideBar />
      <Layout style={{
          backgroundImage:"url('assets/background.jpg')"
          //backgroundColor:"aliceblue"
        }}>
        <HeaderStudent />
        <Content >
        {PageMap[currentPage]}
      </Content>
    </Layout>
    </Layout >
  );
};
export default App;