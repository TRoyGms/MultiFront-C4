import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
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

  onSubmit() {
    if (this.loginForm.valid) {
      const { nombreusuario, contrasena } = this.loginForm.value;
      this.userService.login(nombreusuario, contrasena).subscribe(
        response => {
          console.log('Usuario inició sesión con éxito:', response);
          this.router.navigate(["/game"])
          // Aquí puedes agregar la lógica para redirigir al usuario o guardar el token en el almacenamiento local
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }
  }
}
