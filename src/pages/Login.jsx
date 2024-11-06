import { Button, Checkbox, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setPage } from '../app/actions';
import { SendApiRequest } from '../framework/api';


export default function () {
    const dispatch = useDispatch();

    async function OnUserAttemptLogin(values) {
        try {
            let data = await SendApiRequest({
                method: "POST",
                endpoint: "auth/login",
                withCredentials: true,
                data: values
            })
            if (data.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                switch(data.role) {
                    case 'employee':
                        dispatch(setPage("student_home"));
                    break;
                    case 'trainer':
                        dispatch(setPage("trainer_home"));
                    break;
                    case 'manager':
                        dispatch(setPage("manager_home"));
                    break;
                    case 'admin':
                        dispatch(setPage("admin_home"));
                    break;
                }
                
                dispatch(setAuthenticated({
                    role: data.role,
                    authenticated: true
                }));
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: "90vh" }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={OnUserAttemptLogin}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}

                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
}