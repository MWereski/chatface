import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapfinderComponent } from './mapfinder.component';

describe('MapfinderComponent', () => {
  let component: MapfinderComponent;
  let fixture: ComponentFixture<MapfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
