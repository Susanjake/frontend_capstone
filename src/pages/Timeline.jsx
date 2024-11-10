import React, { Fragment } from 'react';

// Timeline component
function Timeline({eventData}) {
    console.log(eventData);

  return (
    <div className="flex flex-col gap-y-3 w-full my-4 ">
      <Circle />
      {eventData.map((event, key) => (
        <Fragment key={key}>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center mx-auto">
            {event.direction === 'left' ? (
              <EventCard heading={event.heading} subHeading={event.subHeading} />
            ) : (
              <div></div>
            )}
            <Pillar />
            {event.direction === 'right' ? (
              <EventCard heading={event.heading} subHeading={event.subHeading} />
            ) : (
              <div></div>
            )}
          </div>
          {key < eventData.length - 1 && <Circle />}
        </Fragment>
      ))}
      <Circle />
    </div>
  );
}

// Circle component
const Circle = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-full w-4 h-4 bg-blue-500 mx-auto"></div>
  );
};

// Pillar component
const Pillar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-full rounded-b-full w-2 h-full bg-blue-500 mx-auto"></div>
  );
};

// EventCard component
const EventCard = ({ heading, subHeading }) => {
  return (
    <div className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-y-2 border shadow-md rounded-xl p-4">
      <div className="text-blue-800 font-bold text-lg-border-b">{heading}</div>
      <div className="text-sm text-gray-700">{subHeading}</div>
    </div>
  );
};

export default Timeline;
