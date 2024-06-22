const env = import.meta.env
const config = {
    AppwriteUrl: String(env.VITE_APPWRITE_URL),
    DatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    ProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    CollectionId: String(env.VITE_APPWRITE_COLLECTION_ID),
    BucketId: String(env.VITE_APPWRITE_BUCKET_ID),
}

export default config