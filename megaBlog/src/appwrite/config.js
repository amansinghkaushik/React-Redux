import conf from "../conf/conf";
import { Client, Databases,Query,Storage,ID } from "appwrite";

export class Services {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite Endpoint
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({tittle, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Error creating post:", error);
        }
    }

    async updatePost(slug, {tittle, slug, content, featuredImage, status}) {
        try {
            return await this.databases.update(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error updating post:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ) 
            return true;
        } catch (error) {
            console.log("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ) 
            return true;
        } catch (error) {
            console.log("Error getting post:", error);
            return false;
        }
    }

    async getPOsts(queries = [ Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log("Error uploading file:", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error deleting file:", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error getting file preview:", error);
            return null;
        }
    }
}

const services = new Services();

export default services;