import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bookstore';
  paymentHandler: any = null;


  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void { }

  upload(event: any) {
    const file = event.target.files[0];
    console.log(file)
    const formdata = new FormData();
    formdata.append('file', file);

    this.httpClient.post('http://localhost:4000/file', formdata).subscribe(
      result => console.log(result)
    );
  }
}
