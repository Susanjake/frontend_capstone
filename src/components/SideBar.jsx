import Sider from "antd/es/layout/Sider";
import { Menu } from 'antd';
import { useState } from "react";
import { setAuthenticated, setPage } from "../app/actions";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";


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
            dispatch(setPage("default_home"));
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
                items.push(getItem('Home', 'admin_home'));
                break;
            case 'manager':
                // Add side bar items for manager here
                items.push(getItem('Home', 'manager_home'));
                items.push(getItem('Create Classroom', 'create_classroom'));
                break;
            case 'trainer':
                items.push(getItem('Home','trainer_home'));
                items.push(getItem('Students','trainer_student'));
                items.push(getItem('Assignments',''));
                items.push(getItem('Schedule Meeting','trainer_schedule'));
                items.push(getItem('Attendence',''));
                break;


            default:
                // Add side bar items for student user here
                items.push(getItem('Home', 'student_home'));
        }
        // Common for authenticated user
        items.push(getItem('SignOut', 'sign_out'));

    } else {
        // Side bar item for non logged in user
        items.push(getItem('Home', 'student_home'));
        items.push(getItem('Login', 'login'));
        items.push(getItem('Register', 'register'));
    }

    const [collapsed, setCollapsed] = useState(false);
    const currentPage = useSelector((state) => state.currentPage);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                defaultSelectedKeys={['home']}
                mode="inline" items={items}
                selectedKeys={[currentPage]}
                onClick={OnUserClickSideBarItem}
            />
        </Sider>
    )
}