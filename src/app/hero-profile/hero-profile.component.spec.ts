import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProfileComponent } from './hero-profile.component';

xdescribe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
