import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevspaceBtnComponent } from './devspace-btn.component';

describe('DevspaceBtnComponent', () => {
  let component: DevspaceBtnComponent;
  let fixture: ComponentFixture<DevspaceBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevspaceBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevspaceBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
