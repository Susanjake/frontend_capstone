import React, { useEffect, useState } from 'react';
import './App.css'
import { Layout, ConfigProvider } from 'antd';
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
import GuestHome from './pages/GuestHome';
import { colorBgContainer } from './app/theme';
const { Content } = Layout;




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
    'manage_classroom':<ManageClassroom />,
    'manage_employees':<ManageEmployees/>,
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
          //itemBg: "#00FFFF",

          // Alias Token
        },
        components: {
          Menu: {
            itemBg: colorBgContainer,
            itemActiveBg: colorBgContainer,
            itemSelectedBg: colorBgContainer
          },
          Layout: {
            itemBg: "#FFFFFF",
            triggerBg: colorBgContainer,
            triggerColor: "blue",
          }
        }
      }}
    >
      {/* <HeaderStudent /> */}

      <Layout
        style={{
          height: "100vh" //91.3 if header is used
        }}
      >
        <SideBar />
        <Layout style={{
          backgroundImage: "url('assets/background.png')",
          backgroundSize:"cover",
          backgroundRepeat:"repeat",
          //backgroundPosition:"center center"
          // backgroundColor:"#AFC1D6"
        }}>
          <Content >
            {PageMap[currentPage]}
          </Content>
        </Layout>
      </Layout >
    </ConfigProvider>
  );
};
export default App;