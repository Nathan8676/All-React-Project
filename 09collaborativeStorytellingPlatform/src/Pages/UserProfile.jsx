import React, { useState } from 'react';
import { Button, Card as UserCard, StoryCard } from '../components';
import { useSelector } from 'react-redux';
import NewDatabase from '../appwrite/Database';
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('stories');
  const userProfileState = useSelector(state => state.userProfile);
  const userProfile = userProfileState.userProfile;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white dark:bg-zinc-950 rounded-lg">
      <div className="flex gap-8">

        {/* Left Section: Profile Card */}
        <div className="w-1/4 flex flex-col gap-6">
          <UserCard
            photoUrl={NewDatabase.getFilePreview(userProfile?.Avatar)}
            photoSize="100px"
            reverseLayout={true}
            title={userProfile.UserName}
            description={userProfile.bio}
          />
          <div className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-lg">
            <div className="mb-4">
              <span className="block text-xl font-bold">{userProfile.story.length}</span>
              <span className="text-gray-500 dark:text-gray-400">Stories</span>
            </div>
            <div className="mb-4">
              <span className="block text-xl font-bold">123</span>
              <span className="text-gray-500 dark:text-gray-400">Followers</span>
            </div>
            <div>
              <span className="block text-xl font-bold">12</span>
              <span className="text-gray-500 dark:text-gray-400">Following</span>
            </div>
          </div>
        </div>

        <div className="w-3/4">
          <div className="flex border-b dark:border-zinc-700">
            <button
              className={`py-2 px-4 ${activeTab === 'stories' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('stories')}
            >
              My Stories
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'favorites' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'followers' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('followers')}
            >
              Followers
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'following' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'stories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {userProfile.story.map((story, index) => (
                  <StoryCard
                    $id={story.$id}
                    heading={story.Title}
                    subheading={story.Description}
                    imageSrc={NewDatabase.getFilePreview(story.Img)}
                    key={index}
                  />
                ))}
              </div>
            )}
            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
