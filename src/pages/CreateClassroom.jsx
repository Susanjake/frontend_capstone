import { Form, Typography, Input, Select, Row, Steps, Button, Flex, Upload, DatePicker, Card, Divider } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../app/actions';
import ModuleAdder from '../components/ModuleAdder';
import { SendApiRequest } from '../framework/api';
const { Title } = Typography;


export default function () {

    const [trainerList, setTrainerList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({});
    const [form] = Form.useForm();

    function setFormDataName(e) {
        setFormData({ ...formData, title: e.target.value });
    }

    function setFormDataTrainerSelect(value) {
        setFormData({ ...formData, trainer_id: value });
    }

    function setFormDataMemberSelect(value) {
        setFormData({ ...formData, members: value });
    }

    function setFormDataEodPick(value, dateString) {
        setFormData({ ...formData, eod: dateString })
        console.log(formData)
    }
    function setFormDataStartDatePick(value, dateString) {
        setFormData({ ...formData, start_date: dateString })
        console.log(formData)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        async function OnPageLoad() {
            let data = await SendApiRequest({
                endpoint: "classroom/get_available_trainers",
                authenticated: true
            });
            if (data.ok) {
                setTrainerList(data.results);
            } else {
                dispatch(setPage("home"));
            }

            data = await SendApiRequest({
                endpoint: "classroom/get_available_employees",
                authenticated: true
            });
            if (data.ok) {
                setEmployeeList(data.results);
            } else {
                dispatch(setPage("home"));
            }
        }
        OnPageLoad();
    }, []);


    const steps = [
        {
            title: "Classroom Information",
            content: "Classroom Content"
        },
        {
            title: "Curriculum",
            content: "Create Curriculum"
        },
        {
            title: "Completion Information",
            content: "What will be the expected completion time?"
        }
    ];
    function OnFormUpdate(values) {
        /// todos
        setFormData({ ...formData, ...form.getFieldsValue() })
    }

    async function OnCreateClassRoom() {
        let data = await SendApiRequest({
            endpoint: "classroom/create_classroom",
            method: "POST",
            authenticated: true,
            data: formData
        });

        if (data.ok) {
            dispatch(setPage("manager_home"));
        } else {
            // error message set here
        }

    }
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    function GenerateStepContent() {
        switch (current) {
            case 0:
                return (
                    <>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide a title for this class!',
                                },
                            ]}
                        >
                            <Input name="title" onInput={setFormDataName} />
                        </Form.Item>
                        <Form.Item
                            label="Select Trainer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a trainer for this clasroom!',
                                },
                            ]}
                        >
                            <Select
                                options={trainerList}
                                name="trainer_id" onChange={setFormDataTrainerSelect}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Select Employees"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select employeees for this clasroom!',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                name="members" onChange={setFormDataMemberSelect}
                                options={employeeList}
                            >
                            </Select>
                        </Form.Item>

                    </>
                )
            case 1:
                return (
                    <ModuleAdder />
                )

            case 2:
                return (
                    <>
                        <Form.Item label="Start Date">
                            <DatePicker name="start_date" onChange={setFormDataStartDatePick}>
                            </DatePicker>
                        </Form.Item>
                        <Form.Item label="Completion Date">
                            <DatePicker name="eod" onChange={setFormDataEodPick}>
                            </DatePicker>
                        </Form.Item>
                    </>
                )
        }
    }

    return (

        <Content style={{
            margin: '0 16px',
        }}>
            <Divider>
                <Title style={{fontSize: "30px", fontWeight: 500, color:'#1e40af',padding:'10px'}}>
                    Create Classroom
                </Title>
            </Divider>

            <Steps current={current} items={steps} />
            <Content style={{
                margin: "20px"
            }}>
                <Card style={{
                    backdropFilter: "blur(5px)",
                    backgroundColor: "rgba(255, 255, 255, .55)"
                }}>

                    <Form onChange={OnFormUpdate} onFinish={OnFormUpdate} form={form}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: "100%",
                        }}
                    >
                        {GenerateStepContent()}
                        <Flex>
                            {current > 0 && (
                                <Form.Item>
                                    <Button
                                        style={{
                                            margin: '0 8px',
                                        }}
                                        onClick={() => prev()}
                                    >
                                        Previous
                                    </Button>
                                </Form.Item>
                            )}
                            {current < steps.length - 1 && (
                                <Form.Item>

                                    <Button type="primary" htmlType="submit" onClick={() => next()}>
                                        Next
                                    </Button>
                                </Form.Item>
                            )}

                            {current === steps.length - 1 && (
                                <Form.Item>

                                    <Button type="primary" htmlType="submit" onClick={OnCreateClassRoom}>
                                        Done
                                    </Button>
                                </Form.Item>
                            )}
                        </Flex>
                    </Form>
                </Card>
            </Content>
        </Content>
    )
}