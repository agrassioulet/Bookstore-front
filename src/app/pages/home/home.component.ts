import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(
    private userService: UserService,
    private auth: AuthentificationService
  ) { }

  ngOnInit(): void {  }




}
