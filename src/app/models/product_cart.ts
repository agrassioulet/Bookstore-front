import { ICart } from "./cart";
import { IProduct } from "./product";

export interface IProductCart {
    cart: ICart;
    product: IProduct;
    quantity: number;
}
