import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateannonceComponent } from './createannonce.component';

describe('CreateannonceComponent', () => {
  let component: CreateannonceComponent;
  let fixture: ComponentFixture<CreateannonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateannonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
