import config from "../config/config";
import {Client, ID, Storage, Databases, Query} from 'appwrite'

// make class for database configuration
export class DatabaseConfi {

    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.ProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // database functions Posts related functions/methods
    async createPost({title, content, coverImage, userID, status}){
        try {
            return await this.databases.createDocument(config.DatabaseId, config.CollectionId, ID.unique(), {
                title: title, content:content, FEATUREDIMG:coverImage, USERID:userID, STATUS:status
            })
        } catch (error) {
            console.log("this error is from DatabaseConfi::createPost", error);
            return {error: error.message}
        }
    }

    async updatePost(Id, {title, content, coverImage, status}){
        try {
            console.log({title, content, coverImage, status})
            return await this.databases.updateDocument(config.DatabaseId, config.CollectionId, Id, {
                title: title, content:content, FEATUREDIMG:coverImage,  STATUS:status
            })
        } catch (error) {
            console.log("this error is from DatabaseConfi::updatePost", error);
            return {error: error.message}
        }
    }

    async deletePost(Id){
        try {
            return await this.databases.deleteDocument(config.DatabaseId, config.CollectionId, Id)
        } catch (error) {
            console.log("this error is from DatabaseConfi::deletePost", error);
            return {error: error.message}
        }
    }    

    async getPost({id , queries = []}){
        try {
            return await this.databases.getDocument(config.DatabaseId, config.CollectionId, id , queries)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getPost", error);
            return {error: error.message}
        }
    }

    async listPosts(queries = [Query.equal('STATUS', 'active')]){
        try {
            return await this.databases.listDocuments(config.DatabaseId, config.CollectionId, queries)
        } catch (error) {
            console.log("this error is from DatabaseConfi::listPosts", error);
            return {error: error.message}
        }
    }

    // storage functions
    async uploadFile(file){
        try {
            return await this.storage.createFile(config.BucketId, ID.unique(), file)
        } catch (error) {
            console.log("this error is from DatabaseConfi::uploadFile", error);
            return {error: error.message}
        }
    }

    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(config.BucketId, fileId)
            return true
        } catch (error) {
            console.log("this error is from DatabaseConfi::deleteFile", error);
            return {error: error.message}
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(config.BucketId, fileId)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getFilePreview", error);
            return {error: error.message}
        }
    }

}

const databaseConfi= new DatabaseConfi()

export default databaseConfi