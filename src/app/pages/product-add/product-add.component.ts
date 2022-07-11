import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { IContributor } from 'src/app/models/contributor';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  fileimage: any;

  URL_SERVER = 'http://localhost:3000';

  contributors: IContributor[] = []
  categories: ICategory[] = []
  public message = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    pageNumber: new FormControl('', [Validators.required]),
    categoryCode: new FormControl('', [Validators.required]),
    contributorName: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
  })


  constructor(
    private httpClient: HttpClient,
    private productService: ProductService
  ) { }


  ngOnInit() {

    this.initContributors()
    this.initCategories()

  }

  initCategories() {
    this.productService.getAllCategories().subscribe(result => {
      if (result.status == 1) {
        this.categories = result.data
      }
    })
  }


  initContributors() {
    this.productService.getAllContributors().subscribe(result => {
      if (result.status == 1) {
        this.contributors = result.data
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.fileimage = file
    // const formdata = new FormData();
    // formdata.append('file', file);

    // this.httpClient.post('http://localhost:4000/file', formdata).subscribe(
    //   result => console.log(result)
    // );
  }



  // onFileSelected(event: any) {
  //   const file = event.target.files[0];


  //   const formdata = new FormData();
  //   formdata.append('file', file);

  //   this.httpClient.post('http://localhost:4000/file', formdata).subscribe(
  //     (d) => {
  //       console.log(d);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );


  // }


  // saveProduct() {
  //   console.log('save product')
  //   if ( this.imageFile != null) { //this.productForm.valid &&
  //     const formdata = new FormData()
  //     console.log('this.imageFile', this.imageFile)
  //     formdata.append('screenshot', this.imageFile);
  //     // formdata.append('product', this.productForm.value);

  //     const httpOptions = {
  //       headers: new HttpHeaders()
  //   }
  //     httpOptions.headers.append('Access-Control-Allow-Origin', '*');
  //     httpOptions.headers.append('Content-Type', 'multipart/form-data');

  //     this.httpClient.post<any>(this.URL_SERVER + '/upload', formdata, httpOptions).subscribe( result => {
  //       console.log(result)
  //     })
  //   }
  // }



  saveProduct() {
    const file = this.fileimage
    const formdata = new FormData();
    formdata.append('file', file)

    this.httpClient.post('http://localhost:3000/product/load-image-file', formdata).subscribe(
      (resultImageFile: any) => {
        console.log(resultImageFile)

        // this.httpClient.post('http://localhost:3000/product/product-add',
        //  {form: this.productForm.value, filename: resultImageFile.file.originalname}).subscribe(
        //   result => console.log(result)
        // )

      })


  }

}