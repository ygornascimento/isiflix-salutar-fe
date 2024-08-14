import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { FichaService } from '../../servicos/ficha.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  public lista: FichaPaciente[] = [];
  public keyword: string = "";
  public loading: boolean = false;

  public constructor(private fichaservice: FichaService, private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public pesquisar() {
    this.loading = true;
    this.fichaservice.buscarPacientes(this.keyword).subscribe(
      {
        next: (res: FichaPaciente[]) => {
          this.loading = false;
          this.lista = res;
        },
        error: (err: any) => {
          if (err.status == 404) {
            alert("Não encontrei pacientes com este nome.");
          } else {
            alert("Erro ao buscar paciente!");
          }
          alert("Erro ao Buscar Paciente");
          this.loading = false;
        }
      }
    );
  }

  public adicionarFicha(): void {
    this.router.navigate(['ficha']);
  }

}
