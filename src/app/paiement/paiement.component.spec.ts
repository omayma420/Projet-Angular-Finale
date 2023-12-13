import { ComponentFixture, TestBed } from '@angular/core/testing';

// Update the import statement to reference the correct component
import { PaiementComponent } from './paiement.component';

// Update the describe and component variables accordingly
describe('PaiementComponent', () => {
  let component: PaiementComponent;
  let fixture: ComponentFixture<PaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Update the declarations to use the correct component
      declarations: [PaiementComponent]
    })
    .compileComponents();

    // Update the component assignment
    fixture = TestBed.createComponent(PaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
