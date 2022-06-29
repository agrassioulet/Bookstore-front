import { ICategory } from "./category";
import { IContributor } from "./contributor";

export interface IProduct {
    title:  string;
    description:  string;
    price: number;
    contributor: IContributor;
    img_url:  string;
    language:  'english' | 'french' | 'spanish' ;
    category: ICategory,
    isbn: string;
    page: number;
    publication_date: Date;

}

export const ProductOperators = {

    getFormatDate : function (date: Date) {
        return new Date(date).toLocaleDateString("fr")
    }

    
}

