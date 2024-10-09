import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBranchesComponent } from './our-branches.component';

describe('OurMissionsComponent', () => {
  let component: OurBranchesComponent;
  let fixture: ComponentFixture<OurBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
