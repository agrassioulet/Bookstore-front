import { IProductCart } from "./product_cart";

export interface IOrder {
    status: String;
    updateAt: Date;
    active: boolean;
    product_cart: IProductCart[];
}

export const OrderOperators = {

    initCart(): IOrder {
        return {
            status: '',
            updateAt: new Date(),
            active: true,
            product_cart: []
        }
    }

    
}
