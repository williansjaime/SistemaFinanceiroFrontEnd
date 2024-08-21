import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanhosComponent } from './ganhos.component';

describe('GanhosComponent', () => {
  let component: GanhosComponent;
  let fixture: ComponentFixture<GanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanhosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
