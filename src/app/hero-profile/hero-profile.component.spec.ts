import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  Store,NgxsModule  } from '@ngxs/store';
import { SetHeroeProfile,PostTeamColorHero,PutTeamColorHero,GetHeroe } from '../heroe/state/heroe.actions'
import {HeroeStateModel,HeroeState} from '../heroe/state/heroe.state'
import { HeroesService } from '../heroes.service'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HeroProfileComponent } from './hero-profile.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from '@angular/router';



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
describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;

  beforeEach(() => {
    let store: Store;
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HeroeState])],
      providers: [
        HeroesService,
        RouterTestingModule,
        {provide: HttpClient, useClass: HttpClientMock},
        {provide: HeroesService, useValue: mockTestFeeService },
        {provide: ActivatedRoute,useValue: { snapshot: {params: {id: '1'}} }},
      ]
    })   
    .compileComponents();
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getTeam', () => {
    component.getTeam('#ffff')
  });
 
});
