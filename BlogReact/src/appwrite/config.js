import conf from "../conf/conf";
import { Client , Account , ID, Databases, Storage, Query} from "appwrite";

export class Service{
    Client = new Client();
    Databases;
    bucket;

    constructor(){
        this.Client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId)
             this.Databases = new Databases(this.Client);
             this.bucket = new Storage(this.Client);
    }

    async createPost({title, slug , content ,featuredImage,status, userID}){
        try {
            return await this.Databases.createDocument(conf.appwritedDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userID
            });
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,   content ,featuredImage,status, documentId}){
     try {
        return await this.Databases.updateDocument(conf.appwritedDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            content,
            featuredImage,
            status
        }); 
        return true
     } catch (error) {
        console.log("Appwrite Service :: updatePost :: error",error);
        return false;
     }
    }

    async deletePost(slug){
        try {
            return await this.Databases.deleteDocument(conf.appwritedDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error);
        }
    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(conf.appwritedDatabaseId,conf.appwriteCollectionId,slug);
        } catch (error) {
        
            console.log("Appwrite Service :: getPost :: error",error);}
        }

        async getPosts(queries = [Query.equal("status","active")]){
            try {
                return await this.Databases.listDocuments(conf.appwritedDatabaseId,conf.appwriteCollectionId,queries,)
            } catch (error) {
                console.log("Appwrite Service :: getPosts :: error",error);
            }
        }

        //file upload service
        async uploadFile(file){
            try {
                return await this.bucket.createFile(appwriteBucketId,ID.unqiue(),file);
            } catch (error) {
                console.log("Appwrite Service :: uploadFile :: error",error);
            }
        }

        async deleteFile(fileId){
            try {
                return await this.bucket.deleteFile(fileId);
                return true;
            } catch (error) {
                console.log("Appwrite Service :: deleteFile :: error",error);
                return false;
            }
        }

        getFilePreview(fileId){
            return this.bucket.getFilePreview(config.appwriteBucketId,fileId);
        }
    }
const service = new Service();
export default service;