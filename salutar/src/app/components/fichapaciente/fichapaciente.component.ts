import { Component, OnInit } from '@angular/core';
import { FichaPaciente } from '../../model/FichaPaciente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { CepService } from '../../services/cep.service';
import { DadosCEP } from '../../model/DadosCEP';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../../services/ficha.service';
import { PathToFile } from '../../model/PathToFile';
import { UploadService } from '../../services/upload.service';
import { Midia } from '../../model/Midia';

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
  public msgModal: string = "";
  public estiloMsg: string = "";
  private pathToFile: PathToFile;
  private mode: string = "";
  public midiaDescricao: string = "";


  public constructor(private cepService: CepService, 
                     private activatedRoute: ActivatedRoute,
                     private fichaService: FichaService,
                     private uploadService: UploadService) {

    this.ficha = new FichaPaciente();
    this.ficha.linkFoto = "/img/avatar.png"
    this.pathToFile = new PathToFile();
    this.idFicha = this.activatedRoute.snapshot.params["id"];

    if (this.idFicha != "NOVA") {
      this.loading = true;
      this.fichaService.buscarFichaPeloId(this.idFicha).subscribe({
        next: (res: FichaPaciente) => {
          this.ficha = res;
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.exibirModal("Erro ao exibir ficha!");
        }
      });
    }
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
        this.exibirModal("Impossível recuperar CEP.");
        this.loading = false;
      }
    });
  }

  public salvarFicha() {
    if (this.ficha.idFicha == 0) {
      this.gravarNovaFicha();
    } else {
      this.atualizarFichaExistente();
    }
  }

  public atualizarFichaExistente() {
    this.loading = true;
    this.fichaService.atualizarFicha(this.ficha).subscribe({
      next: (res: FichaPaciente) => {
        this.ficha = res;
        this.loading = false;
        this.exibirModal("Ficha Atualizada com Sucesso!");
      },
      error: (err: any) => {
        this.loading = false;
        this.exibirModal("Erro ao Atualizar Ficha!");
      }
    });
  }

  public gravarNovaFicha() {
    this.loading = true;
    this.fichaService.cadastrarNovaFicha(this.ficha).subscribe({
      next: (res: FichaPaciente) => {
        this.loading = false;
        this.ficha = res;
        this.idFicha = this.ficha.idFicha.toString();
        this.exibirModal("Ficha cadastrada com sucesso!!!");
      },
      error: () => {
        this.loading = false;
        this.exibirModal("Não foi possível gravar a ficha!");
      }
    });
  }

  public exibirModal(mensagem: string): void {
    this.msgModal = mensagem;
    document.getElementById("btnModalAlerta")?.click();
  }

  public chamarUpload(mode: string): void {
    this.mode = mode;
    if (mode == 'profile') {
      document.getElementById("btnModalUpload")?.click();
    } else {
      document.getElementById("btnMidiaModalUpload")?.click();
    }
  }

  public realizarUpload(data: any): void {
    let file = data.target.files[0];
    let formData = new FormData();
    formData.append("file", file, file.name);
    this.loading = true;
    this.uploadService.uploadFile(formData).subscribe({
      next: (res: PathToFile) => {
        this.loading = false;
        this.pathToFile = res;
        this.exibirModal("Upload realizado.");
        if (this.mode == 'profile') {
          this.ficha.linkFoto = "/img/"+this.pathToFile.path;
        } else {
          let midia: Midia = new Midia();
          midia.descricao = this.midiaDescricao;
          midia.linkMidia = "/img/"+this.pathToFile.path;
          this.ficha.midias.push(midia);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.exibirModal("Falha ao realizar Upload.");
      }
    });
  }
}
