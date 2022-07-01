import { IProductCart } from "./product_cart";

export interface ICart {
    status: String;
    updateAt: Date;
    active: boolean;
    product_cart: IProductCart[];
}

export const CartOperators = {

    initCart(): ICart {
        return {
            status: '',
            updateAt: new Date(),
            active: true,
            product_cart: []
        }
    }

    
}
