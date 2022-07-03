import { IOrder } from "./order";
import { IProduct } from "./product";

export interface IProductCart {
    order: IOrder;
    product: IProduct;
    quantity: number;
}
