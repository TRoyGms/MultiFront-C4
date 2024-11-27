import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',

})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      nombreusuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register():void{
    this.router.navigate(["registro"]) 
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { nombreusuario, contrasena } = this.loginForm.value;
      this.userService.login(nombreusuario, contrasena).subscribe(
        response => {

          const _idusuario = response.body.idusuario
          console.log('Usuario inició sesión con éxito:', ", id: ", _idusuario, response);
          
          if(_idusuario){
            localStorage.setItem("idusuario", _idusuario)
          }

          const _headers = response.headers
          console.log('cabeceras: ',_headers)

          const token = _headers.get('authorization')

           if(token){
            localStorage.setItem("token", token)
          }     

            this.router.navigate(["select_lvl"])          
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }
  }
}
