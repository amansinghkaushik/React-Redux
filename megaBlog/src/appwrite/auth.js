import { Account,Client,ID } from "appwrite";

export class AuthServices {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL) // Your Appwrite Endpoint
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                // call Login user method if already has an account
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authServices = new AuthServices();

export default authServices