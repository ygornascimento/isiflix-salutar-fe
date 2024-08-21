import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichaPaciente } from '../model/FichaPaciente';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public buscarPacientes(nome: string): Observable<FichaPaciente[]> {
    let header = this.tokenService.getTokenHeader();
    return this.http.get<FichaPaciente[]>(environment.apiURL+"/fichas/busca?nome="+nome, {headers : header});
  }

  public cadastrarNovaFicha(ficha: FichaPaciente): Observable<FichaPaciente> {
    let header = this.tokenService.getTokenHeader();
    return this.http.post<FichaPaciente>(environment.apiURL+"/fichas", ficha, {headers : header});
  }

  public atualizarFicha(ficha: FichaPaciente): Observable<FichaPaciente> {
    let header = this.tokenService.getTokenHeader();
    return this.http.put<FichaPaciente>(environment.apiURL+"/fichas/"+ficha.idFicha, ficha, {headers : header}); 
  }
}
