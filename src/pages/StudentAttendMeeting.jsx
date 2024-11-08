
import React, { useEffect, useState } from 'react';
import { Calendar, Modal, Input, Form, Badge, TimePicker, Flex, Alert } from 'antd';
import moment from 'moment';
import { SendApiRequest } from '../framework/api';
import dayjs, { Dayjs } from "dayjs";

export default function () {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({

    });
    const [meetingError, setMeetingErorr] = useState('');

    // Handle date click to open the modal
    const onDateClick = (value) => {
        setMeetingErorr('');
        const formattedDate = value.format('YYYY-MM-DD');
        console.log(formattedDate)
        setSelectedDate(formattedDate);
        setIsModalVisible(true);
    };


    // Handle OK button click to close the modal
    const handleOk = async (meeting_id) => {
        setMeetingErorr('');
        console.log('FormData', formData);

        /*
        {
          "meeting_name":"Python Wave 2 Introduction Class",
          "meeting_date":"2024-11-07",
          "meeting_link":"https://google.com",
          "start_time":"12:00",
          "end_time":"2:00"
        }
        */
        let data = {};
        let selectedDateobj = dayjs(selectedDate);
        let start_time_obj = dayjs(formData[selectedDate]?.start_time, "HH:mm:ss");
        let end_time_obj = dayjs(formData[selectedDate]?.end_time, "HH:mm:ss");

        if (dayjs().isAfter(start_time_obj) && dayjs().isBefore(end_time_obj) && dayjs().isSame(selectedDateobj, 'date')) {
            data['meeting_id'] = meeting_id;
            await SendApiRequest({
                endpoint: "classroom/attend_meeting",
                authenticated: true,
                method: "POST",
                data: data
            })
            setIsModalVisible(false);

            window.open(`//${formData[selectedDate]?.meeting_link}`, '_blank');
        } else {
            setMeetingErorr("This meeting is not currently active!")
        }
    };

    // Handle Cancel button click to close the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Render meeting name inside the calendar
    const dateCellRender = (value) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const meeting = formData[formattedDate];

        if (meeting && meeting.meeting_name) {
            return (
                <div>
                    <Badge status="success" text={meeting.meeting_name} />
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        async function load_data() {
            let data = await SendApiRequest({
                endpoint: "classroom/get_meetings",
                authenticated: true,
            });
            if (data.ok) {
                let meetings = data.meetings;
                let full_form = {};
                for (let i = 0; i < meetings.length; ++i) {
                    let form_data = {};
                    form_data.meeting_id = meetings[i].meeting_id;
                    form_data.meeting_name = meetings[i].meeting_name;
                    form_data.meeting_link = meetings[i].meeting_link;
                    form_data.start_time = meetings[i].start_time;
                    form_data.end_time = meetings[i].end_time;
                    full_form[meetings[i].meeting_date] = form_data;
                }
                console.log(full_form)
                setFormData(full_form);
            }
        }
        load_data();
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "20px", fontWeight: 600 }}>Pick a meeting to attend</h1>
            <Flex align="center" justify="center">

                <Calendar onSelect={onDateClick} cellRender={dateCellRender} disabledDate={(current) => current.isBefore(moment().subtract(1, "day"))}
                />
                {/* Input form -- modal */}
                <Modal
                    title="Attend Meeting"
                    open={isModalVisible}
                    onOk={() => { handleOk(formData[selectedDate]?.meeting_id) }}
                    onCancel={handleCancel}
                    okText="Attend Meeting"

                >
                    {meetingError !== '' ? <Alert type="error" message={meetingError} /> : ''}
                    <Form layout="vertical">
                        <Form.Item label="Meeting name">
                            <Input
                                name="meeting_name"
                                value={formData[selectedDate]?.meeting_name || ''}
                                disabled
                            />
                        </Form.Item>
                        <Form.Item label="Meeting time">
                            <TimePicker.RangePicker
                                use12Hours
                                disabledTime={moment.now}
                                disabled
                                value={[
                                    formData[selectedDate]?.start_time ? dayjs(formData[selectedDate]?.start_time, "HH:mm:ss") : dayjs(),
                                    formData[selectedDate]?.end_time ? dayjs(formData[selectedDate]?.end_time, "HH:mm:ss") : dayjs()
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Meeting link">
                            <Input
                                name="meeting_link"
                                value={formData[selectedDate]?.meeting_link || ''}
                                disabled
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </Flex>
        </>
    );
}
