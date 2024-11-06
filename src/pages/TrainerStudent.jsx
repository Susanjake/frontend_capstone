import React from 'react'
import { Card, Col, Row, Input } from "antd";
import '../styles/TrainerStudent.css';


function TrainerStudent() {

    function EmployeeCards({name,userId,attendance}){
        return(
            <>
          
                <div className="profile-box">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpreview.keenthemes.com%2Fmetronic-v4%2Ftheme_rtl%2Fadmin_4%2Fpage_user_profile_2.html&psig=AOvVaw24EeyDNLiceUVMRLpqO9rI&ust=1730907162031000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIi_m-fBxYkDFQAAAAAdAAAAABAE" 
                    className='profile-pic' alt="Employee"></img>
                    <h3>{name}</h3>
                    <p>EmployeeId: {userId}</p>
                    <p>Attendance: {attendance}</p>
                </div>
            
            </>
        )
        }
    //Sample data
    const employees = [
        [
          { name: 'John Doe', user_id: 'E001', image_url: 'https://via.placeholder.com/150',attendance:'90%' },
          { name: 'Jane Smith', user_id: 'E002', image_url: 'https://via.placeholder.com/150' },
          { name: 'Sam Wilson', user_id: 'E003', image_url: 'https://via.placeholder.com/150' },
        ],
        [
          { name: 'Chris Evans', user_id: 'E004', image_url: 'https://via.placeholder.com/150' },
          { name: 'Scarlett Johansson', user_id: 'E005', image_url: 'https://via.placeholder.com/150' },
          { name: 'Robert Downey Jr.', user_id: 'E006', image_url: 'https://via.placeholder.com/150' },
        ],
        [
          { name: 'Tom Holland', user_id: 'E007', image_url: 'https://via.placeholder.com/150' },
          { name: 'Mark Ruffalo', user_id: 'E008', image_url: 'https://via.placeholder.com/150' },
          { name: 'Chris Hemsworth', user_id: 'E009', image_url: 'https://via.placeholder.com/150' },
        ]
      ];

 
    return (
     <>
     <h2 style={{padding:'20px'}}>Student Information</h2>
     <div class='student-container' >
    
       {employees.map((row,idx1)=>{
        return(
            <Row className='frame' key={idx1}>
                {row.map((employee,idx2)=>{
                    return(
                        <Col className='frame' key={idx2} span={8}>
                            <Card className="student-card">
                                <div className="card-image">
                                 <img className="activator" alt="empimage" height="150" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> 
                                </div>
                                <div className="emp-details">
                                    <span>{employee.name}</span>
                                    <p>
                                        Employee id:{employee.user_id} <br />
                                        Attendence : {employee.attendence} <br />
                                    </p>
                                </div>
                                <div
                                style={{ backgroundColor: "rgba(255, 54, 4, 0.479)" }}
                                >
                                </div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
       })}
      
    </div>
    </>
  )
  

};

export default TrainerStudent
