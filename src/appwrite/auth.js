import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();/*/*Client refers to an instance of the APPWRITE CLIENT OBJECT. 
    The Appwrite client object is an instance of the client-side SDK provided by the Appwrite 
    backend service. It serves as the main interface for interacting with various features 
    and services offered by Appwrite */ 

    account;
    /*The client object focuses on providing a generic interface for interacting with Appwrite services, 
    while the account object specializes in user authentication and management, ensuring that 
    authentication-related logic is isolated and easily maintainable. */

    constructor() {
        this.client
        //configure the 'client' object with the Appwrite endpoint URL and project ID.
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);//creates a new instance of the 'Account' class
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
            return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
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

//--> Future-proof code.