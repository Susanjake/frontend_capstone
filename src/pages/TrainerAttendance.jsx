import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Radio, Calendar, theme, Checkbox, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SendApiRequest } from '../framework/api';
import '../styles/TrainerAttendance.css';
import moment from 'moment';

// Define your StudentInfo function to fetch data from the API


function TrainerAttendance() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);

  async function StudentInfo() {
    try {
      setLoading(true);
      let data = await SendApiRequest({
        endpoint: "classroom/get_employees_attendance_list",
        authenticated: true,
        data: {date:selectedDate},
        method:"POST"
      });
      console.log("Data is", data);
      setLoading(false)
      return data;
    } catch (error) {
      console.error("Error fetching student info:", error);
      return [];
    }
  }


  async function GetRandomPic() {
    const response = await fetch("https://randomuser.me/api/")
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const picdata = await response.json();
    //console.log(picdata['results'][0].picture.medium);
    return picdata['results'][0].picture.medium
  }
  const onPanelChange = async (value) => {
    console.log("Here")
    setSelectedDate(value.format('YYYY-MM-DD'))
    setData([])
    await loadMoreData();
    console.log(value.format('YYYY-MM-DD'));
  };
  // Load more data using StudentInfo function
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const newData = await StudentInfo();
      
      const membersWithPics = newData.members.map(
        async (member) => {
          try {
            const picUrl = await GetRandomPic();
            return {
              ...member,
              picture: { large: picUrl }
            };
          } catch {
            return member;
          }
        });
      const updatedMembers = await Promise.all(membersWithPics);
      setData(updatedMembers);
    } catch {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  async function OnMarkStudentAttendace(e, idx) {
    let copy = [...data];
    let item = { ...data[idx] };
    item.present = e.target.checked;
    copy[idx] = item;
    setData(copy);

    let respond = await SendApiRequest({
      endpoint: "classroom/update_attendance",
      method: "POST",
      authenticated: true,
      data: { users: [...copy], date: selectedDate }
    });
    if (respond.ok) {
      // we can add toast here later
    } else {
      // same toast but error
    }
  }
  return (

    <div className="Maindiv" style=
      {{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '50px', gap: '20px' }}>
      <div style={{
        width: '50vw',
        height: '55vh',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
        className="scrollableDiv"
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600, textAlign: "center" }}>Student List</h1>
        <div
          style={{
            overflow: 'scroll',
            scrollbarColor: "rgb(255,255,255,1) transparent",
            height: "100%"
          }}
        >
          <List
            style={{
              //height:"50vh"
            }}
            className='listattendance'
            dataSource={data}
            renderItem={(item, idx) => (
              <List.Item key={item.user_id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture?.large} />} // Adjust according to your API response
                  title={item.username} // Adjust as needed
                  description={item.user_id}
                />
                <Radio.Group>
                  <Checkbox value="present" checked={item.present} onChange={(e) => OnMarkStudentAttendace(e, idx)}>Present</Checkbox>
                </Radio.Group>
              </List.Item>
            )}
          />

        </div>
      </div>
      <div className='ListCalendar' style={{
        width: '50vw',
        height: '50vh',
      }}>
        <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={onPanelChange} disabledDate={(current) => current.isAfter(moment())} />
      </div>
    </div>

  );
}

export default TrainerAttendance;
