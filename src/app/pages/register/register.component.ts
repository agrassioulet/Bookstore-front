import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, UserOperators } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/_services/authentification.service';

declare var Cleave: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message: String = ''
  user: IUser = UserOperators.initUser();
  formErrors: String = ''
  errorsDisplay: string[] = []

  // Phone input with cleave
  cleave: any;

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  get f() { return this.userForm }

  constructor(
    public authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
    this.initCleave()
  }

  initCleave() {
    this.cleave = new Cleave('#phone-number-input', {
      phone: true,
      phoneRegionCode: 'FR'
    });
  }

  register() {
    this.errorsDisplay = []
    var errorsTab: { prop: String, val: string }[] = []
    var propTab = ['firstname', 'lastname', 'email', 'username', 'phoneNumber', 'password', 'confirmPassword']

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

    // Si tous les champs sont correctement remplis, il reste à vérifier la correspondance des champs 
    // pour le mot de passe
    if (errorsTab.length == 0 && this.userForm.get('password')?.value != this.userForm.get('confirmPassword')?.value) {
      this.errorsDisplay.push('Le mot de passe et sa confirmation ne correspondent pas.')
    }

    // Si aucune erreur n'a été rencontrée
    if (this.errorsDisplay = []) {
      this.authentificationService.register(this.user).subscribe((result: any) => {
        console.log("result", result)
        // Si la connexion a pu s'établir
        if (result.status == 1) {

          this.message = 'Utilisateur créé'

          // this._auth.setDataInLocalStorage('userData', JSON.stringify(result.data));
          // this._auth.setDataInLocalStorage('token', result.token);
          // this.message = 'Vous êtes connecté'


        }// sinon
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
