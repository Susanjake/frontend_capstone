
import React, { useEffect, useState } from 'react';
import { Calendar, Modal, Input, Form, Badge, TimePicker, Flex } from 'antd';
import moment from 'moment';
import { SendApiRequest } from '../framework/api';
import dayjs, { Dayjs } from "dayjs";
function TrainerSchedule() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({

  });

  const getTime = (obj, timestrings) => {
    setFormData({
      ...formData,
      [selectedDate]: {
        ...formData[selectedDate],
        ['start_time']: obj[0],
        ['end_time']: obj[1],
      }
    })
  }

  // Handle date click to open the modal
  const onDateClick = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    console.log(formattedDate)
    setSelectedDate(formattedDate);
    setFormData({
      ...formData,
      [selectedDate]: {
        ...formData[selectedDate],
        start_time:dayjs(),
        end_time:dayjs(),
      },
    });
    setIsModalVisible(true);
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [selectedDate]: {
        ...formData[selectedDate],
        [name]: value,
      },
    });
  };

  // Handle OK button click to close the modal
  const handleOk = async () => {
    console.log('FormData', formData);
    setIsModalVisible(false);
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
    data['meeting_name'] = formData[selectedDate].meeting_name;
    data['meeting_link'] = formData[selectedDate].meeting_link;
    data['start_time'] = dayjs(formData[selectedDate].start_time).format("HH:mm:ss");
    data['end_time'] = dayjs(formData[selectedDate].end_time).format("HH:mm:ss");
    data['meeting_date'] = selectedDate;
    console.log("data",data,formData)
    await SendApiRequest({
      endpoint:"classroom/schedule_meeting",
      authenticated:true,
      method:"POST",
      data:data
    })
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
        endpoint:"classroom/get_meetings",
        authenticated:true,
      });
      if(data.ok) {
        let meetings = data.meetings;
        let full_form = {};
        for(let i=0;i<meetings.length;++i) {
          let form_data = {};
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
  },[])

  return (
    <>
      
      <h1 style={{ textAlign: "center", fontSize: "30px", fontWeight: 400, color:'#1e40af',padding:'20px' }}>Schedule a meeting</h1>
      <div className='card shadow' style={{padding:'10px'}}>
        <Calendar onSelect={onDateClick} cellRender={dateCellRender} disabledDate={(current) => current.isBefore(moment().subtract(1, "day"))}
        />
        {/* Input form -- modal */}
        <Modal
          title="Schedule a Meeting"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Meeting name">
              <Input
                name="meeting_name"
                value={formData[selectedDate]?.meeting_name || ''}
                onChange={handleInputChange}
                placeholder="Enter meeting name"
              />
            </Form.Item>
            <Form.Item label="Meeting time">
              <TimePicker.RangePicker 
                use12Hours 
                disabledTime={moment.now} 
                onChange={getTime} 
                value={[
                  formData[selectedDate]?.start_time ? dayjs(formData[selectedDate]?.start_time,"HH:mm:ss") : dayjs(), 
                  formData[selectedDate]?.end_time ? dayjs(formData[selectedDate]?.end_time,"HH:mm:ss") :dayjs()
                ]} 
              />
            </Form.Item>
            <Form.Item label="Meeting link">
              <Input
                name="meeting_link"
                value={formData[selectedDate]?.meeting_link || ''}
                onChange={handleInputChange}
                placeholder="Enter meeting link"
              />
            </Form.Item>

          </Form>
        </Modal>
      </div>
     
    </>
  );
}

export default TrainerSchedule;
