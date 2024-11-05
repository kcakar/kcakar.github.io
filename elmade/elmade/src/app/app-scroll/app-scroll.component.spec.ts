import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppScrollComponent } from './app-scroll.component';

describe('AppScrollComponent', () => {
  let component: AppScrollComponent;
  let fixture: ComponentFixture<AppScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppScrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
