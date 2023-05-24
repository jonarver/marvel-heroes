import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  Store,NgxsModule  } from '@ngxs/store';
import { SetHeroeProfile,PostTeamColorHero,PutTeamColorHero,GetHeroe } from '../heroe/state/heroe.actions'
import {HeroeStateModel,HeroeState} from '../heroe/state/heroe.state'
import { HeroesService } from '../heroes.service'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ListadoDeHeroesComponent } from './listado-de-heroes.component';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';



class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  put = jasmine.createSpy('httpClient.put');
  post = jasmine.createSpy('httpClient.post');

}


const mockTestFeeService = {
  postTeamColor: () => of({data:{color:"#ffff"}}),
  putTeamColor: () => of({data:{color:"#ffff"}}),
  getHeroes: () => of({heroes:[], nextPage:1, 
                      page:0, beforePage:0, 
                      limit:10, total:10, count:10, offset:0, totalPages:10 })
};

let mockRouter = {
	navigateByUrl: jasmine.createSpy('navigate')
}
describe('ListadoDeHeroesComponent', () => {
  let component: ListadoDeHeroesComponent;
  let fixture: ComponentFixture<ListadoDeHeroesComponent>;

  beforeEach(() => {
    let store: Store;
    let router: Router;
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HeroeState]),],
      providers: [
        HeroesService,
        RouterTestingModule,
        {provide: HttpClient, useClass: HttpClientMock},
        {provide: HeroesService, useValue: mockTestFeeService },
        { provide: Router, useValue: mockRouter }
      ]
    })   
    .compileComponents();
    
    store = TestBed.inject(Store);
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submitSearch', () => {
    component.submitSearch()
  });

  it('should prevPage', () => {
    component.prevPage()
  });

  it('should nextPage', () => {
    component.nextPage()
  });
  it('should go_to', () => {
    let router = fixture.debugElement.injector.get(Router);
   router.navigateByUrl('/heroe/1')
    
    component.go_to({})
  });
 
 
 
});
