import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router} from '@angular/router';


@Component({
  selector: 'register-component',
  templateUrl: './register.component.html', //AGREGAR VALIDACIONES PARA NO USAR "Ñ y simbolos del Español"
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombreusuario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]{8}$/),
        ],
      ],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]{8}$/),
        ],
      ],
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
          alert('Usuario registrado con éxito')
          setTimeout(()=>{
            this.login()
          },2000)
        },
        error => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }
}
