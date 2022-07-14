export interface IDeliveryContact {
    adress: String;
    city: String;
    company: String;
    email: String;
    country: String;
    firstname: String;
    lastname: String;
    phoneNumber: String;
    postalCode: String;
}

export const DeliveryContactOperator = {

    initDeliveryContact(): IDeliveryContact {
        return {
            adress: '',
            city: '',
            company: '',
            country: '',
            email: '',
            firstname: '',
            lastname: '',
            phoneNumber: '',
            postalCode: ''
        }
    }
}