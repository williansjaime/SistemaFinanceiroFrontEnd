import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostoRendaComponent } from './imposto-renda.component';

describe('ImpostoRendaComponent', () => {
  let component: ImpostoRendaComponent;
  let fixture: ComponentFixture<ImpostoRendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpostoRendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImpostoRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
