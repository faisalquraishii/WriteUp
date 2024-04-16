import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        /*Once the client object is initialized and configured, it can be used to instantiate 
        other services provided by Appwrite, such as the Databases and Storage services */

        this.databases = new Databases(this.client);//initializing a connection to the Appwrite databases service
        this.bucket = new Storage(this.client);//establishing a connection to the Appwrite storage service, 
    }

    /*used to create a new document (or post, in this case) in a specified 
    collection within Appwrite database. */
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //treated as document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }// a "slug" typically refers to a user-friendly URL version of the post's title. It's a string that 
    //is used as part of the URL to identify the post. it’s the part of the URL that explains the page’s content.

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(//this returned value will be an array
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }//user need not send any argument when calling this function. This is a default parameter.

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )//return URL of the image
    }
}


const service = new Service()
export default service

/*This code reduces the risk of vendor lock-in by encapsulating the interaction 
with the Appwrite service within a dedicated service class (Service) 

The service class abstracts away the details of the Appwrite API calls and configurations. 
Instead of directly calling the Appwrite SDK methods throughout your application, you interact 
with the service class methods, which serve as a layer of abstraction. This means that if you ever 
decide to switch from Appwrite to another backend service, you only need to update the implementation 
of the service class, rather than modifying every part of your application that interacts with the 
backend.

WHAT IS VENDOR LOCK-IN?
Vendor lock-in refers to a situation in which a customer becomes dependent on a particular vendor's 
products or services to the extent that switching to an alternative vendor becomes difficult, 
expensive, or impractical.
*/
