import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit{
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

  ngOnInit(): void {
      localStorage.clear()
      sessionStorage.clear()
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
          
          if(_idusuario){
            localStorage.setItem("idusuario", _idusuario)
          }

          const _headers = response.headers

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
