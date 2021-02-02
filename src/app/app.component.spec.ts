import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { SpacexService } from './spacex.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const spacexServiceStub = () => ({
      getUpdatedApiUrl: filters => ({}),
      getData: uRL => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: SpacexService, useFactory: spacexServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`spaceX`);
  });

  it(`filters has default value`, () => {
    expect(component.filters).toEqual([, ,]);
  });

  it(`details has default value`, () => {
    expect(component.details).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'fetchData').and.callThrough();
      component.ngOnInit();
      expect(component.fetchData).toHaveBeenCalled();
    });
  });
});
