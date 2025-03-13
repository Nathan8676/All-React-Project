const env = import.meta.env
const config = {
    AppwriteUrl: String(env.VITE_APPWRITE_URL),
    DatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    ProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    CollectionIdREVIEW: String(env.VITE_APPWRITE_COLLECTION_ID_REVIEW),
    CollectionIdSTORY: String(env.VITE_APPWRITE_COLLECTION_ID_STORY),
    CollectionIdSTORYCHAPTER: String(env.VITE_APPWRITE_COLLECTION_ID_STORY_CHAPTER),
    CollectionIdUSERPROFILE: String(env.VITE_APPWRITE_COLLECTION_ID_USERPROFILE),
    BucketId: String(env.VITE_APPWRITE_BUCKET_ID),
    BucketIdStoryCover: String(env.VITE_APPWRITE_BUCKET_STORYCOVER_ID),
}

export default config