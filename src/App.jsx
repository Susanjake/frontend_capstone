import React, { useEffect, useState } from 'react';
import './App.css'
import { Layout, ConfigProvider, theme } from 'antd';
import HeaderStudent from './components/header';
import StudentHome from './pages/StudentHome';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import Register from './pages/Register';
import CreateClassroom from './pages/CreateClassroom';
import { setAuthenticated, setPage } from './app/actions';
import TrainerHome from './pages/TrainerHome';
import TrainerStudent from './pages/TrainerStudent';
import TrainerSchedule from './pages/TrainerSchedule';
import TrainerAttendance from './pages/TrainerAttendance';
import ManagerHome from './pages/ManagerHome';
import StudentAttendMeeting from './pages/StudentAttendMeeting';
import ManageClassroom from './pages/ManageClassroom';
import ManageEmployees from './pages/ManageEmployees';
import ManageTrainers from './pages/ManageTrainers';
import GuestHome from './pages/GuestHome';
import { colorBgContainer } from './app/theme';
import { Footer, Header } from 'antd/es/layout/layout';
const { Content } = Layout;
import { ToastContainer, toast } from 'react-toastify';

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});


const App = () => {
  const PageMap = {
    'guest_home': <GuestHome />,
    'trainer_schedule': <TrainerSchedule />,
    'student_home': <StudentHome />,
    'trainer_home': <TrainerHome />,
    'trainer_student': <TrainerStudent />,
    'login': <Login />,
    'register': <Register />,
    'create_classroom': <CreateClassroom />,
    'trainer_attendance': <TrainerAttendance />,
    'manager_home': <ManagerHome />,
    'attend_meeting': <StudentAttendMeeting />,
    'manage_classroom': <ManageClassroom />,
    'manage_employees': <ManageEmployees />,
    'manage_trainers': <ManageTrainers />
  }
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setAuthenticated({ authenticated: true, role: localStorage.getItem('role') }))
    }
    if (localStorage.getItem("page")) {
      dispatch(setPage(localStorage.getItem("page")));
    }
  }, [])
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '',
          borderRadius: 2,
          fontSize: 16,
          //itemBg: "#00FFFF",

          // Alias Token
        },
        components: {
          Menu: {
            itemBg: colorBgContainer,
            itemActiveBg: colorBgContainer,
            itemSelectedBg: "grey"
          },
          Layout: {
            itemBg: "#FFFFFF",
            triggerBg: colorBgContainer,
            triggerColor: "blue",
          },
          Card: {
            borderRadius: "8px",
            borderRadiusLG: "20px"
          }
        },
        algorithm: theme.compactAlgorithm
      }}
    >
      {/* <HeaderStudent /> */}
      <ToastContainer />
      {/* <Layout> */}
      {/* <Header title="Samarthya" /> */}
      <Layout style={{
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        height: "auto",
        minHeight: "100vh"
      }}>
        <SideBar />
        <Content width="75%"
          style={{
            marginLeft: '25%'
          }} >
          {PageMap[currentPage]}
        </Content>
        <Footer />
      </Layout>
      {/* </Layout > */}
    </ConfigProvider>
  );
};
export default App;