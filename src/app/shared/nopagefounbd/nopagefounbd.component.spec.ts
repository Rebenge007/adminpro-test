import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NopagefounbdComponent } from './nopagefounbd.component';

describe('NopagefounbdComponent', () => {
  let component: NopagefounbdComponent;
  let fixture: ComponentFixture<NopagefounbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NopagefounbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NopagefounbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
