import config from "../config/config";
import {Account , Client , ID} from "appwrite"

export class authService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.AppwriteUrl)
            .setProject(config.ProjectId);
        this.account = new Account(this.client);    

    }

    async createAccount({email, password, name}){
        try {
            const account = await this.account.create(ID.unique, email, password, name)
            if (account) {
                return this.login({email, password})
            } else {
                return account;
            }
        } catch (error) {
            console.log("this error is from authService::createAccount", error);
        }
    }

    async login({email, password}) {
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("this error is from authService::login", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("this error is from authService::getCurrentUser", error);
            
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.log("this error is from authService::logout", error);
        }
    }

    async passwordRecovery({userEmailId, passwordResetPage}){
        try {
            return await this.account.createRecovery(userEmailId, passwordResetPage)
        } catch (error) {
            console.log("this error is from authService::passworRecovery", error);
        }
    }

    async updateRecovery({userId, secretCode, newPassword, newPasswordConfirm}){
        try {
            return await this.account.updateRecovery(userId, secretCode, newPassword, newPasswordConfirm)
        } catch (error) {
            console.log("this error is from authService::updateRecovery", error);
        }
    }    
}


const AuthService = new authService()

export default AuthService