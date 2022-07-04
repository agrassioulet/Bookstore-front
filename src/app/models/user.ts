import { IDeliveryContact } from "./delivery_contact";

export interface IUser {
    firstname: String;
    lastname: String;
    password: String;
    email: String;
    username: String;
    delivery_contact?: IDeliveryContact

}

export const UserOperators = {
    initUser() {
        return {
            firstname : '',
            lastname : '',
            password : '',
            email : '',
            username : ''   
        }
    }

}
