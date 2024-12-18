import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiyManagementComponent } from './entitiy-management.component';

describe('EntitiyManagementComponent', () => {
  let component: EntitiyManagementComponent;
  let fixture: ComponentFixture<EntitiyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitiyManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
