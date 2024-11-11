import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/cardflip.css';
import { useSpring, animated } from "react-spring";
import { Card, Col, Row, Statistic, Divider } from 'antd';
import { setPage } from '../app/actions';
import { useDispatch } from 'react-redux';


function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 50,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div className='animatedNumber' >
      {number.to((n) => n.toFixed(0))}
    </animated.div>

  )
}
function viewEmployeeDetailsButton() {
  pass
}



function FlipCard({ numberDetail, dividerTitle, buttonText, onButtonClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <>
      <div className="flip-card w-[300px] h-[160px] rounded-md" onClick={handleFlip}>
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6, animationDirection: 'normal' }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-r from-blue-400 to-cyan-700 ">

            <Divider style={{ color: 'white' }}><h1 className='text-white'>{dividerTitle}</h1></Divider>

            <Number n={numberDetail} />


          </div>
          <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] rounded-lg p-4 bg-blue-200">
            {/* <h1 className="text-2xl font-bold  text-white">Know more</h1> */}
            <button
              className='font-bold justify-center bg-blue-400 rounded-lg w-full h-2/4 
             bg-gradient-to-r from-blue-400 to-cyan-700 
             hover:from-cyan-700 hover:to-blue-400'
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
            >

          <span style={{ color: 'white' }}>{buttonText}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function CardFlip({ statistics }) {
  const dispatch = useDispatch();

  function viewClassRoomButton() {
    dispatch(setPage('manage_classroom'));
  }
  function viewEmployeeDetailsButton() {
    dispatch(setPage('manage_employees'));
  }
  function viewTrainerDetailsButton() {
    dispatch(setPage('manage_trainers'));
  }
  return (
    <div className="flex items-center justify-center space-x-10">
      <FlipCard numberDetail={statistics.classroom_count} dividerTitle="Classrooms" buttonText="View Classrooms" onButtonClick={viewClassRoomButton} />
      <FlipCard numberDetail={statistics.employees_under_manager_count} dividerTitle="Employees" buttonText="View Employees" onButtonClick={viewEmployeeDetailsButton} />
      <FlipCard numberDetail={statistics.trainer_count} dividerTitle="Trainers" buttonText="View Trainers" onButtonClick={viewTrainerDetailsButton} />
    </div>
  );
}

export default CardFlip;
