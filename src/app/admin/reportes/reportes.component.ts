import { Component, ViewEncapsulation } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'], // Corregir el nombre de la propiedad a styleUrls
  encapsulation: ViewEncapsulation.None
})
export class ReportesComponent {
  reportes = [
    { nombre: 'Categoría', accion: () => this.descargarReporteCategoria() },
    { nombre: 'Producto', accion: () => this.descargarReporteProducto() },
    { nombre: 'Usuario', accion: () => this.descargarReporteUsuario() },
  ];

  constructor(private reportesService: ReportesService) {}

  descargarReporteCategoria() {
    this.reportesService.getRCategoria().subscribe(blob => {
      this.descargarArchivo(blob, "reporte-categoria.pdf");
    });
  }

  descargarReporteProducto() {
    this.reportesService.getRProducto().subscribe(blob => {
      this.descargarArchivo(blob, "reporte-producto.pdf");
    });
  }

  descargarReporteUsuario() {
    this.reportesService.getRUsuario().subscribe(blob => {
      this.descargarArchivo(blob, "reporte-usuario.pdf");
    });
  }

  private descargarArchivo(blob: Blob, nombreArchivo: string) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = nombreArchivo;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }
}
