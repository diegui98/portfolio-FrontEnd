import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduhabComponent } from './eduhab.component';

describe('EduhabComponent', () => {
  let component: EduhabComponent;
  let fixture: ComponentFixture<EduhabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduhabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EduhabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
