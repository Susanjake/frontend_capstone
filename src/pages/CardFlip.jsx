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
    delay: 200,
    config: { mass: 1, tension: 20, friction: 20 },
  });
  return <animated.div className='animatedNumber'>{number.to((n) => n.toFixed(0))}</animated.div>;
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
      <div className="flip-card w-[150px] h-[150px] rounded-md" onClick={handleFlip}>
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6, animationDirection: 'normal' }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-r from-transparent to-cyan-700 ">

            <Divider className='text-white'><h1>{dividerTitle}</h1></Divider>
            <Number className='bg-slate-400' n={numberDetail} />

          </div>
          <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] rounded-lg p-4 bg-slate-200">
            <h1 className="text-2xl font-bold  text-yellow-200">Know more</h1>
            <button
              className='text-font-bold justify-center bg-orange-100 rounded-lg w-full h-1/4'
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
            >
              {buttonText}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function CardFlip({statistics}) {
  const dispatch = useDispatch();
  
  function viewClassRoomButton() {
   
    console.log("erhewuirh");
    dispatch(setPage('manage_classroom'));
  }
  return (
    <div className="flex items-center justify-center space-x-10">
      <FlipCard numberDetail={statistics.classroom_count} dividerTitle="Classrooms" buttonText="View Classrooms" onButtonClick={viewClassRoomButton} />
      <FlipCard numberDetail={statistics.employees_under_manager_count} dividerTitle="Employees" buttonText="View Employees" onButtonClick={viewEmployeeDetailsButton}/>
      <FlipCard numberDetail={statistics.trainer_count} dividerTitle="Trainers" buttonText="View Trainers" onButtonClick={viewEmployeeDetailsButton}/>
    </div>
  );
}

export default CardFlip;
