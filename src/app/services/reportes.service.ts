import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private apiReporteCategoria: string = environment.apiReporteCategoria;
  private apiReporteProducto: string = environment.apiReporteProducto;
  private apiReporteUsuario: string = environment.apiReporteUsuario;

  constructor(private http: HttpClient) {}

  getRCategoria(): Observable<Blob> {
    return this.http.get(`${this.apiReporteCategoria}`, { responseType: 'blob' });
  }

  getRProducto(): Observable<Blob> {
    return this.http.get(`${this.apiReporteProducto}`, { responseType: 'blob' });
  }

  getRUsuario(): Observable<Blob> {
    return this.http.get(`${this.apiReporteUsuario}`, { responseType: 'blob' });
  }
}
