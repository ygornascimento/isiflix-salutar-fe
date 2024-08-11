import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { LoginService } from '../../servicos/login.service';
import { Usuario } from '../../model/Usuario';
import { FormsModule } from '@angular/forms';
import { SalutarToken } from '../../model/SalutarToken';
import { LodingComponent } from "../loding/loding.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LodingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();
  public loading: boolean = false;

  public constructor(private route: Router, private service: LoginService) {

  }

  public logar() {
    this.loading = true;
    console.log(this.usuario);
    this.service
      .efetuarLogin(this.usuario)
      .subscribe(
          { 
            next: (res: SalutarToken) => {
              this.loading = false;
              alert("Login deu certo!!!")
              // localStorage.setItem("SalutarTK", res.token)
            },

            error: (err: any) => {
              alert("Login falhou!");
              this.loading = false;
            }
      }
    );
  }
}
