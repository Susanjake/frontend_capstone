import { Alert, Button, Checkbox, Form, Input, Row,Card } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setPage } from '../app/actions';
import { SendApiRequest } from '../framework/api';

export default function () {
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');

    async function OnUserAttemptRegister(values) {
        console.log(values)
        try {
            setErrorMsg('');
            let data = await SendApiRequest({
                method: "POST",
                endpoint: "auth/register",
                withCredentials: true,
                data: values
            })
            if (data.ok) {
                dispatch(setPage("login"));
            } else {
                setErrorMsg(data.error);
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: "90vh" }}>
            {/* {errorMsg !== '' ? (<Alert type="error" message={errorMsg} />) : ''} */}
            <Card style={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255, 255, 255, .55)"
            }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 12,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={OnUserAttemptRegister}
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
                        label="Email"
                        name="email_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email id!',
                            },
                        ]}
                    >
                        <Input type="email" />
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
                        label="Confirm Password"
                        name="re_password"
                        rules={[
                            {
                                required: true,
                                message: 'Please retype your password!',
                            },
                        ]}

                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
}