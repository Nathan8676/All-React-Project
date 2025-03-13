import React, {useEffect, useState} from 'react'
import NewDatabase from '../appwrite/Database'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Category'

function TopStories() {
    const dispatch = useDispatch()
    const [TopStories , setTopStories] = useState([])
    const stories = useSelector(state => state.story?.stories)
    const TopStoryHandle = () => {
      const TopStories = stories?.documents?.filter((story) => {
        return story.review.some((review) => review.StoryLike === true);
      });
      const sortTopStories = TopStories?.sort((a, b) => a.review.length - b.review.length);
     return sortTopStories
    }
    

    useEffect(() => {
    const res = TopStoryHandle()
    setTopStories(res)
    },[])


    return (
      <div className="dark:bg-gray-600 bg-gray-100 text-black dark:text-white  rounded-lg shadow-lg p-4 mb-6">
        <h3 className="text-xl font-bold mb-4">Top Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {TopStories?.map((story , index) => (
           <Card
             key={index}
             title={story.Title}
             description={story.Description}
             photoUrl={NewDatabase.getFilePreview(story.Img)}
             photoSize='50px'
             genre={story.Category}
             chapterCount={story.storyChapters?.length}
             reverseLayout={true}
             bgColor={'bg-gray-200'}
           />
         ))}
           </div>
      </div>
    );
}

export default TopStories
