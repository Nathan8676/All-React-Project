import store  from '../Store/store'; 
import { fetchUserDataAndSessionData } from '../Store/authSlice';
import { postsFetch ,getPost, userPost } from '../Store/postsSlice';

export const combinedLoader = async () => {
  const { dispatch, getState } = store;
  const auth = getState().auth 
  if(auth.userData === null || auth.sessionData === null){
    await dispatch(fetchUserDataAndSessionData())
    const isloggedIn = getState().auth.status
    const posts = getState().posts.AllPost
    if(posts.length <= 0 && isloggedIn ){
    await dispatch(postsFetch())
    }
  }
  return null;
}

export const AllPostsLoader = async () => {
  const { dispatch, getState } = store;
  await waitForUserDataAndSessionData();
  const auth = getState().auth
  const posts = getState().posts.AllPost
  if(posts.length <= 0 && !auth.error ){
  await dispatch(postsFetch());
  }
  return null;
};


export const SinglePostLoader = async ({params}) => {
  const {dispatch} = store
  const {slug} = params
  if(slug){
    dispatch(getPost({Id:slug}))
    
  }else{
    navigator("/")
    
  }
  return null;
}

export const MyPostsLoader = async () => {
    const { dispatch, getState } = store;
    await waitForUserDataAndSessionData();
    const userData = getState().auth.userData
    const id = userData?.$id
    const posts = getState().posts.AllUserPost
    if(posts.length <= 0 ){
    await dispatch(userPost(id));
    }
    return null;

};


const waitForUserDataAndSessionData = async () => {
  const { getState } = store;
  return new Promise((resolve) => {
    const checkUserData = () => {
      const userData = getState().auth.userData;
      if (userData) {
        resolve();
      } else {
        setTimeout(checkUserData, 100);
      }
    }

    checkUserData();
  });
}