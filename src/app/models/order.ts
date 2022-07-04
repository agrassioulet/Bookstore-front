import { IDeliveryContact } from "./delivery_contact";
import { IProductCart } from "./product_cart";

export interface IOrder {
    delivery_contact?: IDeliveryContact
    status: String;
    updateAt: Date;
    active: boolean;
    product_cart?: IProductCart[];
}

export const OrderOperator = {

    initOrder(): IOrder {
        return {
            status: '',
            updateAt: new Date(),
            active: true,
            product_cart: []
        }
    }

    
}
