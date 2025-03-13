import {useDispatch, useSelector} from 'react-redux'
import { useEffect , useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleChapter } from '../store/storyChaptersSlice';

function Chapter() {
  const {ChapterId, StoryId} = useParams();
  const dispatch = useDispatch();
  const [isOwner, setIsOwner] = useState(false);
  const {singleChapter} = useSelector((state) => state.storyChapters);



  const findStoryFromAllStoriesList = useCallback( async() => {
     dispatch(getSingleChapter({Id: ChapterId })).then((response) => {
       console.log(response)
     });
  }, [ChapterId])
  useEffect(() => {
    findStoryFromAllStoriesList();
  },[ChapterId, StoryId])
  return (
    <>
    <div className="grid grid-cols-3 h-full w-full">
      <div className="side-panel  h-full ">
         <h1>Side Panel</h1>
          <p>story id: {StoryId}</p>
      </div>
      <div className="story-panel col-start-2 col-end-3  h-full">
        <div className="story-container ">
        {singleChapter.Content}
        </div>
      </div>
    </div>
    </>
  )
}

export default Chapter
