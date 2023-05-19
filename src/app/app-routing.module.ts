import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleABMPaisesComponent } from './detalle-abmpaises/detalle-abmpaises.component';

const routes: Routes = [
  // Otras rutas
  { path: 'detalle-abmpaises', component: DetalleABMPaisesComponent },
  // Otras rutas 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
