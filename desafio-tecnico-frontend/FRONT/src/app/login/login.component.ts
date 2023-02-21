import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  visivel : boolean = true;

  loginFormControl = new FormControl('letscode', [Validators.required]);
  senhaFormControl = new FormControl('lets@123', [Validators.required]);


  constructor(private loginService: LoginService, private router: Router, private snackService: SnackService) { }

  login = async () => {
    
    const logou = await this.loginService.login(this.loginFormControl.value ?? '', this.senhaFormControl.value ?? '');

    if (!logou) {
      this.snackService.openError('Usuário ou senha inválidos');
      return;
    }

    this.snackService.openSuccess('Login efetuado com sucesso');

    this.router.navigate(['board']);
  }

}