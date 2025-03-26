import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocherComponent } from './add-vocher.component';

describe('AddVocherComponent', () => {
  let component: AddVocherComponent;
  let fixture: ComponentFixture<AddVocherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVocherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVocherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
