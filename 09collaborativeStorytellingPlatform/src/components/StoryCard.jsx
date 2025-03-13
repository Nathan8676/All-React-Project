import React from 'react';
import { Button } from '../components';
import { Link } from 'react-router-dom';

const StoryCard = ({$id, heading, subheading, imageSrc , inVertical = false , Chapter}) => {
  if(!inVertical) {
  return (
    <div className="p-4">
      <div className="flex items-stretch justify-between gap-4 rounded-xl">
        {/* Left Side */}
        <div className="flex flex-[2_2_0px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#111418] text-base font-bold leading-tight">{heading}</p>
            <p className="text-[#637588] text-sm font-normal leading-normal">{subheading}</p>
          </div>
          <Link to={`/story/${$id}`}>
          <div className="flex items-start"> {/* Changed to items-start */}
            <Button
              bgColor="bg-[#f0f2f4]"
              textColor="text-[#111418]"
              type="button"
              className='self-start'
            >
              Read
            </Button>
          </div>
          </Link>
        </div>

        {/* Right Side */}
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      </div>
    </div>
  );
  } else {
    return (
      <Link to={`/story/${$id}`}>
      <div className='w-4/12 p-4  bg-gray-100  dark:bg-black rounded-lg'>
        <div className="w-full bg-center bg-no-repeat aspect-[16/9] bg-cover rounded-xl flex-1" style={{ backgroundImage: `url(${imageSrc})` }}></div>
        <div className='w-full p-4'>
          <h3 className='text-xl dark:text-white text-black font-bold'>{heading}</h3>
          <p className='text-sm dark:text-white text-black font-normal'>{subheading}</p>
        </div>
        <div> Chapter {Chapter}</div>
      </div>
      </Link>
    )
  }
};

export default StoryCard;
