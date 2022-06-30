import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formErrors: String = ''
  errorsDisplay: string[] = []
  // errorsTab: string[] = []

  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  get f() { return this.userForm }

  constructor() { }

  ngOnInit(): void { }

  register() {
    this.errorsDisplay = []
    var errorsTab: { prop: String, val: string }[] = []
    var propTab = ['firstname', 'lastname', 'email', 'password', 'confirmPassword']

    if (!this.userForm.valid) {
      propTab.forEach(property => {

        var controlErrors = this.userForm.get(property)?.errors
        if (controlErrors != null) {
          console.log('for ' + property)
          console.log(controlErrors)
          errorsTab.push({ prop: property, val: Object.keys(controlErrors)[0] })
          // [prop, Object.keys(controlErrors)[0]])
        }
      })
      console.log(errorsTab)
      errorsTab.forEach(line => {
        this.errorsDisplay.push(this.getErrorLabel(line))
      })
    }

    // Si tous les champs sont correctement remplis, il reste à vérifier la correspondance des champs 
    // pour le mot de passe
    console.log('test on confirm password')
    console.log('errorsTab on confirm password', errorsTab)
    if(errorsTab == []) {console.log('errorTab is empty')}

    console.log('password', this.userForm.get('password'))
    console.log('confirmPassword', this.userForm.get('confirmPassword'))

    if (errorsTab.length == 0 && this.userForm.get('password')?.value != this.userForm.get('confirmPassword')?.value) {
      this.errorsDisplay.push('Le mot de passe et sa confirmation ne correspondent pas.')
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
