import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Sedes } from '../models/sedes.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SedesService {
  private apiSedes: string = environment.apiSedes;

  constructor(private http: HttpClient) {}

  getSedes(): Observable<Sedes[]> {
    return this.http.get<Sedes[]>(`${this.apiSedes}`);
  }


  getNumeroTelefono(): Observable<string> {
    return this.getSedes().pipe(
      map(sedes => sedes.map(sede => sede.numeroTelefono).join(', '))
    );
  }
}
