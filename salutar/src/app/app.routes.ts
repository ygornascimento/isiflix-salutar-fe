import { Routes } from '@angular/router';
import { FichapacienteComponent } from './components/fichapaciente/fichapaciente.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"main", component:MainComponent},
    {path:"ficha/:id", component:FichapacienteComponent}
];
