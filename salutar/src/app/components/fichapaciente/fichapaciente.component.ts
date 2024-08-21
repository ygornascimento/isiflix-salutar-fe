import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { CepService } from '../../services/cep.service';
import { DadosCEP } from '../../model/DadosCEP';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../../services/ficha.service';

@Component({
  selector: 'app-fichapaciente',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  templateUrl: './fichapaciente.component.html',
  styleUrl: './fichapaciente.component.css'
})
export class FichapacienteComponent implements OnInit {
  public ficha: FichaPaciente;
  public loading: boolean = false;
  private idFicha: string = "";

  public constructor(private cepService: CepService, 
                     private activatedRoute: ActivatedRoute,
                     private fichaService: FichaService) {

    this.ficha = new FichaPaciente();
    this.idFicha = this.activatedRoute.snapshot.params["id"];
    console.log(this.idFicha);
  }

  ngOnInit(): void {
  }

  public scroll(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }

  public buscarCep() {
    this.loading = true;
    let cep  = this.ficha.cep.replaceAll("-","").replaceAll(".", "");
    this.cepService.buscarCEP(cep).subscribe({
      next: (res: DadosCEP) => {
        this.loading = false;
        this.ficha.endereco = res.logradouro;
        this.ficha.cidade = res.localidade;
        this.ficha.estado = res.uf;
      },

      error: (err: any) => {
        alert("Impossível recuperar CEP!!!");
        this.loading = false;
      }

    });
  }

  public salvarFicha() {
    if (this.idFicha == "NOVA") {
      this.gravarNovaFicha();
    } else {
      this.atualizarFichaExistente();
    }
  }

  public atualizarFichaExistente() {}

  public gravarNovaFicha() {
    this.loading = true;

    this.fichaService.cadastrarNovaFicha(this.ficha).subscribe({
      next: (res: FichaPaciente) => {
        this.loading = false;
        this.ficha = res;
        this.idFicha = this.ficha.idFicha.toString();
        alert("Ficha cadastrada com sucesso!!!")
      }
    });
  }

}
