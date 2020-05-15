import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAsGuestComponent } from './search-as-guest.component';

describe('SearchAsGuestComponent', () => {
  let component: SearchAsGuestComponent;
  let fixture: ComponentFixture<SearchAsGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAsGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAsGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
