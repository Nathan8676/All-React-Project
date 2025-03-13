import React from "react";
import { useSelector } from "react-redux";
import { StoryCard } from "./index";
import NewDatabase from "../appwrite/Database";

function Recommendation(Category, maxStories = 10) {
  const stories = useSelector((state) => state.story.stories);
  const getImageUrl = (id) => {
    return NewDatabase.getFilePreview(id);
  };
  console.log(Category);
  const CategoryStory =
    stories?.documents?.map((story) => story.Category === Category) || [];
  const randomStories =
    CategoryStory.sort(() => 0.5 - Math.random()).slice(0, maxStories) || [];
  return (
    <div className="bg-gray-100 dark:bg-black rounded-lg p-4">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {randomStories?.map((story, index) => (
          <StoryCard
            key={index}
            heading={story.Title}
            subheading={story.Description}
            imageSrc={getImageUrl(story.Img)}
            inVertical={true} // Using the vertical layout
          />
        ))}
      </div>
    </div>
  );
}

export default Recommendation;
