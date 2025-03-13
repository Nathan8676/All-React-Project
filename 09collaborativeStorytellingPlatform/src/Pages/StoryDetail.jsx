import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getStory } from "../store/storySlice";
import { TopStories, Recommendation } from "../components";
import NewDatabase from "../appwrite/Database";

function StoryDetail() {
  const { StoryId:id } = useParams();
  const dispatch = useDispatch();
  const storyState = useSelector((state) => state.story);
  const story = storyState?.story;
  const storyLoading = storyState?.storyLoading;
  const [storyChapters, setStoryChapters] = useState([]);

  const chapterOrder = () => {
    if (story?.storyChapters) {
      return story.storyChapters.sort((a, b) => a.Order - b.Order);
    }
    return [];
  };

  useEffect(() => {
    if (id) {
      dispatch(getStory({ Id: id }));
    }
  }, [id]);

  useEffect(() => {
    if (story) {
      console.log(story.Category);
      setStoryChapters(chapterOrder());
    }
  }, [story]);

  if (storyLoading) {
    return <div>Loading...</div>;
  }

  if (!story) {
    return <div className="text-red-500">Story not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Main Content: Cover Image on Left, Story Details on Right */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cover Image */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <img
            src={NewDatabase.getFilePreview(story.Img)}
            alt={story.Title}
            className="w-full h-auto max-h-96 object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Story Details */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{story.Title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Published on: {new Date(story.$createdAt).toLocaleDateString()}
          </p>
          <p className="mt-4 text-lg">{story.Description}</p>

          {/* Likes and Rating */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <i className="fa fa-heart text-red-500"></i>
              <span>{story.likes} Likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa fa-star text-yellow-500"></i>
              <span>{story.rating}/5 Rating</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex mt-4 space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Read/Watch
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Watch Later
            </button>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
          <div className="flex items-center mb-4">
            <img
              src={NewDatabase.getFilePreview(story.userProfile.avatar)}
              alt={story.userProfile.Name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">{story.userProfile.Name}</h3>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Follow
              </button>
            </div>
          </div>
          <p>{story.userProfile.bio}</p>
        </div>

        {/* Story Chapters */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4">Chapters</h2>
          <ul className="list-disc pl-6">
            {storyChapters?.map((chapter, index) => (
              <li key={index} className="mb-2">
                <a
                  href={`/story/${id}/chapter/${chapter.$id}`}
                  className="hover:text-blue-700 dark:text-white text-black"
                >
                  {chapter.Heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations and Top Stories */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Top Stories</h2>
          <TopStories />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommended For You</h2>
          <Recommendation Category={story.Category} maxStories={4} />
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;
