import Sider from "antd/es/layout/Sider";
import { Menu } from 'antd';
import { useState } from "react";
import { setAuthenticated, setPage } from "../app/actions";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { colorBgContainer } from "../app/theme";


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


export default function () {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);

    function OnUserClickSideBarItem(e) {
        if (e.key === "sign_out") {
            localStorage.clear();
            dispatch(setPage("login"));
            dispatch(setAuthenticated({ authenticated: false, role: '' }))
            window.location.reload()
        } else {
            dispatch(setPage(e.key));
        }
    }
    let items = [];

    if (userInfo.authenticated) {
        switch (userInfo.role) {
            case 'admin':
                // Add sidebar items for admin here
                items.push(getItem('Home', 'admin_home', <HomeIcon />));
                break;
            case 'manager':
                // Add side bar items for manager here
                items.push(getItem('Home', 'manager_home', <HomeIcon />));
                items.push(getItem('Create Classroom', 'create_classroom', <CreateNewFolderIcon />));
                items.push(getItem('Manage Classroom', 'manage_classroom', <ManageAccountsIcon />));
                items.push(getItem('Manage Employees', 'manage_employees', <GroupsIcon />));
                items.push(getItem('Manage Trainers', 'manage_trainers', <CastForEducationIcon />));

                break;
            case 'trainer':
                items.push(getItem('Home', 'trainer_home', <HomeIcon />));
                //items.push(getItem('Students', 'trainer_student', <PeopleAltIcon />));
                // items.push(getItem('Assignments',''));
                items.push(getItem('Schedule Meeting', 'trainer_schedule', <ScheduleIcon />));
                items.push(getItem('Attendance', 'trainer_attendance', <PlaylistAddCheckIcon />));
                items.push(getItem('Meetings', 'attend_meeting', <MeetingRoomIcon />))
                break;


            default:
                // Add side bar items for student user here
                items.push(getItem('Home', 'student_home', <HomeIcon />));
                items.push(getItem('Meetings', 'attend_meeting', <MeetingRoomIcon />))
        }
        // Common for authenticated user
        items.push(getItem('SignOut', 'sign_out', <ExitToAppIcon />));

    } else {
        // Side bar item for non logged in user
        //items.push(getItem('Home', 'guest_home', <HomeIcon />));
        items.push(getItem('Login', 'login', <LoginIcon />));
        items.push(getItem('Register', 'register', <HowToRegIcon />));
    }

    const [collapsed, setCollapsed] = useState(false);
    const currentPage = useSelector((state) => state.currentPage);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                background: "white",
                // position:"fixed",
                height: "auto"
            }}
        >
            <div className="demo-logo-vertical" />
            <div style={{ textAlign: "center",marginLeft:"25%",marginBottom:"15%",marginTop:"15%" }}>
                <img src="assets/image.png" width={100} />
            </div>
            <Menu
                defaultSelectedKeys={['home']}
                mode="inline" items={items}
                selectedKeys={[currentPage]}
                onClick={OnUserClickSideBarItem}
                style={{
                    backgroundColor: "transparent",
                    backdropFilter: "blur(5px)",
                }}
            />
        </Sider>
    )
}