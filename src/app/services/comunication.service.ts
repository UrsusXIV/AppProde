import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private cancelarSource = new BehaviorSubject<boolean>(false);
  cancelar$ = this.cancelarSource.asObservable();

  constructor() { }

  cancelar(): void {
    this.cancelarSource.next(true);
  }
}
