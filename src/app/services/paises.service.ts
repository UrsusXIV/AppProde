import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paises } from '../models/paises';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }
  
  url: string = 'https://localhost:7242/Equipos'; // URL base para las solicitudes HTTP

  getPaises(idEquipo: number, nombreEquipo: string) {
    let params = new HttpParams()
      .set('IDEquipo', idEquipo.toString()) // Agrega el parámetro 'IDEquipo' con el valor convertido a cadena
      .set('EquipoNombre', nombreEquipo); // Agrega el parámetro 'EquipoNombre' con el valor proporcionado
    let urlParams = `${this.url}?${params.toString()}`; // Combina la URL base con los parámetros codificados en la cadena de consulta
    return this.http.get(urlParams); // Realiza una solicitud GET a la URL con los parámetros
  }

  postPaises(pais: Paises): Observable<Paises> {
    return this.http.post<Paises>(this.url, pais); // Realiza una solicitud POST a la URL con el objeto país en el cuerpo
  }

  putPaises(id: number, pais: Paises): Observable<Paises> {
    return this.http.put<Paises>(this.url + `/${id}`, pais); // Realiza una solicitud PUT a la URL con el ID y el objeto país en el cuerpo
  }

  deletePaies(id: number) {
    return this.http.delete(this.url + `/${id}`); // Realiza una solicitud DELETE a la URL con el ID
  }
}

