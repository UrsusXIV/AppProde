import { Component } from '@angular/core';
import { Paises } from './models/paises';
import { PaisesService } from './services/paises.service';
import { Router } from '@angular/router';
import { ComunicationService } from './services/comunication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pais: Paises = new Paises(); // Instancia de la clase Paises para almacenar los datos del país
  datatable: any = []; // Variable para almacenar los datos de la tabla
  elementoNoEncontrado: boolean = false; // Variable para identificar si el elemento buscado se encuentra en base de datos.
  sonShow: boolean = false; // Variable booleana para mostrar el HTML hijo
  idSeleccionado: number | null = null; // Almacena el ID del elemento seleccionado en la tabla. Es de tipo number o null.
  isUpdateDisabled: boolean = true; // Variable para deshabilitar el botón "UPDATE"
  isDeleteDisabled: boolean = true; // Variable para deshabilitar el botón "ELIMINAR"
  
  constructor(private paisesService: PaisesService, private router: Router, private comunicationService: ComunicationService) {
    // Inyección de dependencia del servicio PaisesService
  }

  ngOnInit(): void {
    this.onDataTable(); // Llamada al método para obtener los datos de la tabla al inicializar el componente
    this.subscribeToCancelar();
  }

  onDataTable() {
    // Obtener los datos de la tabla mediante el servicio PaisesService
    this.paisesService.getPaises(0, "empty").subscribe(res => {
      console.log(res); // Imprime la respuesta del servicio en la consola
      this.datatable = Object.values(res); // Asigna los valores de la respuesta a la variable datatable
      console.log(this.datatable); // Imprime los valores de la variable datatable en la consola
    });
  }

  buscarItem(): void {
    if (this.pais.id) {
      // Buscar un elemento específico según el ID proporcionado
      this.paisesService.getPaises(this.pais.id, "empty").subscribe(res => {
        console.log(res); // Imprimir el objeto res en la consola
        if ((res as any).equipos.length === 0) {
          // El objeto res está vacío, el elemento no se encontró en la base de datos
          this.elementoNoEncontrado = true;
          this.datatable = [];
        } else {
          // Se encontró el elemento en la base de datos
          this.elementoNoEncontrado = false;
          this.datatable = Object.values(res);
        }
      });
    } else {
      // No se proporcionó un ID, obtener todos los elementos de la tabla
      this.onDataTable();
    }
  }
  
  subscribeToCancelar(): void {
    // Suscribirse al evento de cancelar desde el servicio ComunicationService
    this.comunicationService.cancelar$.subscribe((cancelar: boolean) => {
      if (cancelar) {
        this.sonShow = false; // Actualizar la variable sonShow para ocultar el componente hijo
      }
    });
  }

  selectItem(item: any) {
    this.datatable[0].forEach((element: any) => {
      if (element !== item) {
        element.seleccionado = false;
      }
    });
  
    // Verificar si hay algún elemento seleccionado y actualizar el estado de los botones
    const selectedItem = this.getSelectedItem();
    this.isUpdateDisabled = !selectedItem;
    this.isDeleteDisabled = !selectedItem;
  }

  getSelectedItem(): any {
    // Obtener el elemento seleccionado de datatable
    return this.datatable[0].find((item: any) => item.seleccionado);
  }

  selectItemAndStoreID(item: any) {
    // Iterar sobre los elementos de datatable y marcar como no seleccionados aquellos que no son el elemento seleccionado
    // Además, almacenar el ID del elemento seleccionado en idSeleccionado
    this.datatable[0].forEach((element: any) => {
      if (element !== item) {
        element.seleccionado = false;
      } else {
        this.idSeleccionado = item.idEquipo;
      }
    });
  }
  
}
