import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbscenceComponent } from './list-abscence.component';

describe('ListAbscenceComponent', () => {
  let component: ListAbscenceComponent;
  let fixture: ComponentFixture<ListAbscenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAbscenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAbscenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
