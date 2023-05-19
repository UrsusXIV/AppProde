import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { ComunicationService } from '../services/comunication.service';
@Component({
  selector: 'app-detalle-abmpaises',
  templateUrl: './detalle-abmpaises.component.html',
  styleUrls: ['./detalle-abmpaises.component.css']
})
export class DetalleABMPaisesComponent {
  id: number;
  nombre: string;

  constructor(private comunicationService: ComunicationService) {
    this.id = 0;
    this.nombre = '';
  }

  cancelarRetornar(): void {
    // Lógica para cancelar la acción y volver atrás
    this.comunicationService.cancelar();
  }

  aceptar(): void {
    // Lógica para aceptar la acción y realizar el procesamiento necesario
  }
}