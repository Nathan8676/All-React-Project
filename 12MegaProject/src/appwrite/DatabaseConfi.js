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
    async createPost({title, slug, content, coverImage, userID, status}){
        try {
            return await this.databases.createDocument(config.DatabaseId, config.CollectionId, slug, {
                title: title, content:content, FEATUREDIMG:coverImage, USERID:userID, STATUS:status
            })
        } catch (error) {
            console.log("this error is from DatabaseConfi::createPost", error);
        }
    }

    async updatePost(slug, {title, content, coverImage, status}){
        try {
            return await this.databases.updateDocument(config.DatabaseId, config.CollectionId, slug, {
                title: title, content:content, FEATUREDIMG:coverImage,  STATUS:status
            })
        } catch (error) {
            console.log("this error is from DatabaseConfi::updatePost", error);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(config.DatabaseId, config.CollectionId, slug)
        } catch (error) {
            console.log("this error is from DatabaseConfi::deletePost", error);
        }
    }    

    async getPost(slug){
        try {
            return await this.databases.getDocument(config.DatabaseId, config.CollectionId, slug)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getPost", error);
            const res = 'could not get post'
            return res
        }
    }

    async listPosts(queries = Query.equal('STATUS', 'active')){
        try {
            return await this.databases.listDocuments(config.DatabaseId, config.CollectionId, queries)
        } catch (error) {
            console.log("this error is from DatabaseConfi::listPosts", error);
            const res = 'could not get list of posts'
            return res
        }
    }

    // storage functions
    async uploadFile(file){
        try {
            return await this.storage.createFile(config.BucketId, ID.unique(), file)
        } catch (error) {
            console.log("this error is from DatabaseConfi::uploadFile", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
             await this.storage.deleteFile(config.BucketId, fileId)
            return true
        } catch (error) {
            console.log("this error is from DatabaseConfi::deleteFile", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(config.BucketId, fileId)
        } catch (error) {
            console.log("this error is from DatabaseConfi::getFilePreview", error);
            return false
        }
    }

}

const databaseConfi= new DatabaseConfi()

export default databaseConfi