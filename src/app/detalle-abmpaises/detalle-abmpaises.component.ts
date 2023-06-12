import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../services/comunication.service';
import { ShareddataService } from '../services/shareddata.service';
import { PaisesService } from '../services/paises.service';
import { Paises } from '../models/paises';

@Component({
  selector: 'app-detalle-abmpaises',
  templateUrl: './detalle-abmpaises.component.html',
  styleUrls: ['./detalle-abmpaises.component.css']
})
export class DetalleABMPaisesComponent implements OnInit {
  id: number;
  nombre: string;
  idRecibido: number | null = null;
  nombreRecibido: string | null = null;
  updateMode: boolean | null = null;

  constructor(
    private comunicationService: ComunicationService,
    private sharedDataService: ShareddataService,
    private paisesService: PaisesService,
  ) {
    // Inicializar propiedades
    this.id = 0;
    this.nombre = '';
  }

  ngOnInit(): void {
    // Obtener datos compartidos del servicio ShareddataService
    this.idRecibido = this.sharedDataService.getIdSeleccionado();
    this.nombreRecibido = this.sharedDataService.getNombreSeleccionado();
    this.updateMode = this.sharedDataService.getUpdateModeEnabled();

    console.log("UpdateMode se encuentra en" + this.updateMode);

    if (this.idRecibido != null) {
      this.id = this.idRecibido;
      if(this.idRecibido == 0){
        this.idRecibido = null;
        this.id = 0;
      }
    }

    if (this.nombreRecibido != null) {
      this.nombre = this.nombreRecibido;
    }

    console.log('ID seleccionado:', this.id);
  }

  cancelarRetornar(): void {
    // Lógica para cancelar la acción y volver atrás
    this.comunicationService.cancelar();
  }

  aceptar(): void {
    if (this.updateMode) 
    {
      // Crear objeto 'pais' con los datos ingresados
      const pais: Paises = {
        id: this.id,
        nombre: this.nombre
      };

      // Realizar solicitud PUT al servicio PaisesService
      this.paisesService.putPaises(this.id, pais).subscribe(
        (response) => 
        {
          console.log('PUT exitoso:', response);
          if(response)
          {
            this.aceptarRetornar();
          }
        },
        (error) => {
          console.error('Error en PUT:', error);
        }
      );

    } 
    else 
    {
      // Crear objeto 'pais' con los datos ingresados
      const pais: Paises = {
        id: this.id,
        nombre: this.nombre
      };
  
      // Realizar solicitud POST al servicio PaisesService
      this.paisesService.postPaises(pais).subscribe(
        (response) => {
          console.log('POST exitoso:', response);
          if(response)
          {
            this.aceptarRetornar();
          }
        },
        (error) => {
          console.error('Error en POST:', error);
        }
      );
    }
  }

  aceptarRetornar(): void {
    // Lógica para aceptar la acción y volver atrás
    this.comunicationService.cancelar();
  }

  validateInput(): void {
    if (this.id < 0) {
      this.id = 1;
    }
  }
  

}
