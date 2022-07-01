import { ICategory } from "./category";
import { IContributor } from "./contributor";

export interface IProduct {
    _id: string;
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
    },

    initProduct(): IProduct {
        return {
            _id: '',
            title: '',
            description: '',
            price: 0,
            contributor: {name:''},
            img_url: '',
            language: 'english',
            category: {title: '', code: ''},
            isbn: '',
            page: 0,
            publication_date: new Date()
        }
    }

    
}

