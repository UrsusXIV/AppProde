import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleABMPaisesComponent } from './detalle-abmpaises.component';

describe('DetalleABMPaisesComponent', () => {
  let component: DetalleABMPaisesComponent;
  let fixture: ComponentFixture<DetalleABMPaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleABMPaisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleABMPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
