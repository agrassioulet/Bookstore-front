export interface IUser {
    firstname: String;
    lastname: String;
    password: String;
    email: String;
    username: String;

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
