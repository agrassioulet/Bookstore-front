import { IDeliveryContact } from "./delivery_contact";
import { IProduct } from "./product";
import { IProductCart } from "./product_cart";
import { IUser } from "./user";

export interface IEvaluation {
    _id?: String;
    user: IUser | null;
    note: Number;
    comment: String;
    product?: IProduct;
}

export const OrderOperator = {

    initEvaluation(): IEvaluation {
        return {
            user: null,
            note: 0,
            comment: ''
        }
    }

    
}
