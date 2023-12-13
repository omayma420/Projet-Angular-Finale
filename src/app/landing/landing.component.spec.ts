import { ComponentFixture, TestBed } from '@angular/core/testing';
import { landingComponent } from './landing.component';

describe('landingComponent', () => {
  let component: landingComponent;
  let fixture: ComponentFixture<landingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [landingComponent]
    });
    fixture = TestBed.createComponent(landingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
