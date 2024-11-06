import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Radio } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SendApiRequest } from '../framework/api';

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

  return (
    <div>
    <div
    
      id="scrollableDiv"
      style={{
        width:'50vw',
        height: '100vh',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <h1>Student List</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.user_id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture?.large} />} // Adjust according to your API response
                title={<a href="https://ant.design">{item.username}</a>} // Adjust as needed
                description={item.user_id}
              />
              <Radio.Group>
                <Radio value="present">Present</Radio>
                <Radio value="absent">Absent</Radio>
              </Radio.Group>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    
    </div>
  );
}

export default TrainerAttendance;
