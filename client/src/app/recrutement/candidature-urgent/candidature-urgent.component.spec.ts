import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureUrgentComponent } from './candidature-urgent.component';

describe('CandidatureUrgentComponent', () => {
  let component: CandidatureUrgentComponent;
  let fixture: ComponentFixture<CandidatureUrgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatureUrgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatureUrgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
