import config from "../config/config";
import { Databases, Storage, Client , ID , Query} from "appwrite"

export class Database{
    client = new Client()
    Database;
    Storage;
    constructor(){
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.ProjectId);
        this.Database = new Databases(this.client);
        this.Storage = new Storage(this.client);
    }

    async createUserProfile(UserId, {UserName, Dob , bio , Story, Avatar}){

        try {
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, UserId, {
                UserName, Dob, bio , Story, Avatar
            })
        } catch (error) {
            console.log("this error is from Database::createUserProfile", error);
            return {error: error.message}
        }
    }

    async updateUserProfile(UserId ,{UserName, Dob, bio, Story, Avatar}){
        try{
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, UserId, {
                UserName, Dob, bio, Story, Avatar
            })
        } catch (error) {
            console.log("this error is from Database::updateUserProfile", error);
            return {error: error.message}
        }
    }


    async deleteUserProfile(UserId){
        try {
            const response = await this.Database.deleteDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, UserId)
            if(response){
                return true
            }
        } catch (error) {
            console.log("this error is from Database::deleteUserProfile", error);
            return {error: error.message}
        }
    }

    async getUserProfile(Id){
        try{
            return await this.Database.getDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, Id)
        }catch (error) {
            console.log("this error is from Database::getUserProfile", error);
            return {error: error.message}
        }
    }

    async createStory({Title, Content, Description, Img, status, Mature, ForkedFrom = null, Complete, userProfile, Category }){

        try {
            console.log({Title, Content, Description, Img, status, ForkedFrom, userProfile , Mature , Complete, Category})
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdSTORY, ID.unique(), {
                Title, Content, Description, Img, status, ForkedFrom, userProfile, Mature , Complete, Category
            })
        } catch (error) {
            console.log("this error is from Database::createStory", error);
            return {error: error.message}
        }

    }

    async updateStory(Id, {title, content, Img, status, ForkFrom, userProfile , Mature , Complete, Category }){
        try {
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdSTORY, Id, {
                title, content, Img, status, ForkFrom, userProfile, Mature, Complete, Category
            })
        } catch (error) {
            console.log("this error is from Database::updateStory", error);
            return {error: error.message}
        }
    }

    async deleteStory(Id){
        try {
            return await this.Database.deleteDocument(config.DatabaseId, config.CollectionIdSTORY, Id)
        } catch (error) {
            console.log("this error is from Database::deleteStory", error);
            return {error: error.message}
        }
    }

    async getStory({Id , queries = []}){
        try {
            return await this.Database.getDocument(config.DatabaseId, config.CollectionIdSTORY, Id , queries)
        } catch (error) {
            console.log("this error is from Database::getStory", error);
            return {error: error.message}
        }
    }

    async listStories(queries){
        try {
            return await this.Database.listDocuments(config.DatabaseId, config.CollectionIdSTORY, queries)
        } catch (error) {
            console.log("this error is from Database::listStories", error);
            return {error: error.message}
        }
    }

    async createChapter({Heading, Content, Order, Img, status, story}){
        try {
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdSTORYCHAPTER, ID.unique(), {
              Heading, story, Img, Order: parseInt(Order), status, Content
            })
        } catch (error) {
            console.log("this error is from Database::createChapter", error);
            return {error: error.message}
        }
    }

    async getChapter({Id , queries = []}){
        try {
            return await this.Database.getDocument(config.DatabaseId, config.CollectionIdSTORYCHAPTER, Id , queries)
        } catch (error) {
            console.log("this error is from Database::getChapter", error);
            return {error: error.message}
        }
    }

    async listChapters(queries = [Query.equal('status', "active")]){
        try {
            return await this.Database.listDocuments(config.DatabaseId, config.CollectionIdSTORYCHAPTER, queries)
        } catch (error) {
            console.log("this error is from Database::listChapters", error);
            return {error: error.message}
        }
    }

    async deleteChapter(Id){
        try {
            return await this.Database.deleteDocument(config.DatabaseId, config.CollectionIdSTORYCHAPTER, Id)
        } catch (error) {
            console.log("this error is from Database::deleteChapter", error);
            return {error: error.message}
        }
    }

    async updateChapter(Id, {Heading, Content, Order, Img, status, story}){
        try {
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdSTORYCHAPTER, Id, {
                Heading, Content, Order: parseInt(Order), Img, status, story
            })
        } catch (error) {
            console.log("this error is from Database::updateChapter", error);
            return {error: error.message}
        }
    }

    async createReview({Rating, Comment, ReplyTold, userProfile, CommentDislike = false, CommentLike = false, StoryLike = false, StoryDislike = false, story}){
        try {
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdREVIEW, ID.unique(), {
                Rating, Comment, ReplyTold, userProfile, CommentDislike, CommentLike, StoryLike, StoryDislike, story
            })
        } catch (error) {
            console.log("this error is from Database::createReview", error);
            return {error: error.message}
        }
    }

    async updateReview({Id , Rating, Comment, ReplyTold, CommentDislike = false, CommentLike = false, StoryLike = false, StoryDislike = false}){
        try {
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdREVIEW, Id, {
                Rating, Comment, ReplyTold, CommentDislike, CommentLike, StoryLike, StoryDislike
            })
        } catch (error) {
            console.log("this error is from Database::updateReview", error);
            return {error: error.message}
        }
    }

    async deleteReview(Id){
        try {
            return await this.Database.deleteDocument(config.DatabaseId, config.CollectionIdREVIEW, Id)
        } catch (error) {
            console.log("this error is from Database::deleteReview", error);
            return {error: error.message}
        }
    }

    async getReview({Id , queries = []}){
        try {
            return await this.Database.getDocument(config.DatabaseId, config.CollectionIdREVIEW, Id , queries)
        } catch (error) {
            console.log("this error is from Database::getReview", error);
            return {error: error.message}
        }
    }

    async listReviews(queries){
        try {
            return await this.Database.listDocuments(config.DatabaseId, config.CollectionIdREVIEW, queries)
        } catch (error) {
            console.log("this error is from Database::listReviews", error);
            return {error: error.message}
        }
    }
    // Storage functions

     async uploadFile(file){
        try {
            return await this.Storage.createFile(config.BucketId, ID.unique(), file)
        } catch (error) {
            console.log("this error is from DatabaseConfi::uploadFile", error);
            return {error: error.message}
        }
    }

    async deleteFile(fileId){
        try {
             await this.Storage.deleteFile(config.BucketId, fileId)
            return true
        } catch (error) {
            console.log("this error is from DatabaseConfi::deleteFile", error);
            return {error: error.message}
        }
    }

     getFilePreview(fileId){
        try {
            return this.Storage.getFilePreview(config.BucketId, fileId)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getFilePreview", error);
            return {error: error.message}
        }
    }

     uploadStoryCover(file){
        try {
            return this.Storage.createFile(config.BucketIdStoryCover, ID.unique(), file)
        } catch (error) {
            console.log("this error is from DatabaseConfi::uploadStoryCover", error);
            return {error: error.message}
        }
    }

    async deleteStoryCover(fileId){
        try {
             await this.Storage.deleteFile(config.BucketIdStoryCover, fileId)
            return true
        } catch (error) {
            console.log("this error is from DatabaseConfi::deleteStoryCover", error);
            return {error: error.message}
        }
    }

    async getStoryCover(fileId){
        try {
            return this.Storage.getFilePreview(config.BucketIdStoryCover, fileId)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getStoryCover", error);
            return {error: error.message}
        }
    }
}


const NewDatabase = new Database

export default NewDatabase
