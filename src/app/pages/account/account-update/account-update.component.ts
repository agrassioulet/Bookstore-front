import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, UserOperators } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  message: String = ''
  user: IUser = UserOperators.initUser();
  formErrors: String = ''
  errorsDisplay: string[] = []

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required])
  })

  get f() { return this.userForm }

  constructor(
    public authentificationService: AuthentificationService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.initUser()
  }


  initUser() {
    if(this.authentificationService.isTokenSaved()) {
      this.userService.getUserInfos().subscribe(result => {
        console.log('result', result)
        if(result.status == 1) {
          this.user = result.data
        }
      })
    }
  }



  saveUserData() {
    this.errorsDisplay = []
    var errorsTab: { prop: String, val: string }[] = []
    var propTab = ['firstname', 'lastname', 'email', 'username']

    if (!this.userForm.valid) {
      propTab.forEach(property => {

        var controlErrors = this.userForm.get(property)?.errors
        if (controlErrors != null) {
          console.log('for ' + property)
          errorsTab.push({ prop: property, val: Object.keys(controlErrors)[0] })
        }
      })
      console.log(errorsTab)
      errorsTab.forEach(line => {
        this.errorsDisplay.push(this.getErrorLabel(line))
      })
    }

    // Si aucune erreur n'a été rencontrée
    if (this.errorsDisplay = []) {
      this.userService.saveUserData(this.user).subscribe(result => {
        console.log("result", result)
        // Si la connexion a pu s'établir
        if (result.status == 1) {
          this.message = 'Utilisateur mis à jour'
        }
        else {
          // échec de l'inscription coté serveur
        }
      })

    }

  }


  getErrorLabel(line: { prop: String, val: String }) {
    if (line.val == 'required') {
      switch (line.prop) {
        case 'firstname':
          return 'Le prénom est recquis.'
        case 'lastname':
          return 'Le nom est recquis.'
        case 'email':
          return "L'email est recquis."
        case 'username':
          return 'Le pseudo est recquis.'
        case 'password':
          return "Le mot de passe est recquis."
        case 'confirmPassword':
          return "La confirmation du mot de passe est recquise."
        default:
          return 'error';
      }
    }
    else {
      console.log('email error: ', line)
      return "L'email n'est pas valide."
    }
  }

}