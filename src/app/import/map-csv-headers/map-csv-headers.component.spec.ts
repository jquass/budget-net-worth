import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCsvHeadersComponent } from './map-csv-headers.component';

describe('MapCsvHeadersComponent', () => {
  let component: MapCsvHeadersComponent;
  let fixture: ComponentFixture<MapCsvHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCsvHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCsvHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
