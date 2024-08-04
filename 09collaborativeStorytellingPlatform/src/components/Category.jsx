import React from 'react';

const Card = ({
  title,
  description,
  photoUrl,
  photoSize = '150px',
  heading = true,
  content = true,
  reverseLayout = false,
}) => {
  const size = typeof photoSize === 'string' ? photoSize : `${photoSize}px`;

  const cardStyles = {
    backgroundImage: `url(${photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: size,
    height: size,
    borderRadius: '50%', // Ensures the image is circular
    overflow: 'hidden', // Ensures that the content inside stays within the circle
  };

  return (
    <div
      className={`flex ${reverseLayout ? 'flex-row' : 'flex-col'} h-full flex-1 gap-4 text-center rounded-lg min-w-52 pt-4`}
    >
      <div
        className={`bg-center bg-no-repeat flex ${reverseLayout ? 'self-start' : 'self-center'} ${reverseLayout ? 'w-1/3' : 'w-full'}`}
        style={cardStyles}
      >
        {/* Empty div to maintain the circle shape */}
      </div>
      <div
        className={`flex ${reverseLayout ? 'flex-col' : 'flex-row'} items-center ${reverseLayout ? 'text-left' : 'text-center'} ${reverseLayout ? 'ml-4' : 'ml-0'}`}
      >
        {heading && (
          <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
            {title}
          </h3>
        )}
        {content && (
          <p className="text-[#637588] text-sm font-normal leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
