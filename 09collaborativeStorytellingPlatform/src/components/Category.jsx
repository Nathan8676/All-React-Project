import React from 'react';

const Card = ({
  title,
  description,
  photoUrl,
  photoSize = '150px',
  heading = true,
  content = true,
  reverseLayout = false,
  chapterCount,  
  genre,         
  bgColor,
}) => {
  const size = typeof photoSize === 'string' ? photoSize : `${photoSize}px`;

  const cardStyles = {
    backgroundImage: `url(${photoUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    
  };

  return (
    <div className={`flex ${reverseLayout ? 'flex-row' : 'flex-col'} gap-4 p-5 text-center rounded-lg ${bgColor} `}>
      {reverseLayout ? (
        <>
          <div
            className="flex items-center justify-center"
            style={{ width: size, height: size, flexShrink: 0 }}
          >
            <div style={cardStyles}></div>
          </div>
          <div className="flex flex-col items-start text-left ml-4 flex-grow">
            {heading && (
              <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] mb-1">
                {title}
              </h3>
            )}
            {content && (
              <p className="text-[#637588] text-sm font-normal leading-normal">
                {description}
              </p>
            )}
            <div className="flex mt-2">
              {chapterCount !== undefined && (
                <p className="text-[#637588] text-sm font-normal leading-normal mr-4">
                  Chapters: {chapterCount}
                </p>
              )}
              {genre && (
                <p className="text-[#637588] text-sm font-normal leading-normal">
                  Genre: {genre}
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-col self-center w-full"
            style={cardStyles}
          ></div>
          <div className="flex flex-col items-center text-center flex-grow">
            {heading && (
              <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] mb-1">
                {title}
              </h3>
            )}
            {content && (
              <p className="text-[#637588] text-sm font-normal leading-normal">
                {description}
              </p>
            )}
            <div className="flex mt-2">
              {chapterCount !== undefined && (
                <p className="text-[#637588] text-sm font-normal leading-normal mr-4">
                  Chapters: {chapterCount}
                </p>
              )}
              {genre && (
                <p className="text-[#637588] text-sm font-normal leading-normal">
                  Genre: {genre}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
