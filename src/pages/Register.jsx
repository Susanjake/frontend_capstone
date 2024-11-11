import { Alert, Button, Checkbox, Form, Input, Row, Card, Image, Col, Layout, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setPage } from '../app/actions';
import { SendApiRequest } from '../framework/api';

const { Title } = Typography;

export default function () {
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState('');
    const [registerForm, setRegisterForm] = useState({ username: '', password: '', re_password: '', email_id: '' });

    async function OnUserAttemptRegister() {
        try {
            setErrorMsg('');
            let data = await SendApiRequest({
                method: "POST",
                endpoint: "auth/register",
                withCredentials: true,
                data: registerForm
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
        <Layout>
            <Row align="middle" style={{ minHeight: "100vh" }}>
                {/* {errorMsg !== '' ? (<Alert type="error" message={errorMsg} />) : ''} */}
                <Col span={12}>
                    <img src="assets/register.png" height={200} />
                </Col>
                <Col span={12}>
                    <Card className="form" style={{
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(255, 255, 255, .55)",
                        borderColor: "black",
                        textAlign: "center",
                        boxShadow: '2px 2px 5px #60a5fa, -20px -20px 60px #ffffff',
                    }}>
                        <div className="form">
                            <p className="new-button-title">Register </p>
                            <p className="message" style={{ fontSize: 12 }}>Sign up now and unlock your potential!</p>

                            <label>
                                <input className="input" type="text" placeholder="" required onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} />
                                <span>Username</span>
                            </label>
                            <label>
                                <input className="input" type="email" placeholder="" required onChange={(e) => setRegisterForm({ ...registerForm, email_id: e.target.value })} />
                                <span>Email</span>
                            </label>

                            <label>
                                <input className="input" type="password" placeholder="" required onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
                                <span>Password</span>
                            </label>
                            <label>
                                <input className="input" type="password" placeholder="" required onChange={(e) => setRegisterForm({ ...registerForm, re_password: e.target.value })} />
                                <span>Confirm password</span>
                            </label>
                            <button className="register-btn" onClick={OnUserAttemptRegister}>
                                <span>Get started</span>
                            </button>                            
                            <p className="signin">Already have an acount ? <a onClick={() => dispatch(setPage("login"))}>Signin</a> </p>
                        </div>
                    </Card>
                    {/* <Card style={{
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(255, 255, 255, .55)",
                        borderColor: "black",
                        textAlign:"center",
                        boxShadow: '2px 2px 5px #60a5fa, -20px -20px 60px #ffffff'
                    }}>
                        <Title>Create New Account</Title>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 12,
                            }}
                            wrapperCol={{
                                span: 12,
                            }}
                            style={{
                                maxWidth: 400,
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
                                    span: 12,
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card> */}
                </Col>

            </Row>
        </Layout>
    );
}