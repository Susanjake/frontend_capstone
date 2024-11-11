import React from 'react';
import '../styles/StudentDashboardCard.css';

function StudentDashboardCard({ studentname, trainername, managername }) {
    return (
        <div className="e-card playing">
            <div className="image"></div>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="infotop">

                <br />{studentname}<br />
                <div className="name">
                    {trainername ? (<>Trainer name : {trainername} <br /></>) : ''}

                    {managername ? (<>Manager name : {managername} <br /></>) : ''}

                </div>

            </div>
        </div>
    );
}

export default StudentDashboardCard;
