import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetalleABMPaisesComponent } from './detalle-abmpaises/detalle-abmpaises.component';

const routes: Routes = [
  { path: 'detalle-abmpaises', component: DetalleABMPaisesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DetalleABMPaisesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class AppRoutingModule{}