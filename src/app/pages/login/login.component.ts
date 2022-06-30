import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state = enumState.WAITING
  message = ''

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  get f() { return this.userForm }

  constructor(
    private auth: AuthentificationService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.userForm.valid) {
      var username = this.userForm.get('username')?.value
      var password = this.userForm.get('password')?.value
      this.auth.login(username, password).subscribe(result => {

        console.log(result)

        if(result.status == 2) {
          this.message = "Nous n'avons pas pu vous identifier."
          this.state = enumState.ERROR_LOGIN
        }
        if(result.status == 1 && result.hasOwnProperty('token') ) {
          this.auth.setToken(result.token)
          this.state = enumState.CONNECTED
          this.message = "Connexion réussie."
        }

      })
    }
    else {
      this.message = 'Merci de renseigner tous les champs.'
      this.state = enumState.ERROR_FORM
    }
  }

}

enum enumState {
  WAITING = 'WAITING',
  CONNECTED = 'CONNECTED',
  ERROR_FORM = 'ERROR_FORM',
  ERROR_LOGIN = 'ERROR_LOGIN'
}
