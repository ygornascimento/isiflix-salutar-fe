import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public constructor(private route:Router) {

  }

  public logar() {
    this.route.navigate(['main']);
  }

}
