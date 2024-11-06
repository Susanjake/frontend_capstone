import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Radio, Calendar,theme,Checkbox } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SendApiRequest } from '../framework/api';
import '../styles/TrainerAttendance.css';

// Define your StudentInfo function to fetch data from the API
async function StudentInfo() {
  try {
    let data = await SendApiRequest({
      endpoint: "classroom/get_employees_under_trainer", 
      authenticated: true,
    });
    console.log("Data is",data);
    return data;
  } catch (error) {
    console.error("Error fetching student info:", error);
    return [];
  }
}


function TrainerAttendance() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  // Load more data using StudentInfo function
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const newData = await StudentInfo();
      console.log("New data is",newData);
      setData(newData.members);
    } catch {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  async function OnMarkStudentAttendace(e,idx) {
    let copy = [...data];
    let item = {...data[idx]};
    item.present = e.target.checked;
    copy[idx] = item;
    setData(copy);

    let respond = await SendApiRequest({
      endpoint:"classroom/update_attendance",
      method:"POST",
      authenticated:true,
      data:{users:[...copy]}
    });
    if(respond.ok) {
      // we can add toast here later
    } else {
      // same toast but error
    }
  }
  return (
    <div style=
    {{display:'flex',justifyContent:'center',alignItems:'flex-start',padding:'50px',gap:'20px'}}>
        <div
        
          className="scrollableDiv"
          style={{
            width:'50vw',
            height: '100vh',
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <h1 style={{fontSize:"20px"}}>Student List</h1>
          
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List 
              className='listattendance'
              dataSource={data}
              renderItem={(item,idx) => (
                <List.Item key={item.user_id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture?.large} />} // Adjust according to your API response
                    title={<a href="https://ant.design">{item.username}</a>} // Adjust as needed
                    description={item.user_id}
                  />
                  <Radio.Group>
                    <Checkbox value="present" checked={item.present} onChange={(e) => OnMarkStudentAttendace(e,idx)}>Present</Checkbox>
                  </Radio.Group>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      <div className='ListCalendar' style={{
        width:'50vw',
        height:'50vh',
      }}>
        <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
      </div>
    </div>
  );
}

export default TrainerAttendance;
