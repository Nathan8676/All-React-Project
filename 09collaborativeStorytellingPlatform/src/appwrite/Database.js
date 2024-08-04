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

    async createUserProfile({UserName, UserId , Dob , bio , Story}){

        try {
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, ID.unique(), {
                UserName, Dob, UserId, bio , Story
            })
        } catch (error) {
            console.log("this error is from Database::createUserProfile", error);
            return {error: error.message}
        }
    }

    async updateUserProfile(UserId ,{UserName, Dob, bio, Story}){
        try{
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, UserId, {
                UserName, Dob, bio, Story
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

    async getUserProfile(){
        try{
            return await this.Database.getDocument(config.DatabaseId, config.CollectionIdUSERPROFILE, Id)
        }catch (error) {
            console.log("this error is from Database::getUserProfile", error);
            return {error: error.message}
        }
    }

    async createStory({title, content, Img, status, ForkFrom = null, userProfile }){

        try {
            return await this.Database.createDocument(config.DatabaseId, config.CollectionIdSTORY, ID.unique(), {
                title, content, Img, status, ForkFrom, userProfile
            })
        } catch (error) {
            console.log("this error is from Database::createStory", error);
            return {error: error.message}
        }

    }

    async updateStory(Id, {title, content, Img, status, ForkFrom, userProfile}){
        try {
            return await this.Database.updateDocument(config.DatabaseId, config.CollectionIdSTORY, Id, {
                title, content, Img, status, ForkFrom, userProfile
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

    async listStories(queries = [Query.equal('status', true)]){
        try {
            return await this.Database.listDocuments(config.DatabaseId, config.CollectionIdSTORY, queries)
        } catch (error) {
            console.log("this error is from Database::listStories", error);
            return {error: error.message}
        }
    }

    // Storage functions

     // storage functions
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

}

const NewDatabase = new Database

export default NewDatabase