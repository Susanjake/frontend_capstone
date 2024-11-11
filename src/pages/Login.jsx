import { Button, Checkbox, Form, Input, Row, Card, Col } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setPage } from '../app/actions';
import { SendApiRequest } from '../framework/api';
import { TypeAnimation } from 'react-type-animation';


export default function () {
    const dispatch = useDispatch();

    const [loginForm, setLoginForm] = useState({ username: '', password: '' });

    async function OnUserAttemptLogin() {
        try {
            let data = await SendApiRequest({
                method: "POST",
                endpoint: "auth/login",
                withCredentials: true,
                data: loginForm
            })
            if (data.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                switch (data.role) {
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
        <Row align="middle" style={{ minHeight: "100vh" }}>

            <Col span={12}>
                <div style={{ textAlign: "center",margin:20 }}>
                    <img src="assets/image.png" width={300} />
                </div>
                <br/>
                <TypeAnimation
                    sequence={[
                        "Empowering Global Teams, One Training at a Time!", 1000,
                        "Transforming Corporate Learning Across Borders.", 1000,
                        "Seamless Training Solutions for a Global Workforce.", 1000,
                        "Maximize Employee Potential, Anytime, Anywhere!", 1000,
                        "Accelerate Growth with Scalable Training Management.", 1000,
                        "Smart Training for a Smarter Workforce.", 1000,
                        "From Local to Global: Training That Knows No Boundaries.", 1000,
                        "Boost Skills. Drive Results. On a Global Scale.", 1000,
                        "Training Made Easy, Performance Made Better.", 1000,
                        "Your Global Training Hub – Where Talent Meets Opportunity.", 1000,
                        "Elevating Employee Learning for Multinational Success.", 1000,
                        "Unlock the Power of Training Across Continents.", 1000,
                        "Streamline Learning, Maximize Global Impact.", 1000,
                        "Building the Workforce of Tomorrow, Today!", 1000,
                        "Tailored Training for Every Region, Every Role.", 1000,
                        "One Platform. Infinite Training Possibilities.", 1000,
                        "Global Learning, Local Success.", 1000,
                        "Transformative Training Solutions for Modern Enterprises.", 1000,
                        "Optimize Talent Development with Global Reach.", 1000,
                        "Your Enterprise, Our Training, Unstoppable Growth.", 1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                />
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
                        <p className="new-button-title">Login </p>
                        <p className="message" style={{ fontSize: 12 }}>Sign in to your account!</p>

                        <label>
                            <input className="input" type="text" placeholder="" required onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
                            <span>Username</span>
                        </label>
                        <label>
                            <input className="input" type="password" placeholder="" required onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                            <span>Password</span>
                        </label>

                        <button className="register-btn" onClick={OnUserAttemptLogin}>
                            <span>Login</span>
                        </button>
                        <p className="signin">Don't have an acount ? <a onClick={() => dispatch(setPage("register"))}>Signup</a> </p>
                    </div>
                </Card>
            </Col>
            {/* <Card style={{
                backdropFilter:"blur(5px)",
                backgroundColor:"rgba(255, 255, 255, .55)"
            }}>
            <Row type="flex" justify="center" align="middle">
             
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
            </Card> */}
        </Row>
    );
}