import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Radio, Calendar,theme,Checkbox, Button } from 'antd';
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


async function GetRandomPic(){
  const response = await fetch("https://randomuser.me/api/")
  if(!response.ok){
    throw new Error("Could not fetch resource");
  }
  const picdata = await response.json();
  //console.log(picdata['results'][0].picture.medium);
  return picdata['results'][0].picture.medium
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
      const membersWithPics = newData.members.map(
        async (member) =>{
          try{
            const picUrl = await GetRandomPic();
            return {...member,
              picture:{large:picUrl}
            };
          }catch{
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

  return (
    
    <div className="Maindiv" style=
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
          {/* <h1 style={{fontSize:"20px"}}>Student List</h1> */}
          
         
            <List 
              className='listattendance'
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.user_id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture?.large} />} // Adjust according to your API response
                    title={item.username} // Adjust as needed
                    description={item.user_id}
                  />
                  <Radio.Group>
                    <Checkbox value="present">Present</Checkbox>
                  </Radio.Group>
                </List.Item>
              )}
            />
          
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
