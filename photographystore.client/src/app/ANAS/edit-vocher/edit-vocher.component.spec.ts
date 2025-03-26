import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVocherComponent } from './edit-vocher.component';

describe('EditVocherComponent', () => {
  let component: EditVocherComponent;
  let fixture: ComponentFixture<EditVocherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVocherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVocherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
