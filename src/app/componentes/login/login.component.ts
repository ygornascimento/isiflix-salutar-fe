import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicos/login.service';
import { Usuario } from '../../model/Usuario';
import { FormsModule } from '@angular/forms';
import { SalutarToken } from '../../model/SalutarToken';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();
  public loading: boolean = false;
  public mensagem: string = "";

  public constructor(private route: Router, private service: LoginService) {

  }

  public logar() {
    this.loading = true;
    this.service.efetuarLogin(this.usuario).subscribe(
          { 
            next: (res: SalutarToken) => {
              localStorage.setItem("SalutarTK", res.token);
              this.loading = false;
              this.route.navigate(['main']);
            },

            error: (err: any) => {
              this.mensagem = "Usuário e/ou senha inválidos!";
              this.loading = false;
            }
      }
    );
  }
}
