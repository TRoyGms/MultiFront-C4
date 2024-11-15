import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router} from '@angular/router';


@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombreusuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login():void{
    this.router.navigate(["login"])

  }
  onSubmit() {
    if (this.registerForm.valid) {
      const { nombreusuario, contrasena } = this.registerForm.value;
      this.userService.register(nombreusuario, contrasena).subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
          // Aquí puedes agregar la lógica para redirigir al usuario o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }
}
