
import React, { useState } from 'react';
import { Calendar, Modal, Input, Form, Badge, TimePicker } from 'antd';
import moment from 'moment';
import { current } from '@reduxjs/toolkit';

function TrainerSchedule() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    
  });

  const getTime = (obj,timestrings) => {
    setFormData({
      ...formData,
      [selectedDate]:{
        ...formData[selectedDate],
        ['starttime']:timestrings[0],
        ['endtime']:timestrings[1],
      }
    })
  }

  // Handle date click to open the modal
  const onDateClick = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
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
  const handleOk = () => {
    console.log('FormData', formData);
    setIsModalVisible(false);
  };

  // Handle Cancel button click to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Render meeting name inside the calendar
  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const meeting = formData[formattedDate];

    if (meeting && meeting.meetingName) {
      return (
        <div>
          <Badge status="success" text={meeting.meetingName} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Calendar onSelect={onDateClick} cellRender={dateCellRender} disabledDate={(current) => current.isBefore(moment().subtract(1,"day"))}/>
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
              name="meetingName"
              value={formData[selectedDate]?.meetingName || ''}
              onChange={handleInputChange}
              placeholder="Enter meeting name"
            />
          </Form.Item>
          <Form.Item label="Meeting time">
          <TimePicker.RangePicker use12Hours disabledTime={moment.now} onChange={getTime}/>
          </Form.Item>
          <Form.Item label="Meeting link">
            <Input 
            name="meetingLink"
            value={formData[selectedDate]?.meetingLink || ''}
            onChange={handleInputChange}
            placeholder="Enter meeting link"
            />
          </Form.Item>
          
        </Form>
      </Modal>
    </div>
  );
}

export default TrainerSchedule;
